#!/usr/bin/env python3
"""
Test individual workflow nodes with working AI integration.
"""
import asyncio
import os
import sys
import logging

# Set up test environment
os.environ['ENVIRONMENT'] = 'development'
if os.path.exists('.env.test'):
    from dotenv import load_dotenv
    load_dotenv('.env.test')

# Configure logging
logging.basicConfig(level=logging.WARNING)

from app.workflows.state import WorkflowState, IngredientsData, IngredientItem
from app.workflows.nodes import (
    ingredient_extraction_node,
    null_checker_node,
    ingredient_categorizer_node,
    process_user_clarification
)

async def test_extraction_node():
    """Test P1a: Ingredient extraction"""
    print("🧪 Testing P1a: Ingredient Extraction Node")

    state = WorkflowState(
        thread_id="test_extraction",
        user_input="I have 3 plastic water bottles and 2 aluminum soda cans"
    )

    try:
        result = await ingredient_extraction_node(state)

        print(f"Result: {result}")
        print(f"Ingredients data: {state.ingredients_data}")

        if state.ingredients_data and state.ingredients_data.ingredients:
            print(f"✅ Extracted {len(state.ingredients_data.ingredients)} ingredients")
            for i, ingredient in enumerate(state.ingredients_data.ingredients):
                print(f"  {i+1}. {ingredient.name} ({ingredient.material})")
            return True
        else:
            print("❌ No ingredients extracted")
            return False

    except Exception as e:
        print(f"❌ Extraction failed: {str(e)}")
        return False

async def test_null_checker_node():
    """Test P1b: Null checker"""
    print("\n🧪 Testing P1b: Null Checker Node")

    # Test with complete ingredients
    state = WorkflowState(
        thread_id="test_null_checker",
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

    try:
        result = await null_checker_node(state)
        print(f"Complete ingredients result: {result}")

        if result.get("current_node") == "P1c":
            print("✅ Complete ingredients -> P1c (correct)")
        else:
            print(f"❌ Expected P1c, got {result.get('current_node')}")

        # Test with incomplete ingredients
        state.ingredients_data = IngredientsData(
            ingredients=[
                IngredientItem(
                    name="bottle",
                    size=None,  # Missing
                    material=None,  # Missing
                    confidence=0.7
                )
            ]
        )

        result = await null_checker_node(state)
        print(f"Incomplete ingredients result: {result}")

        if result.get("needs_user_input"):
            print("✅ Incomplete ingredients -> needs_user_input (correct)")
            return True
        else:
            print("❌ Should need user input for incomplete ingredients")
            return False

    except Exception as e:
        print(f"❌ Null checker failed: {str(e)}")
        return False

async def test_categorizer_node():
    """Test P1c: Categorizer"""
    print("\n🧪 Testing P1c: Categorizer Node")

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

    try:
        result = await ingredient_categorizer_node(state)
        print(f"Categorizer result: {result}")

        success = (
            result.get("extraction_complete") and
            result.get("current_phase") == "goal_formation" and
            result.get("current_node") == "G1"
        )

        if success:
            print("✅ Categorization completed successfully")
            return True
        else:
            print("❌ Categorization did not complete properly")
            return False

    except Exception as e:
        print(f"❌ Categorizer failed: {str(e)}")
        return False

async def test_clarification():
    """Test user clarification processing"""
    print("\n🧪 Testing User Clarification")

    state = WorkflowState(
        thread_id="test_clarification",
        user_input="clarification test"
    )

    state.ingredients_data = IngredientsData(
        ingredients=[
            IngredientItem(
                name="bottle",
                size=None,
                material=None,
                confidence=0.7
            )
        ]
    )

    try:
        result = await process_user_clarification(
            state,
            "It's a 16oz plastic water bottle"
        )

        print(f"Clarification result: {result}")

        if state.ingredients_data and state.ingredients_data.ingredients:
            ingredient = state.ingredients_data.ingredients[0]
            print(f"Updated ingredient: {ingredient}")

            # Check if information was updated
            updated = False
            if ingredient.material and "plastic" in ingredient.material.lower():
                print("✅ Material updated")
                updated = True
            if ingredient.size and "16oz" in ingredient.size:
                print("✅ Size updated")
                updated = True

            return updated
        else:
            print("❌ No ingredients to check")
            return False

    except Exception as e:
        print(f"❌ Clarification failed: {str(e)}")
        return False

async def main():
    """Run all workflow node tests"""
    print("🚀 Workflow Node Tests")
    print("=" * 50)

    tests = [
        ("Extraction Node (P1a)", test_extraction_node),
        ("Null Checker Node (P1b)", test_null_checker_node),
        ("Categorizer Node (P1c)", test_categorizer_node),
        ("User Clarification", test_clarification)
    ]

    passed = 0
    total = len(tests)

    for test_name, test_func in tests:
        try:
            if await test_func():
                passed += 1
                print(f"✅ {test_name} PASSED")
            else:
                print(f"❌ {test_name} FAILED")
        except Exception as e:
            print(f"❌ {test_name} FAILED with exception: {str(e)}")

    print(f"\n{'='*50}")
    print(f"Results: {passed}/{total} tests passed")
    print(f"Success rate: {(passed/total*100):.1f}%")

    return passed == total

if __name__ == "__main__":
    try:
        success = asyncio.run(main())
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n🛑 Tests interrupted")
        sys.exit(1)