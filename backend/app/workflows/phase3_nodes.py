"""
Phase 3 LangGraph nodes for Image Generation & User Interaction.
Implements PR1 (Prompt Builder), IMG (Imagen Generation), A1 (Assembly), and Magic Pencil system.
"""
import json
import time
import logging
import asyncio
from typing import Dict, Any, List, Optional
import os
import google.generativeai as genai
from app.workflows.state import WorkflowState, ConceptVariant
from app.ai_service.production_gemini import call_gemini_with_retry as production_call_gemini
from app.core.config import settings
from app.core.redis import redis_service
from app.knowledge.material_affordances import material_kb, MaterialType
import httpx
import base64
from io import BytesIO

logger = logging.getLogger(__name__)

# Get API base URL from environment (for image URLs)
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")

# Structured output schemas for Phase 3
PROMPT_BUILDER_SCHEMA = {
    "type": "object",
    "properties": {
        "concept_prompts": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "style": {"type": "string", "enum": ["minimalist", "decorative", "functional"]},
                    "primary_prompt": {"type": "string"},
                    "negative_prompt": {"type": "string"},
                    "style_keywords": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "material_emphasis": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "lighting_mood": {"type": "string"},
                    "composition_notes": {"type": "string"},
                    "quality_enhancers": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                },
                "required": ["style", "primary_prompt", "negative_prompt"]
            }
        },
        "generation_metadata": {
            "type": "object",
            "properties": {
                "project_context": {"type": "string"},
                "material_story": {"type": "string"},
                "complexity_level": {"type": "string"},
                "target_aesthetic": {"type": "string"}
            }
        }
    },
    "required": ["concept_prompts"]
}

PREVIEW_ASSEMBLY_SCHEMA = {
    "type": "object",
    "properties": {
        "project_overview": {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "description": {"type": "string"},
                "category": {"type": "string"},
                "estimated_time": {"type": "string"},
                "difficulty_level": {"type": "string"}
            }
        },
        "bill_of_materials": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "item": {"type": "string"},
                    "source": {"type": "string"},
                    "quantity": {"type": "string"},
                    "preparation": {"type": "string"}
                }
            }
        },
        "tools_required": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "tool": {"type": "string"},
                    "purpose": {"type": "string"},
                    "alternatives": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                }
            }
        },
        "construction_steps": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "step_number": {"type": "integer"},
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "safety_notes": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "tips": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                }
            }
        },
        "esg_assessment": {
            "type": "object",
            "properties": {
                "environmental_impact": {"type": "string"},
                "materials_saved": {"type": "string"},
                "carbon_footprint": {"type": "string"},
                "sustainability_score": {"type": "number"},
                "recyclability": {"type": "string"}
            }
        },
        "safety_summary": {
            "type": "object",
            "properties": {
                "safety_level": {"type": "string"},
                "key_precautions": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "ppe_required": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            }
        }
    },
    "required": ["project_overview", "bill_of_materials", "tools_required", "construction_steps"]
}

# Configure Gemini client for this module
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)
elif os.getenv("GOOGLE_API_KEY"):
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))



