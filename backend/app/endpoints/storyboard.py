"""
Storyboard generation endpoint using Gemini Nano Banana.
"""

from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import logging
import traceback
import base64
from io import BytesIO
from PIL import Image
import os
from google import genai
from google.genai import types
from typing import Optional

router = APIRouter()
logger = logging.getLogger(__name__)

# Initialize Gemini client
gemini_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

STORYBOARD_SYSTEM_PROMPT = """Eco-Crafter AI: Refined Core Task Instructions
Role: You are "Eco-Crafter AI," an expert in sustainable DIY projects, specializing in visually clear, step-by-step upcycling instructions.

Core Task: Generate a single-layout, multi-panel (6-9 panels) visual instruction storyboard for a user-provided target image, illustrating the transformation of raw/recycled materials into the final product.

Instructions:
Analyze & Plan: Deconstruct the target image's final product into 6 to 9 distinct, sequential creation steps, starting with raw/recycled material collection.

Visual Aesthetic (Consistency is Key):

Style: All panels must share a warm, natural "home workshop" aesthetic. The primary background for all visuals (Steps 1 through the Final Panel) should consistently resemble a natural wood tabletop or a clean kitchen counter.

Action: Each step's panel must clearly show hands, the relevant tools, and materials in action. Avoid any duplicate or redundant steps to ensure maximum clarity and flow.

Storyboard Layout & Labeling:

Present all 6-9 panels in one cohesive grid layout (e.g., 3x3 or 2x3).

Provide a brief, descriptive title for the entire storyboard.

For each panel, add a concise, numbered title (e.g., "1. Sort Materials").

Final Panel (Exact Replica):

The last panel must be an exact visual replica of the original user-attached target image. Crucially, this final panel must also maintain the "home workshop" background (wood tabletop/counter) to ensure visual coherence with the preceding instructional steps."""


async def generate_storyboard_image(image_bytes: bytes) -> Optional[str]:
    """
    Generate a storyboard image using Gemini Nano Banana.
    
    Args:
        image_bytes: Raw image bytes
        
    Returns:
        Base64 data URL of generated storyboard or None if failed
    """
    try:
        logger.info("Calling Gemini Nano Banana (gemini-2.5-flash-image) for storyboard")
        
        # Call Gemini API with Nano Banana format
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash-image",
            contents=[
                STORYBOARD_SYSTEM_PROMPT,
                types.Part.from_bytes(data=image_bytes, mime_type="image/png")
            ]
        )
        
        logger.info("Received response from Gemini")
        
        # Extract image from response (Nano Banana format)
        if hasattr(response, 'candidates') and response.candidates:
            candidate = response.candidates[0]
            if hasattr(candidate, 'content') and candidate.content:
                if hasattr(candidate.content, 'parts') and candidate.content.parts:
                    for part in candidate.content.parts:
                        if hasattr(part, 'inline_data') and part.inline_data is not None:
                            logger.info("Found generated storyboard image in response")
                            # Convert to base64 data URL
                            image_b64 = base64.b64encode(part.inline_data.data).decode()
                            return f"data:image/png;base64,{image_b64}"
                        elif hasattr(part, 'text') and part.text is not None:
                            logger.info(f"Gemini text response: {part.text[:200]}...")
        
        logger.warning("No image found in Gemini response")
        return None
        
    except Exception as e:
        logger.error(f"Error calling Gemini Nano Banana: {str(e)}")
        logger.error(traceback.format_exc())
        return None


@router.post("/generate")
async def generate_storyboard(image: UploadFile = File(...)):
    """
    Generate a DIY storyboard from a product image using Gemini Nano Banana.
    
    Args:
        image: The uploaded product image
        
    Returns:
        JSON with the generated storyboard image URL
    """
    try:
        logger.info(f"Generating storyboard for image: {image.filename}")
        
        # Read and validate image
        image_data = await image.read()
        
        try:
            pil_image = Image.open(BytesIO(image_data))
            pil_image.verify()  # Verify it's a valid image
            pil_image = Image.open(BytesIO(image_data))  # Reopen after verify
        except Exception as e:
            logger.error(f"Invalid image file: {e}")
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Convert to PNG bytes for Gemini
        buffered = BytesIO()
        pil_image.save(buffered, format="PNG")
        image_bytes = buffered.getvalue()
        
        # Call Gemini Nano Banana for image generation
        logger.info("Calling Gemini Nano Banana for storyboard generation...")
        
        storyboard_url = await generate_storyboard_image(image_bytes)
        
        if not storyboard_url:
            logger.error("No image returned from Gemini")
            raise HTTPException(
                status_code=500,
                detail="Failed to generate storyboard - no image returned"
            )
        
        logger.info("Storyboard generated successfully")
        
        return JSONResponse(
            content={
                "success": True,
                "storyboard_url": storyboard_url,
                "message": "Storyboard generated successfully"
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating storyboard: {e}")
        logger.error(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate storyboard: {str(e)}"
        )
