"""
Performance monitoring and optimization for LangGraph workflows.
Tracks ML pipeline performance and provides optimization recommendations.
"""
import time
import asyncio
import logging
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field
from enum import Enum
import statistics

logger = logging.getLogger(__name__)


class PerformanceLevel(Enum):
    """Performance levels for optimization."""
    OPTIMAL = "optimal"       # <2s per node
    GOOD = "good"            # 2-5s per node
    DEGRADED = "degraded"    # 5-10s per node
    POOR = "poor"            # >10s per node


@dataclass
class NodeMetrics:
    """Metrics for individual workflow nodes."""
    node_name: str
    execution_times: List[float] = field(default_factory=list)
    error_count: int = 0
    retry_count: int = 0
    gemini_calls: int = 0
    redis_operations: int = 0

    @property
    def average_time(self) -> float:
        """Calculate average execution time."""
        return statistics.mean(self.execution_times) if self.execution_times else 0.0

    @property
    def p95_time(self) -> float:
        """Calculate 95th percentile execution time."""
        if not self.execution_times:
            return 0.0
        sorted_times = sorted(self.execution_times)
        index = int(0.95 * len(sorted_times))
        return sorted_times[min(index, len(sorted_times) - 1)]

    @property
    def performance_level(self) -> PerformanceLevel:
        """Determine performance level based on average time."""
        avg_time = self.average_time
        if avg_time < 2.0:
            return PerformanceLevel.OPTIMAL
        elif avg_time < 5.0:
            return PerformanceLevel.GOOD
        elif avg_time < 10.0:
            return PerformanceLevel.DEGRADED
        else:
            return PerformanceLevel.POOR


@dataclass
class WorkflowMetrics:
    """Overall workflow performance metrics."""
    thread_id: str
    start_time: float
    end_time: Optional[float] = None
    node_metrics: Dict[str, NodeMetrics] = field(default_factory=dict)
    phase_durations: Dict[str, float] = field(default_factory=dict)
    total_gemini_calls: int = 0
    total_redis_operations: int = 0
    error_count: int = 0
    retry_count: int = 0

    @property
    def total_duration(self) -> float:
        """Calculate total workflow duration."""
        if self.end_time:
            return self.end_time - self.start_time
        return time.time() - self.start_time

    @property
    def overall_performance_level(self) -> PerformanceLevel:
        """Determine overall performance level."""
        if not self.node_metrics:
            return PerformanceLevel.OPTIMAL

        avg_node_time = statistics.mean([
            metrics.average_time for metrics in self.node_metrics.values()
            if metrics.execution_times
        ])

        if avg_node_time < 2.0:
            return PerformanceLevel.OPTIMAL
        elif avg_node_time < 5.0:
            return PerformanceLevel.GOOD
        elif avg_node_time < 10.0:
            return PerformanceLevel.DEGRADED
        else:
            return PerformanceLevel.POOR