async def prompt_builder_node(state: WorkflowState) -> Dict[str, Any]:
    """
    PR1 Node: Build optimized prompts for 3 concept variations.
    Uses Gemini Pro for intelligent prompt engineering based on selected project.
    """
    logger.info(f"PR1: Starting prompt building for thread {state.thread_id}")

    # Validate inputs - use viable_options (all 3 ideas) instead of selected_option
    if not state.viable_options or len(state.viable_options) == 0:
        logger.error("PR1: No options available for prompt building")
        message = "Prompt building requires generated project options"
        state.errors.append(message)
        return {
            "errors": state.errors,
            "current_node": "PR1"
        }

    # Generate HERO image prompts for ALL 3 ideas
    # Create detailed, professional prompts optimized for AI image generation
    all_concept_variants = []
    
    for idx, option in enumerate(state.viable_options[:3]):
        project_title = option.get("title", "Upcycled Project")
        project_description = option.get("description", "")
        materials = option.get("key_materials") or option.get("materials_used", [])
        style_hint = option.get("style_hint", ["minimalist", "decorative", "functional"][idx])
        
        # Build style-specific prompt enhancements
        style_prompts = {
            "minimalist": {
                "aesthetic": "clean lines, simple geometry, monochromatic palette, negative space",
                "lighting": "soft natural lighting, subtle shadows, bright and airy",
                "composition": "centered, balanced, uncluttered background, sharp focus",
                "mood": "serene, elegant, modern"
            },
            "decorative": {
                "aesthetic": "ornate details, rich textures, warm color palette, artistic flourishes",
                "lighting": "golden hour lighting, warm ambient glow, soft highlights",
                "composition": "artfully arranged, layered depth, decorative backdrop",
                "mood": "inviting, creative, handcrafted charm"
            },
            "functional": {
                "aesthetic": "practical design, clear functionality, technical precision, structured form",
                "lighting": "bright studio lighting, even illumination, crisp details",
                "composition": "isometric or 3/4 view, technical clarity, neutral background",
                "mood": "efficient, innovative, purposeful"
            }
        }
        
        style_details = style_prompts.get(style_hint.lower(), style_prompts["functional"])
        materials_list = ', '.join(materials[:3]) if materials else "recycled materials"
        
        # Create detailed hero image prompt
        hero_prompt = f"""Hero product photography of {project_title}: {project_description}.

MATERIALS: Crafted from upcycled {materials_list}, showcasing sustainable design and creative reuse.

STYLE: {style_hint.title()} aesthetic - {style_details['aesthetic']}

COMPOSITION: {style_details['composition']}, professional product photography, 8K resolution, ultra-detailed

LIGHTING: {style_details['lighting']}, professional studio quality

MOOD: {style_details['mood']}, eco-friendly, artisanal craftsmanship

QUALITY: Magazine-quality hero image, commercial photography, photorealistic rendering, sharp focus throughout, professional color grading

CONTEXT: Sustainable upcycling project, waste-to-value transformation, environmentally conscious design"""
        
        variant = ConceptVariant(
            style=style_hint,
            description=project_description,
            image_prompt=hero_prompt,
            feasibility_score=0.8,
            aesthetic_score=0.0,
            esg_score=0.7,
            estimated_time=option.get("estimated_time", "2-4 hours"),
            difficulty_level=option.get("difficulty_level", "intermediate")
        )
        all_concept_variants.append(variant)
    
    state.concept_variants = all_concept_variants
    state.current_node = "IMG"
    
    logger.info(f"PR1: Generated {len(all_concept_variants)} concept prompts for all ideas")
    
    return {
        "concept_variants": all_concept_variants,
        "current_node": "IMG"
    }


