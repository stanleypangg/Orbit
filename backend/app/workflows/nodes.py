"""
LangGraph nodes for the AI Recycle-to-Market Generator workflow.
Implements the progressive ingredient discovery system (P1a → P1b → P1c).
"""
import json
import time
import logging
from typing import Dict, Any, List
import google.generativeai as genai
from app.workflows.state import WorkflowState, IngredientsData, IngredientItem
from app.core.config import settings
from app.core.redis import redis_service
import backoff

logger = logging.getLogger(__name__)

# Gemini client setup
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

# Structured output schema for ingredient extraction
INGREDIENT_SCHEMA = {
    "type": "object",
    "properties": {
        "ingredients": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": ["string", "null"]},
                    "size": {"type": ["string", "null"]},
                    "material": {"type": ["string", "null"]},
                    "category": {"type": ["string", "null"]},
                    "condition": {"type": ["string", "null"]},
                    "confidence": {"type": "number", "minimum": 0, "maximum": 1}
                },
                "required": ["name", "size", "material"]
            }
        },
        "confidence": {"type": "number", "minimum": 0, "maximum": 1},
        "needs_clarification": {"type": "boolean"}
    },
    "required": ["ingredients", "confidence", "needs_clarification"]
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


def save_ingredients_to_redis(thread_id: str, ingredients_data: IngredientsData) -> bool:
    """Save ingredients JSON to Redis with thread_id key."""
    try:
        key = f"ingredients:{thread_id}"
        redis_service.set(key, ingredients_data.to_json(), ex=3600)  # 1 hour TTL
        logger.info(f"Saved ingredients to Redis key: {key}")
        return True
    except Exception as e:
        logger.error(f"Failed to save ingredients to Redis: {str(e)}")
        return False


def load_ingredients_from_redis(thread_id: str) -> IngredientsData:
    """Load ingredients JSON from Redis, return empty if not found."""
    try:
        key = f"ingredients:{thread_id}"
        json_str = redis_service.get(key)
        if json_str:
            logger.info(f"Loaded ingredients from Redis key: {key}")
            return IngredientsData.from_json(json_str)
    except Exception as e:
        logger.error(f"Failed to load ingredients from Redis: {str(e)}")

    # Return empty ingredients data if not found or error
    return IngredientsData()


async def ingredient_extraction_node(state: WorkflowState) -> Dict[str, Any]:
    """
    P1a Node: Initial ingredient extraction from user input.
    Uses Gemini 2.5 Flash for fast, structured parsing.
    """
    logger.info(f"P1a: Starting ingredient extraction for thread {state.thread_id}")

    # Build extraction prompt
    extraction_prompt = f"""
    You are an expert at identifying recyclable materials and waste items from descriptions.

    User input: "{state.user_input}"

    Extract all the recyclable materials, waste items, or objects mentioned. For each item:
    - name: The specific item (e.g., "Coca-Cola can", "plastic shopping bag")
    - size: The size or quantity if mentioned (e.g., "12oz", "large", "2 pieces")
    - material: The primary material (e.g., "aluminum", "plastic", "glass", "paper")
    - category: The type of item (e.g., "beverage_container", "packaging", "electronics")
    - condition: The state of the item (e.g., "empty", "clean", "damaged")
    - confidence: Your confidence in this extraction (0.0 to 1.0)

    If information is not explicitly provided, set the field to null.
    Set needs_clarification to true if critical information is missing.

    Be specific and extract every distinct item mentioned.
    """

    try:
        # Call Gemini 2.5 Flash for fast extraction
        response = await call_gemini_with_retry(
            model_name="gemini-2.5-flash",
            prompt=extraction_prompt,
            generation_config={
                "response_schema": INGREDIENT_SCHEMA,
                "temperature": 0.1  # Low for consistent parsing
            }
        )

        # Parse response
        if response.text:
            result_data = json.loads(response.text)

            # Create ingredients data
            ingredients_data = IngredientsData(
                ingredients=[IngredientItem(**item) for item in result_data["ingredients"]],
                confidence=result_data["confidence"],
                needs_clarification=result_data["needs_clarification"]
            )

            # Save to Redis
            save_ingredients_to_redis(state.thread_id, ingredients_data)

            # Update state
            state.ingredients_data = ingredients_data
            state.current_node = "P1b"

            logger.info(f"P1a: Extracted {len(ingredients_data.ingredients)} ingredients")
            return {"ingredients_data": ingredients_data, "current_node": "P1b"}

    except Exception as e:
        logger.error(f"P1a: Extraction failed: {str(e)}")
        state.errors.append(f"Ingredient extraction failed: {str(e)}")

        # Fallback: Create minimal ingredient data
        fallback_data = IngredientsData(
            ingredients=[IngredientItem(name=state.user_input, confidence=0.3)],
            confidence=0.3,
            needs_clarification=True
        )
        state.ingredients_data = fallback_data
        save_ingredients_to_redis(state.thread_id, fallback_data)

    return {"current_node": "P1b"}


