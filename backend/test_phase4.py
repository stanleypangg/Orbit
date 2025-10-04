#!/usr/bin/env python3
"""
Test script for Phase 4: Output Assembly & Delivery.
Validates H1, EXP, ANALYTICS, SHARE nodes and complete workflow integration.
"""
import asyncio
import json
import time
import pytest
from app.workflows.graph import workflow_orchestrator
from app.workflows.state import WorkflowState, IngredientsData, IngredientItem
from app.workflows.phase4_nodes import (
    final_packaging_node,
    export_generation_node,
    analytics_node,
    sharing_preparation_node,
    should_generate_exports,
    should_generate_analytics,
    should_prepare_sharing,
    is_phase4_complete
)
from app.core.redis import redis_service
from app.core.config import settings


# Test data for Phase 4
PHASE4_TEST_STATE = {
    "thread_id": "phase4_test_session",
    "user_input": "I want to make a storage organizer from bottles and boxes",
    "current_phase": "output_assembly",
    "current_node": "H1",
    "ingredients_data": {
        "ingredients": [
            {
                "name": "Plastic bottles",
                "material": "plastic",
                "size": "500ml x 3",
                "category": "beverage_container",
                "condition": "clean",
                "confidence": 0.9
            },
            {
                "name": "Cardboard boxes",
                "material": "cardboard",
                "size": "small x 2",
                "category": "packaging",
                "condition": "good",
                "confidence": 0.8
            }
        ],
        "confidence": 0.85,
        "needs_clarification": False
    },
    "goals": "Create practical storage solution for home organization",
    "selected_option": {
        "title": "Modular Storage Organizer",
        "description": "Multi-compartment organizer with bottle sections and cardboard dividers",
        "materials_used": ["plastic bottles", "cardboard"],
        "tools_required": ["scissors", "craft knife", "ruler", "marker"],
        "difficulty_level": "beginner",
        "time_estimate": "1-2 hours",
        "category": "home_organization",
        "esg_score": {"environmental": 8, "social": 6, "governance": 7},
        "safety_assessment": {
            "safety_level": "low",
            "required_ppe": ["safety glasses"],
            "warnings": ["Use craft knife carefully"]
        }
    },
    "project_preview": {
        "project_overview": {
            "title": "Modular Storage Organizer",
            "difficulty_level": "beginner",
            "estimated_time": "1-2 hours"
        },
        "bill_of_materials": [
            {"item": "Plastic bottles", "quantity": 3, "source": "recycled"},
            {"item": "Cardboard boxes", "quantity": 2, "source": "recycled"}
        ],
        "construction_steps": [
            {"step_number": 1, "title": "Prepare bottles", "description": "Clean and cut bottles"},
            {"step_number": 2, "title": "Prepare boxes", "description": "Cut cardboard dividers"},
            {"step_number": 3, "title": "Assemble", "description": "Combine components"}
        ]
    }
}


async def test_final_packaging_node():
    """Test H1 Node - Final packaging and documentation."""
    print("📦 Testing H1 - Final Packaging Node...")

    # Create test state
    test_state = WorkflowState(**PHASE4_TEST_STATE)

    try:
        # Execute final packaging
        result = await final_packaging_node(test_state)

        # Validate results
        assert result is not None, "Final packaging should return results"
        assert test_state.final_package is not None, "Should have final package"

        package = test_state.final_package

        # Check required sections
        required_sections = [
            "executive_summary", "project_documentation", "materials_guide",
            "construction_manual", "sustainability_impact", "sharing_assets"
        ]

        for section in required_sections:
            assert section in package, f"Missing required section: {section}"

        # Validate executive summary
        exec_summary = package["executive_summary"]
        assert exec_summary["project_title"], "Should have project title"
        assert exec_summary["completion_time"], "Should track completion time"
        assert exec_summary["total_materials"], "Should count materials"

        # Validate project documentation
        project_docs = package["project_documentation"]
        assert "detailed_instructions" in project_docs, "Should have detailed instructions"
        assert "visual_guide" in project_docs, "Should have visual guide"
        assert "troubleshooting" in project_docs, "Should have troubleshooting"

        # Validate sustainability impact
        sustainability = package["sustainability_impact"]
        assert "environmental_metrics" in sustainability, "Should have environmental metrics"
        assert "social_impact" in sustainability, "Should have social impact"
        assert "circular_economy" in sustainability, "Should have circular economy info"

        print("✅ Final Packaging Node test passed")
        return True

    except Exception as e:
        print(f"❌ Final Packaging Node test failed: {str(e)}")
        return False


