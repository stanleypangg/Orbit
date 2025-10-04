#!/usr/bin/env python3
"""
Load testing runner for AI Recycle-to-Market Generator.
Orchestrates different load testing scenarios and generates reports.
"""
import subprocess
import sys
import time
import json
import argparse
from pathlib import Path
from typing import Dict, Any


class LoadTestRunner:
    """Manages load testing scenarios and reporting."""

    def __init__(self, host: str = "http://localhost:8000"):
        self.host = host
        self.results_dir = Path("load_test_results")
        self.results_dir.mkdir(exist_ok=True)

    def run_scenario(self, scenario: str, users: int, duration: int) -> Dict[str, Any]:
        """Run a specific load testing scenario."""
        print(f"🚀 Running {scenario} scenario")
        print(f"   Users: {users}")
        print(f"   Duration: {duration}s")
        print(f"   Target: {self.host}")

        timestamp = int(time.time())
        stats_file = self.results_dir / f"{scenario}_{timestamp}_stats.json"

        # Build locust command
        cmd = [
            "locust",
            "-f", "locustfile.py",
            "--host", self.host,
            "--users", str(users),
            "--spawn-rate", str(min(users // 10, 10)),  # Gradual ramp-up
            "--run-time", f"{duration}s",
            "--headless",
            "--csv", str(self.results_dir / f"{scenario}_{timestamp}"),
            "--html", str(self.results_dir / f"{scenario}_{timestamp}_report.html")
        ]

        if scenario == "stress":
            cmd.extend(["--tags", "stress"])

        try:
            print(f"🔄 Executing: {' '.join(cmd)}")
            result = subprocess.run(cmd, capture_output=True, text=True, cwd=Path(__file__).parent)

            if result.returncode == 0:
                print(f"✅ {scenario} scenario completed successfully")
                return {
                    "scenario": scenario,
                    "users": users,
                    "duration": duration,
                    "success": True,
                    "stdout": result.stdout,
                    "stderr": result.stderr
                }
            else:
                print(f"❌ {scenario} scenario failed")
                print(f"STDOUT: {result.stdout}")
                print(f"STDERR: {result.stderr}")
                return {
                    "scenario": scenario,
                    "users": users,
                    "duration": duration,
                    "success": False,
                    "error": result.stderr
                }

        except Exception as e:
            print(f"❌ Failed to run {scenario} scenario: {str(e)}")
            return {
                "scenario": scenario,
                "success": False,
                "error": str(e)
            }

    def run_baseline_test(self) -> Dict[str, Any]:
        """Run baseline performance test with minimal load."""
        print("\n🧪 Running baseline performance test...")
        return self.run_scenario("baseline", users=1, duration=60)

    def run_normal_load_test(self) -> Dict[str, Any]:
        """Run normal load test simulating typical usage."""
        print("\n📈 Running normal load test...")
        return self.run_scenario("normal", users=10, duration=300)

    def run_peak_load_test(self) -> Dict[str, Any]:
        """Run peak load test simulating high traffic."""
        print("\n🔥 Running peak load test...")
        return self.run_scenario("peak", users=50, duration=300)

    def run_stress_test(self) -> Dict[str, Any]:
        """Run stress test to find breaking point."""
        print("\n💥 Running stress test...")
        return self.run_scenario("stress", users=100, duration=180)

    def run_endurance_test(self) -> Dict[str, Any]:
        """Run endurance test to check for memory leaks and stability."""
        print("\n⏰ Running endurance test...")
        return self.run_scenario("endurance", users=20, duration=1800)  # 30 minutes

    def check_system_readiness(self) -> bool:
        """Check if the system is ready for load testing."""
        print("🔍 Checking system readiness...")

        try:
            import requests

            # Check health endpoint
            response = requests.get(f"{self.host}/health", timeout=10)
            if response.status_code != 200:
                print(f"❌ Health check failed: {response.status_code}")
                return False

            # Check if we can start a test workflow
            test_response = requests.post(
                f"{self.host}/api/workflow/start",
                json={
                    "thread_id": "health_check_test",
                    "user_input": "Test materials for load testing"
                },
                timeout=30
            )

            if test_response.status_code not in [200, 400]:  # 400 might be validation error, which is OK
                print(f"❌ Workflow endpoint check failed: {test_response.status_code}")
                return False

            print("✅ System is ready for load testing")
            return True

        except Exception as e:
            print(f"❌ System readiness check failed: {str(e)}")
            return False

    def generate_summary_report(self, results: list) -> None:
        """Generate a summary report of all test results."""
        print("\n📋 Generating summary report...")

        timestamp = int(time.time())
        report_file = self.results_dir / f"load_test_summary_{timestamp}.json"

        summary = {
            "timestamp": timestamp,
            "total_scenarios": len(results),
            "successful_scenarios": sum(1 for r in results if r.get("success", False)),
            "failed_scenarios": sum(1 for r in results if not r.get("success", False)),
            "results": results
        }

        with open(report_file, 'w') as f:
            json.dump(summary, f, indent=2)

        # Print summary to console
        print(f"\n{'='*60}")
        print("📊 LOAD TESTING SUMMARY")
        print(f"{'='*60}")
        print(f"Total scenarios run: {summary['total_scenarios']}")
        print(f"Successful: {summary['successful_scenarios']}")
        print(f"Failed: {summary['failed_scenarios']}")

        for result in results:
            status = "✅" if result.get("success", False) else "❌"
            scenario = result.get("scenario", "unknown")
            users = result.get("users", "N/A")
            duration = result.get("duration", "N/A")
            print(f"{status} {scenario}: {users} users for {duration}s")

        print(f"\n📄 Detailed reports saved in: {self.results_dir}")
        print(f"📄 Summary report: {report_file}")

    def run_all_tests(self) -> bool:
        """Run complete load testing suite."""
        print("🤖 AI Recycle-to-Market Generator - Load Testing Suite")
        print("=" * 60)

        # Check system readiness
        if not self.check_system_readiness():
            print("❌ System not ready for load testing")
            return False

        results = []

        # Run all test scenarios
        test_scenarios = [
            ("baseline", self.run_baseline_test),
            ("normal", self.run_normal_load_test),
            ("peak", self.run_peak_load_test),
            ("stress", self.run_stress_test),
            # ("endurance", self.run_endurance_test),  # Uncomment for full suite
        ]

        for scenario_name, test_func in test_scenarios:
            try:
                result = test_func()
                results.append(result)

                # Brief pause between tests
                if scenario_name != test_scenarios[-1][0]:
                    print(f"⏳ Waiting 30 seconds before next test...")
                    time.sleep(30)

            except KeyboardInterrupt:
                print(f"\n⚠️ Load testing interrupted by user")
                break
            except Exception as e:
                print(f"❌ Error running {scenario_name}: {str(e)}")
                results.append({
                    "scenario": scenario_name,
                    "success": False,
                    "error": str(e)
                })

        # Generate summary report
        self.generate_summary_report(results)

        # Check if all tests passed
        all_passed = all(r.get("success", False) for r in results)

        if all_passed:
            print("\n🎉 All load tests completed successfully!")
            print("System is ready for production load.")
        else:
            print("\n⚠️ Some load tests failed.")
            print("Please review the results and optimize the system.")

        return all_passed


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(description="Load testing for AI Recycle Generator")
    parser.add_argument("--host", default="http://localhost:8000", help="Target host")
    parser.add_argument("--scenario", choices=["baseline", "normal", "peak", "stress", "endurance", "all"],
                       default="all", help="Test scenario to run")
    parser.add_argument("--users", type=int, help="Number of users (overrides scenario default)")
    parser.add_argument("--duration", type=int, help="Test duration in seconds (overrides scenario default)")

    args = parser.parse_args()

    runner = LoadTestRunner(host=args.host)

    if args.scenario == "all":
        success = runner.run_all_tests()
        sys.exit(0 if success else 1)
    else:
        # Run single scenario
        users = args.users or {"baseline": 1, "normal": 10, "peak": 50, "stress": 100, "endurance": 20}[args.scenario]
        duration = args.duration or {"baseline": 60, "normal": 300, "peak": 300, "stress": 180, "endurance": 1800}[args.scenario]

        if runner.check_system_readiness():
            result = runner.run_scenario(args.scenario, users, duration)
            runner.generate_summary_report([result])
            sys.exit(0 if result.get("success", False) else 1)
        else:
            sys.exit(1)


if __name__ == "__main__":
    main()