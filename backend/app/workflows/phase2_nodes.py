"""
Phase 2 LangGraph nodes for Goal Formation & Choice Generation.
Implements G1 (Goal Formation), O1 (Choice Generation), and E1 (Evaluation) nodes.
"""
import json
import time
import logging
from typing import Dict, Any, List, Optional
from google.generativeai.types import protos as genai_protos
from app.workflows.state import WorkflowState, ConceptVariant
from app.ai_service.production_gemini import call_gemini_with_retry as production_call_gemini

from app.core.config import settings
from app.core.redis import redis_service

logger = logging.getLogger(__name__)

# Structured output schemas for Phase 2
_UNSUPPORTED_SCHEMA_KEYS = {
    "minimum",
    "maximum",
    "exclusiveMinimum",
    "exclusiveMaximum",
    "multipleOf",
    "pattern",
    "minLength",
    "maxLength",
    "minItems",
    "maxItems",
}


def _sanitize_response_schema(schema: Any) -> Any:
    """Normalize response schema definitions for Gemini structured output."""
    if isinstance(schema, genai_protos.Schema):
        return schema

    if isinstance(schema, dict):
        sanitized: Dict[str, Any] = {}
        for key, value in schema.items():
            if key in _UNSUPPORTED_SCHEMA_KEYS:
                continue
            if key == "type" and isinstance(value, list):
                null_types = [t for t in value if isinstance(t, str) and t.lower() == "null"]
                non_null_types = [t for t in value if isinstance(t, str) and t.lower() != "null"]
                if len(non_null_types) == 1 and null_types:
                    sanitized["type"] = non_null_types[0]
                    sanitized.setdefault("nullable", True)
                    continue

            sanitized[key] = _sanitize_response_schema(value)
        return sanitized

    if isinstance(schema, list):
        return [_sanitize_response_schema(item) for item in schema]

    return schema


GOAL_FORMATION_SCHEMA = _sanitize_response_schema({
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
})

CHOICE_GENERATION_SCHEMA = _sanitize_response_schema({
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
                    "innovation_score": {"type": "number"},
                    "practicality_score": {"type": "number"}
                },
                "required": ["option_id", "title", "description", "materials_used"]
            }
        },
        "generation_metadata": {
            "type": "object",
            "properties": {
                "total_options": {"type": "integer"},
                "generation_strategy": {"type": "string"},
                "material_utilization": {"type": "number"},
                "creativity_score": {"type": "number"}
            }
        }
    },
    "required": ["viable_options"]
})

