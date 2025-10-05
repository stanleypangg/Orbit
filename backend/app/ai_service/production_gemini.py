"""
Production-ready Gemini AI service with monitoring, error handling, and cost optimization.
Replaces development gemini integration with production features.
"""
import json
import time
import asyncio
import logging
from typing import Dict, Any, List, Optional, Union
from contextlib import asynccontextmanager

import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

from app.core.config import settings
try:
    from app.core.metrics import metrics, track_gemini_metrics
    METRICS_AVAILABLE = True
except ImportError:
    METRICS_AVAILABLE = False
    def track_gemini_metrics(model_name):
        def decorator(func):
            return func
        return decorator
from app.core.redis import redis_service

logger = logging.getLogger(__name__)


class ProductionGeminiError(Exception):
    """Production Gemini service errors."""
    pass


class QuotaExceededError(ProductionGeminiError):
    """API quota exceeded."""
    pass


class SafetyError(ProductionGeminiError):
    """Content blocked by safety filters."""
    pass


class ProductionGeminiClient:
    """Production-ready Gemini client with monitoring and optimization."""

    def __init__(self):
        if not settings.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY is required for production")

        genai.configure(api_key=settings.GEMINI_API_KEY)

        # Model configuration
        self.pro_model = settings.GEMINI_MODEL
        self.flash_model = settings.GEMINI_FLASH_MODEL
        self.current_model = self.flash_model

        # No safety settings - disabled for unrestricted operation
        self.safety_settings = {
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
        }

        # Performance tracking
        self.request_count = 0
        self.error_count = 0
        self.total_tokens = 0

        logger.info(f"Production Gemini client initialized - Pro: {self.pro_model}, Flash: {self.flash_model}, Safety: DISABLED")


    def _get_generation_config(self, task_type: str = "default") -> Dict[str, Any]:
        """Get generation config optimized for task type."""
        base_config = {
            "temperature": settings.GEMINI_TEMPERATURE,
            "max_output_tokens": settings.GEMINI_MAX_TOKENS,
        }

        # Task-specific optimizations
        if task_type == "extraction":
            base_config.update({
                "temperature": 0.1,  # More deterministic for data extraction
                "max_output_tokens": 4096,
            })
        elif task_type == "creative":
            base_config.update({
                "temperature": 0.8,  # More creative for image prompts
                "max_output_tokens": 8192,
            })
        elif task_type == "analysis":
            base_config.update({
                "temperature": 0.3,  # Balanced for analysis
                "max_output_tokens": 6144,
            })
        elif task_type == "goal_formation":
            base_config.update({
                "temperature": 0.4,  # Strategic reasoning
                "max_output_tokens": 8192,
            })

        return base_config

    def _get_timeout_for_task(self, task_type: str) -> float:
        """Get timeout duration based on task complexity."""
        # Complex tasks need more time
        timeout_map = {
            "extraction": 30.0,           # Fast extraction
            "clarification": 30.0,        # Quick updates
            "question_generation": 20.0,  # Simple questions
            "categorization": 30.0,       # Pattern recognition
            "goal_formation": 90.0,       # Complex reasoning - INCREASED
            "creative": 90.0,             # Creative generation - INCREASED
            "analysis": 60.0,             # Evaluation tasks - INCREASED
            "default": 45.0,              # General tasks
        }
        return timeout_map.get(task_type, 45.0)

    @asynccontextmanager
    async def _request_context(self, operation: str):
        """Context manager for request tracking and error handling."""
        start_time = time.time()
        self.request_count += 1

        try:
            yield
        except Exception as e:
            self.error_count += 1
            duration = time.time() - start_time

            # Record metrics if available
            if METRICS_AVAILABLE:
                metrics.record_gemini_call(self.current_model, "error", duration)

            # Classify error for better handling
            if "quota" in str(e).lower() or "rate limit" in str(e).lower():
                raise QuotaExceededError(f"API quota exceeded: {str(e)}")
            elif "safety" in str(e).lower() or "blocked" in str(e).lower():
                raise SafetyError(f"Content blocked by safety filters: {str(e)}")
            else:
                raise ProductionGeminiError(f"Gemini API error in {operation}: {str(e)}")
        else:
            duration = time.time() - start_time
            if METRICS_AVAILABLE:
                metrics.record_gemini_call(self.current_model, "success", duration)

    def _should_use_flash(self, task_type: str, prompt_length: int) -> bool:
        """Determine if Flash model should be used for cost optimization."""
        # Use Flash for simple, short tasks
        simple_tasks = ["extraction", "classification", "validation"]

        return (
            task_type in simple_tasks or
            prompt_length < 1000 or
            settings.ENVIRONMENT == "development"
        )

    async def call_gemini_with_retry(
        self,
        prompt: str,
        task_type: str = "default",
        response_schema: Optional[Dict[str, Any]] = None,
        max_retries: int = None
    ) -> Dict[str, Any]:
        """
        Production-ready Gemini API call with retries, monitoring, and optimization.

        Args:
            prompt: The input prompt
            task_type: Type of task for optimization (extraction, creative, analysis)
            response_schema: Optional JSON schema for structured output
            max_retries: Override default retry count

        Returns:
            Dict containing the response and metadata
        """
        max_retries = max_retries or settings.GEMINI_MAX_RETRIES
        
        # Add explicit JSON formatting instruction if schema provided
        if response_schema:
            prompt = f"""{prompt}

IMPORTANT: Respond with ONLY valid JSON matching the required schema. Do not include markdown formatting, code blocks, or any text outside the JSON object."""

        # Choose optimal model
        if self._should_use_flash(task_type, len(prompt)):
            model_name = self.flash_model
        else:
            model_name = self.pro_model

        self.current_model = model_name

        # Get optimized generation config
        generation_config = self._get_generation_config(task_type)
        
        # IMPORTANT: Add schema to config BEFORE creating model
        if response_schema:
            generation_config.update({
                "response_mime_type": "application/json",
                "response_schema": response_schema
            })

        for attempt in range(max_retries):
            try:
                async with self._request_context(f"call_gemini_retry_attempt_{attempt + 1}"):
                    # Create model with schema-enabled config
                    model = genai.GenerativeModel(
                        model_name=model_name,
                        generation_config=generation_config,
                        safety_settings=self.safety_settings,
                    )

                    # Use asyncio.wait_for to ensure proper cleanup
                    # Get task-specific timeout
                    task_timeout = self._get_timeout_for_task(task_type)
                    try:
                        response = await asyncio.wait_for(
                            model.generate_content_async(prompt, stream=False),
                            timeout=task_timeout
                        )
                    except asyncio.TimeoutError:
                        raise ProductionGeminiError(f"Gemini API timeout on attempt {attempt + 1} (timeout: {task_timeout}s)")

                    # Process response
                    if response.text:
                        try:
                            if response_schema:
                                # Parse JSON response
                                result = json.loads(response.text)
                            else:
                                result = {"text": response.text}

                            # Add metadata
                            result["_metadata"] = {
                                "model_used": model_name,
                                "task_type": task_type,
                                "attempt": attempt + 1,
                                "tokens_estimated": len(response.text) // 4,  # Rough estimate
                                "safety_ratings": getattr(response, 'safety_ratings', [])
                            }

                            # Track token usage
                            estimated_tokens = result["_metadata"]["tokens_estimated"]
                            self.total_tokens += estimated_tokens

                            # Cache successful responses for similar prompts
                            await self._cache_response(prompt, result, task_type)

                            return result

                        except json.JSONDecodeError as e:
                            # With proper schema config, this should rarely happen
                            logger.warning(f"JSON parse error on attempt {attempt + 1}: {str(e)}")
                            
                            # Try basic cleanup as fallback
                            try:
                                cleaned_text = response.text.strip()
                                # Remove markdown code blocks if present
                                if cleaned_text.startswith("```"):
                                    lines = cleaned_text.split("\n")
                                    cleaned_text = "\n".join(lines[1:-1]) if len(lines) > 2 else cleaned_text
                                
                                result = json.loads(cleaned_text)
                                logger.info("✅ Parsed JSON after cleaning markdown (schema should prevent this)")
                                
                                result["_metadata"] = {
                                    "model_used": model_name,
                                    "task_type": task_type,
                                    "attempt": attempt + 1,
                                    "tokens_estimated": len(response.text) // 4,
                                    "safety_ratings": getattr(response, 'safety_ratings', []),
                                    "cleaned": True
                                }
                                
                                self.total_tokens += result["_metadata"]["tokens_estimated"]
                                await self._cache_response(prompt, result, task_type)
                                return result
                                
                            except json.JSONDecodeError:
                                logger.error(f"Failed to parse even after cleaning. Raw response: {response.text[:500]}")
                            
                            if attempt == max_retries - 1:
                                return {"error": f"Invalid JSON response after {max_retries} attempts: {str(e)}"}
                            else:
                                await asyncio.sleep(1)  # Short delay before retry
                                continue
                    else:
                        if attempt == max_retries - 1:
                            return {"error": "Empty response from Gemini"}
                        else:
                            logger.warning(f"Empty response on attempt {attempt + 1}, retrying...")
                            continue

            except QuotaExceededError as e:
                return {"error": str(e)}
            except SafetyError as e:
                logger.error("Unexpected safety error with disabled filters")
                return {"error": str(e)}
            except Exception as e:
                if attempt == max_retries - 1:
                    return {"error": f"Max retries exceeded: {str(e)}"}
                else:
                    # Exponential backoff
                    delay = (2 ** attempt) + (time.time() % 1)
                    logger.warning(f"Attempt {attempt + 1} failed, retrying in {delay:.1f}s: {str(e)}")
                    await asyncio.sleep(delay)

    async def _cache_response(self, prompt: str, response: Dict[str, Any], task_type: str):
        """Cache successful responses for performance optimization."""
        try:
            # Create cache key
            import hashlib
            prompt_hash = hashlib.md5(prompt.encode()).hexdigest()
            cache_key = f"gemini_cache:{task_type}:{prompt_hash}"

            # Store for 1 hour
            redis_service.setex(
                cache_key,
                3600,
                json.dumps(response, default=str)
            )
        except Exception as e:
            logger.warning(f"Failed to cache response: {str(e)}")

    async def get_cached_response(self, prompt: str, task_type: str) -> Optional[Dict[str, Any]]:
        """Get cached response if available."""
        try:
            import hashlib
            prompt_hash = hashlib.md5(prompt.encode()).hexdigest()
            cache_key = f"gemini_cache:{task_type}:{prompt_hash}"

            cached = redis_service.get(cache_key)
            if cached:
                return json.loads(cached)
        except Exception as e:
            logger.warning(f"Failed to get cached response: {str(e)}")

        return None

    def get_usage_stats(self) -> Dict[str, Any]:
        """Get usage statistics for monitoring."""
        return {
            "total_requests": self.request_count,
            "total_errors": self.error_count,
            "error_rate": self.error_count / max(self.request_count, 1),
            "estimated_tokens": self.total_tokens,
            "current_model": self.current_model,
            "pro_model": self.pro_model,
            "flash_model": self.flash_model
        }


# Global production client instance (lazy-loaded)
production_gemini = None

def get_production_client():
    """Get or create the production client instance."""
    global production_gemini
    if production_gemini is None and settings.GEMINI_API_KEY:
        production_gemini = ProductionGeminiClient()
    return production_gemini


# Backward compatibility function
async def call_gemini_with_retry(
    prompt: str,
    response_schema: Optional[Dict[str, Any]] = None,
    task_type: str = "default"
) -> Dict[str, Any]:
    """Backward compatible function for existing code."""
    client = get_production_client()
    if client:
        return await client.call_gemini_with_retry(
            prompt=prompt,
            task_type=task_type,
            response_schema=response_schema
        )
    else:
        raise ValueError("Production client not available - GEMINI_API_KEY not configured")