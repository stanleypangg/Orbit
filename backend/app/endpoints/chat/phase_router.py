"""
Phase 1 and Phase 2 endpoints for the upcycling chatbot workflow.
Handles structured JSON responses for material extraction, idea generation,
and imaging brief creation.
"""
import json
import logging
import uuid
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.core.config import settings
from app.integrations.gemini_structured import GeminiStructuredClient
from app.workflows.optimized_state import GeminiModelConfig

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/chat", tags=["chat-phases"])

# Constants
DEFAULT_MODEL = "gemini-2.0-flash-exp"
IMAGE_MODEL = "gemini-2.5-flash-image"

# Initialize structured client
structured_client: Optional[GeminiStructuredClient] = None


def get_structured_client() -> GeminiStructuredClient:
    """Get or create GeminiStructuredClient instance."""
    global structured_client
    if structured_client is None:
        try:
            structured_client = GeminiStructuredClient()
        except ValueError as e:
            logger.error(f"Failed to initialize GeminiStructuredClient: {e}")
            raise HTTPException(
                status_code=500,
                detail="Server configuration error: Gemini API key not configured"
            )
    return structured_client


# ---------------
# Phase 1 Schemas (Requirements Loop)
# ---------------

# Base ingredient schema
INGREDIENT_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "name": {"type": "string"},
            "size": {"type": "string"},
            "material": {"type": "string"},
            "category": {"type": "string"},
            "condition": {"type": "string"},
            "confidence": {"type": "number"}
        },
        "required": ["name", "material"]
    }
}

# Requirements wrapper (Phase 1 exchange)
REQUIREMENTS_SCHEMA = {
    "type": "object",
    "properties": {
        "ingredients": INGREDIENT_SCHEMA,
        "confidence": {"type": "number", "minimum": 0, "maximum": 1},
        "needs_clarification": {"type": "boolean"},
        "clarifying_questions": {
            "type": "array",
            "items": {"type": "string"}
        },
        "assumptions": {
            "type": "array",
            "items": {"type": "string"}
        }
    },
    "required": ["ingredients", "confidence", "needs_clarification"]
}

REQUIREMENTS_SYSTEM_PROMPT = """
You extract DIY requirements and fill a standardized ingredients schema.
Output ONLY valid JSON that matches the provided responseSchema.

Rules:
1) Populate "ingredients" from user text. Keep strings short and literal.
2) If any essential field is unknown:
   - If it is safe to infer and confidence ≥ 0.6, fill it and add a plain-language entry to "assumptions".
   - If it is safety-related or confidence < 0.6, set "needs_clarification": true and include up to 3 concise "clarifying_questions".
3) Set an overall "confidence" in [0,1].
4) No commentary outside fields.
""".strip()

# ---------------
# Ideation Schemas (Phase 2 Drafts)
# ---------------

IDEATION_DRAFTS_SCHEMA = {
    "type": "object",
    "properties": {
        "drafts": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "string"},
                    "name": {"type": "string"},
                    "one_liner": {"type": "string"},
                    "assumptions": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                },
                "required": ["id", "name", "one_liner"]
            },
            "minItems": 3,
            "maxItems": 3
        },
        "imaging_briefs": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "draft_id": {"type": "string"},
                    "prompt": {"type": "string"},
                    "negative_prompt": {"type": "string"},
                    "render": {
                        "type": "object",
                        "properties": {
                            "count": {"type": "integer", "minimum": 1, "maximum": 1},
                            "aspect_ratio": {"type": "string", "enum": ["1:1", "4:3", "16:9"]}
                        },
                        "required": ["count", "aspect_ratio"]
                    },
                    "notes": {"type": "string"}
                },
                "required": ["draft_id", "prompt", "render"]
            },
            "minItems": 3,
            "maxItems": 3
        }
    },
    "required": ["drafts", "imaging_briefs"]
}

IDEATION_SYSTEM_PROMPT = """
You propose 3 distinct DIY ideas and return general, less-refined imaging briefs for each. Output ONLY valid JSON.

Rules:
1) Ideas must be materially faithful to PROJECT_CONTEXT.ingredients.
2) Return:
   {
     "drafts": [{ "id","name","one_liner","assumptions":[] }, x3],
     "imaging_briefs": [{
       "draft_id","prompt","negative_prompt",
       "render":{"count":1,"aspect_ratio":"1:1"},
       "notes":"why this view helps"
     }, x3]
   }
3) Keep prompts general and literal. Do not over-style. These are visual aids.
4) No commentary outside JSON.
""".strip()

