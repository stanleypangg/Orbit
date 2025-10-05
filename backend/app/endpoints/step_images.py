"""
API endpoints for step-by-step construction image generation.
Supports polling for background generation progress.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import logging
import json

from app.core.redis import redis_service

router = APIRouter(prefix="/step-images", tags=["step-images"])
logger = logging.getLogger(__name__)


class StepImageResponse(BaseModel):
    step_number: int
    image_id: Optional[str] = None
    image_url: Optional[str] = None
    status: str  # pending, generating, completed, failed
    generated_at: Optional[float] = None


class StepImagesProgressResponse(BaseModel):
    status: str  # not_started, generating, completed, completed_with_errors, failed
    total_steps: int
    completed_steps: int
    failed_steps: int
    progress: float  # 0.0 to 1.0
    step_images: List[StepImageResponse]
    started_at: Optional[float] = None
    completed_at: Optional[float] = None
    error: Optional[str] = None


@router.get("/{thread_id}", response_model=StepImagesProgressResponse)
async def get_step_images_progress(thread_id: str):
    """
    Get the current progress of step image generation for a thread.
    Frontend polls this endpoint to get updates.
    """
    try:
        # Check if generation has completed
        results_key = f"step_images:final:{thread_id}"
        results_str = redis_service.get(results_key)

        if results_str:
            # Generation complete - return final results
            results_data = json.loads(results_str)
            step_images = [
                StepImageResponse(**img) for img in results_data["step_images"]
            ]

            return StepImagesProgressResponse(
                status=results_data.get("status", "completed"),
                total_steps=len(step_images),
                completed_steps=sum(1 for img in step_images if img.status == "completed"),
                failed_steps=sum(1 for img in step_images if img.status == "failed"),
                progress=1.0,
                step_images=step_images,
                completed_at=results_data.get("generated_at")
            )

        # Check progress
        progress_key = f"step_images:progress:{thread_id}"
        progress_str = redis_service.get(progress_key)

        if not progress_str:
            # Not started yet
            return StepImagesProgressResponse(
                status="not_started",
                total_steps=0,
                completed_steps=0,
                failed_steps=0,
                progress=0.0,
                step_images=[]
            )

        progress_data = json.loads(progress_str)

        # Collect individual step results
        step_images = []
        total_steps = progress_data.get("total_steps", 0)
        for step_num in range(1, total_steps + 1):
            result_key = f"step_images:result:{thread_id}:{step_num}"
            result_str = redis_service.get(result_key)

            if result_str:
                step_data = json.loads(result_str)
                step_images.append(StepImageResponse(**step_data))
            else:
                # Not yet generated
                step_images.append(StepImageResponse(
                    step_number=step_num,
                    status="pending"
                ))

        return StepImagesProgressResponse(
            status=progress_data.get("status", "generating"),
            total_steps=total_steps,
            completed_steps=progress_data.get("completed_steps", 0),
            failed_steps=progress_data.get("failed_steps", 0),
            progress=progress_data.get("progress", 0.0),
            step_images=step_images,
            started_at=progress_data.get("started_at"),
            completed_at=progress_data.get("completed_at"),
            error=progress_data.get("error")
        )

    except Exception as e:
        logger.error(f"Error getting step images progress: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get step images progress: {str(e)}"
        )


@router.get("/{thread_id}/step/{step_number}")
async def get_single_step_image(thread_id: str, step_number: int):
    """Get a single step image by step number."""
    try:
        result_key = f"step_images:result:{thread_id}:{step_number}"
        result_str = redis_service.get(result_key)

        if not result_str:
            raise HTTPException(status_code=404, detail="Step image not found")

        step_data = json.loads(result_str)
        return StepImageResponse(**step_data)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting step image: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get step image: {str(e)}"
        )


@router.get("/health")
async def health_check():
    """Health check for step images service."""
    return {"status": "healthy", "service": "step-images"}
