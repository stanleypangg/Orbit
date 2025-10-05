"""
FastAPI router for LangGraph workflow orchestration.
Handles progressive ingredient discovery with interrupt/resume patterns.
"""
import asyncio
import uuid
from typing import Dict, Any, Optional
from fastapi import APIRouter, HTTPException, Query, BackgroundTasks
from fastapi.responses import StreamingResponse, Response
from pydantic import BaseModel, Field
import json
import time

from app.workflows.graph import workflow_orchestrator
from app.core.redis import redis_service

router = APIRouter(prefix="/workflow", tags=["workflow"])

# Use the global orchestrator instance


class StartWorkflowRequest(BaseModel):
    """Request to start a new workflow."""
    user_input: str = Field(..., description="User's recycling request")
    session_id: Optional[str] = Field(None, description="Optional session ID")


class ResumeWorkflowRequest(BaseModel):
    """Request to resume workflow with user clarification."""
    user_input: str = Field(..., description="User's clarification response")


class IngredientUpdateRequest(BaseModel):
    """Request to update ingredient data."""
    ingredient_index: int = Field(..., description="Index of ingredient to update")
    field: str = Field(..., description="Field to update (name, size, material, etc.)")
    value: str = Field(..., description="New value for the field")


class AddIngredientRequest(BaseModel):
    """Request to add new ingredient."""
    name: str = Field(..., description="Ingredient name")
    size: Optional[str] = Field(None, description="Ingredient size")
    material: str = Field(..., description="Ingredient material")
    category: Optional[str] = Field(None, description="Ingredient category")


class MagicPencilRequest(BaseModel):
    """Request for Magic Pencil image editing."""
    concept_id: int = Field(..., description="Index of concept to edit (0-2)")
    edit_instruction: str = Field(..., description="Natural language edit instruction")
    edit_type: str = Field(..., description="Type of edit: style, material, detail, composition")


class ConceptSelectionRequest(BaseModel):
    """Request to select final concept."""
    concept_id: int = Field(..., description="Index of selected concept (0-2)")
    feedback: Optional[str] = Field(None, description="Optional feedback on selection")


class WorkflowStatusResponse(BaseModel):
    """Workflow status response."""
    thread_id: str
    current_phase: str
    current_node: str
    needs_user_input: bool
    user_questions: list[str]
    completion_percentage: float
    ingredients_count: int
    errors: list[dict]


@router.post("/start")
async def start_workflow(
    request: StartWorkflowRequest,
    background_tasks: BackgroundTasks
) -> Dict[str, Any]:
    """
    Start a new workflow for recycling product generation.
    """
    try:
        # Generate unique thread ID
        thread_id = f"recycle_{uuid.uuid4().hex[:12]}"

        # Start workflow in background
        background_tasks.add_task(
            run_workflow_background,
            thread_id,
            request.user_input
        )

        return {
            "thread_id": thread_id,
            "status": "started",
            "message": "Workflow started successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start workflow: {e}")


