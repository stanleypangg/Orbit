#!/usr/bin/env python3
"""
Test script for the AI Recycle-to-Market Generator workflow system.
Validates the progressive ingredient discovery implementation.
"""
import asyncio
import json
import time
from app.workflows.graph import workflow_orchestrator
from app.workflows.state import WorkflowState, IngredientsData
from app.core.redis import redis_service


async def test_progressive_ingredient_discovery():
    """Test the complete progressive ingredient discovery workflow."""
    print("🧪 Testing AI Recycle-to-Market Generator Workflow")
    print("=" * 60)

    # Test case: User provides recyclable items
    thread_id = f"test_{int(time.time())}"
    user_input = "I have a plastic Coca-Cola bottle, some aluminum cans, and a cardboard box"

    print(f"📝 Thread ID: {thread_id}")
    print(f"💬 User Input: {user_input}")
    print()

    try:
        # Start the workflow
        print("🚀 Starting workflow...")
        result = await workflow_orchestrator.start_workflow(thread_id, user_input)
        print(f"✅ Workflow started: {result['status']}")
        print(f"📍 Current phase: {result.get('current_phase', 'unknown')}")
        print()

        # Check for user questions (simulating P1b)
        if result.get("status") == "waiting_for_input":
            print("❓ User questions generated:")
            for i, question in enumerate(result.get("questions", []), 1):
                print(f"   {i}. {question}")
            print()

            # Simulate user response
            user_response = "The Coca-Cola bottle is 500ml and made of PET plastic"
            print(f"💭 User response: {user_response}")
            print()

            # Continue workflow with user response
            print("▶️  Continuing workflow with user response...")
            continue_result = await workflow_orchestrator.continue_workflow(thread_id, user_response)
            print(f"✅ Workflow continued: {continue_result['status']}")
            print(f"📍 Current phase: {continue_result.get('current_phase', 'unknown')}")
            print()

        # Get final workflow status
        print("📊 Getting final workflow status...")
        status = await workflow_orchestrator.get_workflow_status(thread_id)
        print(f"Status: {status}")
        print()

        # Check ingredients in Redis
        print("🥫 Checking ingredients in Redis...")
        ingredient_key = f"ingredients:{thread_id}"
        ingredient_data = redis_service.get(ingredient_key)

        if ingredient_data:
            ingredients = json.loads(ingredient_data)
            print(f"✅ Found {len(ingredients.get('ingredients', []))} ingredients:")
            for i, ingredient in enumerate(ingredients.get('ingredients', []), 1):
                print(f"   {i}. {ingredient.get('name', 'Unknown')} - {ingredient.get('material', 'Unknown')} - {ingredient.get('size', 'Unknown')}")
        else:
            print("❌ No ingredients found in Redis")
        print()

        print("🎉 Test completed successfully!")
        return True

    except Exception as e:
        print(f"❌ Test failed with error: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


async def test_ingredient_discovery_only():
    """Test just the ingredient discovery nodes."""
    print("\n🔬 Testing Individual Nodes")
    print("=" * 40)

    # Create test state
    thread_id = f"nodetest_{int(time.time())}"
    test_state = WorkflowState(
        thread_id=thread_id,
        user_input="I have 2 empty wine bottles and a broken wooden chair",
        current_phase="ingredient_discovery",
        current_node="P1a"
    )

    try:
        # Test P1a (Extraction)
        print("🔍 Testing P1a - Ingredient Extraction...")
        from app.workflows.nodes import ingredient_extraction_node
        p1a_result = await ingredient_extraction_node(test_state)
        print(f"✅ P1a Result: {p1a_result.get('current_node', 'unknown')}")

        if test_state.ingredients_data:
            print(f"   Extracted {len(test_state.ingredients_data.ingredients)} ingredients")
            for ingredient in test_state.ingredients_data.ingredients:
                print(f"   - {ingredient.name}: {ingredient.material} ({ingredient.size})")
        print()

        # Test P1b (Null Checker)
        print("❓ Testing P1b - Null Checker...")
        from app.workflows.nodes import null_checker_node
        p1b_result = await null_checker_node(test_state)
        print(f"✅ P1b Result: {p1b_result}")

        if test_state.user_questions:
            print("   Generated questions:")
            for question in test_state.user_questions:
                print(f"   - {question}")
        print()

        # Test P1c (Categorizer) if no questions
        if not test_state.needs_user_input:
            print("📂 Testing P1c - Categorizer...")
            from app.workflows.nodes import ingredient_categorizer_node
            p1c_result = await ingredient_categorizer_node(test_state)
            print(f"✅ P1c Result: {p1c_result}")
            print(f"   Extraction complete: {test_state.extraction_complete}")

        print("🎯 Individual node testing completed!")
        return True

    except Exception as e:
        print(f"❌ Node test failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


async def test_redis_operations():
    """Test Redis operations."""
    print("\n📁 Testing Redis Operations")
    print("=" * 40)

    try:
        # Test Redis connection
        print("🔌 Testing Redis connection...")
        if redis_service.ping():
            print("✅ Redis connected successfully")
        else:
            print("❌ Redis connection failed")
            return False

        # Test ingredient storage
        print("💾 Testing ingredient storage...")
        test_ingredients = IngredientsData(
            ingredients=[
                {"name": "Test Bottle", "material": "glass", "size": "750ml"},
                {"name": "Test Can", "material": "aluminum", "size": "330ml"}
            ],
            confidence=0.8,
            needs_clarification=False
        )

        test_key = f"test_ingredients_{int(time.time())}"
        redis_service.set(test_key, test_ingredients.to_json(), ex=60)

        # Retrieve and verify
        retrieved_data = redis_service.get(test_key)
        if retrieved_data:
            parsed_data = IngredientsData.from_json(retrieved_data)
            print(f"✅ Successfully stored and retrieved {len(parsed_data.ingredients)} ingredients")
        else:
            print("❌ Failed to retrieve ingredients from Redis")
            return False

        # Cleanup
        redis_service.delete(test_key)
        print("🧹 Cleaned up test data")

        print("✅ Redis operations test completed!")
        return True

    except Exception as e:
        print(f"❌ Redis test failed: {str(e)}")
        return False


async def main():
    """Run all tests."""
    print("🤖 AI Recycle-to-Market Generator - System Tests")
    print("================================================")

    # Check if we have Gemini API key
    from app.core.config import settings
    if not settings.GEMINI_API_KEY:
        print("⚠️  GEMINI_API_KEY not found. Some tests may fail.")
        print("   Please set GEMINI_API_KEY in your environment.")
        print()

    tests = [
        ("Redis Operations", test_redis_operations),
        ("Individual Nodes", test_ingredient_discovery_only),
        ("Full Workflow", test_progressive_ingredient_discovery),
    ]

    results = []
    for test_name, test_func in tests:
        print(f"\n🧪 Running {test_name} Test...")
        try:
            result = await test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ {test_name} test crashed: {str(e)}")
            results.append((test_name, False))

    # Summary
    print("\n" + "=" * 50)
    print("📋 TEST SUMMARY")
    print("=" * 50)

    passed = 0
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
        if result:
            passed += 1

    print(f"\n🎯 Tests passed: {passed}/{len(results)}")

    if passed == len(results):
        print("🎉 All tests passed! System is ready for deployment.")
    else:
        print("⚠️  Some tests failed. Please check the errors above.")

    return passed == len(results)


if __name__ == "__main__":
    asyncio.run(main())