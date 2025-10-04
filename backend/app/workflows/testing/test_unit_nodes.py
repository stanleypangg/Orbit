

import pytest
import asyncio
from unittest import mock
from app.workflows.nodes import (
    ingredient_extraction_node,
    null_checker_node,
    ingredient_categorizer_node
)
from app.workflows.state import WorkflowState, IngredientsData, IngredientItem

@pytest.fixture
def mock_state():
    """Provides a fresh mock state for each test."""
    state = WorkflowState(thread_id="test-thread")
    return state

# --- Phase 1: Ingredient Discovery Unit Tests ---

@pytest.mark.asyncio
async def test_p1a_ingredient_extraction_success(mock_state):
    """
    Tests the P1a node for successful ingredient extraction from a simple string.
    """
    # Arrange
    mock_state.user_input = "one aluminum can and a plastic bottle"
    mock_gemini_response = mock.Mock()
    mock_gemini_response.text = '{"ingredients": [{"name": "aluminum can", "size": "standard", "material": "aluminum"}, {"name": "plastic bottle", "size": "500ml", "material": "PET plastic"}], "confidence": 0.95, "needs_clarification": false}'

    # Act
    with mock.patch('app.workflows.nodes.call_gemini_with_retry', new_callable=mock.AsyncMock) as mock_gemini_call:
        mock_gemini_call.return_value = mock_gemini_response
        result = await ingredient_extraction_node(mock_state)

    # Assert
    assert "ingredients_data" in result
    assert result["ingredients_data"].confidence == 0.95
    assert len(result["ingredients_data"].ingredients) == 2
    assert result["ingredients_data"].ingredients[0].name == "aluminum can"

@pytest.mark.asyncio
async def test_p1b_null_checker_finds_nulls(mock_state):
    """
    Tests the P1b node to ensure it generates a question when a null value is found.
    """
    # Arrange
    mock_state.ingredients_data = IngredientsData(
        ingredients=[IngredientItem(name='coke can', size='12oz', material=None)]
    )
    
    mock_gemini_response = mock.Mock()
    mock_gemini_response.text = "What material is the 'coke can' made of?"

    # Act
    with mock.patch('app.workflows.nodes.call_gemini_with_retry', new_callable=mock.AsyncMock) as mock_gemini_call:
        mock_gemini_call.return_value = mock_gemini_response
        result = await null_checker_node(mock_state)

    # Assert
    assert result["needs_user_input"] is True
    assert result["user_questions"][0] == "What material is the 'coke can' made of?"

@pytest.mark.asyncio
async def test_p1b_null_checker_no_nulls(mock_state):
    """
    Tests the P1b node to ensure it passes ingredients through when no nulls are present.
    """
    # Arrange
    mock_state.ingredients_data = IngredientsData(
        ingredients=[IngredientItem(name='coke can', size='12oz', material='aluminum')]
    )

    # Act
    result = await null_checker_node(mock_state)

    # Assert
    assert result["current_node"] == "P1c"

@pytest.mark.asyncio
async def test_p1c_ingredient_categorizer(mock_state):
    """
    Tests the P1c node for categorizing materials.
    """
    # Arrange
    mock_state.ingredients_data = IngredientsData(
        ingredients=[
            IngredientItem(name='soda can', material='Aluminum'),
            IngredientItem(name='water bottle', material='PET Plastic')
        ]
    )
    
    mock_gemini_response = mock.Mock()
    mock_gemini_response.text = '{"ingredients": [{"name": "soda can", "material": "Aluminum", "category": "metal"}, {"name": "water bottle", "material": "PET Plastic", "category": "plastic"}], "overall_assessment": {"suitable_for_upcycling": true, "material_synergy": 0.8, "project_complexity": "simple", "recommended_project_types": ["crafts"]}, "discovery_complete": true}'

    # Act
    with mock.patch('app.workflows.nodes.call_gemini_with_retry', new_callable=mock.AsyncMock) as mock_gemini_call:
        mock_gemini_call.return_value = mock_gemini_response
        result = await ingredient_categorizer_node(mock_state)

    # Assert
    assert result["extraction_complete"] is True
    assert result["current_node"] == "G1"
    assert len(result["ingredients_data"].ingredients) == 2
    assert result["ingredients_data"].ingredients[0].category == "metal"
    assert result["ingredients_data"].ingredients[1].category == "plastic"

