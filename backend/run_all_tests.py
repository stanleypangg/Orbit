#!/usr/bin/env python3
"""
Complete test suite runner for the AI Recycle-to-Market Generator.
Runs all phase tests in sequence and provides comprehensive results.
"""
import asyncio
import subprocess
import sys
import time
from pathlib import Path


def run_pytest_tests():
    """Run the existing pytest suite."""
    print("🧪 Running pytest test suite...")
    try:
        result = subprocess.run([
            sys.executable, "-m", "pytest",
            "app/workflows/testing/",
            "-v", "--tb=short"
        ], capture_output=True, text=True)

        print("PYTEST STDOUT:")
        print(result.stdout)

        if result.stderr:
            print("PYTEST STDERR:")
            print(result.stderr)

        return result.returncode == 0
    except Exception as e:
        print(f"❌ Pytest execution failed: {str(e)}")
        return False


async def run_phase_test(test_file: str, phase_name: str):
    """Run a single phase test."""
    print(f"\n{'=' * 60}")
    print(f"🚀 Running {phase_name} Tests")
    print(f"{'=' * 60}")

    try:
        # Import and run the test
        if test_file == "test_phase2.py":
            from test_phase2 import main as phase2_main
            return await phase2_main()
        elif test_file == "test_phase3.py":
            from test_phase3 import main as phase3_main
            return await phase3_main()
        elif test_file == "test_phase4.py":
            from test_phase4 import main as phase4_main
            return await phase4_main()
        else:
            print(f"❌ Unknown test file: {test_file}")
            return False
    except Exception as e:
        print(f"❌ {phase_name} test failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


async def main():
    """Run complete test suite."""
    print("🤖 AI Recycle-to-Market Generator - Complete Test Suite")
    print("=" * 65)
    print(f"Started at: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    print()

    start_time = time.time()

    # Test phases to run
    test_phases = [
        ("app/workflows/testing/", "Phase 1 Unit & Integration Tests (pytest)"),
        ("test_phase2.py", "Phase 2 Goal Formation & Choice Generation"),
        ("test_phase3.py", "Phase 3 Image Generation & User Interaction"),
        ("test_phase4.py", "Phase 4 Output Assembly & Delivery"),
    ]

    results = []

    # Run pytest first
    print("🔬 Running Unit and Integration Tests...")
    pytest_result = run_pytest_tests()
    results.append(("Phase 1 Unit & Integration Tests", pytest_result))

    # Run phase tests
    for test_file, phase_name in test_phases[1:]:
        try:
            result = await run_phase_test(test_file, phase_name)
            results.append((phase_name, result))
        except Exception as e:
            print(f"❌ Failed to run {phase_name}: {str(e)}")
            results.append((phase_name, False))

    # Summary
    total_time = time.time() - start_time

    print("\n" + "=" * 80)
    print("📋 COMPLETE TEST SUITE SUMMARY")
    print("=" * 80)

    passed = 0
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
        if result:
            passed += 1

    print(f"\n🎯 Total tests passed: {passed}/{len(results)}")
    print(f"⏱️  Total execution time: {total_time:.1f} seconds")
    print(f"📅 Completed at: {time.strftime('%Y-%m-%d %H:%M:%S')}")

    if passed == len(results):
        print("\n🎉 ALL TESTS PASSED! System ready for production deployment.")
        return True
    else:
        print(f"\n⚠️  {len(results) - passed} test suite(s) failed. Review errors above.")
        return False


if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1)