async def image_generation_node(state: WorkflowState) -> Dict[str, Any]:
    """
    IMG Node: Generate high-quality HERO images for all 3 concept variations.
    Creates professional, magazine-quality product photography for user selection.
    """
    logger.info(f"IMG: Starting hero image generation for all concepts: {state.thread_id}")

    # Validate inputs
    if not state.concept_variants:
        logger.error("IMG: No concept variants available for image generation")
        state.errors.append("Image generation requires concept prompts")
        return {
            "errors": state.errors,
            "current_node": "IMG"
        }

    async def generate_single_image(variant: ConceptVariant, semaphore: asyncio.Semaphore, title: str = "Concept") -> ConceptVariant:
        """Generate a single high-quality hero image with rate limiting using Gemini."""
        async with semaphore:
            try:
                from google import genai as google_genai
                from google.genai import types
                
                # Initialize Gemini client for image generation
                gemini_api_key = os.getenv("GEMINI_API_KEY")
                if not gemini_api_key:
                    raise ValueError("GEMINI_API_KEY not found")
                
                client = google_genai.Client(api_key=gemini_api_key)
                
                logger.info(f"IMG: Calling Gemini to generate {variant.style} image for: {title}")
                logger.info(f"IMG: Using prompt: {variant.image_prompt[:200]}...")
                
                # Call Gemini Nano Banana (gemini-2.5-flash-image) for image generation
                response = client.models.generate_content(
                    model="gemini-2.5-flash-image",
                    contents=[variant.image_prompt]  # Use our detailed hero prompt
                )
                
                logger.info("IMG: Received response from Gemini")
                
                # Extract generated image from response
                image_base64 = None
                if hasattr(response, 'candidates') and response.candidates:
                    candidate = response.candidates[0]
                    if hasattr(candidate, 'content') and candidate.content:
                        if hasattr(candidate.content, 'parts') and candidate.content.parts:
                            for part in candidate.content.parts:
                                if hasattr(part, 'inline_data') and part.inline_data is not None:
                                    logger.info("IMG: ✓ Found generated image in Gemini response")
                                    image_base64 = base64.b64encode(part.inline_data.data).decode()
                                    break
                                elif hasattr(part, 'text') and part.text is not None:
                                    logger.info(f"IMG: Gemini text response: {part.text[:200]}...")
                
                variant.image_id = f"hero_{state.thread_id}_{variant.style}_{int(time.time())}"
                variant.aesthetic_score = 0.95 if image_base64 else 0.5

                # Store image metadata with REAL generated image
                image_key = f"image:{variant.image_id}"
                image_metadata = {
                    "thread_id": state.thread_id,
                    "style": variant.style,
                    "title": title,
                    "prompt": variant.image_prompt,
                    "generated_at": time.time(),
                    "quality": "hero",
                    "model": "gemini-2.5-flash-image",
                    "status": "generated" if image_base64 else "placeholder",
                    "base64_data": image_base64 if image_base64 else None  # Store actual image!
                }
                redis_service.set(image_key, json.dumps(image_metadata), ex=7200)

                if image_base64:
                    logger.info(f"IMG: ✓ Successfully generated real AI image for {title}")
                else:
                    logger.warning(f"IMG: ✗ No image in Gemini response, will use placeholder for {title}")
                
                return variant

            except Exception as e:
                logger.error(f"IMG: Failed to create image metadata for {variant.style}: {str(e)}")
                variant.image_id = f"fallback_{state.thread_id}_{variant.style}_{int(time.time())}"
                variant.aesthetic_score = 0.5
                
                # Create fallback metadata
                fallback_metadata = {
                    "thread_id": state.thread_id,
                    "style": variant.style,
                    "title": title,
                    "prompt": variant.image_prompt,
                    "generated_at": time.time(),
                    "status": "fallback",
                    "notes": "Failed to generate image"
                }
                redis_service.set(
                    f"image:{variant.image_id}",
                    json.dumps(fallback_metadata),
                    ex=7200
                )
                return variant

    try:
        # Generate all 3 hero images sequentially for consistent quality
        semaphore = asyncio.Semaphore(1)
        generated_variants = []
        
        logger.info(f"IMG: Generating {len(state.concept_variants)} hero images with detailed prompts")
        
        for idx, variant in enumerate(state.concept_variants):
            # Get the title from the corresponding option
            title = state.viable_options[idx].get("title", "Concept") if idx < len(state.viable_options) else "Concept"
            logger.info(f"IMG: Generating HERO image {idx+1}/{len(state.concept_variants)} ({variant.style}): {title}")
            logger.info(f"IMG: Using detailed prompt: {variant.image_prompt[:150]}...")
            generated = await generate_single_image(variant, semaphore, title)
            generated_variants.append(generated)

        # Filter successful generations
        successful_variants = [
            variant for variant in generated_variants
            if isinstance(variant, ConceptVariant) and variant.image_id
        ]

        # Ensure we retain at least the original variants for downstream steps
        state.concept_variants = successful_variants or [
            variant for variant in generated_variants
            if isinstance(variant, ConceptVariant)
        ]

        # Build concept payload - map each image to its corresponding idea
        concept_payload = []
        timestamp = time.time()
        for idx, variant in enumerate(state.concept_variants):
            # Generate proper URL for our images endpoint
            image_url = f"{API_BASE_URL}/images/{variant.image_id}" if variant.image_id else f"{API_BASE_URL}/images/placeholder/{variant.style}"
            # Match image to its idea
            idea = state.viable_options[idx] if idx < len(state.viable_options) else {}
            
            concept_payload.append({
                "concept_id": f"concept_{idx}",
                "idea_id": idea.get("option_id", f"option_{idx}"),
                "title": idea.get("title", variant.style),
                "style": variant.style,
                "description": variant.description,
                "image_url": image_url,
                "version": 1,
                "edit_history": []
            })

        state.concept_images = {
            "concepts": concept_payload,
            "metadata": {
                "generated_at": timestamp,
                "thread_id": state.thread_id,
                "quality": "hero",  # Hero quality images
                "mode": "hero-placeholder" if not successful_variants else "hero-generated"
            }
        }

        # Save for frontend display (ideas + images together!)
        concepts_key = f"concepts:{state.thread_id}"
        redis_service.set(concepts_key, json.dumps(state.concept_images), ex=3600)
        
        state.current_node = "COMPLETE"  # End workflow after images (A1 removed)
        logger.info(f"IMG: Successfully generated {len(successful_variants)} HERO images for {len(state.viable_options)} ideas")

        return {
            "generated_variants": successful_variants,
            "generation_count": len(successful_variants),
            "concept_images": state.concept_images,
            "current_node": "COMPLETE"
        }

    except Exception as e:
        logger.error(f"IMG: Image generation failed: {str(e)}")
        state.errors.append(f"Image generation failed: {str(e)}")
        state.current_node = "COMPLETE"  # End workflow even with failures

    return {
        "generated_variants": state.concept_variants,
        "current_node": "COMPLETE"
    }


