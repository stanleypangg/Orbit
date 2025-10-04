"""
Phase 2 LangGraph nodes for Goal Formation & Choice Generation.
Implements G1 (Goal Formation), O1 (Choice Generation), and E1 (Evaluation) nodes.
"""
import json
import time
import logging
from typing import Dict, Any, List, Optional
import google.generativeai as genai
from app.workflows.state import WorkflowState, ConceptVariant
from app.core.config import settings
from app.core.redis import redis_service
import backoff

logger = logging.getLogger(__name__)

# Structured output schemas for Phase 2
GOAL_FORMATION_SCHEMA = {
    "type": "object",
    "properties": {
        "primary_goal": {"type": "string"},
        "artifact_type": {"type": "string"},
        "project_complexity": {"type": "string", "enum": ["simple", "moderate", "complex"]},
        "estimated_time": {"type": "string"},
        "target_audience": {"type": "string"},
        "functional_requirements": {
            "type": "array",
            "items": {"type": "string"}
        },
        "aesthetic_preferences": {"type": "string"},
        "sustainability_focus": {"type": "boolean"},
        "budget_category": {"type": "string", "enum": ["minimal", "low", "moderate", "high"]},
        "tool_complexity": {"type": "string", "enum": ["basic", "intermediate", "advanced"]},
        "safety_considerations": {
            "type": "array",
            "items": {"type": "string"}
        },
        "success_metrics": {
            "type": "array",
            "items": {"type": "string"}
        }
    },
    "required": ["primary_goal", "artifact_type", "project_complexity"]
}

CHOICE_GENERATION_SCHEMA = {
    "type": "object",
    "properties": {
        "viable_options": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "option_id": {"type": "string"},
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "category": {"type": "string"},
                    "materials_used": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "construction_steps": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "tools_required": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "estimated_time": {"type": "string"},
                    "difficulty_level": {"type": "string", "enum": ["beginner", "intermediate", "advanced"]},
                    "innovation_score": {"type": "number", "minimum": 0, "maximum": 1},
                    "practicality_score": {"type": "number", "minimum": 0, "maximum": 1}
                },
                "required": ["option_id", "title", "description", "materials_used"]
            }
        },
        "generation_metadata": {
            "type": "object",
            "properties": {
                "total_options": {"type": "integer"},
                "generation_strategy": {"type": "string"},
                "material_utilization": {"type": "number", "minimum": 0, "maximum": 1},
                "creativity_score": {"type": "number", "minimum": 0, "maximum": 1}
            }
        }
    },
    "required": ["viable_options"]
}

EVALUATION_SCHEMA = {
    "type": "object",
    "properties": {
        "evaluated_options": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "option_id": {"type": "string"},
                    "feasibility_score": {"type": "number", "minimum": 0, "maximum": 1},
                    "aesthetic_score": {"type": "number", "minimum": 0, "maximum": 1},
                    "esg_score": {"type": "number", "minimum": 0, "maximum": 1},
                    "safety_score": {"type": "number", "minimum": 0, "maximum": 1},
                    "innovation_score": {"type": "number", "minimum": 0, "maximum": 1},
                    "overall_score": {"type": "number", "minimum": 0, "maximum": 1},
                    "safety_flags": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "risk_factors": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "improvement_suggestions": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "is_recommended": {"type": "boolean"},
                    "ranking": {"type": "integer"}
                },
                "required": ["option_id", "feasibility_score", "overall_score"]
            }
        },
        "safety_assessment": {
            "type": "object",
            "properties": {
                "has_safety_concerns": {"type": "boolean"},
                "blocked_options": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "safety_warnings": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            }
        }
    },
    "required": ["evaluated_options", "safety_assessment"]
}


@backoff.on_exception(
    backoff.expo,
    (Exception,),
    max_tries=3,
    max_time=60
)
async def call_gemini_with_retry(model_name: str, prompt: str, **kwargs):
    """Resilient Gemini API call with exponential backoff."""
    try:
        model = genai.GenerativeModel(model_name)
        response = await model.generate_content_async(prompt, **kwargs)
        return response
    except Exception as e:
        logger.error(f"Gemini API error: {str(e)}")
        raise