class PerformanceMonitor:
    """
    Monitor and optimize LangGraph workflow performance.
    """

    def __init__(self):
        self.active_workflows: Dict[str, WorkflowMetrics] = {}
        self.completed_workflows: List[WorkflowMetrics] = []
        self.optimization_rules = self._load_optimization_rules()

    def start_workflow_tracking(self, thread_id: str):
        """Start tracking a new workflow."""
        self.active_workflows[thread_id] = WorkflowMetrics(
            thread_id=thread_id,
            start_time=time.time()
        )
        logger.info(f"Started performance tracking for workflow {thread_id}")

    def record_node_execution(
        self,
        thread_id: str,
        node_name: str,
        duration: float,
        gemini_calls: int = 0,
        redis_ops: int = 0,
        errors: int = 0,
        retries: int = 0
    ):
        """Record node execution metrics."""
        if thread_id not in self.active_workflows:
            logger.warning(f"Workflow {thread_id} not being tracked")
            return

        workflow_metrics = self.active_workflows[thread_id]

        if node_name not in workflow_metrics.node_metrics:
            workflow_metrics.node_metrics[node_name] = NodeMetrics(node_name)

        node_metrics = workflow_metrics.node_metrics[node_name]
        node_metrics.execution_times.append(duration)
        node_metrics.gemini_calls += gemini_calls
        node_metrics.redis_operations += redis_ops
        node_metrics.error_count += errors
        node_metrics.retry_count += retries

        # Update workflow totals
        workflow_metrics.total_gemini_calls += gemini_calls
        workflow_metrics.total_redis_operations += redis_ops
        workflow_metrics.error_count += errors
        workflow_metrics.retry_count += retries

        # Check if optimization is needed
        if node_metrics.performance_level in [PerformanceLevel.DEGRADED, PerformanceLevel.POOR]:
            self._trigger_optimization_analysis(thread_id, node_name)

    def record_phase_completion(self, thread_id: str, phase: str, duration: float):
        """Record phase completion time."""
        if thread_id in self.active_workflows:
            self.active_workflows[thread_id].phase_durations[phase] = duration

    def complete_workflow_tracking(self, thread_id: str):
        """Complete workflow tracking and analyze results."""
        if thread_id not in self.active_workflows:
            logger.warning(f"Workflow {thread_id} not being tracked")
            return

        workflow_metrics = self.active_workflows[thread_id]
        workflow_metrics.end_time = time.time()

        # Move to completed workflows
        self.completed_workflows.append(workflow_metrics)
        del self.active_workflows[thread_id]

        # Generate performance report
        self._generate_performance_report(workflow_metrics)

        logger.info(f"Completed performance tracking for workflow {thread_id}")

    def get_optimization_recommendations(self, thread_id: str) -> List[Dict[str, Any]]:
        """Get performance optimization recommendations."""
        recommendations = []

        if thread_id in self.active_workflows:
            workflow_metrics = self.active_workflows[thread_id]
        else:
            # Look in completed workflows
            workflow_metrics = next(
                (wm for wm in self.completed_workflows if wm.thread_id == thread_id),
                None
            )

        if not workflow_metrics:
            return recommendations

        # Analyze node performance
        for node_name, node_metrics in workflow_metrics.node_metrics.items():
            if node_metrics.performance_level == PerformanceLevel.POOR:
                recommendations.append({
                    "type": "node_optimization",
                    "node": node_name,
                    "issue": "High execution time",
                    "current_avg": node_metrics.average_time,
                    "recommendations": self._get_node_recommendations(node_name, node_metrics)
                })

            if node_metrics.error_count > 2:
                recommendations.append({
                    "type": "error_reduction",
                    "node": node_name,
                    "issue": "High error rate",
                    "error_count": node_metrics.error_count,
                    "recommendations": self._get_error_recommendations(node_name, node_metrics)
                })

        # Analyze overall workflow performance
        if workflow_metrics.overall_performance_level in [PerformanceLevel.DEGRADED, PerformanceLevel.POOR]:
            recommendations.append({
                "type": "workflow_optimization",
                "issue": "Overall slow performance",
                "total_duration": workflow_metrics.total_duration,
                "recommendations": self._get_workflow_recommendations(workflow_metrics)
            })

        return recommendations

    def get_performance_summary(self) -> Dict[str, Any]:
        """Get overall performance summary."""
        if not self.completed_workflows:
            return {"message": "No completed workflows to analyze"}

        # Calculate aggregated metrics
        total_workflows = len(self.completed_workflows)
        avg_duration = statistics.mean([wm.total_duration for wm in self.completed_workflows])
        avg_gemini_calls = statistics.mean([wm.total_gemini_calls for wm in self.completed_workflows])
        avg_errors = statistics.mean([wm.error_count for wm in self.completed_workflows])

        # Performance distribution
        performance_levels = [wm.overall_performance_level.value for wm in self.completed_workflows]
        performance_distribution = {
            level.value: performance_levels.count(level.value)
            for level in PerformanceLevel
        }

        # Slowest nodes analysis
        all_node_metrics = []
        for wm in self.completed_workflows:
            all_node_metrics.extend(wm.node_metrics.values())

        slowest_nodes = sorted(
            all_node_metrics,
            key=lambda nm: nm.average_time,
            reverse=True
        )[:5]

        return {
            "summary": {
                "total_workflows": total_workflows,
                "average_duration": avg_duration,
                "average_gemini_calls": avg_gemini_calls,
                "average_errors": avg_errors
            },
            "performance_distribution": performance_distribution,
            "slowest_nodes": [
                {
                    "node": nm.node_name,
                    "avg_time": nm.average_time,
                    "p95_time": nm.p95_time,
                    "performance_level": nm.performance_level.value
                }
                for nm in slowest_nodes
            ]
        }

    def _trigger_optimization_analysis(self, thread_id: str, node_name: str):
        """Trigger optimization analysis for slow nodes."""
        logger.warning(f"Performance degradation detected in {node_name} for workflow {thread_id}")

        # Immediate optimizations that could be applied
        workflow_metrics = self.active_workflows[thread_id]
        node_metrics = workflow_metrics.node_metrics[node_name]

        if node_name in ["P1a_ingredient_extraction", "P1c_categorize_ingredients"]:
            # For extraction nodes, consider switching to faster model
            logger.info(f"Recommending Gemini Flash model for {node_name}")

        if node_metrics.retry_count > 2:
            # High retry count suggests we should implement fallback strategy
            logger.info(f"Recommending fallback strategy for {node_name}")

    def _generate_performance_report(self, workflow_metrics: WorkflowMetrics):
        """Generate detailed performance report."""
        logger.info(f"Performance Report for Workflow {workflow_metrics.thread_id}")
        logger.info(f"Total Duration: {workflow_metrics.total_duration:.2f}s")
        logger.info(f"Overall Performance: {workflow_metrics.overall_performance_level.value}")
        logger.info(f"Gemini API Calls: {workflow_metrics.total_gemini_calls}")
        logger.info(f"Redis Operations: {workflow_metrics.total_redis_operations}")
        logger.info(f"Total Errors: {workflow_metrics.error_count}")

        for node_name, node_metrics in workflow_metrics.node_metrics.items():
            logger.info(f"Node {node_name}: {node_metrics.average_time:.2f}s avg, {node_metrics.performance_level.value}")

    def _get_node_recommendations(self, node_name: str, node_metrics: NodeMetrics) -> List[str]:
        """Get specific recommendations for node optimization."""
        recommendations = []

        if node_name in ["P1a_ingredient_extraction", "P1b_null_checker"]:
            recommendations.extend([
                "Switch to Gemini 2.5 Flash for faster extraction",
                "Implement caching for common ingredient patterns",
                "Use structured output to reduce parsing time"
            ])

        if node_name == "P1c_categorize_ingredients":
            recommendations.extend([
                "Pre-compute category mappings",
                "Use batch processing for multiple ingredients",
                "Implement rule-based categorization as fallback"
            ])

        if node_metrics.gemini_calls > 5:
            recommendations.append("Reduce Gemini API calls through better caching")

        if node_metrics.retry_count > 2:
            recommendations.append("Implement progressive fallback strategies")

        return recommendations

    def _get_error_recommendations(self, node_name: str, node_metrics: NodeMetrics) -> List[str]:
        """Get recommendations for error reduction."""
        return [
            "Implement more robust error handling",
            "Add input validation before processing",
            "Use exponential backoff for retries",
            "Implement circuit breaker pattern"
        ]

    def _get_workflow_recommendations(self, workflow_metrics: WorkflowMetrics) -> List[str]:
        """Get recommendations for overall workflow optimization."""
        recommendations = []

        if workflow_metrics.total_duration > 30:
            recommendations.append("Consider parallel processing for independent steps")

        if workflow_metrics.total_gemini_calls > 15:
            recommendations.append("Implement aggressive caching for Gemini responses")

        if workflow_metrics.error_count > 5:
            recommendations.append("Review and strengthen error handling strategies")

        return recommendations

    def _load_optimization_rules(self) -> Dict[str, Any]:
        """Load optimization rules and thresholds."""
        return {
            "node_time_thresholds": {
                "P1a_ingredient_extraction": 3.0,  # seconds
                "P1b_null_checker": 1.0,
                "P1c_categorize_ingredients": 2.0,
                "G1_goal_formation": 5.0,
                "O1_choice_proposer": 8.0,
                "E1_evaluator": 6.0
            },
            "gemini_model_recommendations": {
                "extraction": "gemini-2.5-flash",
                "evaluation": "gemini-2.5-pro",
                "generation": "gemini-2.5-flash"
            },
            "retry_limits": {
                "default": 3,
                "extraction": 2,
                "api_heavy": 5
            }
        }


# Global performance monitor instance
performance_monitor = PerformanceMonitor()