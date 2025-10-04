"""
Enhanced Gemini client with structured output support for LangGraph workflows.
Optimized for AI Recycle-to-Market Generator with response schemas and error handling.
"""
import asyncio
import json
import logging
import time
from copy import deepcopy
from typing import Any, Dict, List, Optional, AsyncIterator
import google.generativeai as genai
from app.core.config import settings
from app.workflows.optimized_state import GeminiModelConfig

logger = logging.getLogger(__name__)


class GeminiStructuredError(Exception):
    """Exception for Gemini structured output errors."""
    pass


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


def _normalize_response_schema(schema: Any) -> Any:
    """Convert list-based type declarations into nullable fields and drop unsupported keywords."""
    if isinstance(schema, dict):
        normalized: Dict[str, Any] = {}
        for key, value in schema.items():
            if key in _UNSUPPORTED_SCHEMA_KEYS:
                continue
            if key == "type" and isinstance(value, list):
                null_types = [t for t in value if isinstance(t, str) and t.lower() == "null"]
                non_null_types = [t for t in value if isinstance(t, str) and t.lower() != "null"]
                if len(non_null_types) == 1 and null_types:
                    normalized["type"] = non_null_types[0]
                    normalized.setdefault("nullable", True)
                    continue

            normalized[key] = _normalize_response_schema(value)
        return normalized

    if isinstance(schema, list):
        return [_normalize_response_schema(item) for item in schema]

    return schema