async def goal_formation_node(state: WorkflowState) -> Dict[str, Any]:
    """
    G1 Node: Goal formation from complete ingredient data and user intent.
    Uses Gemini Pro for complex reasoning about project possibilities.
    """
    logger.info(f"G1: Starting goal formation for thread {state.thread_id}")

    # Validate that we have ingredient data
    if not state.ingredients_data or not state.ingredients_data.ingredients:
        logger.error("G1: No ingredient data available for goal formation")
        state.errors.append("Goal formation requires complete ingredient data")
        return {"error": "No ingredients available"}

    # Build goal formation prompt
    ingredients_summary = []
    for ingredient in state.ingredients_data.ingredients:
        ingredients_summary.append({
            "name": ingredient.name,
            "material": ingredient.material,
            "size": ingredient.size,
            "category": ingredient.category,
            "condition": ingredient.condition
        })

    goal_prompt = f"""
    You are an expert in sustainable design and upcycling. Based on the available recyclable materials,
    formulate a comprehensive goal for creating a useful product.

    Available ingredients:
    {json.dumps(ingredients_summary, indent=2)}

    User constraints from previous analysis:
    - Material synergy score: {state.user_constraints.get('material_synergy', 0.5)}
    - Suggested complexity: {state.user_constraints.get('project_complexity', 'moderate')}
    - Recommended types: {state.user_constraints.get('recommended_types', [])}

    User input context: "{state.user_input}"

    Formulate a clear, achievable goal that:
    1. Maximizes the use of available materials
    2. Creates genuine value/utility
    3. Considers safety and feasibility
    4. Aligns with sustainability principles
    5. Matches the implied user skill level and intent

    Define the primary goal, target artifact type, complexity level, and all relevant considerations
    for successful project execution.
    """

    try:
        # Call Gemini Pro for complex goal reasoning
        response = await call_gemini_with_retry(
            model_name="gemini-2.5-pro",
            prompt=goal_prompt,
            generation_config={
                "response_schema": GOAL_FORMATION_SCHEMA,
                "temperature": 0.5,  # Balanced creativity and consistency
                "thinking_budget": 30000  # Allow thorough analysis
            }
        )

        if response.text:
            goal_data = json.loads(response.text)

            # Update state with goal information
            state.goals = goal_data["primary_goal"]
            state.artifact_type = goal_data["artifact_type"]
            state.user_constraints.update({
                "project_complexity": goal_data["project_complexity"],
                "estimated_time": goal_data.get("estimated_time", "unknown"),
                "target_audience": goal_data.get("target_audience", "general"),
                "functional_requirements": goal_data.get("functional_requirements", []),
                "aesthetic_preferences": goal_data.get("aesthetic_preferences", "practical"),
                "sustainability_focus": goal_data.get("sustainability_focus", True),
                "budget_category": goal_data.get("budget_category", "minimal"),
                "tool_complexity": goal_data.get("tool_complexity", "basic"),
                "safety_considerations": goal_data.get("safety_considerations", []),
                "success_metrics": goal_data.get("success_metrics", [])
            })

            # Save goal data to Redis
            goal_key = f"goals:{state.thread_id}"
            redis_service.set(goal_key, json.dumps(goal_data), ex=3600)

            state.current_node = "O1"
            logger.info(f"G1: Goal formation complete - {goal_data['artifact_type']}")

            return {
                "goals": state.goals,
                "artifact_type": state.artifact_type,
                "current_node": "O1",
                "goal_data": goal_data
            }

    except Exception as e:
        logger.error(f"G1: Goal formation failed: {str(e)}")
        state.errors.append(f"Goal formation failed: {str(e)}")

        # Fallback goal formation
        fallback_goal = f"Create a useful household item from {len(state.ingredients_data.ingredients)} recycled materials"
        state.goals = fallback_goal
        state.artifact_type = "household_utility"
        state.current_node = "O1"

    return {
        "goals": state.goals,
        "artifact_type": state.artifact_type,
        "current_node": "O1"
    }


