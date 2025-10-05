# Step-by-Step Build Instructions Image Generation - Implementation Design

## Executive Summary

This document outlines the implementation for generating **consistent, progressive step-by-step images** for the "How to Build" section. Each construction step will have a corresponding AI-generated image showing **only the components built up to that step**, ensuring visual consistency and accurate progression.

### Key Requirements

1. ✅ Generate one image per construction step
2. ✅ Images must be **visually consistent** across all steps (same style, lighting, angle)
3. ✅ Each step image shows **only what's been built so far** (cumulative, not complete product)
4. ✅ **Background generation** with progressive streaming to frontend
5. ✅ Images stored and served via existing infrastructure

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    WORKFLOW PHASE 3 (Preview Assembly)          │
│                                                                   │
│  1. Generate construction_steps (text) via Gemini Pro           │
│  2. Trigger BACKGROUND step image generation                     │
│  3. Return immediately to frontend (don't block)                 │
│  4. Stream progress updates via Redis                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKGROUND TASK: Step Image Generator               │
│                                                                   │
│  For each step (1 → N):                                          │
│    • Build cumulative prompt (steps 1 through current)           │
│    • Generate image via Gemini 2.5 Flash Image                   │
│    • Store to filesystem cache                                   │
│    • Update Redis with progress                                  │
│    • Frontend polls/streams and displays as ready                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND: Progressive Display                 │
│                                                                   │
│  • Poll /api/workflow/step-images/{thread_id}                   │
│  • Display steps as images become available                      │
│  • Show loading state for pending images                         │
│  • Graceful fallback to placeholders                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Implementation Plan

### Phase 1: Backend - Data Model & State Extension

#### 1.1 Extend `WorkflowState` to track step images

**File:** `backend/app/workflows/state.py`

```python
class StepImage(BaseModel):
    """Image for a specific construction step."""
    step_number: int
    image_id: Optional[str] = None
    image_url: Optional[str] = None
    status: str = "pending"  # pending, generating, completed, failed
    generated_at: Optional[float] = None
    prompt_used: Optional[str] = None

class WorkflowState(BaseModel):
    # ... existing fields ...

    # NEW: Step-by-step images
    step_images: List[StepImage] = Field(default_factory=list)
    step_images_status: str = "not_started"  # not_started, generating, completed, failed
    step_images_progress: float = 0.0  # 0.0 to 1.0
```

#### 1.2 Add background task tracking to Redis

**File:** `backend/app/workflows/phase3_nodes.py`

```python
# Redis keys for step image generation
STEP_IMAGE_TASK_KEY = "step_images:task:{thread_id}"
STEP_IMAGE_PROGRESS_KEY = "step_images:progress:{thread_id}"
STEP_IMAGE_RESULT_KEY = "step_images:result:{thread_id}:{step_number}"
```

---

### Phase 2: Backend - Step Image Generation Logic

#### 2.1 Create dedicated step image generator

**File:** `backend/app/workflows/step_image_generator.py` (NEW)

```python
"""
Step-by-step image generation for construction instructions.
Generates cumulative, consistent images showing progressive assembly.
"""
import asyncio
import logging
import json
import time
import base64
from typing import List, Dict, Any, Optional
from io import BytesIO
from PIL import Image as PILImage
from pathlib import Path

from google import genai as google_genai
from google.genai import types

from app.core.redis import redis_service
from app.workflows.state import WorkflowState, StepImage

logger = logging.getLogger(__name__)

# Image cache directory (same as existing system)
CACHE_DIR = Path("/tmp/orbit_image_cache")
CACHE_DIR.mkdir(exist_ok=True)

# API base URL for image serving
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")


class StepImageGenerator:
    """Generates consistent, progressive step-by-step construction images."""

    def __init__(self, gemini_api_key: str):
        self.client = google_genai.Client(api_key=gemini_api_key)
        self.model = "gemini-2.5-flash-image"

    def build_cumulative_prompt(
        self,
        project_title: str,
        project_description: str,
        materials: List[str],
        all_steps: List[Dict[str, Any]],
        current_step_index: int,
        selected_concept_image_prompt: Optional[str] = None
    ) -> str:
        """
        Build a prompt that shows ONLY components built up to current step.

        This is the KEY to consistency: we reference the same base style/angle
        but explicitly exclude components from future steps.
        """
        # Get steps up to and including current
        completed_steps = all_steps[:current_step_index + 1]
        future_steps = all_steps[current_step_index + 1:]

        # Build cumulative description
        cumulative_description = "\n".join([
            f"{i+1}. {step.get('title', '')}: {step.get('description', '')}"
            for i, step in enumerate(completed_steps)
        ])

        # Build exclusion list (what NOT to show)
        future_components = []
        for step in future_steps:
            title = step.get('title', '')
            if title:
                future_components.append(title)

        # Reference the selected concept's style for consistency
        style_reference = ""
        if selected_concept_image_prompt:
            # Extract key style elements from the hero image prompt
            style_reference = f"""
STYLE CONSISTENCY REQUIREMENTS:
- Match the visual style, lighting, and camera angle from the final product concept
- Use the same color palette and material textures
- Maintain consistent perspective and composition
- Keep the same background and environmental context
"""

        prompt = f"""Generate a high-quality product photography image showing the PARTIAL ASSEMBLY of this upcycled project.

PROJECT: {project_title}
DESCRIPTION: {project_description}
MATERIALS USED: {', '.join(materials[:5])}

CONSTRUCTION PROGRESS - SHOW ONLY THESE COMPLETED STEPS:
{cumulative_description}

CRITICAL CONSTRAINTS:
1. Show ONLY the components and assembly described in the completed steps above
2. DO NOT include any components or features from these future steps: {', '.join(future_components) if future_components else 'N/A'}
3. The image should look INCOMPLETE - this is step {current_step_index + 1} of {len(all_steps)}
4. Show the project in a clean, well-lit workspace setting
5. Use consistent camera angle and lighting for all steps (isometric 45-degree view preferred)

{style_reference}

VISUAL STYLE:
- Professional product photography
- Clean, minimalist background (white or light gray)
- Soft, even lighting with subtle shadows
- Focus on the partially assembled product
- Show realistic textures of upcycled materials
- Maintain visual consistency with other step images

OUTPUT: A single high-quality image showing the project at this exact stage of completion.
"""
        return prompt

    async def generate_single_step_image(
        self,
        thread_id: str,
        step_number: int,
        prompt: str,
        semaphore: asyncio.Semaphore
    ) -> Optional[StepImage]:
        """Generate a single step image with rate limiting."""
        async with semaphore:
            try:
                logger.info(f"STEP_IMG: Generating image for step {step_number} (thread: {thread_id})")
                logger.info(f"STEP_IMG: Prompt preview: {prompt[:200]}...")

                # Call Gemini for image generation
                response = self.client.models.generate_content(
                    model=self.model,
                    contents=[prompt]
                )

                # Extract image from response
                image_base64 = None
                if hasattr(response, 'candidates') and response.candidates:
                    candidate = response.candidates[0]
                    if hasattr(candidate, 'content') and candidate.content:
                        if hasattr(candidate.content, 'parts') and candidate.content.parts:
                            for part in candidate.content.parts:
                                if hasattr(part, 'inline_data') and part.inline_data is not None:
                                    logger.info(f"STEP_IMG: ✓ Generated image for step {step_number}")
                                    image_base64 = base64.b64encode(part.inline_data.data).decode()
                                    break

                if not image_base64:
                    logger.warning(f"STEP_IMG: No image in response for step {step_number}")
                    return StepImage(
                        step_number=step_number,
                        status="failed",
                        generated_at=time.time()
                    )

                # Generate unique image ID
                image_id = f"step_{thread_id}_{step_number}_{int(time.time())}"

                # Save to filesystem cache (optimized storage)
                image_bytes = base64.b64decode(image_base64)
                img = PILImage.open(BytesIO(image_bytes))
                cache_file = CACHE_DIR / f"{image_id}.webp"
                img.save(cache_file, "WEBP", quality=85, optimize=True)
                logger.info(f"STEP_IMG: ✓ Cached to {cache_file}")

                # Store metadata in Redis (lightweight)
                image_key = f"image:{image_id}"
                image_metadata = {
                    "thread_id": thread_id,
                    "step_number": step_number,
                    "prompt": prompt,
                    "generated_at": time.time(),
                    "quality": "step_instruction",
                    "model": self.model,
                    "status": "generated",
                    "cached": True
                }
                redis_service.set(image_key, json.dumps(image_metadata), ex=7200)

                # Create StepImage object
                step_image = StepImage(
                    step_number=step_number,
                    image_id=image_id,
                    image_url=f"{API_BASE_URL}/images/{image_id}",
                    status="completed",
                    generated_at=time.time(),
                    prompt_used=prompt[:500]  # Store truncated prompt
                )

                # Store individual step result in Redis
                result_key = f"step_images:result:{thread_id}:{step_number}"
                redis_service.set(result_key, step_image.model_dump_json(), ex=7200)

                return step_image

            except Exception as e:
                logger.error(f"STEP_IMG: Error generating step {step_number}: {str(e)}")
                import traceback
                logger.error(traceback.format_exc())

                return StepImage(
                    step_number=step_number,
                    status="failed",
                    generated_at=time.time()
                )

    async def generate_all_step_images(
        self,
        thread_id: str,
        project_title: str,
        project_description: str,
        materials: List[str],
        construction_steps: List[Dict[str, Any]],
        selected_concept_image_prompt: Optional[str] = None,
        max_concurrent: int = 2  # Rate limiting
    ) -> List[StepImage]:
        """
        Generate images for all construction steps in parallel (with rate limiting).
        Updates Redis progress as each image completes.
        """
        logger.info(f"STEP_IMG: Starting generation for {len(construction_steps)} steps (thread: {thread_id})")

        # Initialize progress tracking
        progress_key = f"step_images:progress:{thread_id}"
        progress_data = {
            "status": "generating",
            "total_steps": len(construction_steps),
            "completed_steps": 0,
            "failed_steps": 0,
            "progress": 0.0,
            "started_at": time.time()
        }
        redis_service.set(progress_key, json.dumps(progress_data), ex=7200)

        # Create semaphore for rate limiting
        semaphore = asyncio.Semaphore(max_concurrent)

        # Generate all prompts
        prompts = []
        for i, step in enumerate(construction_steps):
            prompt = self.build_cumulative_prompt(
                project_title=project_title,
                project_description=project_description,
                materials=materials,
                all_steps=construction_steps,
                current_step_index=i,
                selected_concept_image_prompt=selected_concept_image_prompt
            )
            prompts.append((i + 1, prompt))  # step_number is 1-indexed

        # Generate all images concurrently (with rate limiting)
        tasks = [
            self.generate_single_step_image(thread_id, step_num, prompt, semaphore)
            for step_num, prompt in prompts
        ]

        results = []
        for i, task in enumerate(asyncio.as_completed(tasks)):
            result = await task
            results.append(result)

            # Update progress after each completion
            completed = i + 1
            failed = sum(1 for r in results if r.status == "failed")
            progress_data = {
                "status": "generating",
                "total_steps": len(construction_steps),
                "completed_steps": completed,
                "failed_steps": failed,
                "progress": completed / len(construction_steps),
                "started_at": progress_data["started_at"],
                "updated_at": time.time()
            }
            redis_service.set(progress_key, json.dumps(progress_data), ex=7200)
            logger.info(f"STEP_IMG: Progress: {completed}/{len(construction_steps)} ({progress_data['progress']:.1%})")

        # Sort results by step number
        results.sort(key=lambda x: x.step_number)

        # Final progress update
        failed_count = sum(1 for r in results if r.status == "failed")
        progress_data = {
            "status": "completed" if failed_count == 0 else "completed_with_errors",
            "total_steps": len(construction_steps),
            "completed_steps": len(results) - failed_count,
            "failed_steps": failed_count,
            "progress": 1.0,
            "started_at": progress_data["started_at"],
            "completed_at": time.time()
        }
        redis_service.set(progress_key, json.dumps(progress_data), ex=7200)

        logger.info(f"STEP_IMG: ✓ Completed generation: {len(results) - failed_count}/{len(results)} successful")

        return results


# Singleton instance
_step_image_generator: Optional[StepImageGenerator] = None

def get_step_image_generator() -> StepImageGenerator:
    """Get or create the step image generator singleton."""
    global _step_image_generator
    if _step_image_generator is None:
        import os
        gemini_api_key = os.getenv("GEMINI_API_KEY")
        if not gemini_api_key:
            raise ValueError("GEMINI_API_KEY not found")
        _step_image_generator = StepImageGenerator(gemini_api_key)
    return _step_image_generator
```

---

### Phase 3: Backend - Integration with Preview Assembly Node

#### 3.1 Trigger background generation in `preview_assembly_node`

**File:** `backend/app/workflows/phase3_nodes.py`

```python
# Add import at top
from app.workflows.step_image_generator import get_step_image_generator
import asyncio

async def preview_assembly_node(state: WorkflowState) -> Dict[str, Any]:
    """
    A1 Node: Generate comprehensive project documentation.
    NOW ALSO: Trigger background step image generation.
    """
    # ... existing code to generate assembly_data ...

    # After successful assembly generation:
    if response and not response.get("error"):
        assembly_data = response
        state.project_preview = assembly_data

        # ... existing code ...

        # NEW: Trigger background step image generation (don't await!)
        construction_steps = assembly_data.get("construction_steps", [])
        if construction_steps and len(construction_steps) > 0:
            logger.info(f"A1: Triggering background generation for {len(construction_steps)} step images")

            # Initialize step images in state
            state.step_images = [
                StepImage(step_number=i+1, status="pending")
                for i in range(len(construction_steps))
            ]
            state.step_images_status = "generating"
            state.step_images_progress = 0.0

            # Launch background task (fire and forget)
            asyncio.create_task(
                generate_step_images_background(
                    thread_id=state.thread_id,
                    project_preview=assembly_data,
                    selected_option=state.selected_option or {},
                    selected_concept=state.selected_concept,
                    ingredients=state.ingredients_data.ingredients if state.ingredients_data else []
                )
            )

            logger.info("A1: Background step image generation started")

        # Continue with existing flow (don't block!)
        state.current_node = "COMPLETE"
        state.current_phase = "complete"

        return {
            "final_output": state.final_output,
            "esg_report": state.esg_report,
            "bom_data": state.bom_data,
            "step_images": state.step_images,  # Return initial state
            "step_images_status": state.step_images_status,
            "current_node": "COMPLETE",
            "current_phase": "complete"
        }


async def generate_step_images_background(
    thread_id: str,
    project_preview: Dict[str, Any],
    selected_option: Dict[str, Any],
    selected_concept: Optional[Any],
    ingredients: List[Any]
):
    """
    Background task to generate step images.
    This runs independently and updates Redis as it progresses.
    """
    try:
        logger.info(f"BACKGROUND: Starting step image generation for thread {thread_id}")

        # Extract data
        project_overview = project_preview.get("project_overview", {})
        construction_steps = project_preview.get("construction_steps", [])

        project_title = project_overview.get("title", "Upcycled Project")
        project_description = project_overview.get("description", "")

        materials = [ing.name for ing in ingredients if ing.name] if ingredients else []

        # Get selected concept's image prompt for style consistency
        concept_prompt = None
        if selected_concept and hasattr(selected_concept, 'image_prompt'):
            concept_prompt = selected_concept.image_prompt

        # Generate all step images
        generator = get_step_image_generator()
        step_images = await generator.generate_all_step_images(
            thread_id=thread_id,
            project_title=project_title,
            project_description=project_description,
            materials=materials,
            construction_steps=construction_steps,
            selected_concept_image_prompt=concept_prompt,
            max_concurrent=2  # Rate limit to avoid API throttling
        )

        # Store final results in Redis
        results_key = f"step_images:final:{thread_id}"
        results_data = {
            "step_images": [img.model_dump() for img in step_images],
            "status": "completed",
            "generated_at": time.time()
        }
        redis_service.set(results_key, json.dumps(results_data), ex=7200)

        logger.info(f"BACKGROUND: ✓ Step image generation completed for thread {thread_id}")

    except Exception as e:
        logger.error(f"BACKGROUND: Error in step image generation: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())

        # Update progress with error
        progress_key = f"step_images:progress:{thread_id}"
        error_data = {
            "status": "failed",
            "error": str(e),
            "failed_at": time.time()
        }
        redis_service.set(progress_key, json.dumps(error_data), ex=7200)
```

---

### Phase 4: Backend - API Endpoints for Frontend Polling

#### 4.1 Create step images endpoint

**File:** `backend/app/endpoints/step_images.py` (NEW)

```python
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
```

#### 4.2 Register the router in main.py

**File:** `backend/main.py`

```python
# Add import
from app.endpoints.step_images import router as step_images_router

# Register router
app.include_router(step_images_router)
```

---

### Phase 5: Frontend - Progressive Display with Polling

#### 5.1 Create step images hook

**File:** `frontend/lib/workflow/useStepImages.ts` (NEW)

```typescript
import { useState, useEffect, useCallback } from "react";

interface StepImage {
  step_number: number;
  image_id?: string;
  image_url?: string;
  status: "pending" | "generating" | "completed" | "failed";
  generated_at?: number;
}

interface StepImagesProgress {
  status:
    | "not_started"
    | "generating"
    | "completed"
    | "completed_with_errors"
    | "failed";
  total_steps: number;
  completed_steps: number;
  failed_steps: number;
  progress: number;
  step_images: StepImage[];
  started_at?: number;
  completed_at?: number;
  error?: string;
}

interface UseStepImagesOptions {
  threadId: string | null;
  apiUrl?: string;
  pollInterval?: number; // milliseconds
  enabled?: boolean;
}

export function useStepImages({
  threadId,
  apiUrl = "http://localhost:8000",
  pollInterval = 2000, // Poll every 2 seconds
  enabled = true,
}: UseStepImagesOptions) {
  const [progress, setProgress] = useState<StepImagesProgress | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!threadId || !enabled) return;

    try {
      const response = await fetch(`${apiUrl}/step-images/${threadId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch step images: ${response.status}`);
      }

      const data: StepImagesProgress = await response.json();
      setProgress(data);
      setError(null);

      // Stop polling if completed or failed
      if (
        data.status === "completed" ||
        data.status === "completed_with_errors" ||
        data.status === "failed"
      ) {
        setIsLoading(false);
        return true; // Signal to stop polling
      }

      return false; // Continue polling
    } catch (err) {
      console.error("Error fetching step images progress:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      return false;
    }
  }, [threadId, apiUrl, enabled]);

  useEffect(() => {
    if (!threadId || !enabled) {
      setProgress(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Initial fetch
    fetchProgress();

    // Set up polling
    const intervalId = setInterval(async () => {
      const shouldStop = await fetchProgress();
      if (shouldStop) {
        clearInterval(intervalId);
      }
    }, pollInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [threadId, enabled, pollInterval, fetchProgress]);

  return {
    progress,
    isLoading,
    error,
    refetch: fetchProgress,
  };
}
```

#### 5.2 Update Storyboard component to use progressive images

**File:** `frontend/components/ProductDetail/Storyboard.tsx`

```typescript
"use client";

import { useState } from "react";
import Image from "next/image";
import { useStepImages } from "@/lib/workflow/useStepImages";

interface Step {
  step_number: number;
  title: string;
  description: string;
  image?: string; // Optional: for static/mock data
}

interface StoryboardProps {
  steps: Step[];
  threadId?: string | null; // NEW: For fetching generated images
  apiUrl?: string;
}

export default function Storyboard({
  steps,
  threadId,
  apiUrl,
}: StoryboardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Fetch step images if threadId provided
  const { progress, isLoading } = useStepImages({
    threadId: threadId || null,
    apiUrl,
    enabled: !!threadId,
  });

  // Merge static steps with generated images
  const enrichedSteps = steps.map((step, index) => {
    const generatedImage = progress?.step_images.find(
      (img) =>
        img.step_number === step.step_number || img.step_number === index + 1
    );

    return {
      ...step,
      generatedImageUrl: generatedImage?.image_url,
      imageStatus: generatedImage?.status || "pending",
      // Use generated image if available, otherwise fall back to static
      finalImageUrl: generatedImage?.image_url || step.image,
    };
  });

  const currentStepData = enrichedSteps[currentStep];

  return (
    <div className="bg-[#2A3038] border-[0.5px] border-[#67B68B] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#67B68B] text-base uppercase tracking-wide">
          How to Build
        </h3>

        {/* Progress indicator */}
        {threadId && progress && progress.status === "generating" && (
          <div className="text-sm text-gray-400">
            Generating images: {progress.completed_steps}/{progress.total_steps}
            <span className="ml-2">
              ({Math.round(progress.progress * 100)}%)
            </span>
          </div>
        )}
      </div>

      {/* Step Display */}
      <div className="border-[0.5px] border-[#67B68B] p-6 mb-6 min-h-[400px] flex max-w-5xl items-center gap-6 mx-auto">
        {/* Step Image */}
        <div className="w-1/2 bg-[#2A3142] aspect-video relative flex items-center justify-center">
          {currentStepData.finalImageUrl ? (
            <Image
              src={currentStepData.finalImageUrl}
              alt={currentStepData.title}
              fill
              className="object-cover"
            />
          ) : currentStepData.imageStatus === "generating" ||
            currentStepData.imageStatus === "pending" ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 border-4 border-[#67B68B] border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-400 text-sm">
                {currentStepData.imageStatus === "generating"
                  ? "Generating..."
                  : "Waiting..."}
              </span>
            </div>
          ) : currentStepData.imageStatus === "failed" ? (
            <span className="text-red-400">Failed to generate image</span>
          ) : (
            <span className="text-gray-500">Image placeholder</span>
          )}
        </div>

        {/* Step Content */}
        <div className="w-1/2">
          <h4 className="text-[#67B68B] text-xl font-semibold mb-3">
            {currentStepData.title}
          </h4>
          <p className="text-gray-300 text-base leading-relaxed">
            {currentStepData.description}
          </p>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2">
        {enrichedSteps.map((step, index) => {
          const hasImage = !!step.finalImageUrl;
          const isGenerating =
            step.imageStatus === "generating" || step.imageStatus === "pending";

          return (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-10 h-10 border-[0.5px] transition-all relative ${
                currentStep === index
                  ? "bg-[#67B68B] border-[#67B68B] text-black font-semibold"
                  : "bg-[#2A3142] border-[#67B68B] text-gray-400 hover:border-[#67B68B] hover:text-white"
              }`}
              title={
                isGenerating
                  ? `Step ${index + 1} - Generating...`
                  : hasImage
                  ? `Step ${index + 1} - Ready`
                  : `Step ${index + 1}`
              }
            >
              {index + 1}

              {/* Status indicator dot */}
              {isGenerating && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              )}
              {hasImage && !isGenerating && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

#### 5.3 Update product page to pass threadId

**File:** `frontend/app/product/page.tsx`

```typescript
// In the component, get threadId from URL params or state
const searchParams = useSearchParams();
const threadId = searchParams.get("thread_id");

// Pass to Storyboard
<Storyboard
  steps={productData.steps}
  threadId={threadId}
  apiUrl={process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}
/>;
```

---

## Key Design Decisions

### 1. **Cumulative Prompting Strategy**

- Each step's prompt includes ALL previous steps
- Explicitly excludes future components
- Maintains consistent style/angle by referencing the hero concept image
- **Result:** Progressive assembly that looks natural

### 2. **Background Generation with Streaming**

- Don't block workflow completion
- Generate images asynchronously
- Frontend polls for updates every 2 seconds
- **Result:** Fast initial response, progressive enhancement

### 3. **Rate Limiting**

- Max 2 concurrent image generations
- Prevents API throttling
- Balances speed vs. resource usage
- **Result:** Reliable generation without errors

### 4. **Consistent Visual Style**

- Reference selected concept's image prompt
- Use same camera angle (isometric 45°)
- Consistent lighting and background
- **Result:** Professional, cohesive visual guide

### 5. **Graceful Degradation**

- Show loading spinners for pending images
- Display completed images immediately
- Fall back to placeholders on failure
- **Result:** Always functional UI

---

## Testing Strategy

### Backend Tests

**File:** `backend/tests/test_step_images.py`

```python
import pytest
from app.workflows.step_image_generator import StepImageGenerator, get_step_image_generator

@pytest.mark.asyncio
async def test_cumulative_prompt_building():
    """Test that prompts correctly show cumulative progress."""
    generator = get_step_image_generator()

    steps = [
        {"step_number": 1, "title": "Cut bottle", "description": "Cut plastic bottle in half"},
        {"step_number": 2, "title": "Sand edges", "description": "Smooth the cut edges"},
        {"step_number": 3, "title": "Paint", "description": "Apply paint finish"}
    ]

    # Step 1 should only show cutting
    prompt_1 = generator.build_cumulative_prompt(
        project_title="Bottle Planter",
        project_description="Upcycled planter",
        materials=["plastic bottle"],
        all_steps=steps,
        current_step_index=0
    )
    assert "Cut bottle" in prompt_1
    assert "Sand edges" not in prompt_1
    assert "Paint" not in prompt_1

    # Step 2 should show cutting + sanding
    prompt_2 = generator.build_cumulative_prompt(
        project_title="Bottle Planter",
        project_description="Upcycled planter",
        materials=["plastic bottle"],
        all_steps=steps,
        current_step_index=1
    )
    assert "Cut bottle" in prompt_2
    assert "Sand edges" in prompt_2
    assert "Paint" not in prompt_2

@pytest.mark.asyncio
async def test_background_generation():
    """Test background generation workflow."""
    # Mock test - would need actual API key for integration test
    pass
```

### Frontend Tests

- Test polling mechanism
- Test progressive image display
- Test loading states
- Test error handling

---

## Performance Considerations

### Timing Estimates

- **Single image generation:** 3-5 seconds (Gemini 2.5 Flash Image)
- **5 steps with 2 concurrent:** ~10-15 seconds total
- **10 steps with 2 concurrent:** ~20-30 seconds total

### Optimization Opportunities

1. **Increase concurrency** (if API limits allow): 3-4 concurrent
2. **Cache common angles/styles**: Reuse base compositions
3. **Pregenerate on concept selection**: Start before final package
4. **Progressive quality**: Generate low-res first, enhance later

---

## Rollout Plan

### Phase 1: Core Implementation (Week 1)

- [ ] Extend WorkflowState with step_images
- [ ] Implement StepImageGenerator class
- [ ] Integrate with preview_assembly_node
- [ ] Create step_images API endpoints

### Phase 2: Frontend Integration (Week 1)

- [ ] Create useStepImages hook
- [ ] Update Storyboard component
- [ ] Add loading states and error handling
- [ ] Test with mock data

### Phase 3: Testing & Refinement (Week 2)

- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Error handling improvements
- [ ] Documentation

### Phase 4: Production Deployment (Week 2)

- [ ] Deploy to staging
- [ ] Load testing
- [ ] Monitor API usage
- [ ] Deploy to production

---

## Success Metrics

1. **Image Quality:** 90%+ of generated images accurately show cumulative progress
2. **Consistency:** Visual style remains consistent across all steps
3. **Performance:** 95%+ of generations complete within 30 seconds
4. **Reliability:** <5% failure rate
5. **User Experience:** Frontend remains responsive during generation

---

## Future Enhancements

1. **Interactive editing:** Allow users to regenerate specific steps
2. **Style variations:** Offer different visual styles (sketch, photo, diagram)
3. **Video generation:** Create time-lapse assembly videos
4. **AR preview:** Show steps in augmented reality
5. **Community gallery:** Share and browse step-by-step guides

---

## Conclusion

This implementation provides a robust, scalable solution for generating consistent step-by-step construction images. The background generation with progressive streaming ensures excellent UX, while the cumulative prompting strategy ensures visual accuracy and consistency.

The architecture leverages existing infrastructure (Gemini API, Redis, filesystem cache, image serving) and follows established patterns in the codebase, making it maintainable and extensible.