@router.get("/stream/{thread_id}")
async def stream_workflow(thread_id: str):
    """
    Stream workflow progress and events.
    """
    async def event_generator():
        """Generate SSE events for workflow progress."""
        last_event_time = time.time()
        max_wait_time = 300  # 5 minutes timeout

        while True:
            try:
                # Check for workflow state updates
                state_key = f"workflow_state:{thread_id}"
                state_data = redis_service.get(state_key)

                if state_data:
                    state = json.loads(state_data)

                    # Send state update event
                    yield f"data: {json.dumps({'type': 'state_update', 'data': state})}\n\n"
                    last_event_time = time.time()

                # Check for ingredient updates
                ingredient_key = f"ingredients:{thread_id}"
                ingredient_data = redis_service.get(ingredient_key)

                if ingredient_data:
                    ingredients = json.loads(ingredient_data)
                    yield f"data: {json.dumps({'type': 'ingredients_update', 'data': ingredients})}\n\n"
                    
                    # Check if there are clarification questions in ingredients data
                    if ingredients.get("needs_clarification") and ingredients.get("clarification_questions"):
                        questions = ingredients["clarification_questions"]
                        # Send as user_question event
                        yield f"data: {json.dumps({'type': 'user_question', 'data': questions})}\n\n"

                # Also check workflow state for user_questions (alternative location)
                if state_data:
                    state_obj = json.loads(state_data) if isinstance(state_data, str) else state_data
                    result = state_obj.get("result", {})
                    if result.get("needs_user_input") and result.get("user_questions"):
                        questions = result["user_questions"]
                        yield f"data: {json.dumps({'type': 'user_question', 'data': questions})}\n\n"

                # Check for project choices (Phase 2: O1 node output)
                choices_key = f"choices:{thread_id}"
                choices_data = redis_service.get(choices_key)

                if choices_data:
                    choices = json.loads(choices_data)
                    if not choices.get("sent", False):
                        yield f"data: {json.dumps({'type': 'choices_generated', 'data': choices})}\n\n"
                        choices["sent"] = True
                        redis_service.set(choices_key, json.dumps(choices), ex=3600)

                # OPTIMIZATION 2: Check for hero image (single image, fast display)
                hero_key = f"hero_image:{thread_id}"
                hero_data = redis_service.get(hero_key)
                if hero_data:
                    hero = json.loads(hero_data)
                    if hero.get("ready") and not hero.get("sent"):
                        yield f"data: {json.dumps({'type': 'hero_image_ready', 'data': hero})}\n\n"
                        hero["sent"] = True
                        redis_service.set(hero_key, json.dumps(hero), ex=3600)
                
                # Check for concept generation updates (full set)
                concepts_key = f"concepts:{thread_id}"
                concepts_data = redis_service.get(concepts_key)

                if concepts_data:
                    concepts = json.loads(concepts_data)
                    yield f"data: {json.dumps({'type': 'concepts_generated', 'data': concepts})}\n\n"

                # Check for Magic Pencil edit updates
                magic_pencil_pattern = f"magic_pencil:{thread_id}:*"
                magic_pencil_keys = redis_service.keys(magic_pencil_pattern)

                for key in magic_pencil_keys:
                    edit_data = redis_service.get(key)
                    if edit_data:
                        edit_info = json.loads(edit_data)
                        if edit_info.get("status") == "completed":
                            yield f"data: {json.dumps({'type': 'magic_pencil_complete', 'data': edit_info})}\n\n"
                            # Mark as sent
                            edit_info["sent"] = True
                            redis_service.set(key, json.dumps(edit_info), ex=3600)

                # Check for concept selection
                selection_key = f"concept_selection:{thread_id}"
                selection_data = redis_service.get(selection_key)

                if selection_data:
                    selection = json.loads(selection_data)
                    if not selection.get("sent", False):
                        yield f"data: {json.dumps({'type': 'concept_selected', 'data': selection})}\n\n"
                        selection["sent"] = True
                        redis_service.set(selection_key, json.dumps(selection), ex=3600)

                # OPTIMIZATION 3: Check for essential package first (fast display)
                essential_key = f"package_essential:{thread_id}"
                essential_data = redis_service.get(essential_key)
                if essential_data:
                    essential = json.loads(essential_data)
                    if not essential.get("sent"):
                        yield f"data: {json.dumps({'type': 'package_essential_ready', 'data': essential})}\n\n"
                        essential["sent"] = True
                        redis_service.set(essential_key, json.dumps(essential), ex=3600)
                
                # Check for final package (full/detailed)
                package_key = f"project_package:{thread_id}"
                package_data = redis_service.get(package_key)

                if package_data:
                    package = json.loads(package_data)
                    if not package.get("sent", False):
                        yield f"data: {json.dumps({'type': 'project_package', 'data': package})}\n\n"
                        package["sent"] = True
                        redis_service.set(package_key, json.dumps(package), ex=3600)

                # Check for completion
                completion_key = f"workflow_complete:{thread_id}"
                if redis_service.exists(completion_key):
                    completion_data = redis_service.get(completion_key)
                    yield f"data: {json.dumps({'type': 'workflow_complete', 'data': json.loads(completion_data)})}\n\n"
                    break

                # Check for errors
                error_key = f"workflow_error:{thread_id}"
                error_data = redis_service.get(error_key)
                if error_data:
                    yield f"data: {json.dumps({'type': 'error', 'data': json.loads(error_data)})}\n\n"
                    redis_service.delete(error_key)

                # Timeout check
                if time.time() - last_event_time > max_wait_time:
                    yield f"data: {json.dumps({'type': 'timeout', 'message': 'Workflow timeout'})}\n\n"
                    break

                # Short delay to prevent overwhelming
                await asyncio.sleep(1)

            except Exception as e:
                yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"
                break

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"  # Disable Nginx buffering
        }
    )


@router.post("/resume/{thread_id}")
async def resume_workflow(
    thread_id: str,
    request: ResumeWorkflowRequest,
    background_tasks: BackgroundTasks
) -> Dict[str, Any]:
    """
    Resume workflow with user clarification.
    """
    try:
        # Resume workflow in background
        background_tasks.add_task(
            resume_workflow_background,
            thread_id,
            request.user_input
        )

        return {
            "thread_id": thread_id,
            "status": "resumed",
            "message": "Workflow resumed successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to resume workflow: {e}")


