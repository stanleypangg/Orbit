#!/usr/bin/env python3
"""
Test script for Phase 3: Image Generation & User Interaction.
Validates PR1, IMG, A1 nodes and API endpoints integration.
"""
import asyncio
import json
import time
import pytest
from app.workflows.graph import workflow_orchestrator
from app.workflows.state import WorkflowState, IngredientsData, IngredientItem
from app.workflows.phase3_nodes import (
    prompt_builder_node,
    image_generation_node,
    preview_assembly_node,
    apply_magic_pencil_edit,
    create_final_package
)
from app.core.redis import redis_service
from app.core.config import settings


# Test data for Phase 3
PHASE3_TEST_STATE = {
    "thread_id": "phase3_test_session",
    "user_input": "I want to make a desk organizer from plastic bottles and cardboard",
    "current_phase": "concept_generation",
    "current_node": "PR1",
    "ingredients_data": {
        "ingredients": [
            {
                "name": "Large plastic bottle",
                "material": "plastic",
                "size": "2L",
                "category": "beverage_container",
                "condition": "clean",
                "confidence": 0.9
            },
            {
                "name": "Small cardboard box",
                "material": "cardboard",
                "size": "15cm x 10cm",
                "category": "packaging",
                "condition": "good",
                "confidence": 0.8
            }
        ],
        "confidence": 0.85,
        "needs_clarification": False
    },
    "goals": "Create a practical desk organizer using recycled materials that helps organize office supplies",
    "selected_option": {
        "title": "Modular Desk Organizer",
        "description": "Multi-compartment organizer with sections for pens, paperclips, and small items",
        "materials_used": ["plastic bottle", "cardboard"],
        "tools_required": ["scissors", "craft knife", "ruler", "marker"],
        "difficulty_level": "beginner",
        "time_estimate": "1-2 hours",
        "category": "office_organization",
        "esg_score": {"environmental": 8, "social": 6, "governance": 7},
        "safety_assessment": {
            "safety_level": "low",
            "required_ppe": ["safety glasses"],
            "warnings": ["Use craft knife carefully"]
        }
    }
}


async def test_prompt_builder_node():
    """Test PR1 Node - Prompt Builder for concept variations."""
    print("🎨 Testing PR1 - Prompt Builder Node...")

    # Create test state
    test_state = WorkflowState(**PHASE3_TEST_STATE)

    try:
        # Execute prompt builder
        result = await prompt_builder_node(test_state)

        # Validate results
        assert result is not None, "Prompt builder should return results"
        assert test_state.concept_variants is not None, "Should generate concept variants"
        assert len(test_state.concept_variants) == 3, "Should generate exactly 3 concept variants"

        # Check variant styles
        styles = [variant.style for variant in test_state.concept_variants]
        expected_styles = ["minimalist", "decorative", "functional"]
        assert all(style in expected_styles for style in styles), f"Invalid styles: {styles}"

        # Validate prompts
        for variant in test_state.concept_variants:
            assert variant.image_prompt, "Each variant should have an image prompt"
            assert len(variant.image_prompt) > 50, "Prompts should be detailed"
            assert "desk organizer" in variant.image_prompt.lower(), "Should mention project type"

        print("✅ Prompt Builder Node test passed")
        return True

    except Exception as e:
        print(f"❌ Prompt Builder Node test failed: {str(e)}")
        return False