# ---------------
# Refined Imaging Brief Schema (Post-Selection)
# ---------------

REFINED_BRIEF_SCHEMA = {
    "type": "object",
    "properties": {
        "idea_id": {"type": "string"},
        "prompt": {"type": "string"},
        "negative_prompt": {"type": "string"},
        "camera": {
            "type": "object",
            "properties": {
                "view": {"type": "string", "enum": ["front", "three-quarter", "top", "detail"]}
            },
            "required": ["view"]
        },
        "lighting": {"type": "string"},
        "background": {"type": "string"},
        "render": {
            "type": "object",
            "properties": {
                "count": {"type": "integer", "minimum": 1, "maximum": 1},
                "aspect_ratio": {"type": "string"},
                "image_size": {"type": "string"},
                "seed": {"type": ["integer", "null"]}
            },
            "required": ["count", "aspect_ratio", "image_size"]
        },
        "acceptance_criteria": {
            "type": "array",
            "items": {"type": "string"}
        }
    },
    "required": ["idea_id", "prompt", "camera", "render"]
}

REFINED_BRIEF_SYSTEM_PROMPT = """
You create ONE refined brief for the selected idea. Output ONLY valid JSON.

Rules:
1) Use PROJECT_CONTEXT (including chosen_idea) to produce a crisp, reproducible prompt that matches the materials.
2) Provide camera, lighting, background, render, and acceptance_criteria as short fields.
3) Keep seed null unless reproducibility is requested.
""".strip()

# ---------------
# Legacy Phase 1 Schema (for backward compatibility)
# ---------------

PHASE1_SCHEMA = {
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
                    "confidence": {"type": "number"}
                },
                "required": ["name", "material"]
            }
        },
        "confidence": {"type": "number"},
        "needs_clarification": {"type": "boolean"},
        "clarifying_questions": {
            "type": "array",
            "items": {"type": "string"}
        },
        "ideas": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "string"},
                    "title": {"type": "string"},
                    "one_liner": {"type": "string"}
                },
                "required": ["id", "title", "one_liner"]
            }
        }
    },
    "required": ["ingredients", "confidence", "needs_clarification", "ideas"]
}

PHASE1_SYSTEM_PROMPT = """
You extract DIY upcycling requirements and propose ideas.
Output ONLY valid JSON that follows the provided responseSchema.

Rules:
1) Populate "ingredients" from the user's materials using short, literal strings.
2) Set an overall "confidence" in [0,1]. If any essential field is < 0.6 confidence, set "needs_clarification": true and propose up to 3 concise "clarifying_questions".
3) Propose 3-5 distinct "ideas" with id, title, and a one-liner. Do not include step-by-step instructions here.
4) Prefer common tools/materials when unspecified. Do not include unsafe actions.
5) No commentary outside JSON fields.
""".strip()

# ---------------
# Phase 2 Schemas
# ---------------

IMAGING_BRIEF_SCHEMA = {
    "type": "object",
    "properties": {
        "idea_id": {"type": "string"},
        "prompt": {"type": "string"},
        "negative_prompt": {"type": "string"},
        "camera": {
            "type": "object",
            "properties": {
                "view": {"type": "string"},
                "focal_length_mm": {"type": "number"},
                "aperture_f": {"type": "number"},
                "distance_m": {"type": "number"}
            }
        },
        "lighting": {"type": "string"},
        "background": {"type": "string"},
        "constraints": {
            "type": "object",
            "properties": {
                "materials_must_match": {"type": "boolean"},
                "show_construction_details": {"type": "boolean"},
                "show_scale_reference": {"type": "boolean"}
            }
        },
        "render": {
            "type": "object",
            "properties": {
                "aspect_ratio": {"type": "string"},
                "image_size": {"type": "string"},
                "count": {"type": "integer"},
                "seed": {"type": "integer"}
            }
        },
        "acceptance_criteria": {"type": "array", "items": {"type": "string"}},
        "assumptions": {"type": "array", "items": {"type": "string"}},
        "needs_clarification": {"type": "boolean"},
        "clarifying_questions": {"type": "array", "items": {"type": "string"}}
    },
    "required": ["idea_id", "prompt", "render"]
}