@router.get("/status/{thread_id}")
async def get_workflow_status(thread_id: str) -> WorkflowStatusResponse:
    """
    Get current workflow status.
    """
    try:
        # Get workflow state from Redis
        state_key = f"workflow_state:{thread_id}"
        state_data = redis_service.get(state_key)

        if not state_data:
            raise HTTPException(status_code=404, detail="Workflow not found")

        state = json.loads(state_data)

        # Get ingredients data
        ingredient_key = f"ingredients:{thread_id}"
        ingredient_data = redis_service.get(ingredient_key)
        ingredients = json.loads(ingredient_data) if ingredient_data else {"ingredients": []}

        # Calculate completion percentage
        completion_percentage = 0.0
        if ingredients.get("ingredients"):
            total_fields = len(ingredients["ingredients"]) * 4  # name, size, material, category
            filled_fields = sum(
                sum(1 for field in [ing.get("name"), ing.get("size"), ing.get("material"), ing.get("category")] if field)
                for ing in ingredients["ingredients"]
            )
            completion_percentage = (filled_fields / total_fields * 100) if total_fields > 0 else 0

        return WorkflowStatusResponse(
            thread_id=thread_id,
            current_phase=state.get("current_phase", "unknown"),
            current_node=state.get("current_node", "unknown"),
            needs_user_input=state.get("needs_user_input", False),
            user_questions=state.get("user_questions", []),
            completion_percentage=completion_percentage,
            ingredients_count=len(ingredients.get("ingredients", [])),
            errors=state.get("errors", [])
        )

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid state data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get status: {e}")


@router.get("/ingredients/{thread_id}")
async def get_ingredients(thread_id: str) -> Dict[str, Any]:
    """
    Get current ingredient data.
    """
    try:
        ingredient_key = f"ingredients:{thread_id}"
        ingredient_data = redis_service.get(ingredient_key)

        if not ingredient_data:
            return {"ingredients": [], "message": "No ingredients found"}

        return json.loads(ingredient_data)

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid ingredient data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get ingredients: {e}")