async def null_checker_node(state: WorkflowState) -> Dict[str, Any]:
    """
    P1b Node: Check for null fields and generate targeted questions.
    Uses Gemini 2.5 Flash for quick question generation.
    """
    logger.info(f"P1b: Checking for null fields in thread {state.thread_id}")

    # Load current ingredients from Redis
    ingredients_data = load_ingredients_from_redis(state.thread_id)
    if not ingredients_data.ingredients:
        # If no ingredients, try to use state data
        ingredients_data = state.ingredients_data or IngredientsData()

    # Check for incomplete ingredients
    incomplete_ingredients = [
        ingredient for ingredient in ingredients_data.ingredients
        if ingredient.has_null_fields()
    ]

    if not incomplete_ingredients:
        # All ingredients are complete, move to categorization
        logger.info("P1b: All ingredients complete, moving to P1c")
        state.current_node = "P1c"
        return {"current_node": "P1c"}

    # Generate targeted questions for missing information
    questions = []
    for ingredient in incomplete_ingredients[:2]:  # Limit to 2 ingredients at a time
        null_fields = ingredient.get_null_fields()

        if null_fields:
            question_prompt = f"""
            Generate a single, specific question to ask the user about missing information for this item:

            Item: {ingredient.name or "unknown item"}
            Missing information: {', '.join(null_fields)}

            Ask for the most critical missing piece of information. Be conversational and specific.
            For example:
            - If missing size: "What size is the [item]?"
            - If missing material: "What material is the [item] made of?"
            - If missing name: "Can you describe the [category] item more specifically?"

            Generate only the question, no additional text.
            """

            try:
                response = await call_gemini_with_retry(
                    model_name="gemini-2.5-flash",
                    prompt=question_prompt,
                    generation_config={
                        "temperature": 0.3,
                        "max_output_tokens": 100
                    }
                )

                if response.text:
                    questions.append(response.text.strip())

            except Exception as e:
                logger.error(f"P1b: Question generation failed: {str(e)}")
                # Fallback question
                questions.append(f"Can you provide more details about the {ingredient.name or 'item'}?")

    # Update state with questions
    if questions:
        # Take only the first question for better UX
        state.add_user_question(questions[0])
        ingredients_data.clarification_questions = questions
        ingredients_data.needs_clarification = True

        # Save updated data
        save_ingredients_to_redis(state.thread_id, ingredients_data)
        state.ingredients_data = ingredients_data

        logger.info(f"P1b: Generated {len(questions)} clarification questions")
        return {
            "needs_user_input": True,
            "user_questions": questions,
            "current_node": "P1b"  # Stay in P1b until questions answered
        }

    # No questions generated, move to categorization
    state.current_node = "P1c"
    return {"current_node": "P1c"}


