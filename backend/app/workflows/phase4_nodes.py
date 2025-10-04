"""
Phase 4 LangGraph nodes for Output Assembly & Delivery.
Implements H1 (Final Packaging), EXP (Multi-format Export), and SHARE (Sharing System).
"""
import json
import time
import logging
import asyncio
import base64
import uuid
from typing import Dict, Any, List, Optional
from io import BytesIO
from datetime import datetime, timezone
import google.generativeai as genai
from app.workflows.state import WorkflowState
from app.core.config import settings
from app.core.redis import redis_service
import backoff
import httpx

logger = logging.getLogger(__name__)

# Phase 4 structured output schemas
FINAL_PACKAGE_SCHEMA = {
    "type": "object",
    "properties": {
        "project_summary": {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "tagline": {"type": "string"},
                "description": {"type": "string"},
                "category": {"type": "string"},
                "difficulty_rating": {"type": "string"},
                "completion_time": {"type": "string"},
                "sustainability_score": {"type": "number", "minimum": 0, "maximum": 10}
            }
        },
        "materials_overview": {
            "type": "object",
            "properties": {
                "primary_materials": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "tools_needed": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "optional_supplies": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "sourcing_tips": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            }
        },
        "step_by_step_guide": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "step_number": {"type": "integer"},
                    "phase": {"type": "string"},
                    "title": {"type": "string"},
                    "instructions": {"type": "string"},
                    "estimated_time": {"type": "string"},
                    "safety_notes": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "pro_tips": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "troubleshooting": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                }
            }
        },
        "impact_metrics": {
            "type": "object",
            "properties": {
                "waste_diverted": {"type": "string"},
                "carbon_footprint_saved": {"type": "string"},
                "cost_savings": {"type": "string"},
                "environmental_benefits": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "social_impact": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            }
        },
        "sharing_content": {
            "type": "object",
            "properties": {
                "social_media_caption": {"type": "string"},
                "hashtags": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "project_showcase_description": {"type": "string"},
                "tutorial_summary": {"type": "string"}
            }
        }
    },
    "required": ["project_summary", "materials_overview", "step_by_step_guide", "impact_metrics"]
}

ANALYTICS_SCHEMA = {
    "type": "object",
    "properties": {
        "workflow_metrics": {
            "type": "object",
            "properties": {
                "total_processing_time": {"type": "number"},
                "phase_breakdown": {
                    "type": "object",
                    "properties": {
                        "ingredient_discovery": {"type": "number"},
                        "goal_formation": {"type": "number"},
                        "concept_generation": {"type": "number"},
                        "final_assembly": {"type": "number"}
                    }
                },
                "user_interactions": {"type": "integer"},
                "edit_cycles": {"type": "integer"}
            }
        },
        "quality_metrics": {
            "type": "object",
            "properties": {
                "ingredient_confidence": {"type": "number"},
                "safety_score": {"type": "number"},
                "complexity_achieved": {"type": "string"},
                "user_satisfaction_indicators": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            }
        },
        "sustainability_impact": {
            "type": "object",
            "properties": {
                "materials_rescued": {"type": "integer"},
                "estimated_landfill_diversion": {"type": "string"},
                "carbon_impact_rating": {"type": "string"},
                "circular_economy_contribution": {"type": "string"}
            }
        }
    }
}


@backoff.on_exception(
    backoff.expo,
    (Exception,),
    max_tries=3,
    max_time=60
)
async def call_gemini_with_retry(model_name: str, prompt: str, **kwargs):
    """Resilient Gemini API call with exponential backoff."""
    try:
        model = genai.GenerativeModel(model_name)
        response = await model.generate_content_async(prompt, **kwargs)
        return response
    except Exception as e:
        logger.error(f"Gemini API error: {str(e)}")
        raise