async def choice_proposer_node(state: WorkflowState) -> Dict[str, Any]:
    """
    O1 Node: Generate multiple viable project options based on goals and ingredients.
    Uses Gemini Pro for creative problem solving and feasibility analysis.
    """
    logger.info(f"O1: Starting choice generation for thread {state.thread_id}")

    # Validate inputs
    if not state.goals or not state.ingredients_data:
        logger.error("O1: Missing goals or ingredient data")
        state.errors.append("Choice generation requires goals and ingredients")
        return {"error": "Missing required data"}

    # Build choice generation prompt
    ingredients_list = [
        f"- {ing.name} ({ing.material}, {ing.size})"
        for ing in state.ingredients_data.ingredients
    ]

    choice_prompt = f"""
    You are a creative design expert specializing in upcycling and sustainable product development.

    PROJECT GOAL: {state.goals}
    TARGET ARTIFACT TYPE: {state.artifact_type}
    PROJECT COMPLEXITY: {state.user_constraints.get('project_complexity', 'moderate')}

    AVAILABLE MATERIALS:
    {chr(10).join(ingredients_list)}

    CONSTRAINTS:
    - Budget category: {state.user_constraints.get('budget_category', 'minimal')}
    - Tool complexity: {state.user_constraints.get('tool_complexity', 'basic')}
    - Estimated time: {state.user_constraints.get('estimated_time', 'flexible')}
    - Safety considerations: {', '.join(state.user_constraints.get('safety_considerations', []))}

    Generate 3-5 distinct, viable project options that:
    1. Use the available materials effectively
    2. Achieve the stated goal
    3. Vary in approach/style (minimalist, decorative, functional, etc.)
    4. Are feasible with basic to intermediate tools
    5. Follow safety best practices
    6. Demonstrate different levels of creativity and innovation

    For each option, provide:
    - Clear title and description
    - Specific materials usage from the available list
    - Step-by-step construction approach
    - Required tools (keep realistic)
    - Time estimate and difficulty
    - Innovation and practicality scores

    Focus on options that are genuinely buildable and useful.
    """

    try:
        # Call Gemini Pro for creative choice generation
        response = await call_gemini_with_retry(
            model_name="gemini-2.5-pro",
            prompt=choice_prompt,
            generation_config={
                "response_schema": CHOICE_GENERATION_SCHEMA,
                "temperature": 0.7,  # Higher creativity for ideation
                "thinking_budget": 40000  # Allow extensive creative thinking
            }
        )

        if response.text:
            choice_data = json.loads(response.text)
            viable_options = choice_data.get("viable_options", [])

            # Convert to state format and store
            state.viable_options = viable_options

            # Save choices to Redis
            choices_key = f"choices:{state.thread_id}"
            redis_service.set(choices_key, json.dumps(choice_data), ex=3600)

            state.current_node = "E1"
            logger.info(f"O1: Generated {len(viable_options)} viable project options")

            return {
                "viable_options": viable_options,
                "current_node": "E1",
                "generation_metadata": choice_data.get("generation_metadata", {})
            }

    except Exception as e:
        logger.error(f"O1: Choice generation failed: {str(e)}")
        state.errors.append(f"Choice generation failed: {str(e)}")

        # Fallback: Create simple option
        fallback_option = {
            "option_id": "fallback_01",
            "title": f"Simple {state.artifact_type}",
            "description": f"Basic upcycled project using available {len(state.ingredients_data.ingredients)} materials",
            "materials_used": [ing.name for ing in state.ingredients_data.ingredients[:3]],
            "tools_required": ["basic hand tools"],
            "difficulty_level": "beginner",
            "innovation_score": 0.3,
            "practicality_score": 0.7
        }
        state.viable_options = [fallback_option]
        state.current_node = "E1"

    return {
        "viable_options": state.viable_options,
        "current_node": "E1"
    }