EVALUATION_SCHEMA = _sanitize_response_schema({
    "type": "object",
    "properties": {
        "evaluated_options": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "option_id": {"type": "string"},
                    "feasibility_score": {"type": "number"},
                    "aesthetic_score": {"type": "number"},
                    "esg_score": {"type": "number"},
                    "safety_score": {"type": "number"},
                    "innovation_score": {"type": "number"},
                    "overall_score": {"type": "number"},
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
})




async def goal_formation_node(state: WorkflowState) -> Dict[str, Any]:
    """
    G1 Node: Goal formation from complete ingredient data and user intent.
    Uses Gemini Pro for complex reasoning about project possibilities.
    """
    logger.info(f"G1: Starting goal formation for thread {state.thread_id}")
    
    # Update Redis with current state
    from app.core.redis import redis_service
    state_key = f"workflow_state:{state.thread_id}"
    redis_service.set(state_key, json.dumps({
        "status": "running",
        "current_phase": "goal_formation",
        "current_node": "G1_goal_formation",
        "result": {}
    }), ex=3600)

    # Validate that we have ingredient data
    if not state.ingredients_data or not state.ingredients_data.ingredients:
        logger.error("G1: No ingredient data available for goal formation")
        message = "No ingredient data available for goal formation"
        state.errors.append(message)
        
        # STOP THE LOOP: This is a fatal error, we cannot proceed
        raise Exception("Fatal: No ingredients available - extraction may have failed")

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
        response = await production_call_gemini(
            prompt=goal_prompt,
            task_type="goal_formation",
            response_schema=GOAL_FORMATION_SCHEMA
        )

        if response and not response.get("error"):
            goal_data = response  # Response is already parsed JSON

            if goal_data and goal_data.get("primary_goal") and goal_data.get("artifact_type"):
                # SUCCESS PATH: Valid goal data
                state.goals = goal_data["primary_goal"]
                state.artifact_type = goal_data["artifact_type"]
                state.user_constraints.update({
                    "project_complexity": goal_data.get("project_complexity", "moderate"),
                    "estimated_time": goal_data.get("estimated_time", "unknown"),
                    "target_audience": goal_data.get("target_audience", "general"),
                    "functional_requirements": goal_data.get("functional_requirements", []),
                    "aesthetic_preferences": goal_data.get("aesthetic_preferences", "practical"),
                    "sustainability_focus": goal_data.get("sustainability_focus", True),
                    "budget_category": goal_data.get("budget_category", "minimal"),
                    "tool_complexity": goal_data.get("tool_complexity", "basic"),
                    "safety_considerations": goal_data.get("safety_considerations", []),
                    "success_metrics": goal_data.get("success_metrics", []),
                    "storyboard_9_steps": goal_data.get("storyboard_9_steps", [])
                })

                # Save goal data to Redis
                goal_key = f"goals:{state.thread_id}"
                redis_service.set(goal_key, json.dumps(goal_data), ex=3600)

                state.current_node = "O1"
                logger.info(f"✅ G1: Goal formation complete - {goal_data['artifact_type']}")

                return {
                    "goals": state.goals,
                    "artifact_type": state.artifact_type,
                    "current_node": "O1",
                    "goal_data": goal_data
                }
            else:
                # Validation returned None or missing required fields
                logger.warning("G1: AI response validation failed, using fallback goal")
                raise ValueError("Invalid goal data structure")
        else:
            error_message = response.get("error", "Unknown error") if response else "No response"
            logger.error(f"G1: AI agent call failed: {error_message}")
            raise Exception(f"AI agent call failed: {error_message}")

    except Exception as e:
        logger.error(f"G1: Goal formation failed: {str(e)}")
        state.errors.append(f"Goal formation failed: {str(e)}")

        # FALLBACK: Create reasonable default goal
        materials_list = [ing.material for ing in state.ingredients_data.ingredients if ing.material]
        unique_materials = list(set(materials_list))

        fallback_goal = f"Create a practical {state.user_input or 'household item'} using {', '.join(unique_materials[:3])}"
        state.goals = fallback_goal
        state.artifact_type = "household_utility"
        state.user_constraints.update({
            "project_complexity": "moderate",
            "tool_complexity": "basic"
        })
        state.current_node = "O1"
        logger.info(f"⚠️ G1: Using fallback goal - {fallback_goal}")

        # Save fallback goal data to Redis
        fallback_goal_data = {
            "primary_goal": fallback_goal,
            "artifact_type": "household_utility",
            "project_complexity": "moderate"
        }
        goal_key = f"goals:{state.thread_id}"
        redis_service.set(goal_key, json.dumps(fallback_goal_data), ex=3600)

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
    
    # Update Redis with current state
    from app.core.redis import redis_service
    state_key = f"workflow_state:{state.thread_id}"
    redis_service.set(state_key, json.dumps({
        "status": "running",
        "current_phase": "goal_formation",
        "current_node": "O1_choice_generation",
        "result": {}
    }), ex=3600)

    # Validate inputs
    if not state.goals or not state.ingredients_data:
        logger.error("O1: Missing goals or ingredient data")
        message = "Choice generation requires goals and ingredients"
        state.errors.append(message)
        return {
            "errors": state.errors,
            "current_node": "O1",
            "viable_options": []
        }

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
    - IMPORTANT exactly 9 Steps for completing the project {state.user_constraints.get('storyboard_9_steps', [])}.

    Generate 3 distinct, viable project options that:
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
        response = await production_call_gemini(
            prompt=choice_prompt,
            task_type="creative",
            response_schema=CHOICE_GENERATION_SCHEMA
        )

        if response and not response.get("error"):
            choice_data = response  # Response is already parsed JSON
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
        else:
            error_message = response.get("error", "Unknown error") if response else "No response"
            logger.error(f"O1: AI agent call failed: {error_message}")
            raise Exception(f"AI agent call failed: {error_message}")

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

        # Save fallback choices to Redis
        fallback_choices_data = {
            "viable_options": [fallback_option],
            "generation_metadata": {
                "total_options": 1,
                "generation_strategy": "fallback",
                "material_utilization": 0.5,
                "creativity_score": 0.3
            }
        }
        choices_key = f"choices:{state.thread_id}"
        redis_service.set(choices_key, json.dumps(fallback_choices_data), ex=3600)

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
    
    # Update Redis with current state
    from app.core.redis import redis_service
    state_key = f"workflow_state:{state.thread_id}"
    redis_service.set(state_key, json.dumps({
        "status": "running",
        "current_phase": "goal_formation",
        "current_node": "E1_evaluation",
        "result": {}
    }), ex=3600)

    # Validate inputs
    if not state.viable_options:
        logger.error("E1: No viable options to evaluate")
        message = "Evaluation requires viable options"
        state.errors.append(message)
        return {
            "errors": state.errors,
            "current_node": "E1",
            "current_phase": state.current_phase,
            "evaluated_options": [],
        }

    # Ensure every option has a stable identifier for downstream lookups
    for idx, option in enumerate(state.viable_options, start=1):
        option.setdefault("option_id", f"opt_{idx:02d}")

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
        response = await production_call_gemini(
            prompt=evaluation_prompt,
            task_type="analysis",
            response_schema=EVALUATION_SCHEMA
        )

        if response and not response.get("error"):
            eval_data = response  # Response is already parsed JSON
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
                if opt.get("is_recommended", True) and opt.get("option_id") not in blocked_options
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
        else:
            error_message = response.get("error", "Unknown error") if response else "No response"
            logger.error(f"E1: AI agent call failed: {error_message}")
            raise Exception(f"AI agent call failed: {error_message}")

    except Exception as e:
        logger.error(f"E1: Evaluation failed: {str(e)}")
        state.errors.append(f"Evaluation failed: {str(e)}")

        # Fallback: Select first option with basic scoring
        if state.viable_options:
            state.selected_option = state.viable_options[0]
            state.current_node = "PR1"
            state.current_phase = "concept_generation"

            fallback_evaluated = []
            for idx, option in enumerate(state.viable_options, start=1):
                option_id = option.get("option_id", f"opt_{idx:02d}")
                fallback_evaluated.append({
                    "option_id": option_id,
                    "overall_score": 0.5,
                    "feasibility_score": 0.5,
                    "aesthetic_score": 0.5,
                    "esg_score": 0.5,
                    "safety_score": 0.5,
                    "safety_flags": ["Evaluation fallback used"],
                    "safety_check": True,
                    "ranking": idx,
                })

            # Save fallback evaluation to Redis
            fallback_eval_data = {
                "evaluated_options": fallback_evaluated,
                "safety_assessment": {
                    "has_safety_concerns": False,
                    "blocked_options": [],
                    "warning_count": 0,
                    "fallback_mode": True
                }
            }
            eval_key = f"evaluation:{state.thread_id}"
            redis_service.set(eval_key, json.dumps(fallback_eval_data), ex=3600)

            return {
                "evaluated_options": fallback_evaluated,
                "selected_option": state.selected_option,
                "current_node": "PR1",
                "current_phase": "concept_generation",
            }

    return {
        "evaluated_options": [],
        "selected_option": state.selected_option,
        "current_node": "PR1",
        "current_phase": "concept_generation"
    }


# Routing functions for LangGraph
def should_proceed_to_choices(state: WorkflowState) -> str:
    """Determine if goal formation is complete."""
    # Check for fatal errors that should stop the workflow
    if state.errors and len(state.errors) > 3:
        logger.error(f"Too many errors ({len(state.errors)}), cannot proceed")
        raise Exception(f"Workflow failed: {state.errors[-1]}")
    
    if state.goals and state.artifact_type:
        return "choice_generation"
    
    # If no goals but errors exist, try one more time max
    if state.errors and "No ingredient data" in str(state.errors):
        logger.error("Fatal error: No ingredients available, stopping workflow")
        raise Exception("Cannot proceed without ingredient data")
    
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
