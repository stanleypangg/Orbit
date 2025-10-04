from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.integrations.trellis import trellis_service, TrellisOutput

router = APIRouter(prefix="/trellis", tags=["trellis"])


class Generate3DRequest(BaseModel):
    images: List[str]
    seed: int = 0
    randomize_seed: bool = True
    texture_size: int = 1024
    mesh_simplify: float = 0.95
    generate_color: bool = True
    generate_normal: bool = False
    generate_model: bool = False
    save_gaussian_ply: bool = False
    return_no_background: bool = False
    ss_sampling_steps: int = 12
    ss_guidance_strength: float = 7.5
    slat_sampling_steps: int = 12
    slat_guidance_strength: float = 3.0


@router.post("/generate", response_model=TrellisOutput)
async def generate_3d_asset(request: Generate3DRequest):
    """
    Generate a 3D asset from input images using Trellis.
    
    Returns various outputs based on the generation flags:
    - model_file: GLB 3D model (if generate_model=True)
    - color_video: Color render video (if generate_color=True)
    - gaussian_ply: Gaussian point cloud (if save_gaussian_ply=True)
    - normal_video: Normal render video (if generate_normal=True)
    - combined_video: Combined video
    - no_background_images: Preprocessed images (if return_no_background=True)
    """
    try:
        output = trellis_service.generate_3d_asset(
            images=request.images,
            seed=request.seed,
            randomize_seed=request.randomize_seed,
            texture_size=request.texture_size,
            mesh_simplify=request.mesh_simplify,
            generate_color=request.generate_color,
            generate_normal=request.generate_normal,
            generate_model=request.generate_model,
            save_gaussian_ply=request.save_gaussian_ply,
            return_no_background=request.return_no_background,
            ss_sampling_steps=request.ss_sampling_steps,
            ss_guidance_strength=request.ss_guidance_strength,
            slat_sampling_steps=request.slat_sampling_steps,
            slat_guidance_strength=request.slat_guidance_strength
        )
        return output
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate 3D asset: {str(e)}")

