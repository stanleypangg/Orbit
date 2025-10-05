from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from app.integrations.trellis import TrellisService, TrellisOutput
import logging
import traceback
import asyncio
import json
from app.core.redis import redis_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/trellis", tags=["trellis"])
trellis_service = TrellisService()

class Generate3DRequest(BaseModel):
    images: List[str]
    seed: int = 1337
    randomize_seed: bool = False
    texture_size: int = 2048
    mesh_simplify: float = 0.96
    generate_color: bool = True
    generate_normal: bool = False
    generate_model: bool = True
    save_gaussian_ply: bool = False
    return_no_background: bool = True
    ss_sampling_steps: int = 26
    ss_guidance_strength: float = 8.0
    slat_sampling_steps: int = 26
    slat_guidance_strength: float = 3.2


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
        logger.info("=" * 80)
        logger.info("TRELLIS REQUEST PARAMETERS:")
        logger.info(f"  images: {request.images}")
        logger.info(f"  seed: {request.seed}")
        logger.info(f"  randomize_seed: {request.randomize_seed}")
        logger.info(f"  texture_size: {request.texture_size}")
        logger.info(f"  mesh_simplify: {request.mesh_simplify}")
        logger.info(f"  generate_color: {request.generate_color}")
        logger.info(f"  generate_normal: {request.generate_normal}")
        logger.info(f"  generate_model: {request.generate_model}")
        logger.info(f"  save_gaussian_ply: {request.save_gaussian_ply}")
        logger.info(f"  return_no_background: {request.return_no_background}")
        logger.info(f"  ss_sampling_steps: {request.ss_sampling_steps}")
        logger.info(f"  ss_guidance_strength: {request.ss_guidance_strength}")
        logger.info(f"  slat_sampling_steps: {request.slat_sampling_steps}")
        logger.info(f"  slat_guidance_strength: {request.slat_guidance_strength}")
        logger.info("=" * 80)
        
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
        logger.info("Successfully generated 3D asset")
        return output
    except Exception as e:
        logger.error(f"Error generating 3D asset: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Failed to generate 3D asset: {str(e)}")


@router.post("/generate-async/{thread_id}")
async def generate_3d_async(thread_id: str, request: Generate3DRequest):
    """
    Start 3D generation in the background (non-blocking).
    Returns immediately with a job ID. Check status with /status/{thread_id}.
    """
    try:
        # Store initial status
        status_key = f"trellis_status:{thread_id}"
        redis_service.set(status_key, json.dumps({
            "status": "processing",
            "progress": 0,
            "message": "Starting 3D model generation..."
        }), ex=3600)
        
        logger.info(f"[Trellis] Starting async generation for thread {thread_id}")
        
        # Run generation in background
        asyncio.create_task(_generate_3d_background(thread_id, request))
        
        return {
            "status": "processing",
            "thread_id": thread_id,
            "message": "3D generation started in background"
        }
    except Exception as e:
        logger.error(f"Error starting async 3D generation: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to start generation: {str(e)}")


@router.get("/status/{thread_id}")
async def get_generation_status(thread_id: str):
    """
    Check the status of a 3D generation job.
    Returns: status, progress, model_file URL when complete
    """
    try:
        status_key = f"trellis_status:{thread_id}"
        status_data = redis_service.get(status_key)
        
        if not status_data:
            raise HTTPException(status_code=404, detail="Generation job not found")
        
        return json.loads(status_data)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching generation status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch status: {str(e)}")


async def _generate_3d_background(thread_id: str, request: Generate3DRequest):
    """Background task to generate 3D model"""
    status_key = f"trellis_status:{thread_id}"
    
    try:
        # Update progress
        redis_service.set(status_key, json.dumps({
            "status": "processing",
            "progress": 25,
            "message": "Generating 3D model with Trellis..."
        }), ex=3600)
        
        # Generate 3D model (this is the slow part)
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
        
        # Success - store result
        redis_service.set(status_key, json.dumps({
            "status": "complete",
            "progress": 100,
            "message": "3D model generated successfully!",
            "model_file": output.get("model_file"),
            "color_video": output.get("color_video"),
            "no_background_images": output.get("no_background_images", [])
        }), ex=7200)  # Keep for 2 hours
        
        logger.info(f"[Trellis] ✓ Background generation complete for {thread_id}")
        
    except Exception as e:
        logger.error(f"[Trellis] ❌ Background generation failed for {thread_id}: {str(e)}")
        redis_service.set(status_key, json.dumps({
            "status": "error",
            "progress": 0,
            "message": f"Generation failed: {str(e)}"
        }), ex=3600)