async def test_export_generation_node():
    """Test EXP Node - Multi-format export generation."""
    print("📄 Testing EXP - Export Generation Node...")

    # Create test state with final package
    test_state = WorkflowState(**PHASE4_TEST_STATE)
    await final_packaging_node(test_state)  # Setup prerequisite

    try:
        # Execute export generation
        result = await export_generation_node(test_state)

        # Validate results
        assert result is not None, "Export generation should return results"
        assert test_state.exports is not None, "Should have exports data"

        exports = test_state.exports

        # Check export formats
        expected_formats = ["json", "html", "pdf_ready"]
        for format_type in expected_formats:
            assert format_type in exports, f"Missing export format: {format_type}"

        # Validate JSON export
        json_export = exports["json"]
        assert "project_data" in json_export, "JSON should have project data"
        assert "metadata" in json_export, "JSON should have metadata"
        assert "version" in json_export, "JSON should have version"

        # Validate HTML export
        html_export = exports["html"]
        assert "template" in html_export, "HTML should have template"
        assert "styles" in html_export, "HTML should have styles"
        assert "interactive_elements" in html_export, "HTML should have interactive elements"

        # Validate PDF configuration
        pdf_config = exports["pdf_ready"]
        assert "layout_config" in pdf_config, "PDF should have layout config"
        assert "styling" in pdf_config, "PDF should have styling"
        assert "content_structure" in pdf_config, "PDF should have content structure"

        # Check export metadata
        export_metadata = exports.get("metadata", {})
        assert export_metadata.get("generation_timestamp"), "Should have timestamp"
        assert export_metadata.get("formats_available"), "Should list available formats"

        print("✅ Export Generation Node test passed")
        return True

    except Exception as e:
        print(f"❌ Export Generation Node test failed: {str(e)}")
        return False


async def test_analytics_node():
    """Test ANALYTICS Node - Comprehensive metrics and insights."""
    print("📊 Testing ANALYTICS - Analytics Node...")

    # Create test state with complete data
    test_state = WorkflowState(**PHASE4_TEST_STATE)
    await final_packaging_node(test_state)
    await export_generation_node(test_state)

    try:
        # Execute analytics
        result = await analytics_node(test_state)

        # Validate results
        assert result is not None, "Analytics should return results"
        assert test_state.analytics is not None, "Should have analytics data"

        analytics = test_state.analytics

        # Check analytics categories
        required_categories = [
            "project_metrics", "sustainability_metrics", "user_engagement",
            "process_efficiency", "quality_assessment", "impact_projections"
        ]

        for category in required_categories:
            assert category in analytics, f"Missing analytics category: {category}"

        # Validate project metrics
        project_metrics = analytics["project_metrics"]
        assert "completion_time" in project_metrics, "Should track completion time"
        assert "material_utilization" in project_metrics, "Should track material usage"
        assert "difficulty_rating" in project_metrics, "Should have difficulty rating"

        # Validate sustainability metrics
        sustainability_metrics = analytics["sustainability_metrics"]
        assert "waste_diverted" in sustainability_metrics, "Should calculate waste diverted"
        assert "carbon_footprint" in sustainability_metrics, "Should estimate carbon impact"
        assert "circularity_score" in sustainability_metrics, "Should have circularity score"

        # Validate process efficiency
        process_efficiency = analytics["process_efficiency"]
        assert "workflow_performance" in process_efficiency, "Should analyze workflow"
        assert "optimization_suggestions" in process_efficiency, "Should suggest optimizations"

        # Validate quality assessment
        quality_assessment = analytics["quality_assessment"]
        assert "success_indicators" in quality_assessment, "Should have success indicators"
        assert "improvement_areas" in quality_assessment, "Should identify improvements"

        print("✅ Analytics Node test passed")
        return True

    except Exception as e:
        print(f"❌ Analytics Node test failed: {str(e)}")
        return False


