"""
LangGraph orchestration for AI Recycle-to-Market Generator.
Implements progressive ingredient discovery with interrupt/resume patterns.
"""
import asyncio
import json
import time
from typing import Dict, Any, List, Optional, TypedDict

from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver
from langgraph.constants import Send
from langgraph.prebuilt import ToolNode
from langchain_core.messages import HumanMessage, AIMessage

from app.workflows.optimized_state import (
    OptimizedWorkflowState,
    IngredientsData,
    IngredientItem,
    IngredientSource,
    WorkflowPhase,
    NodeState,
    GeminiModelConfig
)
from app.integrations.gemini import GeminiStructuredClient
from app.core.redis import redis_service


class RecycleWorkflowOrchestrator:
    """
    LangGraph orchestrator for the AI Recycle-to-Market Generator.
    Implements progressive ingredient discovery with checkpointing and error recovery.
    """

    def __init__(self):
        self.gemini_client = GeminiStructuredClient()
        self.memory = MemorySaver()
        self.graph = self._build_graph()

    def _build_graph(self) -> StateGraph:
        """Build the LangGraph workflow."""

        # Create the graph with our state schema
        workflow = StateGraph(OptimizedWorkflowState)

        # Add all nodes
        workflow.add_node("P1a_ingredient_extraction", self.extract_ingredients)
        workflow.add_node("P1b_null_checker", self.check_nulls_and_question)
        workflow.add_node("P1c_categorize_ingredients", self.categorize_ingredients)
        workflow.add_node("G1_goal_formation", self.form_goals)
        workflow.add_node("O1_choice_proposer", self.propose_choices)
        workflow.add_node("E1_evaluator", self.evaluate_choices)
        workflow.add_node("PR1_prompt_builder", self.build_prompts)
        workflow.add_node("NB_image_generation", self.generate_images)
        workflow.add_node("user_clarification", self.handle_user_clarification)
        workflow.add_node("error_handler", self.handle_errors)

        # Define the flow with conditional edges
        workflow.add_edge(START, "P1a_ingredient_extraction")

        # P1a -> P1b
        workflow.add_edge("P1a_ingredient_extraction", "P1b_null_checker")

        # P1b conditional routing
        workflow.add_conditional_edges(
            "P1b_null_checker",
            self.route_after_null_check,
            {
                "clarify": "user_clarification",
                "categorize": "P1c_categorize_ingredients",
                "error": "error_handler"
            }
        )

        # User clarification -> P1b (loop back)
        workflow.add_edge("user_clarification", "P1b_null_checker")

        # P1c conditional routing
        workflow.add_conditional_edges(
            "P1c_categorize_ingredients",
            self.route_after_categorization,
            {
                "null_check": "P1b_null_checker",
                "goal_formation": "G1_goal_formation",
                "error": "error_handler"
            }
        )

        # Continue with main workflow
        workflow.add_edge("G1_goal_formation", "O1_choice_proposer")
        workflow.add_edge("O1_choice_proposer", "E1_evaluator")
        workflow.add_edge("E1_evaluator", "PR1_prompt_builder")
        workflow.add_edge("PR1_prompt_builder", "NB_image_generation")
        workflow.add_edge("NB_image_generation", END)

        # Error handler can retry or end
        workflow.add_conditional_edges(
            "error_handler",
            self.route_after_error,
            {
                "retry": "P1a_ingredient_extraction",
                "end": END
            }
        )

        # Compile with checkpointer for interrupt/resume
        return workflow.compile(checkpointer=self.memory)

    async def extract_ingredients(self, state: OptimizedWorkflowState) -> Dict[str, Any]:
        """
        P1a: Extract ingredients from user input using Gemini with structured output.
        """
        print(f"🔍 P1a: Extracting ingredients from: {state.user_input}")

        start_time = time.time()
        state.current_node = NodeState.P1A_EXTRACTION

        try:
            # Get model configuration for extraction
            model_config = state.get_model_config("extraction")

            # Define structured output schema for ingredient extraction
            extraction_schema = {
                "type": "object",
                "properties": {
                    "ingredients": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {"type": "string", "description": "Name of the ingredient/material"},
                                "material": {"type": "string", "description": "Material type (aluminum, plastic, glass, etc.)"},
                                "size": {"type": "string", "description": "Size description if mentioned"},
                                "condition": {"type": "string", "description": "Condition if mentioned"},
                                "confidence": {"type": "number"}
                            },
                            "required": ["name", "material", "confidence"]
                        }
                    },
                    "confidence": {"type": "number"}
                },
                "required": ["ingredients", "confidence"]
            }

            extraction_prompt = f"""
            Extract recyclable materials and ingredients from this user input: "{state.user_input}"

            Focus on identifying:
            1. Specific items (cans, bottles, bags, containers)
            2. Material types (aluminum, plastic, glass, fabric, etc.)
            3. Sizes if mentioned (12oz can, large bag, etc.)
            4. Condition if mentioned (empty, clean, used, etc.)

            For each ingredient, provide:
            - name: specific item name
            - material: material type
            - size: size if mentioned, otherwise null
            - condition: condition if mentioned, otherwise null
            - confidence: how confident you are (0.0-1.0)

            Return null for any field you cannot determine from the input.
            """

            # Call Gemini with structured output
            result = await self.gemini_client.generate_structured(
                prompt=extraction_prompt,
                response_schema=extraction_schema,
                model_config=model_config
            )

            # Create IngredientsData from result
            ingredients_data = IngredientsData()

            for ing_data in result.get("ingredients", []):
                ingredient = IngredientItem(
                    name=ing_data.get("name"),
                    material=ing_data.get("material"),
                    size=ing_data.get("size"),
                    condition=ing_data.get("condition"),
                    confidence=ing_data.get("confidence", 0.5),
                    source=IngredientSource.ML_EXTRACTION
                )
                ingredients_data.add_ingredient(ingredient)

            ingredients_data.confidence = result.get("confidence", 0.5)
            ingredients_data.extraction_attempts += 1

            # Store in Redis temp file
            redis_key = f"ingredients:{state.thread_id}"
            redis_service.set(redis_key, ingredients_data.to_json(), ex=3600)  # 1 hour TTL

            # Update state
            state.ingredients_data = ingredients_data

            # Record performance metrics
            execution_time = time.time() - start_time
            state.performance_metrics.record_node_execution("P1a", execution_time)
            state.performance_metrics.gemini_api_calls += 1
            state.performance_metrics.redis_operations += 1

            print(f"✅ P1a: Extracted {len(ingredients_data.ingredients)} ingredients")

            return {"ingredients_data": ingredients_data}

        except Exception as e:
            state.add_error("extraction_error", str(e), "P1a")
            print(f"❌ P1a: Error extracting ingredients: {e}")
            return {"ingredients_data": state.ingredients_data}

    async def check_nulls_and_question(self, state: OptimizedWorkflowState) -> Dict[str, Any]:
        """
        P1b: Check for null values and generate targeted questions.
        """
        print("🔍 P1b: Checking for null values and generating questions")

        start_time = time.time()
        state.current_node = NodeState.P1B_NULL_CHECK

        try:
            if not state.ingredients_data or not state.ingredients_data.ingredients:
                state.add_error("no_ingredients", "No ingredients found to check", "P1b")
                return {"needs_user_input": True}

            # Check for null values
            ingredients_with_nulls = [
                (i, ing) for i, ing in enumerate(state.ingredients_data.ingredients)
                if ing.has_any_nulls()
            ]

            if not ingredients_with_nulls:
                print("✅ P1b: No null values found, proceeding to categorization")
                state.clear_user_questions()
                execution_time = time.time() - start_time
                state.performance_metrics.record_node_execution("P1b", execution_time)
                return {"needs_user_input": False}

            # Generate targeted question for first ingredient with nulls
            idx, ingredient = ingredients_with_nulls[0]
            null_fields = ingredient.get_null_fields()

            # Generate contextual question based on missing field
            if "size" in null_fields:
                if ingredient.material == "aluminum" and "can" in (ingredient.name or "").lower():
                    question = f"What size is your {ingredient.name}? (12oz standard, 16oz, 20oz, or other?)"
                else:
                    question = f"What size is your {ingredient.name}? (small, medium, large, or specific dimensions?)"
            elif "material" in null_fields:
                question = f"What material is your {ingredient.name} made of? (plastic, aluminum, glass, fabric, etc.)"
            elif "name" in null_fields:
                question = f"Can you be more specific about this {ingredient.material} item?"
            else:
                question = f"Can you provide more details about your {ingredient.name}?"

            # Store question and set interrupt
            state.add_user_question(question)
            state.ingredients_data.last_question = question
            state.interrupt_reason = "ingredient_clarification"

            # Update Redis
            redis_key = f"ingredients:{state.thread_id}"
            redis_service.set(redis_key, state.ingredients_data.to_json(), ex=3600)

            execution_time = time.time() - start_time
            state.performance_metrics.record_node_execution("P1b", execution_time)

            print(f"❓ P1b: Generated question: {question}")

            return {
                "needs_user_input": True,
                "user_questions": state.user_questions,
                "interrupt_reason": "ingredient_clarification"
            }

        except Exception as e:
            state.add_error("null_check_error", str(e), "P1b")
            print(f"❌ P1b: Error checking nulls: {e}")
            return {"needs_user_input": True}

    async def handle_user_clarification(self, state: OptimizedWorkflowState) -> Dict[str, Any]:
        """
        Handle user clarification and update ingredient data.
        """
        print(f"💬 User Clarification: Processing response")

        try:
            # Parse user response and update ingredients
            # This would be called when user provides clarification
            user_response = state.user_input  # Latest user input

            # Find ingredient that needs updating
            if state.ingredients_data and state.ingredients_data.ingredients:
                ingredients_with_nulls = [
                    (i, ing) for i, ing in enumerate(state.ingredients_data.ingredients)
                    if ing.has_any_nulls()
                ]

                if ingredients_with_nulls:
                    idx, ingredient = ingredients_with_nulls[0]
                    null_fields = ingredient.get_null_fields()

                    # Simple parsing - could be enhanced with Gemini
                    if "size" in null_fields:
                        state.ingredients_data.update_ingredient(
                            idx, "size", user_response, IngredientSource.USER_CLARIFICATION
                        )
                    elif "material" in null_fields:
                        state.ingredients_data.update_ingredient(
                            idx, "material", user_response, IngredientSource.USER_CLARIFICATION
                        )
                    elif "name" in null_fields:
                        state.ingredients_data.update_ingredient(
                            idx, "name", user_response, IngredientSource.USER_CLARIFICATION
                        )

            # Update Redis
            redis_key = f"ingredients:{state.thread_id}"
            redis_service.set(redis_key, state.ingredients_data.to_json(), ex=3600)

            # Clear user questions
            state.clear_user_questions()

            print("✅ User Clarification: Updated ingredient data")

            return {"needs_user_input": False}

        except Exception as e:
            state.add_error("clarification_error", str(e), "user_clarification")
            print(f"❌ User Clarification: Error: {e}")
            return {"needs_user_input": False}

    async def categorize_ingredients(self, state: OptimizedWorkflowState) -> Dict[str, Any]:
        """
        P1c: Categorize ingredients and check for missing categories.
        """
        print("🔍 P1c: Categorizing ingredients")

        start_time = time.time()
        state.current_node = NodeState.P1C_CATEGORIZATION

        try:
            if not state.ingredients_data or not state.ingredients_data.ingredients:
                state.add_error("no_ingredients", "No ingredients to categorize", "P1c")
                return {"extraction_complete": False}

            # Categorize existing ingredients
            containers = []
            fasteners = []
            decorative = []
            tools = []

            for ingredient in state.ingredients_data.ingredients:
                if not ingredient.name:
                    continue

                name_lower = ingredient.name.lower()
                material = (ingredient.material or "").lower()

                # Categorization logic
                if any(word in name_lower for word in ["can", "bottle", "container", "box", "jar"]):
                    containers.append(ingredient.name)
                    ingredient.category = "container"
                elif any(word in name_lower for word in ["tape", "glue", "wire", "string", "clip", "screw"]):
                    fasteners.append(ingredient.name)
                    ingredient.category = "fastener"
                elif any(word in name_lower for word in ["paint", "sticker", "fabric", "ribbon", "marker"]):
                    decorative.append(ingredient.name)
                    ingredient.category = "decorative"
                elif any(word in name_lower for word in ["scissors", "drill", "hammer", "knife", "gun"]):
                    tools.append(ingredient.name)
                    ingredient.category = "tool"
                else:
                    # Default categorization based on material
                    if material in ["aluminum", "plastic", "glass"]:
                        containers.append(ingredient.name)
                        ingredient.category = "container"

            # Update categories in ingredients data
            state.ingredients_data.categories = {
                "containers": containers,
                "fasteners": fasteners,
                "decorative": decorative,
                "tools": tools
            }

            # Check for missing essential categories (containers and fasteners are essential)
            missing_categories = []
            if not containers:
                missing_categories.append("containers")
            if not fasteners:
                missing_categories.append("fasteners")

            # If missing essential categories, add null ingredients
            new_nulls_added = False
            for category in missing_categories:
                if category == "containers":
                    null_ingredient = IngredientItem(
                        name=None,
                        material=None,
                        category="container",
                        confidence=0.0,
                        source=IngredientSource.DERIVED
                    )
                    state.ingredients_data.add_ingredient(null_ingredient)
                    new_nulls_added = True
                elif category == "fasteners":
                    null_ingredient = IngredientItem(
                        name=None,
                        material=None,
                        category="fastener",
                        confidence=0.0,
                        source=IngredientSource.DERIVED
                    )
                    state.ingredients_data.add_ingredient(null_ingredient)
                    new_nulls_added = True

            # Update Redis
            redis_key = f"ingredients:{state.thread_id}"
            redis_service.set(redis_key, state.ingredients_data.to_json(), ex=3600)

            # Check if categorization is complete
            if new_nulls_added:
                print(f"🔄 P1c: Added missing categories, looping back to null check")
                execution_time = time.time() - start_time
                state.performance_metrics.record_node_execution("P1c", execution_time)
                return {"extraction_complete": False, "new_nulls_added": True}
            else:
                print(f"✅ P1c: Categorization complete")
                state.ingredients_data.completed = True
                state.extraction_complete = True

                execution_time = time.time() - start_time
                state.performance_metrics.record_node_execution("P1c", execution_time)

                return {"extraction_complete": True, "new_nulls_added": False}

        except Exception as e:
            state.add_error("categorization_error", str(e), "P1c")
            print(f"❌ P1c: Error categorizing ingredients: {e}")
            return {"extraction_complete": False}

    async def form_goals(self, state: OptimizedWorkflowState) -> Dict[str, Any]:
        """
        G1: Form goals based on completed ingredient discovery.
        """
        print("🎯 G1: Forming goals")

        state.current_node = NodeState.G1_GOAL_FORMATION
        state.mark_phase_complete(
            WorkflowPhase.INGREDIENT_DISCOVERY,
            WorkflowPhase.GOAL_FORMATION,
            NodeState.G1_GOAL_FORMATION
        )

        # Implementation placeholder - would use Gemini to form goals
        # based on completed ingredients
        goals = f"Create a functional and aesthetic product using available materials"

        return {
            "goals": goals,
            "current_phase": WorkflowPhase.GOAL_FORMATION
        }

    async def propose_choices(self, state: OptimizedWorkflowState) -> Dict[str, Any]:
        """O1: Propose viable build choices."""
        print("💡 O1: Proposing choices")
        # Implementation placeholder
        return {"viable_options": []}

    async def evaluate_choices(self, state: OptimizedWorkflowState) -> Dict[str, Any]:
        """E1: Evaluate proposed choices."""
        print("📊 E1: Evaluating choices")
        # Implementation placeholder
        return {"selected_option": {}}

    async def build_prompts(self, state: OptimizedWorkflowState) -> Dict[str, Any]:
        """PR1: Build image generation prompts."""
        print("📝 PR1: Building prompts")
        # Implementation placeholder
        return {"concept_variants": []}

    async def generate_images(self, state: OptimizedWorkflowState) -> Dict[str, Any]:
        """NB: Generate concept images."""
        print("🎨 NB: Generating images")
        # Implementation placeholder
        return {"concept_variants": []}

    async def handle_errors(self, state: OptimizedWorkflowState) -> Dict[str, Any]:
        """Handle errors with fallback strategies."""
        print("⚠️ Error Handler: Processing errors")

        if state.should_retry():
            state.increment_retry()
            return {"action": "retry"}
        else:
            return {"action": "end"}

    def route_after_null_check(self, state: OptimizedWorkflowState) -> str:
        """Route after null checking."""
        if state.errors and not state.should_retry():
            return "error"
        elif state.needs_user_input:
            return "clarify"
        else:
            return "categorize"

    def route_after_categorization(self, state: OptimizedWorkflowState) -> str:
        """Route after categorization."""
        if state.errors and not state.should_retry():
            return "error"
        elif not state.extraction_complete:
            return "null_check"
        else:
            return "goal_formation"

    def route_after_error(self, state: OptimizedWorkflowState) -> str:
        """Route after error handling."""
        if state.should_retry():
            return "retry"
        else:
            return "end"

    async def run_workflow(self, initial_input: str, thread_id: str) -> Dict[str, Any]:
        """
        Run the complete workflow for a given input.
        """
        initial_state = OptimizedWorkflowState(
            thread_id=thread_id,
            user_input=initial_input
        )

        # Start performance tracking
        initial_state.performance_metrics.start_phase(WorkflowPhase.INGREDIENT_DISCOVERY.value)

        config = {"configurable": {"thread_id": thread_id}}

        try:
            # Run the workflow
            result = await self.graph.ainvoke(initial_state, config=config)
            return result

        except Exception as e:
            print(f"❌ Workflow error: {e}")
            return {"error": str(e)}

    async def resume_workflow(self, user_input: str, thread_id: str) -> Dict[str, Any]:
        """
        Resume workflow after user clarification.
        """
        config = {"configurable": {"thread_id": thread_id}}

        # Update state with new user input
        update_data = {"user_input": user_input}

        try:
            # Resume the workflow
            result = await self.graph.ainvoke(update_data, config=config)
            return result

        except Exception as e:
            print(f"❌ Resume error: {e}")
            return {"error": str(e)}