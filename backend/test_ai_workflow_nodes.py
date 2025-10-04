#!/usr/bin/env python3
"""
Comprehensive test suite for all AI workflow nodes.
Tests the complete ingredient discovery workflow with AI agent integration.
"""
import asyncio
import os
import sys
import logging
from typing import Dict, Any

# Set up test environment
os.environ['ENVIRONMENT'] = 'development'  # Use development for testing
if os.path.exists('.env.test'):
    from dotenv import load_dotenv
    load_dotenv('.env.test')

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Import after environment setup
from app.workflows.state import WorkflowState, IngredientsData, IngredientItem
from app.workflows.nodes import (
    ingredient_extraction_node,
    null_checker_node,
    ingredient_categorizer_node,
    process_user_clarification,
    call_ai_agent,
    USE_PRODUCTION_CLIENT
)
from app.core.config import settings

class TestResults:
    def __init__(self):
        self.tests = []
        self.passed = 0
        self.failed = 0

    def add_test(self, name: str, success: bool, details: str = ""):
        self.tests.append({
            "name": name,
            "success": success,
            "details": details
        })
        if success:
            self.passed += 1
        else:
            self.failed += 1

    def print_summary(self):
        print(f"\n{'='*60}")
        print(f"TEST RESULTS SUMMARY")
        print(f"{'='*60}")
        print(f"Total Tests: {len(self.tests)}")
        print(f"Passed: {self.passed}")
        print(f"Failed: {self.failed}")
        print(f"Success Rate: {(self.passed/len(self.tests)*100):.1f}%" if self.tests else "0%")

        if self.failed > 0:
            print(f"\nFAILED TESTS:")
            for test in self.tests:
                if not test["success"]:
                    print(f"❌ {test['name']}: {test['details']}")

        print(f"\n{'='*60}")

async def test_ai_agent_basic():
    """Test basic AI agent functionality"""
    results = TestResults()

    print("🧪 Testing Basic AI Agent Functionality...")

    try:
        # Test 1: Basic AI call
        response = await call_ai_agent(
            prompt="Respond with exactly: 'AI_TEST_SUCCESS'",
            task_type="default"
        )

        if isinstance(response, dict) and "text" in response:
            success = "AI_TEST_SUCCESS" in response["text"]
            details = f"Response: {response['text'][:100]}"
        else:
            success = False
            details = f"Unexpected response format: {type(response)}"

        results.add_test("Basic AI Agent Call", success, details)

        # Test 2: Structured output
        test_schema = {
            "type": "object",
            "properties": {
                "status": {"type": "string"},
                "items": {"type": "array", "items": {"type": "string"}}
            }
        }

        response = await call_ai_agent(
            prompt="Return a JSON with status 'ok' and items array containing 'test1', 'test2'",
            task_type="extraction",
            response_schema=test_schema
        )

        if isinstance(response, dict) and "status" in response:
            success = response.get("status") == "ok"
            details = f"Structured response: {response}"
        else:
            success = False
            details = f"Schema response failed: {response}"

        results.add_test("Structured Output", success, details)

    except Exception as e:
        results.add_test("Basic AI Agent Call", False, f"Exception: {str(e)}")
        results.add_test("Structured Output", False, f"Exception: {str(e)}")

    return results

async def test_ingredient_extraction_node():
    """Test P1a: Ingredient extraction node"""
    results = TestResults()

    print("🧪 Testing P1a: Ingredient Extraction Node...")

    test_cases = [
        {
            "name": "Simple plastic bottles",
            "input": "I have 3 plastic water bottles",
            "expected_materials": ["plastic"],
            "expected_count": 1
        },
        {
            "name": "Mixed materials",
            "input": "I have aluminum cans, glass jars, and cardboard boxes",
            "expected_materials": ["aluminum", "glass", "cardboard"],
            "expected_count": 3
        },
        {
            "name": "Detailed description",
            "input": "I have 5 empty Coca-Cola cans (12oz aluminum) and 2 large plastic grocery bags",
            "expected_materials": ["aluminum", "plastic"],
            "expected_count": 2
        }
    ]

    for test_case in test_cases:
        try:
            # Create test state
            state = WorkflowState(
                thread_id=f"test_{test_case['name'].replace(' ', '_')}",
                user_input=test_case["input"]
            )

            # Run extraction
            result = await ingredient_extraction_node(state)

            # Validate results
            success = True
            details = []

            if not state.ingredients_data or not state.ingredients_data.ingredients:
                success = False
                details.append("No ingredients extracted")
            else:
                # Check ingredient count
                actual_count = len(state.ingredients_data.ingredients)
                if actual_count < test_case["expected_count"]:
                    success = False
                    details.append(f"Expected {test_case['expected_count']} ingredients, got {actual_count}")

                # Check materials
                extracted_materials = [ing.material.lower() if ing.material else ""
                                     for ing in state.ingredients_data.ingredients]

                for expected_material in test_case["expected_materials"]:
                    if not any(expected_material.lower() in mat for mat in extracted_materials):
                        success = False
                        details.append(f"Missing material: {expected_material}")

                if success:
                    details.append(f"Extracted {actual_count} ingredients: {extracted_materials}")

            results.add_test(f"P1a: {test_case['name']}", success, "; ".join(details))

        except Exception as e:
            results.add_test(f"P1a: {test_case['name']}", False, f"Exception: {str(e)}")

    return results

