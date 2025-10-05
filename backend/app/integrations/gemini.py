from google import genai
from google.genai import types
from app.core.config import settings
import logging
import traceback
from typing import Optional
from PIL import Image
import io
import requests
import os
import base64

logger = logging.getLogger(__name__)


class GeminiImageEditor:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
            logger.info("Gemini Image Editor initialized with Nano Banana client")
        else:
            logger.warning("No Gemini API key found")
            self.client = None
    
    def create_magic_pencil_system_prompt(self, user_prompt: str) -> str:
        """
        Create a strong, constrained system prompt for Magic Pencil editing.
        
        This ensures Gemini only modifies marked areas and preserves everything else.
        """
        system_prompt = f"""You are a precise image editing AI. You will receive 4 inputs:

**INPUTS:**
1. **Reference Image**: The original image that must be preserved EXACTLY outside edit areas
2. **Drawn Overlay**: Shows the green markings indicating where user wants edits
3. **Pure Mask**: Binary mask (white = edit area, black = preserve area)
4. **User Prompt**: "{user_prompt}"

**CRITICAL CONSTRAINTS:**
1. The Reference Image is SACRED - it must remain PIXEL-PERFECT in all black mask areas
2. ONLY modify pixels in WHITE mask areas (where user drew)
3. The edit MUST be constrained to the masked region - NO changes outside
4. Blend edited areas seamlessly at boundaries to avoid visible seams
5. Match the lighting, style, color temperature, and quality of surrounding areas
6. Preserve all original details, textures, and characteristics outside the mask

**WORKFLOW:**
1. Analyze the Pure Mask to identify EXACT edit boundaries (white pixels)
2. Study the Reference Image to understand context around the edit area
3. Apply the requested edit ("{user_prompt}") ONLY within white mask pixels
4. Blend the edited region naturally with the preserved surrounding area
5. Ensure zero artifacts or visible boundaries between edited and original areas

**USER'S EDIT REQUEST:**
{user_prompt}

**OUTPUT REQUIREMENT:**
Return a single edited image where:
- All BLACK mask areas are IDENTICAL to the Reference Image (unchanged)
- All WHITE mask areas contain the requested edits
- Boundaries between edited and preserved areas are seamless and natural
- Overall image maintains consistent lighting, style, and quality throughout

**IMPORTANT:** 
- Do NOT add, remove, or modify ANYTHING in black mask areas
- The result must look natural, as if the change was always part of the original photo
- Maintain perfect fidelity to the original in all non-masked regions
"""
        return system_prompt
    
    async def edit_image_with_magic_pencil(
        self,
        original_image_b64: str,
        drawn_overlay_b64: str,
        pure_mask_b64: str,
        user_prompt: str
    ) -> Optional[str]:
        """
        Edit an image using Gemini Nano Banana (gemini-2.5-flash-image).
        
        Args:
            original_image_b64: Base64 of reference image (must be preserved)
            drawn_overlay_b64: Base64 of image with green drawings
            pure_mask_b64: Base64 of binary mask (white = edit, black = preserve)
            user_prompt: User's edit description
            
        Returns:
            Base64 data URL of edited image or None if failed
        """
        try:
            if not self.client:
                raise Exception("Gemini client not initialized")
            
            logger.info("Calling Gemini Nano Banana (gemini-2.5-flash-image)")
            logger.info(f"User prompt: {user_prompt}")
            
            # Decode base64 to bytes for inline_data
            original_bytes = base64.b64decode(original_image_b64)
            drawn_bytes = base64.b64decode(drawn_overlay_b64)
            mask_bytes = base64.b64decode(pure_mask_b64)
            
            # Create the comprehensive prompt with all context
            system_prompt = self.create_magic_pencil_system_prompt(user_prompt)
            
            # Simplified prompt for Nano Banana
            # The model name maps to gemini-2.5-flash-preview-image internally
            simple_prompt = f"""Edit this image based on the mask and prompt.

IMAGES:
1. Original image (preserve areas where mask is black)
2. Drawn overlay (shows edit areas in green)
3. Binary mask (white = edit, black = preserve)

TASK: {user_prompt}

Generate the edited image with changes ONLY in white mask areas."""

            # Call Gemini API with Nano Banana format
            # Note: This model may require paid tier access
            response = self.client.models.generate_content(
                model="gemini-2.5-flash-image",
                contents=[
                    simple_prompt,
                    types.Part.from_bytes(data=original_bytes, mime_type="image/png"),
                    types.Part.from_bytes(data=drawn_bytes, mime_type="image/png"),
                    types.Part.from_bytes(data=mask_bytes, mime_type="image/png")
                ]
            )
            
            logger.info("Received response from Gemini")
            
            # Extract image from response (Nano Banana format)
            if hasattr(response, 'candidates'):
                if response.candidates and len(response.candidates) > 0:
                    candidate = response.candidates[0]
                    
                    if hasattr(candidate, 'content'):
                        if candidate.content and hasattr(candidate.content, 'parts'):
                            
                            if candidate.content.parts:
                                for part in candidate.content.parts:
                                    if hasattr(part, 'text') and part.text is not None:
                                        logger.info("Gemini returned text response (truncated)")
                                    elif hasattr(part, 'inline_data') and part.inline_data is not None:
                                        logger.info("Found generated image in response")
                                        # Convert to base64 data URL
                                        image_b64 = base64.b64encode(part.inline_data.data).decode()
                                        return f"data:image/png;base64,{image_b64}"
            
            logger.warning("No image found in Gemini response - response structure unexpected")
            return None
            
        except Exception as e:
            logger.error(f"Error calling Gemini Nano Banana: {str(e)}")
            logger.error(traceback.format_exc())
            return None


gemini_image_editor = GeminiImageEditor()