PHASE2_SYSTEM_PROMPT = """
You are a rendering director. Output ONLY valid JSON that follows the responseSchema.

Input: chosen idea, ingredients, user tweaks, and optional prior feedback.
Tasks:
1) Produce an "Imaging Brief" that can be sent directly to the image model.
2) If any critical visual detail is ambiguous, set "needs_clarification": true and propose up to 3 "clarifying_questions".
3) Keep "prompt" concise and literal. Avoid commentary.
4) If feedback is provided, revise the brief to address it while staying faithful to the materials and chosen idea.
5) Keep or change "seed" only if the user requests reproducibility or variation, respectively.
""".strip()

# ---------------
# Request Models
# ---------------


class RequirementsRequest(BaseModel):
    """Requirements loop request (Phase 1)."""
    text: str = Field(..., description="User's description of materials or answers")
    clarifications: Optional[Dict[str, str]] = Field(
        None, description="Answers to previous clarifying questions"
    )
    project_context: Optional[Dict[str, Any]] = Field(
        None, description="Existing project context"
    )


class IdeationRequest(BaseModel):
    """Ideation drafts request (Phase 2)."""
    ingredients: List[Dict[str, Any]] = Field(..., description="Finalized ingredients")
    assumptions: List[str] = Field(default_factory=list, description="Accumulated assumptions")
    confidence: float = Field(..., description="Overall confidence")


class SelectIdeaRequest(BaseModel):
    """Idea selection request."""
    idea_id: str = Field(..., description="Selected idea ID")
    idea_name: str = Field(..., description="Idea name")
    one_liner: str = Field(..., description="Idea one-liner")
    ingredients: List[Dict[str, Any]] = Field(..., description="Project ingredients")
    assumptions: List[str] = Field(default_factory=list, description="Accumulated assumptions")


class Phase1Request(BaseModel):
    """DEPRECATED: Legacy Phase 1 request for material extraction and idea generation."""
    text: str = Field(..., description="User's description of materials")
    existing_ingredients: Optional[List[Dict[str, Any]]] = Field(
        None, description="Optional existing ingredients from previous turns"
    )


class Phase2Request(BaseModel):
    """Phase 2 request for imaging brief generation."""
    ideaId: str = Field(..., alias="ideaId")
    ingredients: List[Dict[str, Any]]
    tweaks: Optional[Dict[str, Any]] = None
    previousBrief: Optional[Dict[str, Any]] = Field(None, alias="previousBrief")
    feedback: Optional[Dict[str, Any]] = None

    class Config:
        populate_by_name = True


# ---------------
# Helper Functions
# ---------------

def generate_image_placeholder(prompt: str, negative_prompt: str = "") -> Dict[str, Any]:
    """
    Generate a placeholder for image generation.
    TODO: Implement actual Gemini Nano Banana (gemini-2.5-flash-image) integration.
    Returns a dict with url, seed, and metadata.
    
    Args:
        prompt: The image generation prompt
        negative_prompt: Things to avoid in the image (not used in placeholder)
    """
    try:
        # For now, return placeholder
        # In production, this would call Gemini image generation API with both prompts
        logger.info(f"Image generation placeholder for: {prompt[:50]}...")
        if negative_prompt:
            logger.debug(f"Negative prompt (not used in placeholder): {negative_prompt[:50]}")
        
        return {
            "url": f"https://via.placeholder.com/512x512.png?text={prompt[:30].replace(' ', '+')}",
            "seed": None,
            "metadata": {"model": IMAGE_MODEL, "prompt": prompt, "status": "placeholder"}
        }
        
    except Exception as e:
        logger.error(f"Image generation failed: {e}")
        return {
            "url": "https://via.placeholder.com/512x512.png?text=Error",
            "seed": None,
            "error": str(e)
        }


