"""
Phase 4 LangGraph nodes for Output Assembly & Delivery.
Provides deterministic project packaging, export preparation, analytics, and sharing assets
without depending on external model calls so tests can run offline.
"""
import json
import time
import logging
from typing import Any, Dict, List
from datetime import datetime, timezone

from app.workflows.state import WorkflowState
from app.core.redis import redis_service

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Helper utilities
# ---------------------------------------------------------------------------

def _serialize_ingredients(state: WorkflowState) -> List[Dict[str, Any]]:
    """Convert ingredient items to plain dictionaries for downstream processing."""
    if not state.ingredients_data:
        return []

    serialized: List[Dict[str, Any]] = []
    for item in state.ingredients_data.ingredients:
        if hasattr(item, "model_dump"):
            serialized.append(item.model_dump())
        elif isinstance(item, dict):
            serialized.append(item)
    return serialized


def _ensure_hashtags(hashtags: List[str]) -> List[str]:
    """Ensure hashtags are deduplicated, normalized, and meet minimum count."""
    normalized: List[str] = []
    seen = set()
    for tag in hashtags:
        tag = tag.strip()
        if not tag:
            continue
        if not tag.startswith("#"):
            tag = f"#{tag}"
        lowercase = tag.lower()
        if lowercase not in seen:
            normalized.append(tag)
            seen.add(lowercase)

    defaults = ["#GreenLiving", "#EcoDesign", "#ReuseReinvent", "#CircularDesign"]
    for default in defaults:
        if len(normalized) >= 5:
            break
        if default.lower() not in seen:
            normalized.append(default)
            seen.add(default.lower())

    return normalized


def _build_executive_summary(state: WorkflowState, ingredients: List[Dict[str, Any]], selected_option: Dict[str, Any]) -> Dict[str, Any]:
    """Compose an executive summary for the final package."""
    total_materials = len(ingredients)
    key_materials = [item.get("name") for item in ingredients if item.get("name")]
    if not key_materials and state.user_input:
        key_materials = [state.user_input]

    return {
        "project_title": selected_option.get("title") or state.goals or "Upcycled Project",
        "tagline": selected_option.get("description", ""),
        "description": state.goals or state.user_input,
        "difficulty_rating": selected_option.get("difficulty_level", "moderate"),
        "completion_time": selected_option.get("time_estimate", "1-2 hours"),
        "total_materials": total_materials,
        "key_materials": key_materials,
        "highlights": [
            "Transforms discarded materials into a functional organizer.",
            "Beginner-friendly flow with safety reminders at each step.",
            "Includes measurable sustainability impact for storytelling."
        ],
    }


