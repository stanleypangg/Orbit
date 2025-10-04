"""
Load testing script for AI Recycle-to-Market Generator using Locust.
Tests all workflow phases under realistic user load.
"""
import json
import random
import time
from locust import HttpUser, task, between, events
from locust.exception import StopUser


class RecycleWorkflowUser(HttpUser):
    """Simulates a user going through the complete recycle workflow."""

    wait_time = between(2, 8)  # Wait 2-8 seconds between tasks

    def on_start(self):
        """Initialize user session."""
        self.thread_id = f"load_test_{int(time.time() * 1000)}_{random.randint(1000, 9999)}"
        self.user_inputs = [
            "I have plastic bottles and cardboard boxes to recycle",
            "Want to make something useful from old containers and paper",
            "Got aluminum cans and plastic containers for upcycling",
            "Looking to create storage solutions from waste materials",
            "Have glass jars and cardboard packaging to repurpose"
        ]
        self.current_phase = "starting"

    @task(10)
    def health_check(self):
        """Quick health check - most frequent task."""
        with self.client.get("/health", catch_response=True) as response:
            if response.status_code != 200:
                response.failure("Health check failed")

    @task(8)
    def start_workflow(self):
        """Start a new workflow - common user action."""
        if self.current_phase != "starting":
            return

        user_input = random.choice(self.user_inputs)

        with self.client.post(
            "/api/workflow/start",
            json={
                "thread_id": self.thread_id,
                "user_input": user_input
            },
            catch_response=True,
            name="/api/workflow/start"
        ) as response:
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "waiting_for_input":
                    self.current_phase = "clarification"
                elif data.get("status") == "phase_complete":
                    self.current_phase = "phase2"
                response.success()
            else:
                response.failure(f"Workflow start failed: {response.status_code}")

    @task(6)
    def continue_workflow(self):
        """Continue workflow with user clarification."""
        if self.current_phase != "clarification":
            return

        clarifications = [
            "The bottles are 500ml plastic water bottles, clean and empty",
            "Cardboard boxes are medium-sized shipping boxes in good condition",
            "Containers are various plastic food storage containers",
            "Materials are all clean and ready for reuse"
        ]

        clarification = random.choice(clarifications)

        with self.client.post(
            "/api/workflow/continue",
            json={
                "thread_id": self.thread_id,
                "user_response": clarification
            },
            catch_response=True,
            name="/api/workflow/continue"
        ) as response:
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "phase_complete":
                    self.current_phase = "phase2"
                elif data.get("status") == "waiting_for_input":
                    pass  # Still in clarification
                response.success()
            else:
                response.failure(f"Workflow continue failed: {response.status_code}")

    @task(4)
    def get_workflow_status(self):
        """Check workflow status."""
        if self.current_phase == "starting":
            return

        with self.client.get(
            f"/api/workflow/status/{self.thread_id}",
            catch_response=True,
            name="/api/workflow/status"
        ) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Status check failed: {response.status_code}")

    @task(3)
    def get_project_concepts(self):
        """Get project concepts (Phase 3)."""
        if self.current_phase not in ["phase2", "phase3", "complete"]:
            return

        with self.client.get(
            f"/api/workflow/concepts/{self.thread_id}",
            catch_response=True,
            name="/api/workflow/concepts"
        ) as response:
            if response.status_code in [200, 404]:  # 404 is OK if concepts not ready
                response.success()
            else:
                response.failure(f"Concepts fetch failed: {response.status_code}")

    @task(2)
    def get_project_exports(self):
        """Get project exports (Phase 4)."""
        if self.current_phase != "complete":
            return

        export_formats = ["json", "html", "pdf_ready"]
        export_format = random.choice(export_formats)

        with self.client.get(
            f"/api/workflow/exports/{self.thread_id}",
            params={"export_format": export_format},
            catch_response=True,
            name="/api/workflow/exports"
        ) as response:
            if response.status_code in [200, 404]:  # 404 is OK if not ready
                response.success()
            else:
                response.failure(f"Exports fetch failed: {response.status_code}")

    @task(2)
    def get_project_analytics(self):
        """Get project analytics (Phase 4)."""
        if self.current_phase != "complete":
            return

        with self.client.get(
            f"/api/workflow/analytics/{self.thread_id}",
            catch_response=True,
            name="/api/workflow/analytics"
        ) as response:
            if response.status_code in [200, 404]:  # 404 is OK if not ready
                response.success()
            else:
                response.failure(f"Analytics fetch failed: {response.status_code}")

    @task(1)
    def download_project(self):
        """Download project file."""
        if self.current_phase != "complete":
            return

        download_formats = ["json", "html"]
        download_format = random.choice(download_formats)

        with self.client.get(
            f"/api/workflow/download/{self.thread_id}",
            params={"format": download_format},
            catch_response=True,
            name="/api/workflow/download"
        ) as response:
            if response.status_code in [200, 404]:  # 404 is OK if not ready
                response.success()
            else:
                response.failure(f"Download failed: {response.status_code}")