async def test_sharing_preparation_node():
    """Test SHARE Node - Social media and sharing system."""
    print("📱 Testing SHARE - Sharing Preparation Node...")

    # Create test state with complete data
    test_state = WorkflowState(**PHASE4_TEST_STATE)
    await final_packaging_node(test_state)
    await export_generation_node(test_state)
    await analytics_node(test_state)

    try:
        # Execute sharing preparation
        result = await sharing_preparation_node(test_state)

        # Validate results
        assert result is not None, "Sharing preparation should return results"
        assert test_state.sharing_assets is not None, "Should have sharing assets"

        sharing = test_state.sharing_assets

        # Check social media platforms
        expected_platforms = ["instagram", "twitter", "pinterest", "linkedin"]
        for platform in expected_platforms:
            assert platform in sharing, f"Missing platform: {platform}"

        # Validate Instagram assets
        instagram = sharing["instagram"]
        assert "post_content" in instagram, "Instagram should have post content"
        assert "hashtags" in instagram, "Instagram should have hashtags"
        assert "story_assets" in instagram, "Instagram should have story assets"
        assert len(instagram["hashtags"]) >= 5, "Should have multiple hashtags"

        # Validate Twitter assets
        twitter = sharing["twitter"]
        assert "thread_content" in twitter, "Twitter should have thread content"
        assert "hashtags" in twitter, "Twitter should have hashtags"
        assert len(twitter["thread_content"]) >= 3, "Should have multiple tweets"

        # Validate Pinterest assets
        pinterest = sharing["pinterest"]
        assert "board_suggestions" in pinterest, "Pinterest should have board suggestions"
        assert "pin_descriptions" in pinterest, "Pinterest should have pin descriptions"
        assert "pin_titles" in pinterest, "Pinterest should have pin titles"

        # Validate LinkedIn assets
        linkedin = sharing["linkedin"]
        assert "professional_post" in linkedin, "LinkedIn should have professional post"
        assert "article_outline" in linkedin, "LinkedIn should have article outline"

        # Check sharing metadata
        assert "optimization_tips" in sharing, "Should have optimization tips"
        assert "engagement_strategy" in sharing, "Should have engagement strategy"

        print("✅ Sharing Preparation Node test passed")
        return True

    except Exception as e:
        print(f"❌ Sharing Preparation Node test failed: {str(e)}")
        return False


async def test_phase4_conditional_functions():
    """Test Phase 4 conditional routing functions."""
    print("🔀 Testing Phase 4 Conditional Functions...")

    try:
        # Create test states for different scenarios
        incomplete_state = WorkflowState(**PHASE4_TEST_STATE)
        complete_state = WorkflowState(**PHASE4_TEST_STATE)

        # Setup complete state
        await final_packaging_node(complete_state)
        await export_generation_node(complete_state)
        await analytics_node(complete_state)
        await sharing_preparation_node(complete_state)

        # Test should_generate_exports
        exports_decision = await should_generate_exports(incomplete_state)
        assert exports_decision in ["export_generation", "final_packaging"], "Should route appropriately"

        # Test should_generate_analytics
        analytics_decision = await should_generate_analytics(incomplete_state)
        assert analytics_decision in ["analytics", "final_packaging"], "Should route appropriately"

        # Test should_prepare_sharing
        sharing_decision = await should_prepare_sharing(incomplete_state)
        assert sharing_decision in ["sharing_preparation", "final_packaging"], "Should route appropriately"

        # Test is_phase4_complete
        incomplete_result = await is_phase4_complete(incomplete_state)
        assert incomplete_result == "continue", "Incomplete state should continue"

        complete_result = await is_phase4_complete(complete_state)
        assert complete_result == "END", "Complete state should end"

        print("✅ Phase 4 Conditional Functions test passed")
        return True

    except Exception as e:
        print(f"❌ Phase 4 Conditional Functions test failed: {str(e)}")
        return False


async def test_phase4_integration():
    """Test complete Phase 4 workflow integration."""
    print("🔄 Testing Phase 4 Complete Integration...")

    thread_id = f"phase4_integration_{int(time.time())}"

    try:
        # Create test state for complete workflow
        test_state = WorkflowState(
            thread_id=thread_id,
            user_input="Create storage organizer from recycled materials",
            current_phase="output_assembly",
            current_node="H1",
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
            selected_option=PHASE4_TEST_STATE["selected_option"],
            project_preview=PHASE4_TEST_STATE["project_preview"]
        )

        # Execute complete Phase 4 workflow
        print("   Running H1 (Final Packaging)...")
        h1_result = await final_packaging_node(test_state)
        assert h1_result is not None, "H1 should complete successfully"

        print("   Running EXP (Export Generation)...")
        exp_result = await export_generation_node(test_state)
        assert exp_result is not None, "EXP should complete successfully"

        print("   Running ANALYTICS...")
        analytics_result = await analytics_node(test_state)
        assert analytics_result is not None, "ANALYTICS should complete successfully"

        print("   Running SHARE (Sharing Preparation)...")
        share_result = await sharing_preparation_node(test_state)
        assert share_result is not None, "SHARE should complete successfully"

        # Validate complete workflow state
        assert test_state.final_package is not None, "Should have final package"
        assert test_state.exports is not None, "Should have exports"
        assert test_state.analytics is not None, "Should have analytics"
        assert test_state.sharing_assets is not None, "Should have sharing assets"
        assert test_state.current_phase == "complete", "Should mark workflow as complete"

        # Test Redis persistence
        package_key = f"final_package:{thread_id}"
        exports_key = f"exports:{thread_id}"
        analytics_key = f"analytics:{thread_id}"
        sharing_key = f"sharing:{thread_id}"

        # Store test data
        redis_service.set(package_key, json.dumps(test_state.final_package), ex=3600)
        redis_service.set(exports_key, json.dumps(test_state.exports), ex=3600)
        redis_service.set(analytics_key, json.dumps(test_state.analytics), ex=3600)
        redis_service.set(sharing_key, json.dumps(test_state.sharing_assets), ex=3600)

        # Verify persistence
        stored_package = redis_service.get(package_key)
        stored_exports = redis_service.get(exports_key)
        stored_analytics = redis_service.get(analytics_key)
        stored_sharing = redis_service.get(sharing_key)

        assert stored_package is not None, "Package should be persisted"
        assert stored_exports is not None, "Exports should be persisted"
        assert stored_analytics is not None, "Analytics should be persisted"
        assert stored_sharing is not None, "Sharing should be persisted"

        print("✅ Phase 4 Integration test passed")
        return True

    except Exception as e:
        print(f"❌ Phase 4 Integration test failed: {str(e)}")
        return False

    finally:
        # Cleanup
        cleanup_keys = [
            f"final_package:{thread_id}",
            f"exports:{thread_id}",
            f"analytics:{thread_id}",
            f"sharing:{thread_id}",
            f"workflow_state:{thread_id}"
        ]
        for key in cleanup_keys:
            redis_service.delete(key)


