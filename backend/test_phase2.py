#!/usr/bin/env python3
"""
Test script for Phase 2: Goal Formation & Choice Generation.
Validates the complete Phase 1 → Phase 2 workflow integration.
"""
import asyncio
import json
import time
from app.workflows.graph import workflow_orchestrator
from app.workflows.state import WorkflowState, IngredientsData, IngredientItem
from app.workflows.phase2_nodes import goal_formation_node, choice_proposer_node, evaluation_node
from app.knowledge.material_affordances import material_kb, MaterialType
from app.core.redis import redis_service


async def test_phase2_workflow():
    """Test the complete Phase 1 → Phase 2 workflow."""
    print("🧪 Testing Phase 2: Goal Formation & Choice Generation")
    print("=" * 60)

    # Create test state with completed Phase 1 data
    thread_id = f"phase2_test_{int(time.time())}"

    # Mock completed ingredient discovery
    test_ingredients = IngredientsData(
        ingredients=[
            IngredientItem(
                name="Plastic water bottle",
                material="plastic",
                size="500ml",
                category="beverage_container",
                condition="clean",
                confidence=0.9
            ),
            IngredientItem(
                name="Aluminum can",
                material="aluminum",
                size="12oz",
                category="beverage_container",
                condition="empty",
                confidence=0.9
            ),
            IngredientItem(
                name="Cardboard box",
                material="cardboard",
                size="medium",
                category="packaging",
                condition="good",
                confidence=0.8
            )
        ],
        confidence=0.85,
        needs_clarification=False
    )

    test_state = WorkflowState(
        thread_id=thread_id,
        user_input="I want to make something useful for my home office",
        current_phase="goal_formation",
        current_node="G1",
        ingredients_data=test_ingredients,
        extraction_complete=True,
        user_constraints={
            "material_synergy": 0.75,
            "project_complexity": "moderate",
            "recommended_types": ["storage", "organization", "desk_accessories"]
        }
    )

    print(f"📝 Thread ID: {thread_id}")
    print(f"🥫 Ingredients: {len(test_ingredients.ingredients)} items")
    print(f"💭 User intent: {test_state.user_input}")
    print()

    try:
        # Test Phase 2 nodes individually
        print("🎯 Testing G1 - Goal Formation...")
        g1_result = await goal_formation_node(test_state)
        print(f"✅ Goal formed: {test_state.goals}")
        print(f"📦 Artifact type: {test_state.artifact_type}")
        print(f"⚙️  Complexity: {test_state.user_constraints.get('project_complexity', 'unknown')}")
        print()

        print("💡 Testing O1 - Choice Generation...")
        o1_result = await choice_proposer_node(test_state)
        print(f"✅ Generated {len(test_state.viable_options)} viable options:")
        for i, option in enumerate(test_state.viable_options, 1):
            print(f"   {i}. {option.get('title', 'Unknown')} - {option.get('difficulty_level', 'unknown')} difficulty")
        print()

        print("📊 Testing E1 - Evaluation...")
        e1_result = await evaluation_node(test_state)
        if test_state.selected_option:
            print(f"✅ Selected option: {test_state.selected_option.get('title', 'Unknown')}")
            print(f"📍 Current phase: {test_state.current_phase}")
            print(f"🎯 Next node: {test_state.current_node}")
        else:
            print("❌ No option selected")
        print()

        # Test data persistence
        print("💾 Testing Redis data persistence...")

        # Check goal data
        goal_key = f"goals:{thread_id}"
        goal_data = redis_service.get(goal_key)
        if goal_data:
            print("✅ Goal data persisted successfully")
        else:
            print("❌ Goal data not found in Redis")

        # Check choices data
        choices_key = f"choices:{thread_id}"
        choices_data = redis_service.get(choices_key)
        if choices_data:
            print("✅ Choices data persisted successfully")
        else:
            print("❌ Choices data not found in Redis")

        print()
        print("🎉 Phase 2 individual node testing completed!")
        return True

    except Exception as e:
        print(f"❌ Phase 2 test failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


async def test_material_knowledge_system():
    """Test the material affordance knowledge system."""
    print("\n🧠 Testing Material Knowledge System")
    print("=" * 40)

    try:
        # Test material type detection
        print("🔍 Testing material type detection...")
        test_materials = ["plastic", "aluminum", "cardboard", "glass"]
        detected_types = []
        for material in test_materials:
            mat_type = material_kb.get_material_by_name(material)
            detected_types.append(mat_type)
            print(f"   '{material}' → {mat_type.value if mat_type else 'Unknown'}")
        print()

        # Test material compatibility
        print("🔗 Testing material compatibility...")
        compatibility = material_kb.assess_material_compatibility(detected_types[:3])  # plastic, aluminum, cardboard
        print(f"   Compatibility score: {compatibility['compatibility_score']:.2f}")
        print(f"   Is safe: {compatibility['is_safe']}")
        if compatibility['warnings']:
            print(f"   Warnings: {len(compatibility['warnings'])}")
        print()

        # Test project suggestions
        print("💡 Testing project suggestions...")
        suggestions = material_kb.suggest_project_type(detected_types[:3])
        print(f"   Found {len(suggestions['suggestions'])} project suggestions:")
        for suggestion in suggestions['suggestions'][:3]:
            print(f"   - {suggestion['project_type']}: {suggestion['score']:.2f} score")
        print()

        # Test safety assessment
        print("🛡️  Testing safety assessment...")
        safety = material_kb.get_safety_assessment(
            detected_types[:3],
            ["cutting", "drilling", "assembling"]
        )
        print(f"   Safety level: {safety['safety_level']}")
        print(f"   Required PPE: {', '.join(safety['required_ppe'])}")
        print(f"   Safe to proceed: {safety['is_safe_to_proceed']}")
        print()

        print("✅ Material knowledge system test completed!")
        return True

    except Exception as e:
        print(f"❌ Material knowledge test failed: {str(e)}")
        return False


async def test_full_phase2_integration():
    """Test the complete workflow from Phase 1 through Phase 2."""
    print("\n🚀 Testing Full Phase 1 → Phase 2 Integration")
    print("=" * 50)

    thread_id = f"integration_test_{int(time.time())}"
    user_input = "I have plastic bottles, aluminum cans, and cardboard. I want to organize my desk."

    try:
        print(f"🎬 Starting full workflow test...")
        print(f"Thread ID: {thread_id}")
        print(f"Input: {user_input}")
        print()

        # Start workflow and let it run through Phase 1 and Phase 2
        result = await workflow_orchestrator.start_workflow(thread_id, user_input)
        print(f"📊 Initial result: {result['status']}")

        # If workflow is waiting for user input (Phase 1), simulate response
        if result.get("status") == "waiting_for_input":
            print("❓ Workflow waiting for user input, providing clarification...")
            user_response = "The bottles are 500ml plastic, cans are 12oz aluminum"
            continue_result = await workflow_orchestrator.continue_workflow(thread_id, user_response)
            print(f"▶️  Continued result: {continue_result['status']}")
            result = continue_result

        # Check final status
        final_status = await workflow_orchestrator.get_workflow_status(thread_id)
        print(f"🏁 Final status: {final_status}")

        # Verify Phase 2 completion
        if final_status.get("current_phase") == "concept_generation":
            print("✅ Successfully completed Phase 1 → Phase 2 transition!")

            # Check what was generated
            choices_key = f"choices:{thread_id}"
            choices_data = redis_service.get(choices_key)
            if choices_data:
                choices = json.loads(choices_data)
                print(f"🎨 Generated {len(choices.get('viable_options', []))} project options")

            eval_key = f"evaluation:{thread_id}"
            eval_data = redis_service.get(eval_key)
            if eval_data:
                evaluation = json.loads(eval_data)
                print(f"📊 Evaluated with safety assessment: {evaluation.get('safety_assessment', {}).get('has_safety_concerns', 'unknown')}")

            return True
        else:
            print(f"❌ Workflow stopped at phase: {final_status.get('current_phase', 'unknown')}")
            return False

    except Exception as e:
        print(f"❌ Integration test failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

    finally:
        # Cleanup test data
        print("\n🧹 Cleaning up test data...")
        cleanup_keys = [
            f"ingredients:{thread_id}",
            f"goals:{thread_id}",
            f"choices:{thread_id}",
            f"evaluation:{thread_id}",
            f"workflow_state:{thread_id}"
        ]
        for key in cleanup_keys:
            redis_service.delete(key)


async def main():
    """Run all Phase 2 tests."""
    print("🤖 AI Recycle-to-Market Generator - Phase 2 Tests")
    print("==================================================")

    # Check Gemini API key
    from app.core.config import settings
    if not settings.GEMINI_API_KEY:
        print("⚠️  GEMINI_API_KEY not found. Tests may fail.")
        print("   Please set GEMINI_API_KEY in your environment.")
        print()

    tests = [
        ("Material Knowledge System", test_material_knowledge_system),
        ("Phase 2 Individual Nodes", test_phase2_workflow),
        ("Full Phase 1→2 Integration", test_full_phase2_integration),
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
    print("\n" + "=" * 60)
    print("📋 PHASE 2 TEST SUMMARY")
    print("=" * 60)

    passed = 0
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
        if result:
            passed += 1

    print(f"\n🎯 Tests passed: {passed}/{len(results)}")

    if passed == len(results):
        print("🎉 All Phase 2 tests passed! Ready for Phase 3 development.")
    else:
        print("⚠️  Some tests failed. Please check the errors above.")

    return passed == len(results)


if __name__ == "__main__":
    asyncio.run(main())