async def ingredient_categorizer_node(state: WorkflowState) -> Dict[str, Any]:
    """
    P1c Node: Categorize and finalize ingredient discovery.
    Uses Gemini 2.5 Flash for pattern recognition and categorization.
    """
    logger.info(f"P1c: Categorizing ingredients for thread {state.thread_id}")

    # Load current ingredients from Redis
    ingredients_data = load_ingredients_from_redis(state.thread_id)
    if not ingredients_data.ingredients:
        ingredients_data = state.ingredients_data or IngredientsData()

    # Build categorization prompt
    ingredients_list = []
    for ingredient in ingredients_data.ingredients:
        ingredients_list.append({
            "name": ingredient.name,
            "size": ingredient.size,
            "material": ingredient.material,
            "category": ingredient.category,
            "condition": ingredient.condition
        })

    categorization_prompt = f"""
    You are an expert in recycling and upcycling materials. Categorize and finalize this list of ingredients:

    Current ingredients: {json.dumps(ingredients_list, indent=2)}

    For each ingredient:
    1. Ensure the category is accurate (beverage_container, packaging, electronics, textiles, etc.)
    2. Verify material classification is correct
    3. Check if any ingredients should be merged (e.g., multiple plastic bottles)
    4. Rate overall recyclability potential (0.0 to 1.0)

    Also determine if this collection is suitable for upcycling projects:
    - Are there enough materials for a meaningful project?
    - Do the materials work well together?
    - Is the condition suitable for crafting?

    Return the finalized ingredients list with improved categorization and a final assessment.
    """

    try:
        # Enhanced schema for categorization
        categorization_schema = {
            "type": "object",
            "properties": {
                "ingredients": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "size": {"type": "string"},
                            "material": {"type": "string"},
                            "category": {"type": "string"},
                            "condition": {"type": "string"},
                            "recyclability": {"type": "number", "minimum": 0, "maximum": 1},
                            "upcycling_potential": {"type": "number", "minimum": 0, "maximum": 1}
                        },
                        "required": ["name", "material", "category"]
                    }
                },
                "overall_assessment": {
                    "type": "object",
                    "properties": {
                        "suitable_for_upcycling": {"type": "boolean"},
                        "material_synergy": {"type": "number", "minimum": 0, "maximum": 1},
                        "project_complexity": {"type": "string", "enum": ["simple", "moderate", "complex"]},
                        "recommended_project_types": {"type": "array", "items": {"type": "string"}}
                    }
                },
                "discovery_complete": {"type": "boolean"}
            }
        }

        response = await call_gemini_with_retry(
            model_name="gemini-2.5-flash",
            prompt=categorization_prompt,
            generation_config={
                "response_schema": categorization_schema,
                "temperature": 0.1
            }
        )

        if response.text:
            result_data = json.loads(response.text)

            # Update ingredients with categorization results
            updated_ingredients = []
            for item_data in result_data["ingredients"]:
                ingredient = IngredientItem(
                    name=item_data.get("name"),
                    size=item_data.get("size", "unknown"),
                    material=item_data.get("material"),
                    category=item_data.get("category"),
                    condition=item_data.get("condition", "unknown"),
                    confidence=max(item_data.get("recyclability", 0.5),
                                 item_data.get("upcycling_potential", 0.5))
                )
                updated_ingredients.append(ingredient)

            # Update ingredients data
            ingredients_data.ingredients = updated_ingredients
            ingredients_data.confidence = 0.9  # High confidence after categorization
            ingredients_data.needs_clarification = False
            ingredients_data.clarification_questions = []

            # Save final ingredients to Redis
            save_ingredients_to_redis(state.thread_id, ingredients_data)

            # Update state
            state.ingredients_data = ingredients_data
            state.extraction_complete = True
            state.current_node = "G1"  # Move to goal formation
            state.current_phase = "goal_formation"

            # Store assessment data for later use
            assessment = result_data.get("overall_assessment", {})
            state.user_constraints.update({
                "material_synergy": assessment.get("material_synergy", 0.5),
                "project_complexity": assessment.get("project_complexity", "moderate"),
                "recommended_types": assessment.get("recommended_project_types", [])
            })

            logger.info(f"P1c: Categorization complete, {len(updated_ingredients)} ingredients finalized")
            return {
                "extraction_complete": True,
                "current_node": "G1",
                "current_phase": "goal_formation",
                "ingredients_data": ingredients_data
            }

    except Exception as e:
        logger.error(f"P1c: Categorization failed: {str(e)}")
        state.errors.append(f"Categorization failed: {str(e)}")

        # Mark as complete anyway with current data
        state.extraction_complete = True
        state.current_node = "G1"
        state.current_phase = "goal_formation"

    return {
        "extraction_complete": True,
        "current_node": "G1",
        "current_phase": "goal_formation"
    }


async def process_user_clarification(state: WorkflowState, user_response: str) -> Dict[str, Any]:
    """
    Process user clarification response and update ingredients.
    This function is called when user answers questions from P1b.
    """
    logger.info(f"Processing user clarification for thread {state.thread_id}")

    # Load current ingredients from Redis
    ingredients_data = load_ingredients_from_redis(state.thread_id)

    # Use Gemini to parse the user response and update ingredients
    update_prompt = f"""
    The user provided this clarification: "{user_response}"

    Current ingredients with missing information:
    {json.dumps([ing.model_dump() for ing in ingredients_data.ingredients], indent=2)}

    Update the ingredients based on the user's response. Fill in any null fields that the user provided information about.
    The user's response should be used to complete missing name, size, material, category, or condition fields.

    Return the updated ingredients list with the new information filled in.
    """

    try:
        response = await call_gemini_with_retry(
            model_name="gemini-2.5-flash",
            prompt=update_prompt,
            generation_config={
                "response_schema": INGREDIENT_SCHEMA,
                "temperature": 0.1
            }
        )

        if response.text:
            result_data = json.loads(response.text)

            # Update ingredients data
            ingredients_data.ingredients = [IngredientItem(**item) for item in result_data["ingredients"]]
            ingredients_data.confidence = max(ingredients_data.confidence, result_data.get("confidence", 0.7))
            ingredients_data.needs_clarification = result_data.get("needs_clarification", False)

            # Save updated data
            save_ingredients_to_redis(state.thread_id, ingredients_data)
            state.ingredients_data = ingredients_data

            # Clear user questions since they've been answered
            state.clear_user_questions()

            logger.info("User clarification processed successfully")
            return {"ingredients_data": ingredients_data, "needs_user_input": False}

    except Exception as e:
        logger.error(f"Failed to process user clarification: {str(e)}")
        state.errors.append(f"Clarification processing failed: {str(e)}")

    # Clear questions anyway to avoid getting stuck
    state.clear_user_questions()
    return {"needs_user_input": False}


# Node routing functions for LangGraph
def should_ask_questions(state: WorkflowState) -> str:
    """Determine if we need to ask user questions or continue to categorization."""
    if state.needs_user_input and state.user_questions:
        return "ask_user"
    return "categorize"


def should_continue_discovery(state: WorkflowState) -> str:
    """Determine if ingredient discovery is complete."""
    if state.extraction_complete:
        return "goal_formation"
    if state.needs_user_input:
        return "null_check"
    return "categorize"