async def final_packaging_node(state: WorkflowState) -> Dict[str, Any]:
    """
    H1 Node: Final packaging and comprehensive project documentation.
    Creates publication-ready project packages with all deliverables.
    """
    logger.info(f"H1: Starting final packaging for thread {state.thread_id}")

    # Validate required inputs
    if not state.selected_option or not state.concept_images:
        logger.error("H1: Missing required data for final packaging")
        state.errors.append("Final packaging requires selected option and concepts")
        return {"error": "Missing required data"}

    # Gather all workflow data
    ingredients = state.ingredients_data.ingredients if state.ingredients_data else []
    selected_concept = None
    if state.concept_images and "concepts" in state.concept_images:
        concepts = state.concept_images["concepts"]
        # Use first concept as default if no specific selection
        selected_concept = concepts[0] if concepts else None

    # Build comprehensive prompt for final documentation
    packaging_prompt = f"""
    Create comprehensive project documentation for this upcycling/recycling project.

    PROJECT CONTEXT:
    - Title: {state.selected_option.get('title', 'Upcycled Creation')}
    - Description: {state.selected_option.get('description', '')}
    - Goal: {state.goals or 'Create useful items from waste materials'}

    MATERIALS USED:
    {chr(10).join([f"- {ing.name} ({ing.material}, {ing.size})" for ing in ingredients])}

    SELECTED CONCEPT:
    - Style: {selected_concept.get('style', 'functional') if selected_concept else 'functional'}
    - Description: {selected_concept.get('description', '') if selected_concept else ''}

    PROJECT DETAILS:
    - Difficulty: {state.selected_option.get('difficulty_level', 'moderate')}
    - Estimated Time: {state.selected_option.get('time_estimate', '2-4 hours')}
    - Tools Required: {', '.join(state.selected_option.get('tools_required', []))}

    Create a comprehensive project package including:
    1. Engaging project summary with tagline
    2. Complete materials overview with sourcing tips
    3. Detailed step-by-step instructions with safety notes
    4. Environmental impact metrics and sustainability benefits
    5. Social media ready content with captions and hashtags

    Make this professional, engaging, and ready for publication. Focus on the transformation story from waste to valuable creation.
    """

    try:
        # Generate comprehensive documentation
        response = await call_gemini_with_retry(
            model_name="gemini-2.5-pro",
            prompt=packaging_prompt,
            generation_config={
                "response_schema": FINAL_PACKAGE_SCHEMA,
                "temperature": 0.3,
                "max_output_tokens": 4000
            }
        )

        if response.text:
            try:
                final_package = json.loads(response.text)

                # Add metadata and complete package information
                complete_package = {
                    **final_package,
                    "package_metadata": {
                        "generation_timestamp": datetime.now(timezone.utc).isoformat(),
                        "thread_id": state.thread_id,
                        "workflow_version": "1.0",
                        "total_ingredients": len(ingredients),
                        "processing_phases": ["ingredient_discovery", "goal_formation", "concept_generation", "final_assembly"]
                    },
                    "visual_assets": {
                        "selected_concept": selected_concept,
                        "all_concepts": state.concept_images.get("concepts", []) if state.concept_images else [],
                        "concept_selection_feedback": getattr(state, 'concept_feedback', '')
                    },
                    "technical_specifications": {
                        "bill_of_materials": state.project_preview.get("bill_of_materials", []) if state.project_preview else [],
                        "safety_requirements": state.selected_option.get("safety_assessment", {}),
                        "esg_assessment": state.selected_option.get("esg_score", {})
                    }
                }

                # Store final package
                state.final_output = complete_package
                state.current_phase = "complete"
                state.current_node = "COMPLETE"

                # Persist to Redis for API access
                package_key = f"final_package:{state.thread_id}"
                redis_service.set(package_key, json.dumps(complete_package), ex=86400)  # 24 hour retention

                logger.info(f"H1: Final package created successfully for {state.thread_id}")

                return {
                    "final_package": complete_package,
                    "current_phase": "complete",
                    "current_node": "COMPLETE",
                    "package_size": len(json.dumps(complete_package)),
                    "generation_time": time.time()
                }

            except json.JSONDecodeError as e:
                logger.error(f"H1: Failed to parse final package JSON: {str(e)}")
                state.errors.append(f"Package generation failed: invalid JSON")
                return {"error": "Package generation failed"}

    except Exception as e:
        logger.error(f"H1: Final packaging failed: {str(e)}")
        state.errors.append(f"Final packaging error: {str(e)}")
        return {"error": str(e)}


