import replicate
from typing import Optional, List
from typing_extensions import TypedDict
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


class TrellisOutput(TypedDict, total=False):
    """Output schema from Trellis model."""
    model_file: str
    color_video: str
    gaussian_ply: str
    normal_video: str
    combined_video: str
    no_background_images: List[str]


class TrellisService:
    def __init__(self):
        self.model = "firtoz/trellis:e8f6c45206993f297372f5436b90350817bd9b4a0d52d2a76df50c1c8afa2b3c"
        self.api_token = settings.REPLICATE_API_KEY
        if self.api_token:
            # Log first 10 chars for debugging (never log full API keys in production!)
            logger.info(f"Replicate API key configured: {self.api_token[:10]}...")
        else:
            logger.warning("No Replicate API key found in settings")
    
    def generate_3d_asset(
        self,
        images: List[str],
        seed: int = 0,
        randomize_seed: bool = True,
        texture_size: int = 1024,
        mesh_simplify: float = 0.95,
        generate_color: bool = True,
        generate_normal: bool = False,
        generate_model: bool = False,
        save_gaussian_ply: bool = False,
        return_no_background: bool = False,
        ss_sampling_steps: int = 12,
        ss_guidance_strength: float = 7.5,
        slat_sampling_steps: int = 12,
        slat_guidance_strength: float = 3.0
    ) -> TrellisOutput:
        """
        Generate a 3D asset from input images using Trellis.
        
        Args:
            images: List of input image URLs to generate 3D asset from
            seed: Random seed for generation
            randomize_seed: Randomize seed
            texture_size: GLB Extraction - Texture Size (512-2048, only used if generate_model=True)
            mesh_simplify: GLB Extraction - Mesh Simplification (0.9-0.98, only used if generate_model=True)
            generate_color: Generate color video render
            generate_normal: Generate normal video render
            generate_model: Generate 3D model file (GLB)
            save_gaussian_ply: Save Gaussian point cloud as PLY file
            return_no_background: Return the preprocessed images without background
            ss_sampling_steps: Stage 1: Sparse Structure Generation - Sampling Steps (1-50)
            ss_guidance_strength: Stage 1: Sparse Structure Generation - Guidance Strength (0-10)
            slat_sampling_steps: Stage 2: Structured Latent Generation - Sampling Steps (1-50)
            slat_guidance_strength: Stage 2: Structured Latent Generation - Guidance Strength (0-10)
        
        Returns:
            TrellisOutput containing:
                - model_file: GLB 3D model file URL (if generate_model=True)
                - color_video: Color render video URL (if generate_color=True)
                - gaussian_ply: Gaussian point cloud PLY file URL (if save_gaussian_ply=True)
                - normal_video: Normal render video URL (if generate_normal=True)
                - combined_video: Combined video URL
                - no_background_images: List of preprocessed images without background (if return_no_background=True)
        """
        try:
            # Log API key status
            logger.info(f"REPLICATE_API_KEY from settings: {settings.REPLICATE_API_KEY[:10] if settings.REPLICATE_API_KEY else 'NOT SET'}...")
            logger.info(f"self.api_token: {self.api_token[:10] if self.api_token else 'NOT SET'}...")
            
            input_data = {
                "images": images,
                "seed": seed,
                "randomize_seed": randomize_seed,
                "texture_size": texture_size,
                "mesh_simplify": mesh_simplify,
                "generate_color": generate_color,
                "generate_normal": generate_normal,
                "generate_model": generate_model,
                "save_gaussian_ply": save_gaussian_ply,
                "return_no_background": return_no_background,
                "ss_sampling_steps": ss_sampling_steps,
                "ss_guidance_strength": ss_guidance_strength,
                "slat_sampling_steps": slat_sampling_steps,
                "slat_guidance_strength": slat_guidance_strength
            }
            
            # Create a client with the API token explicitly set
            client = replicate.Client(api_token=self.api_token)
            output = client.run(self.model, input=input_data)
            
            # Convert FileOutput objects to strings (URLs)
            # Only include non-None values in the result
            result = {}
            for key, value in output.items():
                if value is not None:
                    if isinstance(value, list):
                        # Only include list if it has items
                        converted_list = [str(item) for item in value if item is not None]
                        if converted_list:
                            result[key] = converted_list
                    else:
                        result[key] = str(value)
            
            logger.info(f"Successfully generated 3D asset: {result}")
            return result
        except Exception as e:
            raise Exception(f"Failed to generate 3D asset: {str(e)}")


trellis_service = TrellisService()