async def preview_assembly_node(state: WorkflowState) -> Dict[str, Any]:
    """
    A1 Node: Assemble complete project preview with BOM, tools, ESG data, and DIY guide.
    Uses Gemini Pro for comprehensive project documentation generation.
    
    Note: This node runs after image generation but before user selects a concept.
    It generates preview data for all 3 concepts.
    """
    logger.info(f"A1: Starting preview assembly for thread {state.thread_id}")

    # Validate inputs - use viable_options if selected_option not set yet
    if not state.ingredients_data:
        logger.error("A1: Missing ingredients data for preview assembly")
        return {
            "errors": ["Preview assembly requires ingredients data"],
            "current_node": "A1"
        }
    
    # Use selected_option if available, otherwise use first viable_option
    # (User might not have selected yet in auto-flow)
    selected_opt = state.selected_option
    if not selected_opt and state.viable_options:
        logger.info("A1: No selected_option, using first viable_option")
        selected_opt = state.viable_options[0]
    
    if not selected_opt:
        logger.error("A1: No project option available for preview assembly")
        return {
            "errors": ["Preview assembly requires at least one project option"],
            "current_node": "A1"
        }

    # Build comprehensive assembly prompt using selected_opt
    project_data = {
        "title": selected_opt.get("title", "Upcycled Project"),
        "description": selected_opt.get("description", ""),
        "materials": selected_opt.get("materials_used", []),
        "tools": selected_opt.get("tools_required", []),
        "steps": selected_opt.get("construction_steps", []),
        "difficulty": selected_opt.get("difficulty_level", "intermediate"),
        "time_estimate": selected_opt.get("estimated_time", "2-4 hours")
    }

    ingredients_detail = [
        {
            "name": ing.name,
            "material": ing.material,
            "size": ing.size,
            "condition": ing.condition,
            "category": ing.category
        }
        for ing in state.ingredients_data.ingredients
    ]

    assembly_prompt = f"""
    You are an expert DIY project documentarian and sustainability analyst.

    Create comprehensive project documentation for this upcycling project:

    PROJECT DETAILS:
    {json.dumps(project_data, indent=2)}

    AVAILABLE INGREDIENTS:
    {json.dumps(ingredients_detail, indent=2)}

    USER CONTEXT:
    - Original input: "{state.user_input}"
    - Project goal: "{state.goals}"
    - Complexity preference: {state.user_constraints.get('project_complexity', 'moderate')}

    Generate complete project documentation including:

    1. PROJECT OVERVIEW:
    - Clear title and description
    - Category and target use
    - Realistic time estimate
    - Appropriate difficulty level

    2. BILL OF MATERIALS:
    - Each ingredient from available materials
    - Source (recycled/upcycled from what)
    - Quantity needed
    - Any preparation required

    3. TOOLS REQUIRED:
    - Specific tools needed
    - Purpose for each tool
    - Alternative tools if applicable

    4. CONSTRUCTION STEPS:
    - Numbered step-by-step instructions
    - Clear descriptions for each step
    - Safety notes for any hazardous steps
    - Pro tips for better results

    5. ESG ASSESSMENT:
    - Environmental impact description
    - Materials saved from waste stream
    - Estimated carbon footprint reduction
    - Sustainability score (0-1)
    - End-of-life recyclability

    6. SAFETY SUMMARY:
    - Overall safety level
    - Key safety precautions
    - Required personal protective equipment

    Focus on practical, achievable instructions suitable for the stated difficulty level.
    Emphasize the sustainability benefits and waste reduction achieved.
    """

    try:
        # Call Gemini Pro for comprehensive assembly
        response = await production_call_gemini(
            prompt=assembly_prompt,
            task_type="analysis",
            response_schema=PREVIEW_ASSEMBLY_SCHEMA
        )

        if response and not response.get("error"):
            assembly_data = response  # Response is already parsed JSON

            # Update state with assembly data
            state.project_preview = assembly_data
            state.final_output = {
                "project_documentation": assembly_data,
                "concept_variants": [variant.model_dump() for variant in state.concept_variants],
                "generation_metadata": {
                    "completed_at": time.time(),
                    "total_ingredients_used": len(state.ingredients_data.ingredients),
                    "project_complexity": assembly_data["project_overview"].get("difficulty_level", "intermediate"),
                    "estimated_completion": assembly_data["project_overview"].get("estimated_time", "unknown")
                }
            }

            # Extract specific data for state
            state.esg_report = assembly_data.get("esg_assessment", {})
            state.bom_data = {
                "materials": assembly_data.get("bill_of_materials", []),
                "tools": assembly_data.get("tools_required", [])
            }

            # Save complete assembly to Redis
            assembly_key = f"assembly:{state.thread_id}"
            redis_service.set(assembly_key, json.dumps(assembly_data), ex=7200)

            state.current_node = "COMPLETE"
            state.current_phase = "complete"

            logger.info(f"A1: Preview assembly complete with {len(assembly_data.get('construction_steps', []))} steps")

            return {
                "final_output": state.final_output,
                "esg_report": state.esg_report,
                "bom_data": state.bom_data,
                "current_node": "COMPLETE",
                "current_phase": "complete"
            }

    except Exception as e:
        logger.error(f"A1: Preview assembly failed: {str(e)}")
        state.errors.append(f"Preview assembly failed: {str(e)}")

        # Create minimal fallback assembly
        fallback_bom = [
            {
                "item": ing.name or "Recycled material",
                "source": f"recycled {ing.material or 'material'}",
                "quantity": "1",
                "preparation": "Clean and pre-cut as needed"
            }
            for ing in state.ingredients_data.ingredients[:3]
        ] or [
            {
                "item": "Recycled plastic",
                "source": "household waste",
                "quantity": "1",
                "preparation": "Rinse thoroughly"
            },
            {
                "item": "Aluminum can",
                "source": "post-consumer",
                "quantity": "2",
                "preparation": "Flatten and smooth edges"
            }
        ]

        fallback_steps = [
            {
                "step_number": 1,
                "title": "Prepare materials",
                "description": "Clean and sort all recycled components",
                "safety_notes": ["Wear gloves when handling sharp edges"],
                "tips": ["Lay materials on a protected surface"],
            },
            {
                "step_number": 2,
                "title": "Assemble core structure",
                "description": "Combine primary materials following the concept layout",
                "safety_notes": ["Use a cutting mat for precision"],
                "tips": ["Dry-fit pieces before gluing"]
            },
            {
                "step_number": 3,
                "title": "Finish and detail",
                "description": "Add decorative finishes and ensure stability",
                "safety_notes": ["Allow adhesives to cure fully"],
                "tips": ["Apply sealant for durability"]
            }
        ]

        fallback_preview = {
            "project_overview": {
                "title": project_data["title"],
                "description": project_data["description"] or "Upcycled project created from household recyclables",
                "category": "upcycling",
                "estimated_time": project_data["time_estimate"],
                "difficulty_level": project_data["difficulty"]
            },
            "bill_of_materials": fallback_bom,
            "tools_required": [
                {
                    "tool": tool if isinstance(tool, str) else tool.get("tool", "Utility knife"),
                    "purpose": "assembly",
                    "alternatives": ["craft knife", "scissors"]
                }
                for tool in (project_data["tools"] or ["Precision knife", "Cutting mat"])
            ][:3],
            "construction_steps": fallback_steps,
            "esg_assessment": {
                "environmental_impact": "Diverts household waste into a reusable organizer",
                "materials_saved": "Plastic containers, aluminum cans",
                "carbon_footprint": "Low embodied carbon due to recycled inputs",
                "sustainability_score": 0.75,
                "recyclability": "High recyclable content"
            },
            "safety_summary": {
                "safety_level": "low",
                "key_precautions": [
                    "Use protective gloves when cutting",
                    "Ventilate space when applying adhesives"
                ],
                "ppe_required": ["Gloves", "Protective eyewear"]
            }
        }

        fallback_output = {"project_documentation": fallback_preview}
        state.project_preview = fallback_preview
        state.final_output = fallback_output

    state.current_node = "COMPLETE"
    state.current_phase = "complete"
    return {
        "final_output": state.final_output,
        "current_node": "COMPLETE",
        "current_phase": "complete"
    }