async def export_generation_node(state: WorkflowState) -> Dict[str, Any]:
    """
    EXP Node: Multi-format export generation (PDF, JSON, HTML).
    Creates downloadable formats for different use cases.
    """
    logger.info(f"EXP: Generating multi-format exports for thread {state.thread_id}")

    if not state.final_output:
        logger.error("EXP: No final package available for export")
        return {"error": "No final package to export"}

    exports = {}

    try:
        # JSON Export (structured data)
        json_export = {
            "format": "json",
            "version": "1.0",
            "project_data": state.final_output,
            "export_timestamp": datetime.now(timezone.utc).isoformat(),
            "metadata": {
                "thread_id": state.thread_id,
                "export_type": "complete_project_data",
                "file_size_estimate": "medium"
            }
        }
        exports["json"] = json_export

        # HTML Export (web-ready format)
        html_template = generate_html_export(state.final_output, state.thread_id)
        exports["html"] = {
            "format": "html",
            "content": html_template,
            "metadata": {
                "responsive": True,
                "print_ready": True,
                "standalone": True
            }
        }

        # PDF Preparation (metadata for PDF generation service)
        pdf_config = {
            "format": "pdf",
            "layout": "project_documentation",
            "include_images": True,
            "page_size": "A4",
            "sections": [
                "cover_page",
                "project_overview",
                "materials_and_tools",
                "step_by_step_instructions",
                "visual_concepts",
                "impact_metrics"
            ],
            "metadata": state.final_output.get("package_metadata", {})
        }
        exports["pdf_config"] = pdf_config

        # Store exports
        export_key = f"exports:{state.thread_id}"
        redis_service.set(export_key, json.dumps(exports), ex=86400)

        logger.info(f"EXP: Generated {len(exports)} export formats")

        return {
            "exports_generated": list(exports.keys()),
            "export_metadata": {
                "json_size": len(json.dumps(json_export)),
                "html_size": len(html_template),
                "pdf_pages_estimated": estimate_pdf_pages(state.final_output)
            },
            "download_ready": True
        }

    except Exception as e:
        logger.error(f"EXP: Export generation failed: {str(e)}")
        return {"error": str(e)}


async def analytics_node(state: WorkflowState) -> Dict[str, Any]:
    """
    ANALYTICS Node: Generate comprehensive analytics and success metrics.
    Tracks workflow performance and user engagement.
    """
    logger.info(f"ANALYTICS: Generating metrics for thread {state.thread_id}")

    # Calculate workflow metrics
    current_time = time.time()
    total_processing_time = current_time - (state.start_time or current_time)

    # Build analytics prompt
    analytics_prompt = f"""
    Analyze this workflow execution and generate comprehensive analytics.

    WORKFLOW DATA:
    - Total Processing Time: {total_processing_time:.2f} seconds
    - Ingredients Processed: {len(state.ingredients_data.ingredients) if state.ingredients_data else 0}
    - Goals: {state.goals or 'Not specified'}
    - Selected Option: {state.selected_option.get('title', 'Unknown') if state.selected_option else 'None'}
    - Concepts Generated: {len(state.concept_images.get('concepts', [])) if state.concept_images else 0}
    - Final Package Generated: {'Yes' if state.final_output else 'No'}

    USER INTERACTION DATA:
    - User Input: {state.user_input}
    - Edit Requests: {len(getattr(state, 'edit_requests', []))}
    - Errors Encountered: {len(state.errors)}

    QUALITY INDICATORS:
    - Ingredient Confidence: {state.ingredients_data.confidence if state.ingredients_data else 0}
    - Safety Assessment: {state.selected_option.get('safety_assessment', {}).get('safety_level', 'unknown') if state.selected_option else 'unknown'}

    Generate comprehensive analytics including workflow efficiency, quality metrics, and sustainability impact.
    """

    try:
        response = await call_gemini_with_retry(
            model_name="gemini-2.5-flash",
            prompt=analytics_prompt,
            generation_config={
                "response_schema": ANALYTICS_SCHEMA,
                "temperature": 0.1,
                "max_output_tokens": 2000
            }
        )

        if response.text:
            analytics_data = json.loads(response.text)

            # Add real-time calculated metrics
            analytics_data["real_time_metrics"] = {
                "actual_total_time": total_processing_time,
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "workflow_completion_rate": 1.0 if state.final_output else 0.8,
                "error_rate": len(state.errors) / max(1, len(state.errors) + 5),  # Normalized error rate
                "user_interaction_score": min(10, len(getattr(state, 'edit_requests', [])) * 2 + 5)
            }

            # Store analytics
            analytics_key = f"analytics:{state.thread_id}"
            redis_service.set(analytics_key, json.dumps(analytics_data), ex=86400)

            logger.info(f"ANALYTICS: Generated comprehensive metrics")

            return {
                "analytics_generated": True,
                "analytics_data": analytics_data,
                "performance_summary": {
                    "total_time": total_processing_time,
                    "efficiency_score": calculate_efficiency_score(state),
                    "quality_score": calculate_quality_score(state)
                }
            }

    except Exception as e:
        logger.error(f"ANALYTICS: Analytics generation failed: {str(e)}")
        return {"error": str(e)}


