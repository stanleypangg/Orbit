from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import logging
import traceback
from app.integrations.gemini import gemini_image_editor
from PIL import Image
import io
import requests
import base64

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/magic-pencil", tags=["magic-pencil"])


class MagicPencilRequest(BaseModel):
    original_image_url: str  # Reference image - this is what AI should preserve
    drawn_overlay_url: str   # Image with green drawing showing edit areas
    prompt: str              # User's natural language edit request


class MagicPencilResponse(BaseModel):
    result_image_url: str
    message: str


@router.post("/edit", response_model=MagicPencilResponse)
async def edit_image(request: MagicPencilRequest):
    """
    Apply selective edits to an image using Gemini Nano Banana.
    
    Workflow:
    1. Original image (reference - what AI should preserve)
    2. Drawn overlay (shows where user drew in green)
    3. Pure mask (generated from drawn overlay - isolates edit areas)
    4. User prompt (natural language edit description)
    
    These 4 inputs are sent to Gemini to generate the edited result.
    """
    try:
        logger.info(f"Processing Magic Pencil request")
        logger.info(f"Prompt: {request.prompt}")
        logger.info(f"Original URL type: {'data URL' if request.original_image_url.startswith('data:') else 'HTTP URL'}")
        logger.info(f"Drawn overlay URL type: {'data URL' if request.drawn_overlay_url.startswith('data:') else 'HTTP URL'}")
        
        # Step 1: Load images (handle both data URLs and HTTP URLs)
        def load_image_from_url(url: str) -> Image.Image:
            if url.startswith('data:'):
                # Handle data URL (base64)
                header, encoded = url.split(',', 1)
                image_data = base64.b64decode(encoded)
                return Image.open(io.BytesIO(image_data)).convert("RGBA")
            else:
                # Handle HTTP URL
                response = requests.get(url, timeout=10)
                return Image.open(io.BytesIO(response.content)).convert("RGBA")
        
        original_image = load_image_from_url(request.original_image_url)
        drawn_overlay = load_image_from_url(request.drawn_overlay_url)
        
        # Resize drawn overlay to match original if needed
        if drawn_overlay.size != original_image.size:
            drawn_overlay = drawn_overlay.resize(original_image.size, Image.Resampling.LANCZOS)
        
        logger.info(f"Image dimensions: {original_image.size}")
        
        # Step 2: Generate pure mask from drawn overlay
        # Extract green channel and create binary mask (frontend draws in green)
        pure_mask = Image.new("L", drawn_overlay.size, 0)  # Black background
        drawn_pixels = drawn_overlay.load()
        mask_pixels = pure_mask.load()
        
        for y in range(drawn_overlay.size[1]):
            for x in range(drawn_overlay.size[0]):
                r, g, b, a = drawn_pixels[x, y]
                # If there's any green marking (g > threshold and a > 0)
                # Frontend uses rgba(76, 222, 128, 0.5) for drawing
                if g > 100 and a > 50:
                    mask_pixels[x, y] = 255  # White in mask = edit area
        
        logger.info("Generated pure mask from drawn overlay")
        
        # Step 3: Convert images to base64 for Gemini API
        def image_to_base64(img):
            buffered = io.BytesIO()
            img.convert("RGB").save(buffered, format="PNG")
            return base64.b64encode(buffered.getvalue()).decode()
        
        original_b64 = image_to_base64(original_image)
        drawn_b64 = image_to_base64(drawn_overlay)
        mask_b64 = image_to_base64(pure_mask)
        
        # Step 4: Create composite for reference (shows all 3 images)
        composite = Image.alpha_composite(original_image, drawn_overlay)
        
        # Step 5: Call Gemini with all inputs
        edited_image_url = await gemini_image_editor.edit_image_with_magic_pencil(
            original_image_b64=original_b64,
            drawn_overlay_b64=drawn_b64,
            pure_mask_b64=mask_b64,
            user_prompt=request.prompt
        )
        
        if edited_image_url:
            logger.info("Successfully generated edited image via Gemini")
            result = {
                "result_image_url": edited_image_url,
                "message": "Image edited successfully with Magic Pencil"
            }
        else:
            # Fallback: show composite for POC
            logger.warning("Gemini returned no result, showing composite")
            buffered = io.BytesIO()
            composite.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode()
            result = {
                "result_image_url": f"data:image/png;base64,{img_str}",
                "message": "POC: Showing drawn overlay. Gemini integration in progress."
            }
        
        return result
        
    except Exception as e:
        logger.error(f"Error in Magic Pencil: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process image: {str(e)}"
        )


@router.get("/health")
async def health_check():
    """Check Magic Pencil service health."""
    return {"status": "healthy", "service": "magic-pencil"}