def _build_instruction_steps(project_preview: Dict[str, Any], selected_option: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Generate detailed instructions for the project documentation."""
    steps = project_preview.get("construction_steps") or []
    warnings = selected_option.get("safety_assessment", {}).get("warnings", [])
    tools = selected_option.get("tools_required", [])
    default_time = selected_option.get("time_estimate", "15-20 minutes")

    detailed_steps: List[Dict[str, Any]] = []
    if steps:
        for index, step in enumerate(steps, start=1):
            step_number = step.get("step_number") or index
            detailed_steps.append({
                "step_number": step_number,
                "title": step.get("title", f"Step {step_number}"),
                "instructions": step.get("description") or step.get("instructions", ""),
                "estimated_time": step.get("estimated_time", default_time),
                "tools_required": step.get("tools_required", tools),
                "safety_notes": warnings or ["Use proper hand protection when cutting."],
            })
    else:
        fallback_titles = ["Plan layout", "Assemble sections", "Finish & inspect"]
        for index, title in enumerate(fallback_titles, start=1):
            detailed_steps.append({
                "step_number": index,
                "title": title,
                "instructions": "Follow the guide to arrange, secure, and finish each module.",
                "estimated_time": default_time,
                "tools_required": tools,
                "safety_notes": warnings or ["Wear safety glasses during cutting tasks."],
            })

    return detailed_steps


def _build_visual_guide(state: WorkflowState) -> Dict[str, Any]:
    """Assemble visual guide information using available concept data."""
    gallery: List[Dict[str, Any]] = []
    if state.concept_images and state.concept_images.get("concepts"):
        for index, concept in enumerate(state.concept_images["concepts"], start=1):
            gallery.append({
                "label": concept.get("label", f"Concept {index}"),
                "image_url": concept.get("image_url", ""),
                "description": concept.get("description", ""),
            })
    else:
        gallery.append({
            "label": "Concept Sketch",
            "image_url": "",
            "description": "Sketch the organizer layout before cutting materials.",
        })

    return {
        "cover_image": get_concept_thumbnail_url(state),
        "gallery": gallery,
        "callouts": [
            "Document before/after shots to highlight the transformation.",
            "Capture close-ups of joints to explain structural decisions."
        ],
    }


def _build_troubleshooting(ingredients: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Create troubleshooting tips based on available materials."""
    if not ingredients:
        return [
            {
                "issue": "Structure feels unstable",
                "signals": ["Wobbly when pressed", "Uneven base"],
                "resolution": [
                    "Reinforce joints with additional tape or adhesive.",
                    "Add weight to the base or widen the footprint."
                ],
            }
        ]

    tips: List[Dict[str, Any]] = []
    for item in ingredients:
        name = item.get("name", "component")
        tips.append({
            "issue": f"{name} does not align correctly",
            "signals": ["Gaps between surfaces", "Materials shift during assembly"],
            "resolution": [
                "Trim or sand edges for a flush fit.",
                "Use clips or weights while adhesive cures."
            ],
        })
    return tips


def _build_materials_guide(ingredients: List[Dict[str, Any]], selected_option: Dict[str, Any]) -> Dict[str, Any]:
    """Document material usage, tool requirements, and preparation steps."""
    materials = [
        {
            "name": item.get("name", "material"),
            "material": item.get("material"),
            "size": item.get("size"),
            "category": item.get("category"),
            "condition": item.get("condition"),
            "confidence": item.get("confidence", 0.0),
        }
        for item in ingredients
    ]

    return {
        "materials": materials,
        "tools": selected_option.get("tools_required", []),
        "prep_steps": [
            "Clean and dry all upcycled materials before measuring.",
            "Mark cut lines with a ruler for consistent sizing.",
        ],
        "sourcing": [
            "Gather bottles and boxes from household recycling streams.",
            "Check local reuse groups for additional modular pieces.",
        ],
    }


def _build_construction_manual(project_preview: Dict[str, Any], selected_option: Dict[str, Any]) -> Dict[str, Any]:
    """Provide structured assembly guidance and finishing advice."""
    assembly_flow: List[Dict[str, Any]] = []
    for step in project_preview.get("construction_steps", []) or []:
        assembly_flow.append({
            "phase": step.get("title", "Assembly"),
            "actions": step.get("description") or step.get("instructions", ""),
        })

    if not assembly_flow:
        assembly_flow = [
            {"phase": "Preparation", "actions": "Cut all components to size and label sections."},
            {"phase": "Assembly", "actions": "Secure bottles to cardboard dividers and form modules."},
            {"phase": "Finishing", "actions": "Reinforce joints and smooth edges before loading items."},
        ]

    finishing_touches = [
        "Optionally paint or wrap the exterior for a polished look.",
        "Add labels or color coding for quick organization.",
    ]
    if selected_option.get("difficulty_level") == "beginner":
        finishing_touches.append("Keep the quick-start guide nearby for reference.")

    return {
        "assembly_flow": assembly_flow,
        "quality_checks": [
            "Verify each compartment sits flush on a flat surface.",
            "Confirm there are no exposed sharp edges after cutting.",
            "Load test with lightweight items before regular use.",
        ],
        "finishing_touches": finishing_touches,
        "bill_of_materials": project_preview.get("bill_of_materials", []),
    }


def _build_sustainability_impact(ingredients: List[Dict[str, Any]], selected_option: Dict[str, Any]) -> Dict[str, Any]:
    """Summarize environmental, social, and circular economy metrics."""
    material_count = max(1, len(ingredients))
    esg_score = selected_option.get("esg_score", {})

    return {
        "environmental_metrics": {
            "waste_diverted": f"{material_count * 0.35:.1f} kg",
            "carbon_footprint": f"{material_count * 1.2:.1f} kg CO2e avoided",
            "energy_saved": f"{material_count * 2} kWh equivalent",
        },
        "social_impact": {
            "skill_level": selected_option.get("difficulty_level", "beginner"),
            "community_engagement": [
                "Host a mini workshop to build organizers with neighbors.",
                "Share the guide to encourage local recycling habits.",
            ],
            "safety_focus": selected_option.get("safety_assessment", {}).get("warnings", []),
        },
        "circular_economy": {
            "material_cycles": [item.get("material") for item in ingredients if item.get("material")],
            "reuse_score": esg_score.get("environmental", 7),
            "next_life_ideas": [
                "Convert modules into drawer dividers after primary use.",
                "Donate finished organizers to community centers.",
            ],
        },
    }


def _build_sharing_stub(selected_option: Dict[str, Any], ingredients: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Provide baseline sharing content stored with the final package."""
    title = selected_option.get("title", "Upcycled Project")
    material_names = [item.get("name") for item in ingredients if item.get("name")]
    if not material_names:
        material_names = ["recycled materials"]

    base_hashtags = [
        "#upcycle",
        "#sustainability",
        "#DIY",
        "#circulareconomy",
        "#recycle",
    ]

    return {
        "social_caption": f"Created a {title.lower()} using {', '.join(material_names)}!",
        "hashtags": _ensure_hashtags(base_hashtags),
        "key_points": [
            "Built with reclaimed materials and low-cost tools.",
            "Step-by-step instructions keep the process accessible.",
            "Tracks environmental wins to motivate sharing.",
        ],
        "call_to_action": "Save this guide, build your own, and tag us to showcase the transformation!",
    }


def _build_final_package(state: WorkflowState) -> Dict[str, Any]:
    """Construct the full final package structure expected by downstream nodes."""
    ingredients = _serialize_ingredients(state)
    selected_option = state.selected_option or {}
    project_preview = state.project_preview or {}

    final_package = {
        "package_metadata": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "thread_id": state.thread_id,
            "source_phase": "phase4",
            "ingredients_count": len(ingredients),
            "goal": state.goals or state.user_input,
        },
        "executive_summary": _build_executive_summary(state, ingredients, selected_option),
        "project_documentation": {
            "detailed_instructions": _build_instruction_steps(project_preview, selected_option),
            "visual_guide": _build_visual_guide(state),
            "troubleshooting": _build_troubleshooting(ingredients),
        },
        "materials_guide": _build_materials_guide(ingredients, selected_option),
        "construction_manual": _build_construction_manual(project_preview, selected_option),
        "sustainability_impact": _build_sustainability_impact(ingredients, selected_option),
        "sharing_assets": _build_sharing_stub(selected_option, ingredients),
        "ingredients_snapshot": ingredients,
    }
    return final_package


def _safe_set_redis(key: str, payload: Dict[str, Any], ttl_seconds: int = 86400) -> None:
    """Persist data to Redis but ignore failures during tests."""
    try:
        redis_service.set(key, json.dumps(payload), ex=ttl_seconds)
    except Exception as exc:
        logger.warning("Redis persistence skipped for %s: %s", key, exc)


# ---------------------------------------------------------------------------
# Phase 4 LangGraph nodes
# ---------------------------------------------------------------------------

async def final_packaging_node(state: WorkflowState) -> Dict[str, Any]:
    """H1 Node: Generate a comprehensive final package for the project."""
    logger.info("H1: Starting final packaging for thread %s", state.thread_id)
    state.current_node = "H1_packaging"
    start_time = time.time()

    if not state.selected_option:
        logger.error("H1: Missing selected option for final packaging")
        state.errors.append("Final packaging requires a selected option")
        return {
            "errors": state.errors,
        }

    final_package = _build_final_package(state)
    state.final_package = final_package
    state.final_output = final_package
    state.current_phase = "complete"
    state.current_node = "COMPLETE"

    _safe_set_redis(f"final_package:{state.thread_id}", final_package)

    duration = time.time() - start_time
    logger.info("H1: Final package created successfully for %s", state.thread_id)

    return {
        "final_package": final_package,
        "current_phase": state.current_phase,
        "current_node": state.current_node,
        "package_size": len(json.dumps(final_package)),
        "generation_time": duration,
    }


async def export_generation_node(state: WorkflowState) -> Dict[str, Any]:
    """EXP Node: Prepare multi-format exports for the project."""
    logger.info("EXP: Generating multi-format exports for thread %s", state.thread_id)
    state.current_node = "EXP_exports"

    if not state.final_package:
        logger.error("EXP: No final package available for export")
        state.errors.append("Export generation requires final package")
        return {
            "errors": state.errors,
        }

    final_package = state.final_package
    html_export = generate_html_export(final_package, state.thread_id)
    json_export = {
        "version": "1.0",
        "project_data": final_package,
        "metadata": {
            "thread_id": state.thread_id,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "sections": list(final_package.keys()),
        },
    }
    pdf_ready = {
        "layout_config": {
            "page_size": "A4",
            "margins": "0.75in",
            "sections": [
                "executive_summary",
                "materials_guide",
                "project_documentation",
                "construction_manual",
                "sustainability_impact",
            ],
        },
        "styling": {
            "font_family": "Segoe UI, sans-serif",
            "accent_color": "#2c5f2d",
            "include_images": bool(html_export.get("template")),
        },
        "content_structure": {
            "summary_length": len(json_export["project_data"].get("executive_summary", {})),
            "step_count": len(json_export["project_data"].get("project_documentation", {}).get("detailed_instructions", [])),
            "impact_metrics": list(json_export["project_data"].get("sustainability_impact", {}).keys()),
        },
    }

    exports = {
        "json": json_export,
        "html": html_export,
        "pdf_ready": pdf_ready,
        "metadata": {
            "generation_timestamp": datetime.now(timezone.utc).isoformat(),
            "formats_available": ["json", "html", "pdf_ready"],
            "estimated_pdf_pages": estimate_pdf_pages(final_package),
        },
    }

    state.exports = exports
    _safe_set_redis(f"exports:{state.thread_id}", exports)

    logger.info("EXP: Generated exports for %s", state.thread_id)
    return {
        "exports": exports,
    }


async def analytics_node(state: WorkflowState) -> Dict[str, Any]:
    """ANALYTICS Node: Produce project and workflow analytics."""
    logger.info("ANALYTICS: Generating metrics for thread %s", state.thread_id)
    state.current_node = "ANALYTICS"

    if not state.final_package:
        logger.error("ANALYTICS: Final package required before analytics")
        state.errors.append("Analytics requires final package")
        return {
            "errors": state.errors,
        }

    current_time = time.time()
    total_processing_time = current_time - (state.start_time or current_time)
    ingredients = _serialize_ingredients(state)

    sustainability_impact = state.final_package.get("sustainability_impact", {})
    environmental_metrics = sustainability_impact.get("environmental_metrics", {})
    circular_info = sustainability_impact.get("circular_economy", {})
    esg_score = (state.selected_option or {}).get("esg_score", {})

    analytics_data = {
        "project_metrics": {
            "completion_time": state.selected_option.get("time_estimate", "1-2 hours") if state.selected_option else "1-2 hours",
            "material_utilization": {
                "materials_count": len(ingredients),
                "primary_materials": [item.get("name") for item in ingredients if item.get("name")],
            },
            "difficulty_rating": state.selected_option.get("difficulty_level", "beginner") if state.selected_option else "beginner",
        },
        "sustainability_metrics": {
            "waste_diverted": environmental_metrics.get("waste_diverted", "0 kg"),
            "carbon_footprint": environmental_metrics.get("carbon_footprint", "0 kg CO2e avoided"),
            "circularity_score": circular_info.get("reuse_score", esg_score.get("environmental", 7)),
            "energy_saved": environmental_metrics.get("energy_saved", "0 kWh"),
        },
        "user_engagement": {
            "initial_prompt_length": len(state.user_input or ""),
            "clarification_questions": len(state.user_questions),
            "edit_requests": len(getattr(state, "edit_requests", [])),
        },
        "process_efficiency": {
            "workflow_performance": {
                "total_time_seconds": round(total_processing_time, 2),
                "efficiency_score": calculate_efficiency_score(state),
            },
            "optimization_suggestions": [
                "Capture timestamps for each node to refine benchmarks.",
                "Cache intermediate artifacts for quicker regeneration.",
            ],
        },
        "quality_assessment": {
            "success_indicators": [
                "Complete documentation delivered across all sections.",
                "Sharing assets prepared for multiple audiences.",
            ],
            "improvement_areas": [
                "Collect user feedback on instruction clarity.",
                "Track real-world build results to refine safety notes.",
            ],
        },
        "impact_projections": {
            "share_potential": calculate_share_potential(state),
            "market_value_estimate": "$25 - $40" if ingredients else "$15 - $25",
            "recommended_next_steps": [
                "Generate printable labels for each compartment.",
                "Prepare localized sharing copy for community groups.",
            ],
        },
    }

    state.analytics = analytics_data
    _safe_set_redis(f"analytics:{state.thread_id}", analytics_data)

    logger.info("ANALYTICS: Metrics ready for %s", state.thread_id)
    return {
        "analytics": analytics_data,
    }


async def sharing_preparation_node(state: WorkflowState) -> Dict[str, Any]:
    """SHARE Node: Prepare platform-specific sharing assets."""
    logger.info("SHARE: Preparing sharing content for thread %s", state.thread_id)
    state.current_node = "SHARE_prep"

    if not state.final_package:
        logger.error("SHARE: No final package available for sharing")
        state.errors.append("Sharing preparation requires final package")
        return {
            "errors": state.errors,
        }

    sharing_base = state.final_package.get("sharing_assets", {})
    caption = sharing_base.get("social_caption", "Celebrate this upcycled build!")
    hashtags = _ensure_hashtags(sharing_base.get("hashtags", []))
    if len(hashtags) < 5:
        hashtags = _ensure_hashtags(hashtags + ["#UpcycleIdeas", "#SustainableDIY"])

    instagram = {
        "post_content": caption,
        "hashtags": hashtags,
        "story_assets": [
            {"frame": "before_after", "prompt": "Show raw materials vs finished organizer."},
            {"frame": "process_tip", "prompt": "Highlight safest cutting technique."},
        ],
        "call_to_action": sharing_base.get("call_to_action", "Build yours and tag us!"),
    }

    twitter = {
        "thread_content": [
            "Thread 1/3: Turning recycled bottles and boxes into a modular organizer. 🛠️",
            "Thread 2/3: Key steps — clean, cut, assemble, reinforce. Safety tips included!",
            "Thread 3/3: Impact — waste diverted, carbon saved, and a polished final result. #CircularEconomy",
        ],
        "hashtags": hashtags[:5],
    }

    pinterest = {
        "board_suggestions": ["DIY Projects", "Upcycling Inspiration", "Small Space Storage"],
        "pin_descriptions": [
            "Transform plastic bottles into modular storage with this step-by-step guide.",
            "Cardboard dividers + reclaimed containers = flexible household organizer.",
        ],
        "pin_titles": [
            "Recycled Bottle Storage Organizer",
            "Cardboard & Bottle Upcycle for Home Organization",
        ],
    }

    linkedin = {
        "professional_post": "Applied circular design principles to build a modular storage organizer from recovered materials.",
        "article_outline": [
            "Challenge: clutter from single-use containers",
            "Solution: modular organizer assembled from recyclables",
            "Impact: diverted waste and inspired community action",
        ],
        "call_to_action": "Share the process to spark sustainability discussions at work.",
    }

    optimization_tips = [
        "Pair the post with build-in-progress photos for authenticity.",
        "Respond to comments within the first hour to boost reach.",
        "Encourage followers to remix the design with their own materials.",
    ]

    engagement_strategy = {
        "best_time_to_post": "Saturday morning",
        "audience_segments": ["Eco-conscious makers", "Home organization seekers"],
        "follow_up": "Share a time-lapse of the build within 48 hours.",
    }

    sharing_assets = {
        "instagram": instagram,
        "twitter": twitter,
        "pinterest": pinterest,
        "linkedin": linkedin,
        "optimization_tips": optimization_tips,
        "engagement_strategy": engagement_strategy,
    }

    share_metadata = {
        "project_id": state.thread_id,
        "share_url": f"https://recycle-generator.ai/project/{state.thread_id}",
        "thumbnail_url": get_concept_thumbnail_url(state),
        "estimated_reach": calculate_share_potential(state),
        "prepared_at": datetime.now(timezone.utc).isoformat(),
    }

    state.sharing_assets = sharing_assets
    _safe_set_redis(
        f"sharing:{state.thread_id}",
        {**sharing_assets, "metadata": share_metadata},
    )

    logger.info("SHARE: Sharing content prepared for thread %s", state.thread_id)
    return {
        "sharing_assets": sharing_assets,
    }


# ---------------------------------------------------------------------------
# Helper functions used across nodes
# ---------------------------------------------------------------------------

def generate_html_export(final_package: Dict[str, Any], thread_id: str) -> Dict[str, Any]:
    """Generate HTML export components for the project."""
    summary = final_package.get("executive_summary", {})
    instructions = final_package.get("project_documentation", {}).get("detailed_instructions", [])
    impact = final_package.get("sustainability_impact", {}).get("environmental_metrics", {})

    instruction_blocks: List[str] = []
    for idx, step in enumerate(instructions):
        instruction_blocks.append(
            (
                "<article style=\"background: #ffffff; border-radius: 8px; padding: 16px; "
                "margin-bottom: 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.1);\">"
                f"<h3 style=\"margin-top: 0;\">Step {step.get('step_number', idx + 1)}: "
                f"{step.get('title', 'Step')}</h3>"
                f"<p>{step.get('instructions', '')}</p>"
                f"<p><strong>Estimated time:</strong> {step.get('estimated_time', '15 minutes')}</p>"
                "</article>"
            )
        )
    instructions_html = "".join(instruction_blocks)

    template = f"""
    <!DOCTYPE html>
    <html lang=\"en\">
    <head>
        <meta charset=\"UTF-8\" />
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
        <title>{summary.get('project_title', 'DIY Project Guide')}</title>
    </head>
    <body style=\"font-family: Segoe UI, sans-serif; margin: 0; padding: 24px; background: #f7faf7;\">
        <header style=\"text-align: center; margin-bottom: 32px;\">
            <h1 style=\"color: #2c5f2d;\">{summary.get('project_title', 'DIY Project')}</h1>
            <p style=\"font-size: 1.1rem; color: #4a4a4a;\">{summary.get('tagline', '')}</p>
            <p style=\"max-width: 640px; margin: 0 auto;\">{summary.get('description', '')}</p>
        </header>
        <section>
            <h2 style=\"color: #2c5f2d; border-bottom: 2px solid #4CAF50; padding-bottom: 8px;\">Step-by-step Instructions</h2>
            {instructions_html}
        </section>
        <section>
            <h2 style=\"color: #2c5f2d; border-bottom: 2px solid #4CAF50; padding-bottom: 8px;\">Environmental Impact</h2>
            <ul>
                <li>Waste diverted: {impact.get('waste_diverted', 'N/A')}</li>
                <li>Carbon footprint saved: {impact.get('carbon_footprint', 'N/A')}</li>
                <li>Energy saved: {impact.get('energy_saved', 'N/A')}</li>
            </ul>
        </section>
        <footer style=\"text-align: center; margin-top: 48px; color: #6b6b6b;\">
            Generated for thread {thread_id} • AI Recycle-to-Market Generator
        </footer>
    </body>
    </html>
    """

    styles = {
        "palette": ["#2c5f2d", "#4CAF50", "#f7faf7"],
        "font_family": "Segoe UI, sans-serif",
        "surface": "#ffffff",
    }

    interactive_elements = [
        {"type": "accordion", "target": "materials_guide"},
        {"type": "timeline", "target": "project_documentation.detailed_instructions"},
        {"type": "metric-cards", "target": "sustainability_impact.environmental_metrics"},
    ]

    return {
        "template": template,
        "styles": styles,
        "interactive_elements": interactive_elements,
    }


def estimate_pdf_pages(final_package: Dict[str, Any]) -> int:
    """Estimate the number of PDF pages based on package content."""
    instruction_count = len(final_package.get("project_documentation", {}).get("detailed_instructions", []))
    impact_sections = len(final_package.get("sustainability_impact", {}))
    base_pages = 3  # cover, introduction, summary
    instruction_pages = max(1, (instruction_count + 2) // 3)
    impact_pages = max(1, impact_sections)
    return base_pages + instruction_pages + impact_pages


def calculate_efficiency_score(state: WorkflowState) -> float:
    """Calculate a workflow efficiency score (0-10)."""
    base_score = 8.0
    if state.errors:
        base_score -= min(len(state.errors) * 0.5, 4)

    processing_time = time.time() - (state.start_time or time.time())
    if processing_time < 30:
        base_score += 1.0
    elif processing_time > 120:
        base_score -= 1.0

    if state.final_package:
        base_score += 0.5

    return max(0.0, min(10.0, base_score))


def calculate_quality_score(state: WorkflowState) -> float:
    """Calculate output quality score (0-10)."""
    score = 5.0

    if state.ingredients_data:
        score += min(3.0, state.ingredients_data.confidence * 3)

    if state.selected_option and state.selected_option.get("safety_assessment"):
        safety_level = state.selected_option["safety_assessment"].get("safety_level", "medium")
        if safety_level == "low":
            score += 2.0
        elif safety_level == "medium":
            score += 1.0

    if state.concept_images and state.concept_images.get("concepts"):
        score += min(2.0, len(state.concept_images["concepts"]))

    if state.final_package:
        score += 0.5

    return max(0.0, min(10.0, score))


def get_concept_thumbnail_url(state: WorkflowState) -> str:
    """Return thumbnail URL for sharing content."""
    if state.concept_images and state.concept_images.get("concepts"):
        concepts = state.concept_images["concepts"]
        if concepts:
            return concepts[0].get("image_url", "")
    return ""


def calculate_share_potential(state: WorkflowState) -> str:
    """Estimate social media share potential based on sustainability metrics."""
    if not state.final_package:
        return "low"

    metrics = state.final_package.get("sustainability_impact", {}).get("environmental_metrics", {})
    waste_value = metrics.get("waste_diverted", "0")
    try:
        numeric_value = float(str(waste_value).split()[0])
    except (ValueError, TypeError):
        numeric_value = 0.0

    if numeric_value >= 1.5:
        return "high"
    if numeric_value >= 0.6:
        return "medium"
    return "low"


# ---------------------------------------------------------------------------
# Routing & completion helpers for LangGraph
# ---------------------------------------------------------------------------

async def should_generate_exports(state: WorkflowState) -> str:
    """Decide whether to route to export generation."""
    return "export_generation" if state.final_package else "final_packaging"


async def should_generate_analytics(state: WorkflowState) -> str:
    """Decide whether to route to analytics generation."""
    return "analytics" if state.final_package else "final_packaging"


async def should_prepare_sharing(state: WorkflowState) -> str:
    """Decide whether to route to sharing preparation."""
    return "sharing_preparation" if state.final_package else "final_packaging"


async def is_phase4_complete(state: WorkflowState) -> str:
    """Determine if Phase 4 deliverables are ready."""
    if state.final_package and state.exports and state.analytics and state.sharing_assets:
        return "END"
    return "continue"
