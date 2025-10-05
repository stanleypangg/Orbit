"""
Image generation integration using Google Imagen API.
Uses the same Google API key as Gemini for seamless integration.
"""
import logging
import asyncio
from typing import Dict, Any, Optional
import google.generativeai as genai
import os
from app.core.config import settings

logger = logging.getLogger(__name__)


class ImageGenerationService:
    """Service for generating high-quality images using Replicate API."""
    
    # Popular image generation models on Replicate
    MODELS = {
        "flux-schnell": "black-forest-labs/flux-schnell",  # Fast, high quality
        "flux-dev": "black-forest-labs/flux-dev",  # Best quality FLUX
        "flux-pro": "black-forest-labs/flux-pro",  # Professional quality
        "sdxl": "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",  # Stable Diffusion XL
        "sdxl-lightning": "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",  # Fast SDXL
    }
    
    def __init__(self, model_name: str = "flux-schnell"):
        """Initialize with API key from settings."""
        self.api_token = settings.REPLICATE_API_KEY
        self.model_name = model_name
        self.model_id = self.MODELS.get(model_name, self.MODELS["flux-schnell"])
        
        if not self.api_token:
            logger.warning("No REPLICATE_API_KEY found in settings. Image generation will not work.")
        else:
            logger.info(f"ImageGenerationService initialized with model: {model_name}")
    
    async def generate_image(
        self,
        prompt: str,
        width: int = 1024,
        height: int = 1024,
        num_inference_steps: int = 4,
        guidance_scale: float = 0.0,  # FLUX models work best with 0
        **kwargs
    ) -> Optional[str]:
        """
        Generate a single image from a text prompt.
        
        Args:
            prompt: Detailed text description of the image to generate
            width: Image width (default 1024)
            height: Image height (default 1024)
            num_inference_steps: Number of denoising steps (more = higher quality, slower)
            guidance_scale: How strictly to follow the prompt (0-20, FLUX works best at 0)
            **kwargs: Additional model-specific parameters
            
        Returns:
            URL string of the generated image, or None if failed
        """
        if not self.api_token:
            logger.error("Cannot generate image: REPLICATE_API_KEY not configured")
            return None
        
        try:
            logger.info(f"Generating image with {self.model_name}")
            logger.info(f"Prompt: {prompt[:100]}...")
            
            # Run in thread pool to avoid blocking
            loop = asyncio.get_event_loop()
            output = await loop.run_in_executor(
                None,
                lambda: replicate.run(
                    self.model_id,
                    input={
                        "prompt": prompt,
                        "width": width,
                        "height": height,
                        "num_inference_steps": num_inference_steps,
                        "guidance_scale": guidance_scale,
                        **kwargs
                    }
                )
            )
            
            # Extract image URL from output
            if isinstance(output, list) and len(output) > 0:
                image_url = output[0]
                logger.info(f"Image generated successfully: {image_url[:100]}...")
                return image_url
            elif isinstance(output, str):
                logger.info(f"Image generated successfully: {output[:100]}...")
                return output
            else:
                logger.error(f"Unexpected output format: {type(output)}")
                return None
                
        except Exception as e:
            logger.error(f"Image generation failed: {str(e)}")
            return None
    
    async def generate_batch(
        self,
        prompts: list[str],
        width: int = 1024,
        height: int = 1024,
        **kwargs
    ) -> list[Optional[str]]:
        """
        Generate multiple images in parallel.
        
        Args:
            prompts: List of text prompts
            width: Image width
            height: Image height
            **kwargs: Additional parameters
            
        Returns:
            List of image URLs (None for failed generations)
        """
        tasks = [
            self.generate_image(prompt, width, height, **kwargs)
            for prompt in prompts
        ]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Convert exceptions to None
        return [
            result if not isinstance(result, Exception) else None
            for result in results
        ]


# Convenience function for quick access
async def generate_concept_image(
    prompt: str,
    style: str = "minimalist",
    model: str = "flux-schnell"
) -> Optional[str]:
    """
    Quick function to generate a single concept image.
    
    Args:
        prompt: Detailed image prompt
        style: Style hint (minimalist, decorative, functional)
        model: Model to use (flux-schnell, flux-dev, sdxl, etc.)
        
    Returns:
        Image URL or None if failed
    """
    service = ImageGenerationService(model_name=model)
    
    # Adjust parameters based on style
    params = {
        "width": 1024,
        "height": 1024,
    }
    
    if "flux" in model:
        params["num_inference_steps"] = 4  # FLUX is fast
        params["guidance_scale"] = 0.0  # FLUX works best at 0
    elif "sdxl" in model:
        params["num_inference_steps"] = 25  # SDXL needs more steps
        params["guidance_scale"] = 7.5  # SDXL benefits from guidance
    
    return await service.generate_image(prompt, **params)

