"""
Prometheus metrics collection for AI Recycle-to-Market Generator.
Tracks API performance, workflow progress, and system health.
"""
import time
import logging
from functools import wraps
from typing import Callable, Any, Dict
from prometheus_client import Counter, Histogram, Gauge, generate_latest
from prometheus_client.core import CollectorRegistry
from fastapi import Request, Response
from fastapi.responses import PlainTextResponse

logger = logging.getLogger(__name__)

# Create custom registry for our metrics
REGISTRY = CollectorRegistry()

# HTTP Metrics
http_requests_total = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status'],
    registry=REGISTRY
)

http_request_duration_seconds = Histogram(
    'http_request_duration_seconds',
    'HTTP request duration in seconds',
    ['method', 'endpoint'],
    registry=REGISTRY
)

# Workflow Metrics
workflow_attempts_total = Counter(
    'workflow_attempts_total',
    'Total workflow attempts',
    ['phase'],
    registry=REGISTRY
)

workflow_completions_total = Counter(
    'workflow_completions_total',
    'Total workflow completions',
    ['phase', 'status'],
    registry=REGISTRY
)

workflow_duration_seconds = Histogram(
    'workflow_duration_seconds',
    'Workflow processing duration in seconds',
    ['phase'],
    registry=REGISTRY
)

phase_processing_duration_seconds = Histogram(
    'phase_processing_duration_seconds',
    'Individual phase processing duration',
    ['phase', 'node'],
    registry=REGISTRY
)

# System Metrics
active_workflows_count = Gauge(
    'active_workflows_count',
    'Number of currently active workflows',
    registry=REGISTRY
)

redis_operations_total = Counter(
    'redis_operations_total',
    'Total Redis operations',
    ['operation', 'status'],
    registry=REGISTRY
)

gemini_api_calls_total = Counter(
    'gemini_api_calls_total',
    'Total Gemini API calls',
    ['model', 'status'],
    registry=REGISTRY
)

gemini_api_duration_seconds = Histogram(
    'gemini_api_duration_seconds',
    'Gemini API call duration',
    ['model'],
    registry=REGISTRY
)

# Error Metrics
errors_total = Counter(
    'errors_total',
    'Total application errors',
    ['component', 'error_type'],
    registry=REGISTRY
)


class MetricsCollector:
    """Central metrics collection service."""

    def __init__(self):
        self.active_workflows: Dict[str, float] = {}

    def record_http_request(self, method: str, endpoint: str, status_code: int, duration: float):
        """Record HTTP request metrics."""
        http_requests_total.labels(method=method, endpoint=endpoint, status=str(status_code)).inc()
        http_request_duration_seconds.labels(method=method, endpoint=endpoint).observe(duration)

    def start_workflow(self, thread_id: str, phase: str):
        """Record workflow start."""
        workflow_attempts_total.labels(phase=phase).inc()
        self.active_workflows[thread_id] = time.time()
        active_workflows_count.set(len(self.active_workflows))

    def complete_workflow(self, thread_id: str, phase: str, status: str):
        """Record workflow completion."""
        workflow_completions_total.labels(phase=phase, status=status).inc()

        if thread_id in self.active_workflows:
            duration = time.time() - self.active_workflows[thread_id]
            workflow_duration_seconds.labels(phase=phase).observe(duration)
            del self.active_workflows[thread_id]
            active_workflows_count.set(len(self.active_workflows))

    def record_phase_processing(self, phase: str, node: str, duration: float):
        """Record individual phase processing time."""
        phase_processing_duration_seconds.labels(phase=phase, node=node).observe(duration)

    def record_redis_operation(self, operation: str, status: str):
        """Record Redis operation."""
        redis_operations_total.labels(operation=operation, status=status).inc()

    def record_gemini_call(self, model: str, status: str, duration: float):
        """Record Gemini API call."""
        gemini_api_calls_total.labels(model=model, status=status).inc()
        gemini_api_duration_seconds.labels(model=model).observe(duration)

    def record_error(self, component: str, error_type: str):
        """Record application error."""
        errors_total.labels(component=component, error_type=error_type).inc()


# Global metrics collector instance
metrics = MetricsCollector()


def track_http_metrics(func: Callable) -> Callable:
    """Decorator to track HTTP endpoint metrics."""
    @wraps(func)
    async def wrapper(*args, **kwargs):
        start_time = time.time()
        request = None

        # Find request object in args
        for arg in args:
            if isinstance(arg, Request):
                request = arg
                break

        try:
            response = await func(*args, **kwargs)
            status_code = getattr(response, 'status_code', 200)

            if request:
                duration = time.time() - start_time
                endpoint = request.url.path
                method = request.method
                metrics.record_http_request(method, endpoint, status_code, duration)

            return response

        except Exception as e:
            if request:
                duration = time.time() - start_time
                endpoint = request.url.path
                method = request.method
                metrics.record_http_request(method, endpoint, 500, duration)
                metrics.record_error("api", type(e).__name__)
            raise

    return wrapper


def track_workflow_metrics(phase: str):
    """Decorator to track workflow phase metrics."""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            start_time = time.time()

            # Extract thread_id from state if available
            thread_id = None
            for arg in args:
                if hasattr(arg, 'thread_id'):
                    thread_id = arg.thread_id
                    break

            try:
                result = await func(*args, **kwargs)

                if thread_id:
                    duration = time.time() - start_time
                    node_name = func.__name__.replace('_node', '').replace('_', '')
                    metrics.record_phase_processing(phase, node_name, duration)

                return result

            except Exception as e:
                if thread_id:
                    metrics.record_error("workflow", type(e).__name__)
                raise

        return wrapper
    return decorator


def track_gemini_metrics(model: str):
    """Decorator to track Gemini API call metrics."""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            start_time = time.time()

            try:
                result = await func(*args, **kwargs)
                duration = time.time() - start_time
                metrics.record_gemini_call(model, "success", duration)
                return result

            except Exception as e:
                duration = time.time() - start_time
                metrics.record_gemini_call(model, "error", duration)
                metrics.record_error("gemini_api", type(e).__name__)
                raise

        return wrapper
    return decorator


async def metrics_endpoint() -> PlainTextResponse:
    """Prometheus metrics endpoint."""
    try:
        metrics_data = generate_latest(REGISTRY)
        return PlainTextResponse(metrics_data, media_type="text/plain")
    except Exception as e:
        logger.error(f"Failed to generate metrics: {str(e)}")
        return PlainTextResponse("# Error generating metrics", status_code=500)


# Middleware for automatic HTTP metrics collection
class MetricsMiddleware:
    """FastAPI middleware for automatic metrics collection."""

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        start_time = time.time()

        async def send_wrapper(message):
            if message["type"] == "http.response.start":
                duration = time.time() - start_time
                method = scope["method"]
                path = scope["path"]
                status_code = message["status"]

                metrics.record_http_request(method, path, status_code, duration)

            await send(message)

        await self.app(scope, receive, send_wrapper)