# Magic Pencil System (Edit functionality)
async def magic_pencil_edit(state: WorkflowState, edit_request: str, target_variant: str) -> Dict[str, Any]:
    """
    Magic Pencil: Process user edit requests for generated concept images.
    Uses Gemini for prompt modification and re-generation.
    """
    logger.info(f"PENCIL: Processing edit request for {target_variant}")

    # Find target variant
    target = None
    for variant in state.concept_variants:
        if variant.style == target_variant or variant.image_id == target_variant:
            target = variant
            break

    if not target:
        return {"error": f"Variant {target_variant} not found"}

    # Generate modified prompt based on edit request
    edit_prompt = f"""
    The user wants to modify this image concept:

    Original prompt: {target.image_prompt}
    Style: {target.style}

    User edit request: "{edit_request}"

    Create a modified image generation prompt that incorporates the user's requested changes
    while maintaining the core project concept and style consistency.

    Return only the modified prompt, optimized for image generation.
    """

    try:
        response = await production_call_gemini(
            prompt=edit_prompt,
            task_type="creative",
        )

        if response.get("text"):
            # Update variant with new prompt
            modified_prompt = response["text"].strip()
            target.image_prompt = modified_prompt

            # Add to edit history
            if not hasattr(state, 'edit_requests'):
                state.edit_requests = []
            state.edit_requests.append({
                "variant": target_variant,
                "request": edit_request,
                "timestamp": time.time()
            })

            # In production, would trigger new image generation here
            logger.info(f"PENCIL: Modified {target_variant} prompt based on edit request")

            return {
                "modified_variant": target,
                "new_prompt": modified_prompt,
                "status": "edit_applied"
            }

    except Exception as e:
        logger.error(f"PENCIL: Edit failed: {str(e)}")
        return {"error": f"Edit failed: {str(e)}"}