class GeminiStructuredClient:
    """
    Enhanced Gemini client with structured output support and ML workflow optimization.
    """

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY is required")

        genai.configure(api_key=self.api_key)

        # Default safety settings for recycling content
        self.safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},  # Safety for DIY projects
        ]

        self.retry_config = {
            "max_retries": 3,
            "base_delay": 1.0,
            "max_delay": 10.0,
            "exponential_multiplier": 2.0
        }

        logger.info("Initialized GeminiStructuredClient")

    async def generate_structured(
        self,
        prompt: str,
        response_schema: Any,
        model_config: Optional[GeminiModelConfig] = None,
        system_instruction: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generate structured output using Gemini with response schema.

        Args:
            prompt: The input prompt
            response_schema: JSON schema for structured output
            model_config: Model configuration (temperature, max_tokens, etc.)
            system_instruction: Optional system instruction

        Returns:
            Parsed JSON response matching the schema

        Raises:
            GeminiStructuredError: If generation or parsing fails
        """
        start_time = time.time()

        if not model_config:
            model_config = GeminiModelConfig()

        # Prepare generation config
        generation_config = {
            "temperature": model_config.temperature,
            "max_output_tokens": model_config.max_tokens,
        }

        # Add response schema if structured output is enabled
        if model_config.use_structured_output:
            normalized_schema = _normalize_response_schema(deepcopy(response_schema))
            generation_config["response_mime_type"] = "application/json"
            generation_config["response_schema"] = normalized_schema

        # Prepare model kwargs
        model_kwargs = {
            "model_name": model_config.model_name,
            "generation_config": generation_config,
            "safety_settings": self.safety_settings,
        }

        if system_instruction:
            model_kwargs["system_instruction"] = system_instruction

        for attempt in range(self.retry_config["max_retries"]):
            try:
                # Create model
                model = genai.GenerativeModel(**model_kwargs)

                # Generate content
                if model_config.use_structured_output:
                    # For structured output, use the prompt directly
                    response = await model.generate_content_async(prompt)
                else:
                    # For non-structured output, add JSON formatting instruction
                    structured_prompt = f"""
                    {prompt}

                    Please respond with valid JSON that matches this schema:
                    {json.dumps(response_schema, indent=2)}

                    Response:
                    """
                    response = await model.generate_content_async(structured_prompt)

                # Parse response
                if response.text:
                    try:
                        result = json.loads(response.text)
                        self._validate_response_schema(result, response_schema)

                        duration = time.time() - start_time
                        logger.info(f"Structured generation successful in {duration:.2f}s")

                        return result

                    except json.JSONDecodeError as e:
                        raise GeminiStructuredError(f"Invalid JSON response: {e}")
                    except ValueError as e:
                        raise GeminiStructuredError(f"Schema validation failed: {e}")

                else:
                    raise GeminiStructuredError("Empty response from Gemini")

            except Exception as e:
                if attempt == self.retry_config["max_retries"] - 1:
                    logger.error(f"Structured generation failed after {attempt + 1} attempts: {e}")
                    raise GeminiStructuredError(f"Generation failed: {e}")

                # Calculate delay for retry
                delay = min(
                    self.retry_config["base_delay"] * (self.retry_config["exponential_multiplier"] ** attempt),
                    self.retry_config["max_delay"]
                )

                logger.warning(f"Attempt {attempt + 1} failed: {e}. Retrying in {delay:.1f}s...")
                await asyncio.sleep(delay)

        raise GeminiStructuredError("All retry attempts exhausted")

    async def extract_ingredients_structured(
        self,
        user_input: str,
        existing_ingredients: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        """
        Specialized method for ingredient extraction with optimized schema.
        """
        schema = {
            "type": "object",
            "properties": {
                "ingredients": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": ["string", "null"],
                                "description": "Specific name of the item (e.g., 'soda can', 'plastic bag')"
                            },
                            "material": {
                                "type": ["string", "null"],
                                "description": "Material type (aluminum, plastic, glass, fabric, etc.)"
                            },
                            "size": {
                                "type": ["string", "null"],
                                "description": "Size if mentioned (12oz, large, small, etc.)"
                            },
                            "condition": {
                                "type": ["string", "null"],
                                "description": "Condition if mentioned (empty, clean, used, broken, etc.)"
                            },
                            "confidence": {
                                "type": "number",
                                "minimum": 0,
                                "maximum": 1,
                                "description": "Confidence in extraction accuracy"
                            }
                        },
                        "required": ["name", "material", "confidence"]
                    }
                },
                "overall_confidence": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 1,
                    "description": "Overall confidence in the extraction"
                },
                "extracted_goal": {
                    "type": ["string", "null"],
                    "description": "Goal or desired outcome if mentioned"
                }
            },
            "required": ["ingredients", "overall_confidence"]
        }

        context = ""
        if existing_ingredients:
            context = f"\n\nExisting ingredients context: {json.dumps(existing_ingredients, indent=2)}"

        prompt = f"""
        Analyze this user input for recyclable materials and ingredients: "{user_input}"

        {context}

        Extract all identifiable materials, items, and components that could be used for upcycling or recycling projects.

        Guidelines:
        1. Identify specific items (cans, bottles, containers, bags, etc.)
        2. Determine material types (aluminum, plastic, glass, fabric, metal, etc.)
        3. Note sizes if mentioned (12oz can, large bag, small bottle, etc.)
        4. Note condition if mentioned (empty, clean, used, broken, etc.)
        5. Set confidence based on how explicit the information is
        6. Use null for any field you cannot determine
        7. If a goal or desired outcome is mentioned, include it

        Be thorough but conservative - only extract what you can confidently identify.
        """

        config = GeminiModelConfig.for_extraction()
        return await self.generate_structured(prompt, schema, config)

    async def categorize_ingredients_structured(
        self,
        ingredients: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Specialized method for ingredient categorization.
        """
        schema = {
            "type": "object",
            "properties": {
                "categorized_ingredients": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "index": {"type": "integer", "description": "Original ingredient index"},
                            "category": {
                                "type": "string",
                                "enum": ["container", "fastener", "decorative", "tool", "material", "other"],
                                "description": "Primary category"
                            },
                            "subcategory": {
                                "type": ["string", "null"],
                                "description": "More specific subcategory"
                            },
                            "suitability": {
                                "type": "object",
                                "properties": {
                                    "structural": {"type": "number", "minimum": 0, "maximum": 1},
                                    "decorative": {"type": "number", "minimum": 0, "maximum": 1},
                                    "functional": {"type": "number", "minimum": 0, "maximum": 1}
                                }
                            }
                        },
                        "required": ["index", "category"]
                    }
                },
                "missing_categories": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "enum": ["container", "fastener", "decorative", "tool"]
                    },
                    "description": "Essential categories that are missing"
                },
                "recommendations": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "category": {"type": "string"},
                            "suggestion": {"type": "string"},
                            "reasoning": {"type": "string"}
                        }
                    }
                }
            },
            "required": ["categorized_ingredients", "missing_categories"]
        }

        prompt = f"""
        Categorize these ingredients for an upcycling/recycling project:

        {json.dumps(ingredients, indent=2)}

        Categories:
        - container: Items that can hold or contain (cans, bottles, boxes, jars)
        - fastener: Items for joining/connecting (tape, glue, wire, screws, clips)
        - decorative: Items for aesthetics (paint, stickers, fabric, ribbons)
        - tool: Items for manipulation/crafting (scissors, drill, hammer)
        - material: Raw materials (fabric pieces, metal sheets)
        - other: Items that don't fit other categories

        For each ingredient:
        1. Assign primary category
        2. Suggest subcategory if applicable
        3. Rate suitability for structural/decorative/functional use (0-1)

        Also identify missing essential categories and suggest what might be needed.
        """

        config = GeminiModelConfig.for_evaluation()
        return await self.generate_structured(prompt, schema, config)

    async def generate_clarification_question(
        self,
        ingredient: Dict[str, Any],
        missing_fields: List[str],
        context: Optional[str] = None
    ) -> str:
        """
        Generate a natural clarification question for missing ingredient data.
        """
        schema = {
            "type": "object",
            "properties": {
                "question": {
                    "type": "string",
                    "description": "Natural, conversational question"
                },
                "examples": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Example answers to help the user"
                },
                "priority": {
                    "type": "string",
                    "enum": ["high", "medium", "low"],
                    "description": "Importance of this information"
                }
            },
            "required": ["question", "priority"]
        }

        context_str = f"\nContext: {context}" if context else ""

        prompt = f"""
        Generate a natural, conversational question to gather missing information about this ingredient:

        Ingredient: {json.dumps(ingredient, indent=2)}
        Missing fields: {missing_fields}
        {context_str}

        Create a question that:
        1. Sounds natural and conversational
        2. Focuses on the most important missing field first
        3. Provides helpful examples when appropriate
        4. Is specific enough to get useful information
        5. Doesn't overwhelm the user

        Priority guidelines:
        - high: Critical for safety or feasibility (material type, condition)
        - medium: Important for planning (size, specific name)
        - low: Nice to have (exact dimensions, color)
        """

        config = GeminiModelConfig.for_generation()
        result = await self.generate_structured(prompt, schema, config)
        return result.get("question", "Can you provide more details about this item?")

    def _validate_response_schema(self, response: Dict[str, Any], schema: Dict[str, Any]):
        """
        Basic schema validation for structured responses.
        """
        required_fields = schema.get("required", [])
        for field in required_fields:
            if field not in response:
                raise ValueError(f"Missing required field: {field}")

        # Additional validation could be added here
        # For now, we rely on Gemini's structured output validation

    async def stream_generation(
        self,
        prompt: str,
        model_config: Optional[GeminiModelConfig] = None,
        system_instruction: Optional[str] = None
    ) -> AsyncIterator[str]:
        """
        Stream generation for real-time responses (non-structured).
        """
        if not model_config:
            model_config = GeminiModelConfig.for_generation()

        generation_config = {
            "temperature": model_config.temperature,
            "max_output_tokens": model_config.max_tokens,
        }

        model_kwargs = {
            "model_name": model_config.model_name,
            "generation_config": generation_config,
            "safety_settings": self.safety_settings,
        }

        if system_instruction:
            model_kwargs["system_instruction"] = system_instruction

        try:
            model = genai.GenerativeModel(**model_kwargs)
            response = await model.generate_content_async(prompt, stream=True)

            async for chunk in response:
                if chunk.text:
                    yield chunk.text

        except Exception as e:
            logger.error(f"Streaming generation error: {e}")
            raise GeminiStructuredError(f"Streaming failed: {e}")
