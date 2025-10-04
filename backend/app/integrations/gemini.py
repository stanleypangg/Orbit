import google.generativeai as genai
from app.core.config import settings
import logging
import traceback
from typing import Optional
from PIL import Image
import io
import requests
import base64

logger = logging.getLogger(__name__)


class GeminiImageEditor:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
            logger.info("Gemini Image Editor initialized")
        else:
            logger.warning("No Gemini API key found")
            self.model = None
    
    def create_magic_pencil_system_prompt(self, user_prompt: str) -> str:
        """
        Create a strong, constrained system prompt for Magic Pencil editing.
        
        This ensures Gemini only modifies marked areas and preserves everything else.
        """
        system_prompt = f"""You are a precise image editing AI. You will receive 4 inputs:

**INPUTS:**
1. **Reference Image**: The original image that must be preserved EXACTLY outside edit areas
2. **Drawn Overlay**: Shows the red markings indicating where user wants edits
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
        Edit an image using Gemini Nano Banana with Magic Pencil workflow.
        
        Args:
            original_image_b64: Base64 of reference image (must be preserved)
            drawn_overlay_b64: Base64 of image with red drawings
            pure_mask_b64: Base64 of binary mask (white = edit, black = preserve)
            user_prompt: User's edit description
            
        Returns:
            Base64 data URL of edited image or None if failed
        """
        try:
            if not self.model:
                raise Exception("Gemini model not initialized")
            
            # Create the comprehensive system prompt
            system_prompt = self.create_magic_pencil_system_prompt(user_prompt)
            
            logger.info("Calling Gemini Nano Banana for Magic Pencil editing")
            logger.info(f"System prompt length: {len(system_prompt)} chars")
            
            # Decode base64 back to PIL Images for Gemini API
            import base64
            original_image = Image.open(io.BytesIO(base64.b64decode(original_image_b64)))
            drawn_overlay = Image.open(io.BytesIO(base64.b64decode(drawn_overlay_b64)))
            pure_mask = Image.open(io.BytesIO(base64.b64decode(pure_mask_b64)))
            
            # Call Gemini API with all 4 inputs
            # Note: This is the structure for Gemini's multimodal API
            response = self.model.generate_content([
                system_prompt,
                "Reference Image (preserve this exactly outside mask):",
                original_image,
                "Drawn Overlay (shows user's red markings):",
                drawn_overlay,
                "Pure Mask (white = edit area, black = preserve):",
                pure_mask,
                f"User's edit request: {user_prompt}",
                "Generate the edited image following all constraints above."
            ])
            
            # Extract image from response
            # TODO: Adjust based on actual Gemini response format
            if hasattr(response, 'parts'):
                for part in response.parts:
                    if hasattr(part, 'inline_data'):
                        # Image response
                        img_data = part.inline_data.data
                        return f"data:image/png;base64,{base64.b64encode(img_data).decode()}"
            
            logger.warning("No image found in Gemini response")
            logger.info(f"Response: {str(response)[:200]}")
            return None
            
        except Exception as e:
            logger.error(f"Error calling Gemini: {str(e)}")
            logger.error(traceback.format_exc())
            return None


gemini_image_editor = GeminiImageEditor()