async def test_phase4_performance():
    """Test Phase 4 performance benchmarks."""
    print("⚡ Testing Phase 4 Performance...")

    try:
        test_state = WorkflowState(**PHASE4_TEST_STATE)

        # Benchmark H1 Node
        start_time = time.time()
        await final_packaging_node(test_state)
        h1_time = time.time() - start_time

        # Benchmark EXP Node
        start_time = time.time()
        await export_generation_node(test_state)
        exp_time = time.time() - start_time

        # Benchmark ANALYTICS Node
        start_time = time.time()
        await analytics_node(test_state)
        analytics_time = time.time() - start_time

        # Benchmark SHARE Node
        start_time = time.time()
        await sharing_preparation_node(test_state)
        share_time = time.time() - start_time

        # Performance assertions
        assert h1_time < 10.0, f"H1 Node too slow: {h1_time:.2f}s (target: <10s)"
        assert exp_time < 8.0, f"EXP Node too slow: {exp_time:.2f}s (target: <8s)"
        assert analytics_time < 6.0, f"ANALYTICS Node too slow: {analytics_time:.2f}s (target: <6s)"
        assert share_time < 5.0, f"SHARE Node too slow: {share_time:.2f}s (target: <5s)"

        total_time = h1_time + exp_time + analytics_time + share_time
        assert total_time < 25.0, f"Total Phase 4 too slow: {total_time:.2f}s (target: <25s)"

        print(f"   📊 Performance Results:")
        print(f"   - H1 (Final Packaging): {h1_time:.2f}s")
        print(f"   - EXP (Export Generation): {exp_time:.2f}s")
        print(f"   - ANALYTICS: {analytics_time:.2f}s")
        print(f"   - SHARE (Sharing): {share_time:.2f}s")
        print(f"   - Total Phase 4: {total_time:.2f}s")

        print("✅ Phase 4 Performance test passed")
        return True

    except Exception as e:
        print(f"❌ Phase 4 Performance test failed: {str(e)}")
        return False


async def main():
    """Run all Phase 4 tests."""
    print("🤖 AI Recycle-to-Market Generator - Phase 4 Tests")
    print("==" * 30)

    # Check Gemini API key
    if not settings.GEMINI_API_KEY:
        print("⚠️  GEMINI_API_KEY not found. Tests may fail.")
        print("   Please set GEMINI_API_KEY in your environment.")
        print()

    tests = [
        ("Final Packaging Node (H1)", test_final_packaging_node),
        ("Export Generation Node (EXP)", test_export_generation_node),
        ("Analytics Node (ANALYTICS)", test_analytics_node),
        ("Sharing Preparation Node (SHARE)", test_sharing_preparation_node),
        ("Phase 4 Conditional Functions", test_phase4_conditional_functions),
        ("Phase 4 Complete Integration", test_phase4_integration),
        ("Phase 4 Performance Benchmarks", test_phase4_performance),
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
    print("📋 PHASE 4 TEST SUMMARY")
    print("=" * 60)

    passed = 0
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
        if result:
            passed += 1

    print(f"\n🎯 Tests passed: {passed}/{len(results)}")

    if passed == len(results):
        print("🎉 All Phase 4 tests passed! System ready for production deployment.")
    else:
        print("⚠️  Some tests failed. Please check the errors above.")

    return passed == len(results)


if __name__ == "__main__":
    asyncio.run(main())