async def test_image_generation_node():
    """Test IMG Node - Parallel image generation."""
    print("🖼️ Testing IMG - Image Generation Node...")

    # Create test state with prompts
    test_state = WorkflowState(**PHASE3_TEST_STATE)

    # First run prompt builder to set up concepts
    await prompt_builder_node(test_state)

    try:
        # Execute image generation
        result = await image_generation_node(test_state)

        # Validate results
        assert result is not None, "Image generation should return results"
        assert test_state.concept_images is not None, "Should have concept images data"

        # Check image generation metadata
        assert "concepts" in test_state.concept_images, "Should have concepts array"
        assert "metadata" in test_state.concept_images, "Should have generation metadata"

        concepts = test_state.concept_images["concepts"]
        assert len(concepts) == 3, "Should generate 3 concept images"

        # Validate each concept
        for i, concept in enumerate(concepts):
            assert "style" in concept, f"Concept {i} should have style"
            assert "description" in concept, f"Concept {i} should have description"
            assert "image_url" in concept, f"Concept {i} should have image URL"
            assert concept["style"] in ["minimalist", "decorative", "functional"], f"Invalid style: {concept['style']}"

        print("✅ Image Generation Node test passed")
        return True

    except Exception as e:
        print(f"❌ Image Generation Node test failed: {str(e)}")
        return False


async def test_preview_assembly_node():
    """Test A1 Node - Preview assembly with metadata."""
    print("📋 Testing A1 - Preview Assembly Node...")

    # Create test state with full Phase 3 data
    test_state = WorkflowState(**PHASE3_TEST_STATE)

    # Set up prerequisites
    await prompt_builder_node(test_state)
    await image_generation_node(test_state)

    try:
        # Execute preview assembly
        result = await preview_assembly_node(test_state)

        # Validate results
        assert result is not None, "Preview assembly should return results"
        assert test_state.project_preview is not None, "Should have project preview"

        preview = test_state.project_preview

        # Check required sections
        required_sections = [
            "project_overview", "bill_of_materials", "tools_required",
            "construction_steps", "esg_assessment", "safety_summary"
        ]

        for section in required_sections:
            assert section in preview, f"Missing required section: {section}"

        # Validate project overview
        overview = preview["project_overview"]
        assert overview["title"], "Should have project title"
        assert overview["difficulty_level"], "Should have difficulty level"
        assert overview["estimated_time"], "Should have time estimate"

        # Validate BOM
        bom = preview["bill_of_materials"]
        assert len(bom) >= 2, "Should have materials from ingredients"

        # Validate construction steps
        steps = preview["construction_steps"]
        assert len(steps) >= 3, "Should have multiple construction steps"

        for step in steps:
            assert "step_number" in step, "Each step should be numbered"
            assert "title" in step, "Each step should have a title"
            assert "description" in step, "Each step should have description"

        print("✅ Preview Assembly Node test passed")
        return True

    except Exception as e:
        print(f"❌ Preview Assembly Node test failed: {str(e)}")
        return False


async def test_magic_pencil_edit():
    """Test Magic Pencil editing functionality."""
    print("🖌️ Testing Magic Pencil Edit System...")

    try:
        # Create test concept data
        test_concepts = {
            "concepts": [
                {
                    "style": "minimalist",
                    "description": "Clean, simple desk organizer with white plastic compartments",
                    "image_url": "https://example.com/concept1.jpg",
                    "version": 1
                },
                {
                    "style": "decorative",
                    "description": "Colorful organizer with decorative patterns",
                    "image_url": "https://example.com/concept2.jpg",
                    "version": 1
                }
            ]
        }

        state_dict = {
            "concept_images": test_concepts,
            "thread_id": "magic_pencil_test"
        }

        # Test Magic Pencil edit
        edit_result = await apply_magic_pencil_edit(
            state_dict,
            concept_id=0,
            edit_instruction="Make it more colorful with blue accents",
            edit_type="style"
        )

        # Validate edit result
        assert edit_result["success"] is True, "Edit should succeed"
        assert "updated_concept" in edit_result, "Should return updated concept"
        assert "edit_applied" in edit_result, "Should track edit application"

        updated_concept = edit_result["updated_concept"]
        assert "edit_history" in updated_concept, "Should track edit history"
        assert len(updated_concept["edit_history"]) == 1, "Should have one edit"
        assert updated_concept["version"] == 2, "Should increment version"

        # Test invalid concept ID
        invalid_edit = await apply_magic_pencil_edit(
            state_dict,
            concept_id=99,
            edit_instruction="Test edit",
            edit_type="style"
        )

        assert invalid_edit["success"] is False, "Invalid concept ID should fail"
        assert "error" in invalid_edit, "Should return error message"

        print("✅ Magic Pencil Edit test passed")
        return True

    except Exception as e:
        print(f"❌ Magic Pencil Edit test failed: {str(e)}")
        return False


