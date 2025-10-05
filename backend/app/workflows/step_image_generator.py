"""
Step-by-step image generation for construction instructions.
Generates cumulative, consistent images showing progressive assembly.
"""
import asyncio
import logging
import json
import time
import base64
import os
from typing import List, Dict, Any, Optional
from io import BytesIO
from PIL import Image as PILImage
from pathlib import Path

from google import genai as google_genai
from google.genai import types

from app.core.redis import redis_service
from app.workflows.state import StepImage

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
        selected_concept_image_prompt: Optional[str] = None,
        has_previous_image: bool = False
    ) -> str:
        """
        Build a prompt that shows ONLY components built up to current step.
        
        This is the KEY to consistency: we reference the same base style/angle
        but explicitly exclude components from future steps.
        If has_previous_image=True, the prompt expects a previous step image to be passed.
        """
        # Get steps up to and including current
        completed_steps = all_steps[:current_step_index + 1]
        future_steps = all_steps[current_step_index + 1:]
        
        # Get current step description
        current_step = all_steps[current_step_index]
        current_step_title = current_step.get('title', f'Step {current_step_index + 1}')
        current_step_description = current_step.get('description', '')
        
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
        
        # Different prompt based on whether we have a previous image
        if has_previous_image and current_step_index > 0:
            # For steps 2+: Use previous image as reference
            prompt = f"""You will receive an image showing the PREVIOUS STEP of this project. Generate the NEXT STEP by building upon it.

PROJECT: {project_title}
DESCRIPTION: {project_description}

PREVIOUS IMAGE: Shows the project after completing steps 1-{current_step_index}

CURRENT STEP TO ADD (Step {current_step_index + 1}):
{current_step_title}: {current_step_description}

CRITICAL CONSTRAINTS:
1. START with the EXACT state shown in the previous image (same angle, lighting, position)
2. ADD ONLY the changes described in the current step: "{current_step_title}"
3. MAINTAIN perfect visual consistency: same camera angle, same lighting, same background
4. DO NOT add any components from these future steps: {', '.join(future_components) if future_components else 'N/A'}
5. The result should look like a natural progression from the previous image

VISUAL CONSISTENCY REQUIREMENTS:
- Keep the EXACT same camera angle and distance as the previous image
- Match the lighting, shadows, and color temperature precisely
- Maintain the same background and workspace setting
- Preserve the same composition and framing
- Only show the incremental change from this one step

OUTPUT: Generate an image that looks like the previous image + the current step's changes.
"""
        else:
            # For step 1: Use hero concept style reference
            style_reference = ""
            if selected_concept_image_prompt:
                style_reference = f"""
STYLE CONSISTENCY REQUIREMENTS:
- Match the visual style, lighting, and camera angle from the final product concept
- Use the same color palette and material textures
- Maintain consistent perspective and composition
- Keep the same background and environmental context
"""
            
            prompt = f"""Generate a high-quality product photography image showing the FIRST STEP of this upcycled project.

PROJECT: {project_title}
DESCRIPTION: {project_description}
MATERIALS USED: {', '.join(materials[:5])}

FIRST STEP TO SHOW (Step 1):
{current_step_title}: {current_step_description}

CRITICAL CONSTRAINTS:
1. Show ONLY the components and assembly described in step 1
2. DO NOT include any components from these future steps: {', '.join(future_components) if future_components else 'N/A'}
3. The image should look INCOMPLETE - this is step 1 of {len(all_steps)}
4. Show the project in a clean, well-lit workspace setting
5. Use consistent camera angle and lighting (isometric 45-degree view preferred)

{style_reference}

VISUAL STYLE:
- Professional product photography
- Clean, minimalist background (white or light gray)
- Soft, even lighting with subtle shadows
- Focus on the partially assembled product
- Show realistic textures of upcycled materials
- This will be the BASE image for all subsequent steps

OUTPUT: A single high-quality image showing the project after completing ONLY step 1.
"""
        
        return prompt
    
    async def generate_single_step_image(
        self,
        thread_id: str,
        step_number: int,
        prompt: str,
        semaphore: asyncio.Semaphore,
        previous_image_bytes: Optional[bytes] = None
    ) -> StepImage:
        """Generate a single step image with rate limiting.
        
        Args:
            thread_id: Workflow thread ID
            step_number: Current step number (1-indexed)
            prompt: Generation prompt
            semaphore: Rate limiting semaphore
            previous_image_bytes: Optional bytes of previous step's image for consistency
        """
        async with semaphore:
            try:
                logger.info(f"STEP_IMG: Generating image for step {step_number} (thread: {thread_id})")
                if previous_image_bytes:
                    logger.info(f"STEP_IMG: Using previous step image as reference ({len(previous_image_bytes)} bytes)")
                logger.info(f"STEP_IMG: Prompt preview: {prompt[:200]}...")
                
                # Build contents for Gemini
                contents = []
                
                # Add previous image first if available (for visual context)
                if previous_image_bytes:
                    contents.append(
                        types.Part.from_bytes(data=previous_image_bytes, mime_type="image/webp")
                    )
                
                # Add text prompt
                contents.append(prompt)
                
                # Call Gemini for image generation
                response = self.client.models.generate_content(
                    model=self.model,
                    contents=contents
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
        max_concurrent: int = 1  # SEQUENTIAL generation for consistency
    ) -> List[StepImage]:
        """
        Generate images for all construction steps SEQUENTIALLY.
        Each step uses the previous step's image as reference for perfect consistency.
        Updates Redis progress as each image completes.
        """
        logger.info(f"STEP_IMG: Starting SEQUENTIAL generation for {len(construction_steps)} steps (thread: {thread_id})")
        logger.info(f"STEP_IMG: Each step will build upon the previous image for consistency")
        
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
        
        # Create semaphore (though we're sequential, keep for consistency)
        semaphore = asyncio.Semaphore(max_concurrent)
        
        results = []
        previous_image_bytes = None
        
        # Generate images SEQUENTIALLY, each using the previous as reference
        for i, step in enumerate(construction_steps):
            step_number = i + 1
            
            # Build prompt (different for step 1 vs subsequent steps)
            has_previous = (i > 0 and previous_image_bytes is not None)
            prompt = self.build_cumulative_prompt(
                project_title=project_title,
                project_description=project_description,
                materials=materials,
                all_steps=construction_steps,
                current_step_index=i,
                selected_concept_image_prompt=selected_concept_image_prompt,
                has_previous_image=has_previous
            )
            
            # Generate this step's image
            result = await self.generate_single_step_image(
                thread_id=thread_id,
                step_number=step_number,
                prompt=prompt,
                semaphore=semaphore,
                previous_image_bytes=previous_image_bytes
            )
            
            results.append(result)
            
            # If generation succeeded, load this image to use for next step
            if result.status == "completed" and result.image_id:
                try:
                    # Load the just-generated image from cache
                    cache_file = CACHE_DIR / f"{result.image_id}.webp"
                    if cache_file.exists():
                        with open(cache_file, 'rb') as f:
                            previous_image_bytes = f.read()
                        logger.info(f"STEP_IMG: ✓ Loaded step {step_number} image for next step reference")
                    else:
                        logger.warning(f"STEP_IMG: Cache file not found for step {step_number}, next step won't have reference")
                        previous_image_bytes = None
                except Exception as e:
                    logger.error(f"STEP_IMG: Error loading step {step_number} image: {e}")
                    previous_image_bytes = None
            else:
                logger.warning(f"STEP_IMG: Step {step_number} failed, next step won't have reference")
                previous_image_bytes = None
            
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
        
        logger.info(f"STEP_IMG: ✓ Completed SEQUENTIAL generation: {len(results) - failed_count}/{len(results)} successful")
        
        return results


# Singleton instance
_step_image_generator: Optional[StepImageGenerator] = None

def get_step_image_generator() -> StepImageGenerator:
    """Get or create the step image generator singleton."""
    global _step_image_generator
    if _step_image_generator is None:
        gemini_api_key = os.getenv("GEMINI_API_KEY")
        if not gemini_api_key:
            raise ValueError("GEMINI_API_KEY not found")
        _step_image_generator = StepImageGenerator(gemini_api_key)
    return _step_image_generator