async def sharing_preparation_node(state: WorkflowState) -> Dict[str, Any]:
    """
    SHARE Node: Prepare content for social media sharing and project gallery.
    Creates optimized content for different platforms.
    """
    logger.info(f"SHARE: Preparing sharing content for thread {state.thread_id}")

    if not state.final_output:
        logger.error("SHARE: No final package available for sharing")
        return {"error": "No content to share"}

    try:
        # Extract sharing content from final package
        sharing_content = state.final_output.get("sharing_content", {})
        project_summary = state.final_output.get("project_summary", {})
        impact_metrics = state.final_output.get("impact_metrics", {})

        # Prepare platform-specific content
        sharing_package = {
            "instagram": {
                "caption": sharing_content.get("social_media_caption", ""),
                "hashtags": sharing_content.get("hashtags", []),
                "image_suggestions": ["before_after", "process_shots", "final_result"],
                "story_template": "DIY_transformation"
            },
            "twitter": {
                "tweet_text": f"🌱 Turned waste into {project_summary.get('title', 'something awesome')}! {sharing_content.get('social_media_caption', '')[:100]}...",
                "hashtags": sharing_content.get("hashtags", [])[:5],  # Twitter hashtag limit
                "thread_potential": True
            },
            "pinterest": {
                "pin_title": f"DIY {project_summary.get('title', 'Upcycling Project')}",
                "description": sharing_content.get("project_showcase_description", ""),
                "board_suggestions": ["DIY Projects", "Upcycling", "Sustainable Living"],
                "image_orientation": "portrait_preferred"
            },
            "linkedin": {
                "post_text": f"Sustainability in action: {project_summary.get('tagline', '')}",
                "professional_angle": "circular economy",
                "impact_highlight": impact_metrics.get("environmental_benefits", [])[:3]
            }
        }

        # Create shareable URLs and metadata
        share_metadata = {
            "project_id": state.thread_id,
            "share_url": f"https://recycle-generator.ai/project/{state.thread_id}",
            "thumbnail_url": get_concept_thumbnail_url(state),
            "estimated_reach": calculate_share_potential(state),
            "share_timestamp": datetime.now(timezone.utc).isoformat()
        }

        # Store sharing package
        sharing_key = f"sharing:{state.thread_id}"
        complete_sharing_data = {
            "platform_content": sharing_package,
            "metadata": share_metadata,
            "analytics_tracking": {
                "utm_source": "ai_generator",
                "utm_medium": "social_share",
                "utm_campaign": "user_project_share"
            }
        }
        redis_service.set(sharing_key, json.dumps(complete_sharing_data), ex=86400)

        logger.info(f"SHARE: Prepared sharing content for {len(sharing_package)} platforms")

        return {
            "sharing_ready": True,
            "platforms_prepared": list(sharing_package.keys()),
            "share_metadata": share_metadata,
            "content_generated": True
        }

    except Exception as e:
        logger.error(f"SHARE: Sharing preparation failed: {str(e)}")
        return {"error": str(e)}