@router.post("/ingredients/{thread_id}/update")
async def update_ingredient(
    thread_id: str,
    request: IngredientUpdateRequest
) -> Dict[str, Any]:
    """
    Update specific ingredient field.
    """
    try:
        ingredient_key = f"ingredients:{thread_id}"
        ingredient_data = redis_service.get(ingredient_key)

        if not ingredient_data:
            raise HTTPException(status_code=404, detail="Ingredients not found")

        ingredients = json.loads(ingredient_data)

        # Validate ingredient index
        if request.ingredient_index >= len(ingredients.get("ingredients", [])):
            raise HTTPException(status_code=400, detail="Invalid ingredient index")

        # Update ingredient field
        ingredients["ingredients"][request.ingredient_index][request.field] = request.value
        ingredients["ingredients"][request.ingredient_index]["last_updated"] = time.time()

        # Save back to Redis
        redis_service.set(ingredient_key, json.dumps(ingredients), ex=3600)

        return {
            "message": "Ingredient updated successfully",
            "ingredient": ingredients["ingredients"][request.ingredient_index]
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid ingredient data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update ingredient: {e}")


@router.post("/ingredients/{thread_id}/add")
async def add_ingredient(
    thread_id: str,
    request: AddIngredientRequest
) -> Dict[str, Any]:
    """
    Add new ingredient to the list.
    """
    try:
        ingredient_key = f"ingredients:{thread_id}"
        ingredient_data = redis_service.get(ingredient_key)

        if ingredient_data:
            ingredients = json.loads(ingredient_data)
        else:
            ingredients = {"ingredients": [], "categories": {"containers": [], "fasteners": [], "decorative": [], "tools": []}}

        # Create new ingredient
        new_ingredient = {
            "name": request.name,
            "size": request.size,
            "material": request.material,
            "category": request.category,
            "confidence": 1.0,  # User-provided = high confidence
            "source": "user_input",
            "last_updated": time.time()
        }

        ingredients["ingredients"].append(new_ingredient)

        # Update categories if category is provided
        if request.category and request.category in ingredients["categories"]:
            if request.name not in ingredients["categories"][request.category]:
                ingredients["categories"][request.category].append(request.name)

        # Save back to Redis
        redis_service.set(ingredient_key, json.dumps(ingredients), ex=3600)

        return {
            "message": "Ingredient added successfully",
            "ingredient": new_ingredient,
            "total_ingredients": len(ingredients["ingredients"])
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid ingredient data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add ingredient: {e}")


@router.delete("/ingredients/{thread_id}")
async def cleanup_ingredients(thread_id: str) -> Dict[str, Any]:
    """
    Clean up temporary ingredient files.
    """
    try:
        ingredient_key = f"ingredients:{thread_id}"
        deleted = redis_service.delete(ingredient_key)

        return {
            "message": "Ingredients cleaned up successfully",
            "deleted": deleted > 0
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to cleanup: {e}")


@router.get("/concepts/{thread_id}")
async def get_concepts(thread_id: str) -> Dict[str, Any]:
    """
    Get generated concept images and metadata.
    """
    try:
        concepts_key = f"concepts:{thread_id}"
        concepts_data = redis_service.get(concepts_key)

        if not concepts_data:
            return {"concepts": [], "message": "No concepts found"}

        return json.loads(concepts_data)

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid concepts data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get concepts: {e}")


@router.post("/magic-pencil/{thread_id}")
async def magic_pencil_edit(
    thread_id: str,
    request: MagicPencilRequest,
    background_tasks: BackgroundTasks
) -> Dict[str, Any]:
    """
    Apply Magic Pencil editing to a concept image.
    """
    try:
        # Get current concepts
        concepts_key = f"concepts:{thread_id}"
        concepts_data = redis_service.get(concepts_key)

        if not concepts_data:
            raise HTTPException(status_code=404, detail="No concepts found")

        concepts = json.loads(concepts_data)

        # Validate concept ID
        if request.concept_id >= len(concepts.get("concepts", [])):
            raise HTTPException(status_code=400, detail="Invalid concept ID")

        # Store edit request
        edit_key = f"magic_pencil:{thread_id}:{request.concept_id}"
        edit_data = {
            "concept_id": request.concept_id,
            "edit_instruction": request.edit_instruction,
            "edit_type": request.edit_type,
            "timestamp": time.time(),
            "status": "pending"
        }
        redis_service.set(edit_key, json.dumps(edit_data), ex=3600)

        # Trigger Magic Pencil processing in background
        background_tasks.add_task(
            process_magic_pencil_edit,
            thread_id,
            request.concept_id,
            request.edit_instruction,
            request.edit_type
        )

        return {
            "message": "Magic Pencil edit initiated",
            "concept_id": request.concept_id,
            "edit_type": request.edit_type,
            "status": "processing"
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid concepts data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to initiate edit: {e}")


class OptionSelectionRequest(BaseModel):
    """Request to select a project option."""
    option_id: str = Field(..., description="ID of selected option")


@router.post("/select-option/{thread_id}")
async def select_option(
    thread_id: str,
    request: OptionSelectionRequest,
    background_tasks: BackgroundTasks
) -> Dict[str, Any]:
    """
    Select a project option and proceed to Phase 3.
    """
    try:
        # Get current choices
        choices_key = f"choices:{thread_id}"
        choices_data = redis_service.get(choices_key)

        if not choices_data:
            raise HTTPException(status_code=404, detail="No choices found")

        choices = json.loads(choices_data)
        viable_options = choices.get("viable_options", [])

        # Find the selected option
        selected_option = next((opt for opt in viable_options if opt.get("option_id") == request.option_id), None)

        if not selected_option:
            raise HTTPException(status_code=404, detail="Option not found")

        # Store selection
        selection_key = f"option_selection:{thread_id}"
        selection_data = {
            "option_id": request.option_id,
            "selected_option": selected_option,
            "timestamp": time.time()
        }
        redis_service.set(selection_key, json.dumps(selection_data), ex=3600)

        # OPTIMIZATION 1: Queue background task to generate details + proceed
        background_tasks.add_task(
            generate_detailed_and_continue,
            thread_id,
            request.option_id,
            selected_option
        )
        
        # Update workflow state to show progress
        state_key = f"workflow_state:{thread_id}"
        redis_service.set(state_key, json.dumps({
            "status": "running",
            "current_phase": "concept_generation",
            "current_node": "O1_detailed",  # Generating details
            "result": {}
        }), ex=3600)

        return {
            "message": "Option selected, generating detailed information...",
            "option_id": request.option_id,
            "status": "generating_details"
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid choices data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to select option: {e}")


@router.post("/select-concept/{thread_id}")
async def select_concept(
    thread_id: str,
    request: ConceptSelectionRequest,
    background_tasks: BackgroundTasks
) -> Dict[str, Any]:
    """
    Select final concept and proceed to packaging phase.
    """
    try:
        # Get current concepts
        concepts_key = f"concepts:{thread_id}"
        concepts_data = redis_service.get(concepts_key)

        if not concepts_data:
            raise HTTPException(status_code=404, detail="No concepts found")

        concepts = json.loads(concepts_data)

        # Validate concept ID
        if request.concept_id >= len(concepts.get("concepts", [])):
            raise HTTPException(status_code=400, detail="Invalid concept ID")

        # Store selection
        selection_key = f"concept_selection:{thread_id}"
        selection_data = {
            "concept_id": request.concept_id,
            "selected_concept": concepts["concepts"][request.concept_id],
            "feedback": request.feedback,
            "timestamp": time.time()
        }
        redis_service.set(selection_key, json.dumps(selection_data), ex=3600)

        # Update workflow state to proceed to packaging
        state_key = f"workflow_state:{thread_id}"
        state_data = redis_service.get(state_key)
        if state_data:
            state = json.loads(state_data)
            state["current_phase"] = "packaging"
            state["current_node"] = "H1"
            state["concept_selected"] = True
            redis_service.set(state_key, json.dumps(state), ex=3600)

        # Trigger packaging phase in background
        background_tasks.add_task(
            finalize_workflow,
            thread_id,
            request.concept_id
        )

        return {
            "message": "Concept selected successfully",
            "concept_id": request.concept_id,
            "status": "proceeding_to_packaging"
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid concepts data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to select concept: {e}")


@router.get("/project/{thread_id}")
async def get_project_package(thread_id: str) -> Dict[str, Any]:
    """
    Get complete project package with BOM, instructions, and selected concept.
    """
    try:
        # Get final project package
        package_key = f"project_package:{thread_id}"
        package_data = redis_service.get(package_key)

        if not package_data:
            raise HTTPException(status_code=404, detail="Project package not found")

        return json.loads(package_data)

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid package data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get project package: {e}")


@router.get("/exports/{thread_id}")
async def get_project_exports(thread_id: str, export_format: str = Query(..., description="Export format: json, html, pdf_config")) -> Dict[str, Any]:
    """
    Get project exports in different formats.
    """
    try:
        exports_key = f"exports:{thread_id}"
        exports_data = redis_service.get(exports_key)

        if not exports_data:
            raise HTTPException(status_code=404, detail="Exports not found")

        exports = json.loads(exports_data)

        if export_format not in exports:
            raise HTTPException(status_code=400, detail=f"Format '{export_format}' not available")

        return {
            "format": export_format,
            "data": exports[export_format],
            "generated_at": exports.get("metadata", {}).get("timestamp", ""),
            "thread_id": thread_id
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid exports data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get exports: {e}")


@router.get("/analytics/{thread_id}")
async def get_project_analytics(thread_id: str) -> Dict[str, Any]:
    """
    Get comprehensive project analytics and metrics.
    """
    try:
        analytics_key = f"analytics:{thread_id}"
        analytics_data = redis_service.get(analytics_key)

        if not analytics_data:
            raise HTTPException(status_code=404, detail="Analytics not found")

        return json.loads(analytics_data)

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid analytics data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get analytics: {e}")


@router.get("/sharing/{thread_id}")
async def get_sharing_content(thread_id: str, platform: Optional[str] = Query(None, description="Social platform: instagram, twitter, pinterest, linkedin")) -> Dict[str, Any]:
    """
    Get sharing content optimized for social media platforms.
    """
    try:
        sharing_key = f"sharing:{thread_id}"
        sharing_data = redis_service.get(sharing_key)

        if not sharing_data:
            raise HTTPException(status_code=404, detail="Sharing content not found")

        sharing_info = json.loads(sharing_data)

        if platform:
            platform_content = sharing_info.get("platform_content", {}).get(platform)
            if not platform_content:
                raise HTTPException(status_code=400, detail=f"Platform '{platform}' not supported")

            return {
                "platform": platform,
                "content": platform_content,
                "metadata": sharing_info.get("metadata", {}),
                "analytics_tracking": sharing_info.get("analytics_tracking", {})
            }

        return sharing_info

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid sharing data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get sharing content: {e}")


@router.post("/share/{thread_id}")
async def share_project(
    thread_id: str,
    platform: str,
    background_tasks: BackgroundTasks
) -> Dict[str, Any]:
    """
    Initiate project sharing to social media platform.
    """
    try:
        # Get sharing content
        sharing_key = f"sharing:{thread_id}"
        sharing_data = redis_service.get(sharing_key)

        if not sharing_data:
            raise HTTPException(status_code=404, detail="Sharing content not found")

        sharing_info = json.loads(sharing_data)
        platform_content = sharing_info.get("platform_content", {}).get(platform)

        if not platform_content:
            raise HTTPException(status_code=400, detail=f"Platform '{platform}' not supported")

        # Record sharing attempt
        share_record = {
            "thread_id": thread_id,
            "platform": platform,
            "timestamp": time.time(),
            "content": platform_content,
            "status": "initiated"
        }

        share_log_key = f"share_log:{thread_id}:{platform}:{int(time.time())}"
        redis_service.set(share_log_key, json.dumps(share_record), ex=86400)

        # In production, would integrate with actual social media APIs
        background_tasks.add_task(track_share_analytics, thread_id, platform)

        return {
            "message": "Sharing initiated",
            "platform": platform,
            "content_preview": platform_content.get("caption", "")[:100] + "..." if platform_content.get("caption") else "",
            "share_url": sharing_info.get("metadata", {}).get("share_url", ""),
            "status": "success"
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid sharing data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to share project: {e}")


@router.get("/final-package/{thread_id}")
async def get_final_package(thread_id: str) -> Dict[str, Any]:
    """
    Get the complete final project package with all deliverables.
    """
    try:
        package_key = f"final_package:{thread_id}"
        package_data = redis_service.get(package_key)

        if not package_data:
            raise HTTPException(status_code=404, detail="Final package not found")

        final_package = json.loads(package_data)

        # Add download information
        download_info = {
            "downloads_available": {
                "json": f"/workflow/exports/{thread_id}?export_format=json",
                "html": f"/workflow/exports/{thread_id}?export_format=html",
                "pdf": f"/workflow/exports/{thread_id}?export_format=pdf_config"
            },
            "sharing_ready": f"/workflow/sharing/{thread_id}",
            "analytics": f"/workflow/analytics/{thread_id}"
        }

        return {
            "final_package": final_package,
            "download_info": download_info,
            "package_metadata": final_package.get("package_metadata", {}),
            "completion_status": "complete"
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid package data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get final package: {e}")


@router.get("/download/{thread_id}/{format}")
async def download_project(thread_id: str, format: str):
    """
    Download project in specified format.
    """
    try:
        if format not in ["json", "html"]:
            raise HTTPException(status_code=400, detail="Unsupported download format")

        exports_key = f"exports:{thread_id}"
        exports_data = redis_service.get(exports_key)

        if not exports_data:
            raise HTTPException(status_code=404, detail="Download not available")

        exports = json.loads(exports_data)

        if format not in exports:
            raise HTTPException(status_code=404, detail=f"Format '{format}' not available")

        content = exports[format]

        if format == "json":
            response_content = json.dumps(content, indent=2)
            media_type = "application/json"
            filename = f"project_{thread_id}.json"
        elif format == "html":
            response_content = content.get("content", "")
            media_type = "text/html"
            filename = f"project_{thread_id}.html"

        return Response(
            content=response_content,
            media_type=media_type,
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid export data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to download: {e}")


@router.get("/health")
async def health_check() -> Dict[str, str]:
    """Health check endpoint."""
    try:
        # Test Redis connection
        redis_healthy = redis_service.ping()

        return {
            "status": "healthy" if redis_healthy else "degraded",
            "redis": "connected" if redis_healthy else "disconnected",
            "orchestrator": "initialized"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }


# Background task functions
async def run_workflow_background(thread_id: str, user_input: str):
    """Run workflow in background task with progress tracking."""
    try:
        import logging
        import asyncio
        logger = logging.getLogger(__name__)
        logger.info(f"Starting workflow background task for {thread_id}")
        
        # Initialize workflow state
        state_key = f"workflow_state:{thread_id}"
        initial_state = {
            "status": "running",
            "current_phase": "ingredient_discovery",
            "current_node": "P1a_extract",
            "result": {}
        }
        redis_service.set(state_key, json.dumps(initial_state), ex=3600)
        
        # Run workflow with progress monitoring
        workflow_task = asyncio.create_task(
            workflow_orchestrator.start_workflow(thread_id, user_input)
        )
        
        # Monitor progress while workflow runs
        while not workflow_task.done():
            await asyncio.sleep(0.5)  # Poll every 500ms
            
            # Update state from Redis if nodes are updating it
            # The nodes themselves will update the state
        
        result = await workflow_task
        logger.info(f"Workflow result: {result}")

        # Store final workflow state (serialize properly)
        result_data = result.get("result", {})
        
        # Convert IngredientsData to dict if present
        if result_data.get("ingredients_data"):
            if hasattr(result_data["ingredients_data"], "model_dump"):
                result_data["ingredients_data"] = result_data["ingredients_data"].model_dump()
        
        final_state = {
            "status": result.get("status", "complete"),
            "current_phase": result_data.get("current_phase", "complete"),
            "current_node": result_data.get("current_node", "END"),
            "result": result_data
        }
        redis_service.set(state_key, json.dumps(final_state), ex=3600)
        
        # Store ingredients if present
        if result.get("result") and result["result"].get("ingredients_data"):
            ingredients_key = f"ingredients:{thread_id}"
            ingredients_data = {
                "ingredients": result["result"]["ingredients_data"].get("ingredients", []),
                "categories": result["result"]["ingredients_data"].get("categories", {}),
                "confidence": result["result"]["ingredients_data"].get("confidence", 0.8),
                "needs_clarification": result["result"]["ingredients_data"].get("needs_clarification", False),
                "clarification_questions": result["result"]["ingredients_data"].get("clarification_questions", [])
            }
            redis_service.set(ingredients_key, json.dumps(ingredients_data), ex=3600)
            logger.info(f"Stored ingredients for {thread_id}")

        # Store final result if complete
        if result.get("status") == "phase_complete":
            completion_key = f"workflow_complete:{thread_id}"
            redis_service.set(completion_key, json.dumps(result), ex=3600)

    except Exception as e:
        import logging
        import traceback
        logger = logging.getLogger(__name__)
        logger.error(f"Workflow error for {thread_id}: {str(e)}")
        logger.error(traceback.format_exc())
        # Store error
        error_key = f"workflow_error:{thread_id}"
        redis_service.set(error_key, json.dumps({"error": str(e)}), ex=3600)


async def generate_detailed_and_continue(thread_id: str, option_id: str, selected_lite_option: Dict[str, Any]):
    """
    Generate final package for selected idea/image combo.
    Runs in background after user selects a concept image.
    """
    try:
        import logging
        logger = logging.getLogger(__name__)
        logger.info(f"Starting Phase 4 (final packaging) for selected option {option_id}")
        
        # Load workflow state
        from app.workflows.nodes import load_ingredients_from_redis
        from app.workflows.state import WorkflowState
        from app.workflows.phase4_nodes import final_packaging_node
        
        state_key = f"workflow_state:{thread_id}"
        state_data = redis_service.get(state_key)
        
        if state_data:
            state_dict = json.loads(state_data)
            ingredients_data = load_ingredients_from_redis(thread_id)
            
            # Load goals from Redis
            goals_key = f"goals:{thread_id}"
            goals_data = redis_service.get(goals_key)
            goals_info = json.loads(goals_data) if goals_data else {}
            
            # Load concept images
            concepts_key = f"concepts:{thread_id}"
            concepts_data = redis_service.get(concepts_key)
            concept_images = json.loads(concepts_data) if concepts_data else {}
            
            # Create WorkflowState for Phase 4
            workflow_state = WorkflowState(
                thread_id=thread_id,
                ingredients_data=ingredients_data,
                selected_option=selected_lite_option,
                concept_images=concept_images,
                user_input=state_dict.get("result", {}).get("user_input", ""),
                goals=goals_info.get("primary_goal", ""),
                artifact_type=goals_info.get("artifact_type", ""),
                current_phase="output_assembly",
                current_node="H1"
            )
            
            # Run Phase 4: H1 - Final packaging
            logger.info("Phase 4: H1 - Final packaging")
            result_h1 = await final_packaging_node(workflow_state)
            
            # Store complete workflow result
            redis_service.set(state_key, json.dumps({
                "status": "complete",
                "current_phase": "complete",
                "current_node": "COMPLETE",
                "result": {
                    "final_package": result_h1.get("final_package"),
                    "essential_package": result_h1.get("essential_package")
                }
            }), ex=3600)
            
            # Mark workflow as complete
            completion_key = f"workflow_complete:{thread_id}"
            redis_service.set(completion_key, json.dumps({
                "status": "complete",
                "final_package": result_h1.get("final_package")
            }), ex=3600)
            
            logger.info(f"Phase 4 complete for {thread_id}")
            
    except Exception as e:
        import logging
        import traceback
        logger = logging.getLogger(__name__)
        logger.error(f"Failed to complete Phase 4: {str(e)}")
        logger.error(traceback.format_exc())
        
        # Store error
        error_key = f"workflow_error:{thread_id}"
        redis_service.set(error_key, json.dumps({"error": str(e)}), ex=3600)


async def resume_workflow_background(thread_id: str, user_input: str):
    """Resume workflow in background task."""
    try:
        result = await workflow_orchestrator.continue_workflow(thread_id, user_input)

        # Store workflow state updates
        state_key = f"workflow_state:{thread_id}"
        redis_service.set(state_key, json.dumps(result), ex=3600)

        # Store result if workflow completed
        if result.get("status") == "phase_complete":
            completion_key = f"workflow_complete:{thread_id}"
            redis_service.set(completion_key, json.dumps(result), ex=3600)

    except Exception as e:
        # Store error
        error_key = f"workflow_error:{thread_id}"
        redis_service.set(error_key, json.dumps({"error": str(e)}), ex=3600)


async def process_magic_pencil_edit(thread_id: str, concept_id: int, edit_instruction: str, edit_type: str):
    """Process Magic Pencil editing request in background."""
    try:
        from app.workflows.phase3_nodes import apply_magic_pencil_edit

        # Get current state
        state_key = f"workflow_state:{thread_id}"
        state_data = redis_service.get(state_key)

        if state_data:
            state_dict = json.loads(state_data)

            # Apply Magic Pencil edit
            edit_result = await apply_magic_pencil_edit(
                state_dict,
                concept_id,
                edit_instruction,
                edit_type
            )

            # Update concepts in Redis
            concepts_key = f"concepts:{thread_id}"
            concepts_data = redis_service.get(concepts_key)
            if concepts_data:
                concepts = json.loads(concepts_data)
                if concept_id < len(concepts["concepts"]):
                    concepts["concepts"][concept_id] = edit_result["updated_concept"]
                    redis_service.set(concepts_key, json.dumps(concepts), ex=3600)

            # Update edit status
            edit_key = f"magic_pencil:{thread_id}:{concept_id}"
            edit_data = {
                "concept_id": concept_id,
                "edit_instruction": edit_instruction,
                "edit_type": edit_type,
                "timestamp": time.time(),
                "status": "completed",
                "result": edit_result
            }
            redis_service.set(edit_key, json.dumps(edit_data), ex=3600)

    except Exception as e:
        # Store error
        edit_key = f"magic_pencil:{thread_id}:{concept_id}"
        edit_data = {
            "concept_id": concept_id,
            "edit_instruction": edit_instruction,
            "edit_type": edit_type,
            "timestamp": time.time(),
            "status": "failed",
            "error": str(e)
        }
        redis_service.set(edit_key, json.dumps(edit_data), ex=3600)


async def finalize_workflow(thread_id: str, concept_id: int):
    """Finalize workflow with selected concept in background."""
    try:
        from app.workflows.phase3_nodes import create_final_package

        # Get all workflow data
        state_key = f"workflow_state:{thread_id}"
        state_data = redis_service.get(state_key)

        concepts_key = f"concepts:{thread_id}"
        concepts_data = redis_service.get(concepts_key)

        selection_key = f"concept_selection:{thread_id}"
        selection_data = redis_service.get(selection_key)

        if state_data and concepts_data and selection_data:
            state_dict = json.loads(state_data)
            concepts = json.loads(concepts_data)
            selection = json.loads(selection_data)

            # Create final project package
            package = await create_final_package(
                state_dict,
                concepts["concepts"][concept_id],
                selection
            )

            # Store final package
            package_key = f"project_package:{thread_id}"
            redis_service.set(package_key, json.dumps(package), ex=3600)

            # Mark workflow as complete
            completion_key = f"workflow_complete:{thread_id}"
            completion_data = {
                "status": "complete",
                "thread_id": thread_id,
                "final_package": package,
                "completion_time": time.time()
            }
            redis_service.set(completion_key, json.dumps(completion_data), ex=3600)

    except Exception as e:
        # Store error
        error_key = f"workflow_error:{thread_id}"
        redis_service.set(error_key, json.dumps({"error": str(e), "phase": "finalization"}), ex=3600)


async def track_share_analytics(thread_id: str, platform: str):
    """Track sharing analytics in background."""
    try:
        # Record sharing analytics
        analytics_key = f"share_analytics:{thread_id}:{platform}"
        analytics_data = {
            "thread_id": thread_id,
            "platform": platform,
            "shared_at": time.time(),
            "source": "ai_generator",
            "campaign": "user_project_share"
        }

        redis_service.set(analytics_key, json.dumps(analytics_data), ex=86400)

        # Update aggregate sharing stats
        daily_key = f"daily_shares:{time.strftime('%Y-%m-%d')}"
        redis_service.incr(daily_key, 1)
        redis_service.expire(daily_key, 86400 * 30)  # Keep for 30 days

    except Exception as e:
        logger.error(f"Failed to track share analytics: {str(e)}")