async def test_final_package_creation():
    """Test final project package creation."""
    print("📦 Testing Final Package Creation...")

    try:
        # Create test data
        state_dict = PHASE3_TEST_STATE.copy()

        selected_concept = {
            "style": "functional",
            "description": "Practical desk organizer with multiple compartments",
            "image_url": "https://example.com/final_concept.jpg",
            "edit_history": [],
            "version": 1
        }

        selection_info = {
            "concept_id": 1,
            "feedback": "Perfect for my home office setup",
            "timestamp": time.time()
        }

        # Create final package
        package = await create_final_package(state_dict, selected_concept, selection_info)

        # Validate package structure
        required_sections = [
            "project_overview", "selected_concept", "bill_of_materials",
            "instructions", "safety_information", "sustainability", "project_metadata"
        ]

        for section in required_sections:
            assert section in package, f"Missing package section: {section}"

        # Validate project overview
        overview = package["project_overview"]
        assert overview["title"] == "Modular Desk Organizer", "Should preserve project title"
        assert overview["difficulty"] == "beginner", "Should preserve difficulty"

        # Validate selected concept
        concept = package["selected_concept"]
        assert concept["concept_id"] == 1, "Should record selected concept ID"
        assert concept["user_feedback"] == "Perfect for my home office setup", "Should preserve feedback"

        # Validate BOM
        bom = package["bill_of_materials"]
        assert len(bom["materials"]) == 2, "Should include all ingredients"
        assert "tools_required" in bom, "Should list required tools"

        # Validate metadata
        metadata = package["project_metadata"]
        assert metadata["total_ingredients"] == 2, "Should count ingredients correctly"
        assert "creation_date" in metadata, "Should timestamp creation"

        print("✅ Final Package Creation test passed")
        return True

    except Exception as e:
        print(f"❌ Final Package Creation test failed: {str(e)}")
        return False


async def test_phase3_integration():
    """Test complete Phase 3 workflow integration."""
    print("🔄 Testing Phase 3 Complete Integration...")

    thread_id = f"phase3_integration_{int(time.time())}"

    try:
        # Create test state for complete workflow
        test_state = WorkflowState(
            thread_id=thread_id,
            user_input="Create a practical storage solution from recycled materials",
            current_phase="concept_generation",
            current_node="PR1",
            ingredients_data=IngredientsData(
                ingredients=[
                    IngredientItem(
                        name="Plastic containers",
                        material="plastic",
                        size="various",
                        category="storage",
                        condition="clean",
                        confidence=0.9
                    )
                ],
                confidence=0.9,
                needs_clarification=False
            ),
            goals="Create useful storage from waste materials",
            selected_option=PHASE3_TEST_STATE["selected_option"]
        )

        # Execute complete Phase 3 workflow
        print("   Running PR1 (Prompt Builder)...")
        pr1_result = await prompt_builder_node(test_state)
        assert pr1_result is not None, "PR1 should complete successfully"

        print("   Running IMG (Image Generation)...")
        img_result = await image_generation_node(test_state)
        assert img_result is not None, "IMG should complete successfully"

        print("   Running A1 (Preview Assembly)...")
        a1_result = await preview_assembly_node(test_state)
        assert a1_result is not None, "A1 should complete successfully"

        # Validate complete workflow state
        assert test_state.concept_variants is not None, "Should have concept variants"
        assert test_state.concept_images is not None, "Should have concept images"
        assert test_state.project_preview is not None, "Should have project preview"
        assert test_state.current_phase == "complete", "Should mark workflow as complete"

        # Test Redis persistence
        concepts_key = f"concepts:{thread_id}"
        preview_key = f"project_preview:{thread_id}"

        # Store test data
        redis_service.set(concepts_key, json.dumps(test_state.concept_images), ex=3600)
        redis_service.set(preview_key, json.dumps(test_state.project_preview), ex=3600)

        # Verify persistence
        stored_concepts = redis_service.get(concepts_key)
        stored_preview = redis_service.get(preview_key)

        assert stored_concepts is not None, "Concepts should be persisted"
        assert stored_preview is not None, "Preview should be persisted"

        print("✅ Phase 3 Integration test passed")
        return True

    except Exception as e:
        print(f"❌ Phase 3 Integration test failed: {str(e)}")
        return False

    finally:
        # Cleanup
        cleanup_keys = [
            f"concepts:{thread_id}",
            f"project_preview:{thread_id}",
            f"workflow_state:{thread_id}"
        ]
        for key in cleanup_keys:
            redis_service.delete(key)