async def test_null_checker_node():
    """Test P1b: Null checker node"""
    results = TestResults()

    print("🧪 Testing P1b: Null Checker Node...")

    try:
        # Test 1: Complete ingredients (should skip to P1c)
        state = WorkflowState(
            thread_id="test_complete",
            user_input="complete test"
        )
        state.ingredients_data = IngredientsData(
            ingredients=[
                IngredientItem(
                    name="plastic bottle",
                    size="500ml",
                    material="plastic",
                    category="beverage_container",
                    condition="empty",
                    confidence=0.9
                )
            ]
        )

        result = await null_checker_node(state)

        success = result.get("current_node") == "P1c"
        details = f"Complete ingredients -> current_node: {result.get('current_node')}"
        results.add_test("P1b: Complete ingredients", success, details)

        # Test 2: Incomplete ingredients (should generate questions)
        state = WorkflowState(
            thread_id="test_incomplete",
            user_input="incomplete test"
        )
        state.ingredients_data = IngredientsData(
            ingredients=[
                IngredientItem(
                    name="bottle",
                    size=None,  # Missing size
                    material=None,  # Missing material
                    category="beverage_container",
                    condition="empty",
                    confidence=0.7
                )
            ]
        )

        result = await null_checker_node(state)

        success = result.get("needs_user_input") is True
        details = f"Incomplete ingredients -> needs_user_input: {result.get('needs_user_input')}"
        if "user_questions" in result:
            details += f", questions: {len(result['user_questions'])}"

        results.add_test("P1b: Incomplete ingredients", success, details)

    except Exception as e:
        results.add_test("P1b: Complete ingredients", False, f"Exception: {str(e)}")
        results.add_test("P1b: Incomplete ingredients", False, f"Exception: {str(e)}")

    return results

async def test_categorizer_node():
    """Test P1c: Ingredient categorizer node"""
    results = TestResults()

    print("🧪 Testing P1c: Ingredient Categorizer Node...")

    try:
        # Create test state with sample ingredients
        state = WorkflowState(
            thread_id="test_categorizer",
            user_input="categorizer test"
        )
        state.ingredients_data = IngredientsData(
            ingredients=[
                IngredientItem(
                    name="plastic water bottle",
                    size="500ml",
                    material="plastic",
                    category="container",
                    condition="empty",
                    confidence=0.8
                ),
                IngredientItem(
                    name="aluminum can",
                    size="12oz",
                    material="aluminum",
                    category="container",
                    condition="empty",
                    confidence=0.9
                )
            ]
        )

        result = await ingredient_categorizer_node(state)

        # Validate results
        success = True
        details = []

        # Check if extraction is marked complete
        if not result.get("extraction_complete"):
            success = False
            details.append("Extraction not marked complete")

        # Check if moved to next phase
        if result.get("current_node") != "G1":
            success = False
            details.append(f"Expected current_node 'G1', got '{result.get('current_node')}'")

        # Check if phase changed
        if result.get("current_phase") != "goal_formation":
            success = False
            details.append(f"Expected phase 'goal_formation', got '{result.get('current_phase')}'")

        # Check if ingredients were processed
        if state.ingredients_data and state.ingredients_data.ingredients:
            ingredient_count = len(state.ingredients_data.ingredients)
            details.append(f"Processed {ingredient_count} ingredients")
        else:
            success = False
            details.append("No ingredients in final state")

        results.add_test("P1c: Categorization", success, "; ".join(details))

    except Exception as e:
        results.add_test("P1c: Categorization", False, f"Exception: {str(e)}")

    return results

async def test_user_clarification():
    """Test user clarification processing"""
    results = TestResults()

    print("🧪 Testing User Clarification Processing...")

    try:
        # Create test state with incomplete ingredient
        state = WorkflowState(
            thread_id="test_clarification",
            user_input="clarification test"
        )
        state.ingredients_data = IngredientsData(
            ingredients=[
                IngredientItem(
                    name="bottle",
                    size=None,  # Will be filled by clarification
                    material=None,  # Will be filled by clarification
                    category="container",
                    condition="empty",
                    confidence=0.7
                )
            ]
        )

        # Test clarification with user response
        user_response = "It's a 16oz plastic water bottle"

        result = await process_user_clarification(state, user_response)

        # Validate results
        success = True
        details = []

        if result.get("needs_user_input") is not False:
            success = False
            details.append("Should clear needs_user_input flag")

        # Check if ingredients were updated
        if state.ingredients_data and state.ingredients_data.ingredients:
            ingredient = state.ingredients_data.ingredients[0]
            if ingredient.material and "plastic" in ingredient.material.lower():
                details.append("Material updated correctly")
            else:
                success = False
                details.append("Material not updated")

            if ingredient.size and "16oz" in ingredient.size:
                details.append("Size updated correctly")
            else:
                success = False
                details.append("Size not updated")
        else:
            success = False
            details.append("No ingredients to update")

        results.add_test("User Clarification", success, "; ".join(details))

    except Exception as e:
        results.add_test("User Clarification", False, f"Exception: {str(e)}")

    return results