async def evaluation_node(state: WorkflowState) -> Dict[str, Any]:
    """
    E1 Node: Multi-factor evaluation of generated options with safety validation.
    Uses Gemini Pro for comprehensive analysis and safety assessment.
    """
    logger.info(f"E1: Starting option evaluation for thread {state.thread_id}")

    # Validate inputs
    if not state.viable_options:
        logger.error("E1: No viable options to evaluate")
        state.errors.append("Evaluation requires viable options")
        return {"error": "No options to evaluate"}

    # Build evaluation prompt
    options_for_eval = []
    for option in state.viable_options:
        options_for_eval.append({
            "id": option.get("option_id", "unknown"),
            "title": option.get("title", ""),
            "description": option.get("description", ""),
            "materials": option.get("materials_used", []),
            "tools": option.get("tools_required", []),
            "steps": option.get("construction_steps", []),
            "difficulty": option.get("difficulty_level", "unknown")
        })

    evaluation_prompt = f"""
    You are a safety expert and product evaluator specializing in DIY upcycling projects.

    PROJECT CONTEXT:
    - Goal: {state.goals}
    - Available materials: {[ing.name for ing in state.ingredients_data.ingredients]}
    - Safety considerations: {state.user_constraints.get('safety_considerations', [])}

    OPTIONS TO EVALUATE:
    {json.dumps(options_for_eval, indent=2)}

    Perform comprehensive evaluation on each option considering:

    FEASIBILITY (0.0-1.0):
    - Material availability and suitability
    - Tool accessibility and skill requirements
    - Construction complexity vs stated difficulty
    - Time realism and resource requirements

    AESTHETIC APPEAL (0.0-1.0):
    - Visual design quality
    - Finish and presentation potential
    - Style coherence and appeal

    ESG SCORE (0.0-1.0):
    - Material waste reduction
    - Energy efficiency in construction
    - Longevity and durability
    - End-of-life considerations

    SAFETY ASSESSMENT (0.0-1.0):
    - Construction safety during building
    - Final product safety for intended use
    - Material compatibility and stability
    - Tool safety requirements

    CRITICAL SAFETY EVALUATION:
    - Flag any dangerous material combinations
    - Identify structural integrity risks
    - Note sharp edges, toxic materials, or instability
    - Block options that pose unacceptable risks

    Rank all options and recommend the best 1-3 for the user.
    """

    try:
        # Call Gemini Pro for comprehensive evaluation
        response = await call_gemini_with_retry(
            model_name="gemini-2.5-pro",
            prompt=evaluation_prompt,
            generation_config={
                "response_schema": EVALUATION_SCHEMA,
                "temperature": 0.2,  # Low temperature for consistent evaluation
                "safety_settings": [
                    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"}
                ]  # Allow safety analysis discussion
            }
        )

        if response.text:
            eval_data = json.loads(response.text)
            evaluated_options = eval_data.get("evaluated_options", [])
            safety_assessment = eval_data.get("safety_assessment", {})

            # Check for safety blocks
            blocked_options = safety_assessment.get("blocked_options", [])
            if blocked_options:
                logger.warning(f"E1: Blocked {len(blocked_options)} options for safety reasons")

            # Sort options by overall score
            evaluated_options.sort(key=lambda x: x.get("overall_score", 0), reverse=True)

            # Update rankings
            for i, option in enumerate(evaluated_options):
                option["ranking"] = i + 1

            # Store evaluation results
            eval_key = f"evaluation:{state.thread_id}"
            redis_service.set(eval_key, json.dumps(eval_data), ex=3600)

            # Update state with top options
            recommended_options = [
                opt for opt in evaluated_options
                if opt.get("is_recommended", True) and opt["option_id"] not in blocked_options
            ]

            if recommended_options:
                state.selected_option = recommended_options[0]  # Top choice
                state.current_node = "PR1"  # Move to prompt building
                state.current_phase = "concept_generation"

                logger.info(f"E1: Evaluation complete, {len(recommended_options)} options recommended")

                return {
                    "evaluated_options": evaluated_options,
                    "selected_option": state.selected_option,
                    "safety_assessment": safety_assessment,
                    "current_node": "PR1",
                    "current_phase": "concept_generation"
                }
            else:
                logger.error("E1: No safe options recommended")
                state.errors.append("No safe options passed evaluation")

    except Exception as e:
        logger.error(f"E1: Evaluation failed: {str(e)}")
        state.errors.append(f"Evaluation failed: {str(e)}")

        # Fallback: Select first option with basic scoring
        if state.viable_options:
            state.selected_option = state.viable_options[0]
            state.current_node = "PR1"
            state.current_phase = "concept_generation"

    return {
        "selected_option": state.selected_option,
        "current_node": "PR1",
        "current_phase": "concept_generation"
    }


# Routing functions for LangGraph
def should_proceed_to_choices(state: WorkflowState) -> str:
    """Determine if goal formation is complete."""
    if state.goals and state.artifact_type:
        return "choice_generation"
    return "goal_formation"


def should_proceed_to_evaluation(state: WorkflowState) -> str:
    """Determine if choice generation is complete."""
    if state.viable_options and len(state.viable_options) > 0:
        return "evaluation"
    return "choice_generation"


def should_proceed_to_phase3(state: WorkflowState) -> str:
    """Determine if evaluation is complete and ready for concept generation."""
    if state.selected_option and state.current_phase == "concept_generation":
        return "prompt_building"
    return "evaluation"