async def test_phase3_performance():
    """Test Phase 3 performance benchmarks."""
    print("⚡ Testing Phase 3 Performance...")

    try:
        test_state = WorkflowState(**PHASE3_TEST_STATE)

        # Benchmark PR1 Node
        start_time = time.time()
        await prompt_builder_node(test_state)
        pr1_time = time.time() - start_time

        # Benchmark IMG Node
        start_time = time.time()
        await image_generation_node(test_state)
        img_time = time.time() - start_time

        # Benchmark A1 Node
        start_time = time.time()
        await preview_assembly_node(test_state)
        a1_time = time.time() - start_time

        # Performance assertions
        assert pr1_time < 8.0, f"PR1 Node too slow: {pr1_time:.2f}s (target: <8s)"
        assert img_time < 12.0, f"IMG Node too slow: {img_time:.2f}s (target: <12s)"
        assert a1_time < 6.0, f"A1 Node too slow: {a1_time:.2f}s (target: <6s)"

        total_time = pr1_time + img_time + a1_time
        assert total_time < 25.0, f"Total Phase 3 too slow: {total_time:.2f}s (target: <25s)"

        print(f"   📊 Performance Results:")
        print(f"   - PR1 (Prompt Builder): {pr1_time:.2f}s")
        print(f"   - IMG (Image Generation): {img_time:.2f}s")
        print(f"   - A1 (Preview Assembly): {a1_time:.2f}s")
        print(f"   - Total Phase 3: {total_time:.2f}s")

        print("✅ Phase 3 Performance test passed")
        return True

    except Exception as e:
        print(f"❌ Phase 3 Performance test failed: {str(e)}")
        return False


async def main():
    """Run all Phase 3 tests."""
    print("🤖 AI Recycle-to-Market Generator - Phase 3 Tests")
    print("=" * 55)

    # Check Gemini API key
    if not settings.GEMINI_API_KEY:
        print("⚠️  GEMINI_API_KEY not found. Tests may fail.")
        print("   Please set GEMINI_API_KEY in your environment.")
        print()

    tests = [
        ("Prompt Builder Node (PR1)", test_prompt_builder_node),
        ("Image Generation Node (IMG)", test_image_generation_node),
        ("Preview Assembly Node (A1)", test_preview_assembly_node),
        ("Magic Pencil Edit System", test_magic_pencil_edit),
        ("Final Package Creation", test_final_package_creation),
        ("Phase 3 Complete Integration", test_phase3_integration),
        ("Phase 3 Performance Benchmarks", test_phase3_performance),
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
    print("📋 PHASE 3 TEST SUMMARY")
    print("=" * 60)

    passed = 0
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
        if result:
            passed += 1

    print(f"\n🎯 Tests passed: {passed}/{len(results)}")

    if passed == len(results):
        print("🎉 All Phase 3 tests passed! Image generation system ready.")
    else:
        print("⚠️  Some tests failed. Please check the errors above.")

    return passed == len(results)


if __name__ == "__main__":
    asyncio.run(main())