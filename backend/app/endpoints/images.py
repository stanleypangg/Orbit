"""
Image serving endpoint for generated concept images.
Serves both real AI-generated images and placeholder images.
"""
from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import StreamingResponse
from app.core.redis import redis_service
import json
import logging
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
import base64

router = APIRouter(prefix="/images", tags=["images"])
logger = logging.getLogger(__name__)

# Constants
MEDIA_TYPE_PNG = "image/png"


def create_placeholder_image(style: str, title: str, width: int = 512, height: int = 512) -> BytesIO:
    """
    Create a placeholder image with style information.
    Used when real AI image generation is not available.
    """
    # Color schemes for different styles
    color_schemes = {
        "minimalist": {"bg": "#f5f5f5", "accent": "#2d3748", "text": "#1a202c"},
        "decorative": {"bg": "#fef5e7", "accent": "#d4af37", "text": "#3e2723"},
        "functional": {"bg": "#e3f2fd", "accent": "#1976d2", "text": "#0d47a1"},
        "default": {"bg": "#e8eaf6", "accent": "#5e35b1", "text": "#311b92"}
    }
    
    scheme = color_schemes.get(style.lower(), color_schemes["default"])
    
    # Create image
    img = Image.new('RGB', (width, height), scheme["bg"])
    draw = ImageDraw.Draw(img)
    
    # Draw accent rectangles for visual interest
    accent_color = scheme["accent"]
    draw.rectangle([0, 0, width, 60], fill=accent_color)
    draw.rectangle([0, height-60, width, height], fill=accent_color)
    
    # Add decorative elements based on style
    if style.lower() == "minimalist":
        # Simple lines
        for i in range(3):
            y = height // 2 - 30 + i * 20
            draw.rectangle([width // 4, y, 3 * width // 4, y + 2], fill=accent_color)
    elif style.lower() == "decorative":
        # Circles and patterns
        center_x, center_y = width // 2, height // 2
        for r in range(50, 150, 30):
            draw.ellipse([center_x - r, center_y - r, center_x + r, center_y + r], 
                        outline=accent_color, width=3)
    else:  # functional
        # Grid pattern
        grid_size = 40
        for i in range(0, width, grid_size):
            draw.line([(i, 80), (i, height - 80)], fill=accent_color, width=1)
        for i in range(80, height - 80, grid_size):
            draw.line([(20, i), (width - 20, i)], fill=accent_color, width=1)
    
    # Add text
    try:
        # Try to use a nicer font
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
        font_style = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
    except Exception:
        # Fallback to default font
        font_title = ImageFont.load_default()
        font_style = ImageFont.load_default()
    
    # Draw title (wrapped if too long)
    title_text = title[:30] + "..." if len(title) > 30 else title
    
    # Calculate text position for centering
    bbox = draw.textbbox((0, 0), title_text, font=font_title)
    text_width = bbox[2] - bbox[0]
    text_x = (width - text_width) // 2
    
    draw.text((text_x, 20), title_text, fill="white", font=font_title)
    
    # Draw style label
    style_text = f"Style: {style.title()}"
    bbox = draw.textbbox((0, 0), style_text, font=font_style)
    style_width = bbox[2] - bbox[0]
    style_x = (width - style_width) // 2
    
    draw.text((style_x, height - 40), style_text, fill="white", font=font_style)
    
    # Convert to bytes
    img_byte_arr = BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    
    return img_byte_arr


@router.get("/{image_id}")
async def get_image(image_id: str):
    """
    Serve an image by ID. Checks Redis for image data and serves it.
    Creates placeholder if real image not available.
    """
    try:
        # Get image metadata from Redis
        image_key = f"image:{image_id}"
        image_data_str = redis_service.get(image_key)
        
        if not image_data_str:
            logger.warning(f"Image not found: {image_id}")
            raise HTTPException(status_code=404, detail="Image not found")
        
        image_data = json.loads(image_data_str)
        
        # Check if we have actual image data (base64), external URL, or need placeholder
        if image_data.get("base64_data"):
            # Serve real image from base64
            image_bytes = base64.b64decode(image_data["base64_data"])
            return Response(content=image_bytes, media_type=MEDIA_TYPE_PNG)
        
        elif image_data.get("url"):
            # Redirect to external URL (e.g., Replicate, Imagen, DALL-E)
            from fastapi.responses import RedirectResponse
            logger.info(f"Redirecting to generated image: {image_data['url'][:80]}...")
            return RedirectResponse(url=image_data["url"], status_code=302)
        
        else:
            # Create and serve placeholder (fallback if generation failed)
            style = image_data.get("style", "default")
            title = image_data.get("title", "Concept")
            logger.info(f"Serving placeholder for {title} ({style})")
            
            img_bytes = create_placeholder_image(style, title)
            
            return StreamingResponse(img_bytes, media_type=MEDIA_TYPE_PNG)
    
    except json.JSONDecodeError:
        logger.error(f"Invalid JSON for image {image_id}")
        raise HTTPException(status_code=500, detail="Invalid image data")
    
    except Exception as e:
        logger.error(f"Error serving image {image_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error serving image: {str(e)}")


@router.get("/placeholder/{style}")
async def get_placeholder(style: str, title: str = "Concept Preview"):
    """
    Generate a placeholder image on the fly for a given style.
    Useful for testing and fallbacks.
    """
    try:
        img_bytes = create_placeholder_image(style, title)
        return StreamingResponse(img_bytes, media_type=MEDIA_TYPE_PNG)
    except Exception as e:
        logger.error(f"Error generating placeholder: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