class StressTestUser(HttpUser):
    """High-intensity user for stress testing."""

    wait_time = between(0.5, 2)  # Aggressive timing

    def on_start(self):
        self.thread_id = f"stress_{int(time.time() * 1000)}_{random.randint(1000, 9999)}"

    @task(20)
    def rapid_health_checks(self):
        """Rapid health checks to test system responsiveness."""
        self.client.get("/health")

    @task(10)
    def concurrent_workflow_starts(self):
        """Start multiple workflows rapidly."""
        user_input = "Stress test workflow with multiple materials"

        self.client.post(
            "/api/workflow/start",
            json={
                "thread_id": self.thread_id,
                "user_input": user_input
            }
        )

    @task(5)
    def rapid_status_checks(self):
        """Rapid status checking."""
        self.client.get(f"/api/workflow/status/{self.thread_id}")


# Custom event handlers for detailed reporting
@events.request.add_listener
def log_slow_requests(request_type, name, response_time, response_length, **kwargs):
    """Log requests that take longer than expected."""
    if response_time > 5000:  # 5 seconds
        print(f"SLOW REQUEST: {request_type} {name} took {response_time:.0f}ms")


@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    """Print test start information."""
    print(f"🚀 Load test starting with {environment.runner.user_count} users")
    print(f"🎯 Target host: {environment.host}")


@events.test_stop.add_listener
def on_test_stop(environment, **kwargs):
    """Print test completion information."""
    print("🏁 Load test completed")

    stats = environment.runner.stats

    print(f"\n📊 LOAD TEST SUMMARY")
    print(f"{'='*50}")
    print(f"Total requests: {stats.total.num_requests}")
    print(f"Failed requests: {stats.total.num_failures}")
    print(f"Failure rate: {stats.total.fail_ratio:.2%}")
    print(f"Average response time: {stats.total.avg_response_time:.0f}ms")
    print(f"95th percentile: {stats.total.get_response_time_percentile(0.95):.0f}ms")
    print(f"99th percentile: {stats.total.get_response_time_percentile(0.99):.0f}ms")
    print(f"Max response time: {stats.total.max_response_time:.0f}ms")
    print(f"RPS: {stats.total.current_rps:.1f}")

    # Check if performance targets are met
    avg_response_time = stats.total.avg_response_time
    failure_rate = stats.total.fail_ratio

    print(f"\n🎯 PERFORMANCE TARGETS")
    print(f"{'='*50}")
    print(f"Average response time: {avg_response_time:.0f}ms {'✅' if avg_response_time < 2000 else '❌'} (target: <2000ms)")
    print(f"Failure rate: {failure_rate:.2%} {'✅' if failure_rate < 0.01 else '❌'} (target: <1%)")
    print(f"95th percentile: {stats.total.get_response_time_percentile(0.95):.0f}ms {'✅' if stats.total.get_response_time_percentile(0.95) < 5000 else '❌'} (target: <5000ms)")


# Load test scenarios
class WorkflowLoadTest(RecycleWorkflowUser):
    """Standard workflow load testing."""
    weight = 3


class StressTest(StressTestUser):
    """Stress testing with high request rate."""
    weight = 1