def validate_and_repair_json(json_str: str, schema: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Validate JSON against schema and attempt one repair if invalid.
    Returns None if validation/repair fails.
    """
    try:
        data = json.loads(json_str)
        # Basic validation - check required fields
        required = schema.get("required", [])
        for field in required:
            if field not in data:
                return None
        return data
    except json.JSONDecodeError:
        return None


# ---------------
# Endpoints
# ---------------


@router.post("/requirements")
async def requirements_loop(request: RequirementsRequest):
    """
    POST /api/chat/requirements
    
    Requirements loop with clarify-or-assume logic.
    Handles clarification cycles and builds PROJECT_CONTEXT.
    
    Request body:
    {
        "text": "I have 3 plastic bottles",
        "clarifications": {"What size?": "500ml"},
        "project_context": {...}
    }
    
    Response: JSON matching REQUIREMENTS_SCHEMA
    """
    request_id = str(uuid.uuid4())
    
    try:
        logger.info(f"[{request_id}] Requirements request: {request.text[:100]}...")
        
        client = get_structured_client()
        
        # Build prompt with context
        prompt_parts = [
            f"User input: {request.text}"
        ]
        
        if request.clarifications:
            prompt_parts.append(f"\nUser answered these questions: {json.dumps(request.clarifications, indent=2)}")
        
        if request.project_context:
            ctx = request.project_context
            if ctx.get("assumptions"):
                prompt_parts.append(f"\nExisting assumptions: {json.dumps(ctx['assumptions'], indent=2)}")
            if ctx.get("clarifications"):
                prompt_parts.append(f"\nPrevious clarifications: {json.dumps(ctx['clarifications'], indent=2)}")
        
        prompt = "\n".join(prompt_parts)
        
        # Configure model for structured output
        config = GeminiModelConfig(
            model_name=DEFAULT_MODEL,
            temperature=0.0,
            max_tokens=2048,
            use_structured_output=True
        )
        
        # Generate structured response
        result = await client.generate_structured(
            prompt=prompt,
            response_schema=REQUIREMENTS_SCHEMA,
            model_config=config,
            system_instruction=REQUIREMENTS_SYSTEM_PROMPT
        )
        
        # Validate result
        if not result:
            # Attempt repair
            logger.warning(f"[{request_id}] Initial parse failed, attempting repair")
            # For now, raise error if repair is needed
            raise HTTPException(status_code=500, detail="Could not parse requirements. Please rephrase.")
        
        logger.info(f"[{request_id}] Requirements completed: confidence={result.get('confidence')}, needs_clarification={result.get('needs_clarification')}")
        
        return result
        
    except Exception as e:
        logger.error(f"[{request_id}] Requirements loop failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Requirements processing failed: {str(e)}"
        )


@router.post("/ideation-drafts")
async def ideation_drafts(request: IdeationRequest):
    """
    POST /api/chat/ideation-drafts
    
    Generate 3 ideation drafts with general images.
    
    Request body:
    {
        "ingredients": [...],
        "assumptions": [...],
        "confidence": 0.8
    }
    
    Response: JSON with drafts array (each with draft_image)
    """
    request_id = str(uuid.uuid4())
    
    try:
        logger.info(f"[{request_id}] Ideation drafts request with {len(request.ingredients)} ingredients")
        
        client = get_structured_client()
        
        # Build PROJECT_CONTEXT for prompt
        context = {
            "ingredients": request.ingredients,
            "assumptions": request.assumptions,
            "confidence": request.confidence
        }
        
        prompt = f"""
        PROJECT_CONTEXT:
        {json.dumps(context, indent=2)}
        
        Generate 3 distinct, creative upcycling ideas using these materials.
        Each idea should be materially faithful and practical.
        """
        
        # Configure model for structured output
        config = GeminiModelConfig(
            model_name="gemini-2.0-flash-exp",
            temperature=0.7,  # Higher for creativity
            max_tokens=2048,
            use_structured_output=True
        )
        
        # Generate ideation drafts
        result = await client.generate_structured(
            prompt=prompt,
            response_schema=IDEATION_DRAFTS_SCHEMA,
            model_config=config,
            system_instruction=IDEATION_SYSTEM_PROMPT
        )
        
        # Generate images for each draft
        drafts_with_images = []
        for i, draft in enumerate(result.get("drafts", [])):
            # Find corresponding imaging brief
            brief = next((b for b in result.get("imaging_briefs", []) if b["draft_id"] == draft["id"]), None)
            
            if brief:
                # Generate general image
                image_data = generate_image_placeholder(
                    brief["prompt"],
                    brief.get("negative_prompt", "")
                )
                
                draft["draft_image"] = {
                    "url": image_data["url"],
                    "seed": image_data.get("seed"),
                    "notes": brief.get("notes", "")
                }
            else:
                draft["draft_image"] = {
                    "url": "https://via.placeholder.com/512x512.png?text=No+Image",
                    "seed": None,
                    "notes": ""
                }
            
            drafts_with_images.append(draft)
        
        logger.info(f"[{request_id}] Generated {len(drafts_with_images)} ideation drafts with images")
        
        return {"drafts": drafts_with_images}
        
    except Exception as e:
        logger.error(f"[{request_id}] Ideation drafts failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Ideation drafts failed: {str(e)}"
        )


@router.post("/select-idea")
async def select_idea(request: SelectIdeaRequest):
    """
    POST /api/chat/select-idea
    
    Handle idea selection and generate refined image.
    
    Request body:
    {
        "idea_id": "idea-1",
        "idea_name": "Bottle Planter",
        "one_liner": "Turn bottles into hanging planters",
        "ingredients": [...],
        "assumptions": [...]
    }
    
    Response: { "refined_image_url": "...", "brief": {...} }
    """
    request_id = str(uuid.uuid4())
    
    try:
        logger.info(f"[{request_id}] Idea selection: {request.idea_name}")
        
        client = get_structured_client()
        
        # Build PROJECT_CONTEXT with chosen idea
        context = {
            "ingredients": request.ingredients,
            "assumptions": request.assumptions,
            "chosen_idea": {
                "id": request.idea_id,
                "name": request.idea_name,
                "short_scope": request.one_liner,
                "end_product_description": f"A {request.idea_name} made from {len(request.ingredients)} upcycled materials"
            }
        }
        
        prompt = f"""
        PROJECT_CONTEXT:
        {json.dumps(context, indent=2)}
        
        Create a refined imaging brief for this selected idea.
        The brief should produce a crisp, reproducible image that showcases the final product.
        """
        
        # Configure model for structured output
        config = GeminiModelConfig(
            model_name=DEFAULT_MODEL,
            temperature=0.0,
            max_tokens=2048,
            use_structured_output=True
        )
        
        # Generate refined brief
        brief = await client.generate_structured(
            prompt=prompt,
            response_schema=REFINED_BRIEF_SCHEMA,
            model_config=config,
            system_instruction=REFINED_BRIEF_SYSTEM_PROMPT
        )
        
        # Generate refined image
        image_data = generate_image_placeholder(
            brief["prompt"],
            brief.get("negative_prompt", "")
        )
        
        logger.info(f"[{request_id}] Selection complete with refined image")
        
        return {
            "refined_image_url": image_data["url"],
            "brief": brief,
            "context_summary": context["chosen_idea"]
        }
        
    except Exception as e:
        logger.error(f"[{request_id}] Idea selection failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Idea selection failed: {str(e)}"
        )


@router.post("/phase1")
async def phase1(request: Phase1Request):
    """
    POST /api/chat/phase1
    
    Extract materials and generate upcycling ideas.
    
    Request body:
    {
        "text": "I have 3 plastic bottles and some aluminum cans",
        "existing_ingredients": [...] (optional)
    }
    
    Response: JSON matching PHASE1_SCHEMA
    """
    request_id = str(uuid.uuid4())
    
    try:
        logger.info(f"[{request_id}] Phase 1 request: {request.text[:100]}...")
        
        # Debug: Log schema structure
        logger.debug(f"[{request_id}] PHASE1_SCHEMA type: {type(PHASE1_SCHEMA)}")
        logger.debug(f"[{request_id}] PHASE1_SCHEMA keys: {list(PHASE1_SCHEMA.keys())}")
        logger.debug(f"[{request_id}] PHASE1_SCHEMA required: {PHASE1_SCHEMA.get('required', [])}")
        logger.debug(f"[{request_id}] PHASE1_SCHEMA properties keys: {list(PHASE1_SCHEMA.get('properties', {}).keys())}")
        
        # Debug: Check for unhashable types in schema
        try:
            json.dumps(PHASE1_SCHEMA, indent=2)
            logger.debug(f"[{request_id}] Schema is JSON-serializable ✓")
        except Exception as schema_err:
            logger.error(f"[{request_id}] Schema serialization error: {schema_err}")
            logger.error(f"[{request_id}] Problematic schema: {PHASE1_SCHEMA}")
        
        client = get_structured_client()
        
        # Prepare prompt
        context = ""
        if request.existing_ingredients:
            context = f"\n\nExisting ingredients context: {json.dumps(request.existing_ingredients, indent=2)}"
            logger.debug(f"[{request_id}] Context includes {len(request.existing_ingredients)} existing ingredients")
        
        prompt = f"""
        Analyze this user input for recyclable materials and upcycling project ideas: "{request.text}"
        
        {context}
        
        Extract all identifiable materials, items, and components. Then propose 3-5 creative upcycling project ideas using these materials.
        
        Guidelines:
        1. Identify specific items (cans, bottles, containers, bags, etc.)
        2. Determine material types (aluminum, plastic, glass, fabric, metal, etc.)
        3. Note sizes if mentioned (12oz can, large bag, small bottle, etc.)
        4. Note condition if mentioned (empty, clean, used, broken, etc.)
        5. Set confidence based on how explicit the information is
        6. Use null for any field you cannot determine
        7. If critical information is missing or confidence is low, set needs_clarification=true and add clarifying_questions
        8. Propose 3-5 distinct, creative project ideas with unique IDs, titles, and one-liners
        9. Ensure ideas are safe, practical, and use the identified materials
        
        Be thorough but conservative - only extract what you can confidently identify.
        """.strip()
        
        # Configure model for structured output
        config = GeminiModelConfig(
            model_name=DEFAULT_MODEL,
            temperature=0.0,
            max_tokens=2048,
            use_structured_output=True
        )
        
        logger.debug(f"[{request_id}] Model config: model={config.model_name}, temp={config.temperature}, structured={config.use_structured_output}")
        
        # Generate structured response
        logger.info(f"[{request_id}] Calling Gemini generate_structured...")
        result = await client.generate_structured(
            prompt=prompt,
            response_schema=PHASE1_SCHEMA,
            model_config=config,
            system_instruction=PHASE1_SYSTEM_PROMPT
        )
        
        logger.info(f"[{request_id}] Phase 1 completed: {len(result.get('ideas', []))} ideas generated")
        
        return result
        
    except Exception as e:
        logger.error(f"[{request_id}] Phase 1 failed: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Phase 1 processing failed: {str(e)}"
        )


@router.post("/phase2")
async def phase2(request: Phase2Request):
    """
    POST /api/chat/phase2
    
    Generate imaging brief for selected idea.
    
    Request body:
    {
        "ideaId": "idea-1",
        "ingredients": [...],
        "tweaks": {...} (optional),
        "previousBrief": {...} (optional),
        "feedback": {...} (optional)
    }
    
    Response: JSON matching IMAGING_BRIEF_SCHEMA
    """
    request_id = str(uuid.uuid4())
    
    try:
        logger.info(f"[{request_id}] Phase 2 request for idea: {request.ideaId}")
        
        client = get_structured_client()
        
        # Prepare prompt
        prompt_parts = [
            "Generate an imaging brief for this upcycling project:",
            f"Idea ID: {request.ideaId}",
            f"Materials: {json.dumps(request.ingredients, indent=2)}"
        ]
        
        if request.tweaks:
            prompt_parts.append(f"User adjustments: {json.dumps(request.tweaks, indent=2)}")
        
        if request.previousBrief:
            prompt_parts.append(f"Previous brief: {json.dumps(request.previousBrief, indent=2)}")
        
        if request.feedback:
            prompt_parts.append(f"User feedback: {json.dumps(request.feedback, indent=2)}")
        
        prompt_parts.append("""
        Create a detailed imaging brief that can be sent to an image generation model.
        
        Guidelines:
        1. Write a clear, concise prompt describing the final upcycled object
        2. Include camera settings for optimal product visualization
        3. Specify lighting and background for professional presentation
        4. Add constraints to ensure materials and construction are realistic
        5. Set render parameters (aspect ratio, size, count)
        6. List acceptance criteria for evaluating the generated images
        7. Note any assumptions made
        8. If critical visual details are unclear, set needs_clarification=true and add questions
        
        The brief should enable high-quality, realistic visualization of the upcycled project.
        """.strip())
        
        prompt = "\n\n".join(prompt_parts)
        
        # Configure model for structured output
        config = GeminiModelConfig(
            model_name=DEFAULT_MODEL,
            temperature=0.0,
            max_tokens=2048,
            use_structured_output=True
        )
        
        # Generate structured response
        result = await client.generate_structured(
            prompt=prompt,
            response_schema=IMAGING_BRIEF_SCHEMA,
            model_config=config,
            system_instruction=PHASE2_SYSTEM_PROMPT
        )
        
        logger.info(f"[{request_id}] Phase 2 completed: brief generated for {request.ideaId}")
        
        return result
        
    except Exception as e:
        logger.error(f"[{request_id}] Phase 2 failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Phase 2 processing failed: {str(e)}"
        )


@router.get("/phases/health")
async def phases_health_check():
    """Check if structured client is configured."""
    try:
        get_structured_client()
        return {"status": "healthy", "phases": ["phase1", "phase2"]}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