# Routing functions for Phase 3
def should_generate_images(state: WorkflowState) -> str:
    """Determine if prompt building is complete."""
    if state.concept_variants and len(state.concept_variants) > 0:
        return "image_generation"
    return "prompt_building"


def should_assemble_preview(state: WorkflowState) -> str:
    """Determine if image generation is complete."""
    if state.concept_variants and any(variant.image_id for variant in state.concept_variants):
        return "preview_assembly"
    return "image_generation"


def is_workflow_complete(state: WorkflowState) -> str:
    """Determine if workflow is complete."""
    if state.final_output and state.current_phase == "complete":
        return "END"
    return "preview_assembly"


# Additional Phase 3 routing functions for conditional edges
def should_proceed_to_assembly(state: WorkflowState) -> str:
    """Determine if images are ready for assembly."""
    # FIX: Always proceed to assembly after image generation
    # Don't loop back - we generate all images sequentially
    return "assembly"


def should_proceed_to_magic_pencil(state: WorkflowState) -> str:
    """Determine if Magic Pencil editing is needed."""
    # For now, always proceed to packaging after assembly
    # In production, this would check for user edit requests
    return "packaging"


# API-specific helper functions
async def apply_magic_pencil_edit(
    state_dict: Dict[str, Any],
    concept_id: int,
    edit_instruction: str,
    edit_type: str
) -> Dict[str, Any]:
    """Apply Magic Pencil editing to a concept image."""
    try:
        # Get current concepts
        concepts_data = state_dict.get("concept_images", {})
        concepts = concepts_data.get("concepts", [])

        if concept_id >= len(concepts):
            raise ValueError(f"Invalid concept ID: {concept_id}")

        current_concept = concepts[concept_id]

        # Create edit prompt based on instruction and type
        edit_prompt = f"""
        EDIT INSTRUCTION: {edit_instruction}
        EDIT TYPE: {edit_type}

        Current image: {current_concept.get('description', 'No description')}

        Apply the requested {edit_type} edit to modify the image according to the instruction.
        Maintain the core project concept while implementing the specific changes requested.

        Focus on: {edit_type}
        - style: visual appearance, color scheme, design aesthetic
        - material: surface textures, material properties, finishes
        - detail: fine details, precision elements, decorative aspects
        - composition: layout, proportions, spatial arrangement
        """

        # For now, simulate Magic Pencil with a refined prompt
        # In production, this would interface with actual image editing API
        edited_concept = current_concept.copy()
        edited_concept["edit_history"] = edited_concept.get("edit_history", [])
        edited_concept["edit_history"].append({
            "instruction": edit_instruction,
            "edit_type": edit_type,
            "timestamp": time.time()
        })

        # Update description to reflect the edit
        original_desc = edited_concept.get("description", "")
        edited_concept["description"] = f"{original_desc} [EDITED: {edit_instruction}]"

        # Simulate generating new image URL (in production, this would be actual image generation)
        edited_concept["image_url"] = f"{current_concept.get('image_url', '')}_edited_{int(time.time())}"
        edited_concept["version"] = edited_concept.get("version", 1) + 1

        return {
            "success": True,
            "updated_concept": edited_concept,
            "edit_applied": {
                "instruction": edit_instruction,
                "edit_type": edit_type,
                "timestamp": time.time()
            }
        }

    except Exception as e:
        logger.error(f"Magic Pencil edit failed: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "updated_concept": None
        }


