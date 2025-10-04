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

from app.integrations.gemini_structured import GeminiStructuredClient
from app.workflows.optimized_state import GeminiModelConfig

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/chat", tags=["chat-phases"])

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
# Phase 1 Schemas
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
3) Propose 3–5 distinct "ideas" with id, title, and a one-liner. Do not include step-by-step instructions here.
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


class Phase1Request(BaseModel):
    """Phase 1 request for material extraction and idea generation."""
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
# Endpoints
# ---------------


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
        
        client = get_structured_client()
        
        # Prepare prompt
        context = ""
        if request.existing_ingredients:
            context = f"\n\nExisting ingredients context: {json.dumps(request.existing_ingredients, indent=2)}"
        
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
            model_name="gemini-2.0-flash-exp",
            temperature=0.0,
            max_tokens=2048,
            use_structured_output=True
        )
        
        # Generate structured response
        result = await client.generate_structured(
            prompt=prompt,
            response_schema=PHASE1_SCHEMA,
            model_config=config,
            system_instruction=PHASE1_SYSTEM_PROMPT
        )
        
        logger.info(f"[{request_id}] Phase 1 completed: {len(result.get('ideas', []))} ideas generated")
        
        return result
        
    except Exception as e:
        logger.error(f"[{request_id}] Phase 1 failed: {e}")
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
            model_name="gemini-2.0-flash-exp",
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