async def test_complete_workflow():
    """Test complete workflow integration"""
    results = TestResults()

    print("🧪 Testing Complete Workflow Integration...")

    try:
        # Test full workflow with realistic input
        state = WorkflowState(
            thread_id="test_full_workflow",
            user_input="I have 3 plastic water bottles and 2 aluminum soda cans that I want to recycle"
        )

        # Step 1: Extraction
        extraction_result = await ingredient_extraction_node(state)

        if not state.ingredients_data or not state.ingredients_data.ingredients:
            results.add_test("Full Workflow: Extraction", False, "No ingredients extracted")
        else:
            ingredients_count = len(state.ingredients_data.ingredients)
            results.add_test("Full Workflow: Extraction", True, f"Extracted {ingredients_count} ingredients")

            # Step 2: Null checking
            null_check_result = await null_checker_node(state)

            if null_check_result.get("needs_user_input"):
                results.add_test("Full Workflow: Null Check", True, "Correctly identified missing info")

                # Simulate user providing clarification
                clarification_result = await process_user_clarification(
                    state,
                    "The bottles are 16oz disposable plastic bottles, the cans are 12oz aluminum"
                )
                results.add_test("Full Workflow: Clarification", True, "Processed user response")

                # Re-run null check
                null_check_result = await null_checker_node(state)

            # Step 3: Categorization
            if null_check_result.get("current_node") == "P1c" or not null_check_result.get("needs_user_input"):
                categorizer_result = await ingredient_categorizer_node(state)

                success = (
                    categorizer_result.get("extraction_complete") and
                    categorizer_result.get("current_phase") == "goal_formation"
                )

                details = f"Complete: {categorizer_result.get('extraction_complete')}, Phase: {categorizer_result.get('current_phase')}"
                results.add_test("Full Workflow: Categorization", success, details)

                # Final state validation
                final_ingredients = len(state.ingredients_data.ingredients) if state.ingredients_data else 0
                workflow_complete = state.extraction_complete

                results.add_test("Full Workflow: Final State",
                               workflow_complete and final_ingredients > 0,
                               f"Complete: {workflow_complete}, Ingredients: {final_ingredients}")
            else:
                results.add_test("Full Workflow: Categorization", False, "Stuck in null checking")
                results.add_test("Full Workflow: Final State", False, "Workflow incomplete")

    except Exception as e:
        results.add_test("Full Workflow", False, f"Exception: {str(e)}")

    return results

async def run_all_tests():
    """Run all workflow node tests"""
    print("🚀 Starting Comprehensive AI Workflow Node Tests")
    print(f"Production Client Available: {USE_PRODUCTION_CLIENT}")
    print(f"API Key Configured: {bool(settings.GEMINI_API_KEY)}")
    print(f"Environment: {settings.ENVIRONMENT}")
    print("-" * 60)

    all_results = TestResults()

    # Run all test suites
    test_suites = [
        ("Basic AI Agent", test_ai_agent_basic),
        ("Ingredient Extraction (P1a)", test_ingredient_extraction_node),
        ("Null Checker (P1b)", test_null_checker_node),
        ("Categorizer (P1c)", test_categorizer_node),
        ("User Clarification", test_user_clarification),
        ("Complete Workflow", test_complete_workflow)
    ]

    for suite_name, test_func in test_suites:
        try:
            print(f"\n📋 Running {suite_name} Tests...")
            suite_results = await test_func()

            # Merge results
            for test in suite_results.tests:
                all_results.add_test(test["name"], test["success"], test["details"])

                # Print individual test results
                status = "✅" if test["success"] else "❌"
                print(f"  {status} {test['name']}")
                if test["details"] and not test["success"]:
                    print(f"     {test['details']}")

        except Exception as e:
            print(f"  ❌ {suite_name} suite failed with exception: {str(e)}")
            all_results.add_test(f"{suite_name} Suite", False, f"Suite exception: {str(e)}")

    # Print final summary
    all_results.print_summary()

    return all_results.failed == 0

if __name__ == "__main__":
    try:
        success = asyncio.run(run_all_tests())
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n🛑 Tests interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Test runner failed: {str(e)}")
        sys.exit(1)