async def create_final_package(
    state_dict: Dict[str, Any],
    selected_concept: Dict[str, Any],
    selection_info: Dict[str, Any]
) -> Dict[str, Any]:
    """Create final project package with all deliverables."""
    try:
        # Get workflow data
        ingredients_data = state_dict.get("ingredients_data", {})
        ingredients = ingredients_data.get("ingredients", [])
        selected_option = state_dict.get("selected_option", {})
        goals = state_dict.get("goals", "")

        # Create comprehensive package
        package = {
            "project_overview": {
                "title": selected_option.get("title", "Recycled Creation"),
                "description": selected_option.get("description", ""),
                "goals": goals,
                "difficulty": selected_option.get("difficulty_level", "moderate"),
                "estimated_time": selected_option.get("time_estimate", "2-4 hours"),
                "category": selected_option.get("category", "utility")
            },

            "selected_concept": {
                "concept_id": selection_info.get("concept_id", 0),
                "image_url": selected_concept.get("image_url", ""),
                "description": selected_concept.get("description", ""),
                "style": selected_concept.get("style", "functional"),
                "edit_history": selected_concept.get("edit_history", []),
                "user_feedback": selection_info.get("feedback", "")
            },

            "bill_of_materials": {
                "materials": [
                    {
                        "name": ing.get("name", "Unknown"),
                        "material": ing.get("material", "Unknown"),
                        "size": ing.get("size", "Standard"),
                        "category": ing.get("category", "General"),
                        "condition": ing.get("condition", "Good"),
                        "use_case": f"Primary component for {selected_option.get('title', 'project')}"
                    }
                    for ing in ingredients
                ],
                "tools_required": selected_option.get("tools_required", ["Basic tools"]),
                "estimated_cost": 0.0,
                "difficulty_level": selected_option.get("difficulty_level", "moderate"),
                "estimated_time": selected_option.get("time_estimate", "2-4 hours"),
                "safety_requirements": selected_option.get("safety_requirements", ["Safety glasses"])
            },

            "instructions": {
                "overview": selected_option.get("overview", ""),
                "steps": selected_option.get("steps", []),
                "tips": selected_option.get("tips", []),
                "troubleshooting": selected_option.get("troubleshooting", [])
            },

            "safety_information": {
                "safety_level": selected_option.get("safety_assessment", {}).get("safety_level", "medium"),
                "required_ppe": selected_option.get("safety_assessment", {}).get("required_ppe", []),
                "safety_warnings": selected_option.get("safety_assessment", {}).get("warnings", []),
                "first_aid": ["Keep first aid kit nearby", "Ensure adequate ventilation", "Work in well-lit area"]
            },

            "sustainability": {
                "environmental_impact": selected_option.get("esg_score", {}).get("environmental", 7),
                "waste_reduction": "High - repurposes discarded materials",
                "carbon_footprint": "Low - uses existing materials",
                "circular_economy": "Contributes to waste reduction and creative reuse"
            },

            "project_metadata": {
                "thread_id": state_dict.get("thread_id", ""),
                "creation_date": time.time(),
                "total_ingredients": len(ingredients),
                "processing_time": time.time() - state_dict.get("start_time", time.time()),
                "phases_completed": ["ingredient_discovery", "goal_formation", "choice_generation", "concept_creation"],
                "version": "1.0"
            }
        }

        return package

    except Exception as e:
        logger.error(f"Final package creation failed: {str(e)}")
        return {
            "error": str(e),
            "package_created": False,
            "timestamp": time.time()
        }