# Helper functions
def generate_html_export(final_package: Dict[str, Any], thread_id: str) -> str:
    """Generate standalone HTML export for the project."""
    project_summary = final_package.get("project_summary", {})
    materials = final_package.get("materials_overview", {})
    steps = final_package.get("step_by_step_guide", [])

    html_template = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{project_summary.get('title', 'DIY Project Guide')}</title>
        <style>
            body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }}
            .container {{ max-width: 800px; margin: 0 auto; }}
            .header {{ text-align: center; margin-bottom: 30px; }}
            .project-title {{ color: #2c5f2d; font-size: 2.5em; margin-bottom: 10px; }}
            .tagline {{ color: #666; font-size: 1.2em; font-style: italic; }}
            .section {{ margin: 30px 0; padding: 20px; border-left: 4px solid #4CAF50; background: #f9f9f9; }}
            .section h2 {{ color: #2c5f2d; margin-top: 0; }}
            .materials-list {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }}
            .step {{ margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }}
            .step-number {{ background: #4CAF50; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; }}
            .safety-note {{ background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 10px; margin: 10px 0; }}
            .impact-metric {{ background: #e8f5e8; padding: 10px; margin: 5px 0; border-radius: 4px; }}
            @media print {{ body {{ font-size: 12pt; }} .container {{ max-width: none; }} }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 class="project-title">{project_summary.get('title', 'DIY Project')}</h1>
                <p class="tagline">{project_summary.get('tagline', '')}</p>
                <p>{project_summary.get('description', '')}</p>
            </div>

            <div class="section">
                <h2>Materials & Tools</h2>
                <div class="materials-list">
                    {''.join([f'<div>• {material}</div>' for material in materials.get('primary_materials', [])])}
                </div>
                <h3>Tools Needed:</h3>
                <p>{', '.join(materials.get('tools_needed', []))}</p>
            </div>

            <div class="section">
                <h2>Step-by-Step Instructions</h2>
                {''.join([f'''
                <div class="step">
                    <span class="step-number">{step.get('step_number', i+1)}</span>
                    <strong>{step.get('title', f'Step {i+1}')}</strong>
                    <p>{step.get('instructions', '')}</p>
                    {''.join([f'<div class="safety-note">⚠️ {note}</div>' for note in step.get('safety_notes', [])])}
                </div>
                ''' for i, step in enumerate(steps)])}
            </div>

            <div class="section">
                <h2>Environmental Impact</h2>
                {''.join([f'<div class="impact-metric">{benefit}</div>' for benefit in final_package.get('impact_metrics', {}).get('environmental_benefits', [])])}
            </div>

            <footer style="text-align: center; margin-top: 50px; padding: 20px; border-top: 1px solid #ddd;">
                <p>Generated by AI Recycle-to-Market Generator | Project ID: {thread_id}</p>
            </footer>
        </div>
    </body>
    </html>
    """
    return html_template


def estimate_pdf_pages(final_package: Dict[str, Any]) -> int:
    """Estimate number of PDF pages based on content."""
    content_sections = [
        final_package.get("project_summary", {}),
        final_package.get("materials_overview", {}),
        final_package.get("step_by_step_guide", []),
        final_package.get("impact_metrics", {})
    ]

    # Rough estimation: 1 page cover + 1 page per major section + steps
    base_pages = 3
    step_pages = len(final_package.get("step_by_step_guide", [])) // 3  # 3 steps per page
    return base_pages + step_pages


def calculate_efficiency_score(state: WorkflowState) -> float:
    """Calculate workflow efficiency score (0-10)."""
    base_score = 8.0

    # Deduct for errors
    if state.errors:
        base_score -= len(state.errors) * 0.5

    # Bonus for completion
    if state.final_output:
        base_score += 1.0

    # Time efficiency (placeholder - would use actual benchmarks)
    processing_time = time.time() - (state.start_time or time.time())
    if processing_time < 30:  # Fast completion
        base_score += 0.5

    return max(0, min(10, base_score))


def calculate_quality_score(state: WorkflowState) -> float:
    """Calculate output quality score (0-10)."""
    score = 5.0  # Base score

    # Ingredient confidence
    if state.ingredients_data:
        score += state.ingredients_data.confidence * 3

    # Safety assessment
    if state.selected_option and state.selected_option.get("safety_assessment"):
        safety_level = state.selected_option["safety_assessment"].get("safety_level", "medium")
        if safety_level == "low":
            score += 2
        elif safety_level == "medium":
            score += 1

    # Concept generation success
    if state.concept_images and state.concept_images.get("concepts"):
        score += min(2, len(state.concept_images["concepts"]))

    return max(0, min(10, score))


def get_concept_thumbnail_url(state: WorkflowState) -> str:
    """Get thumbnail URL for sharing."""
    if state.concept_images and state.concept_images.get("concepts"):
        concepts = state.concept_images["concepts"]
        if concepts:
            return concepts[0].get("image_url", "")
    return ""


def calculate_share_potential(state: WorkflowState) -> str:
    """Estimate social media share potential."""
    if not state.final_output:
        return "low"

    project_summary = state.final_output.get("project_summary", {})
    sustainability_score = project_summary.get("sustainability_score", 5)

    if sustainability_score >= 8:
        return "high"
    elif sustainability_score >= 6:
        return "medium"
    else:
        return "low"


# Routing functions for Phase 4
def should_generate_exports(state: WorkflowState) -> str:
    """Determine if ready for export generation."""
    if state.final_output:
        return "export_generation"
    return "final_packaging"


def should_generate_analytics(state: WorkflowState) -> str:
    """Determine if ready for analytics."""
    if state.final_output:
        return "analytics"
    return "final_packaging"


def should_prepare_sharing(state: WorkflowState) -> str:
    """Determine if ready for sharing preparation."""
    if state.final_output:
        return "sharing_preparation"
    return "final_packaging"


def is_phase4_complete(state: WorkflowState) -> str:
    """Determine if Phase 4 is complete."""
    if (state.final_output and
        state.current_phase == "complete" and
        state.current_node == "COMPLETE"):
        return "END"
    return "continue"