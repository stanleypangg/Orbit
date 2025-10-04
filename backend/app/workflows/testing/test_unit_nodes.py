

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
async def test_p1a_ingredient_extraction_success(mock_state, mock_gemini_client):
    """
    Tests the P1a node for successful ingredient extraction from a simple string.
    """
    # Arrange
    mock_state.user_input = "one aluminum can and a plastic bottle"

    # Act
    result = await ingredient_extraction_node(mock_state)

    # Assert
    assert "ingredients_data" in result
    assert result["ingredients_data"].confidence == 0.95
    assert len(result["ingredients_data"].ingredients) >= 1

@pytest.mark.asyncio
async def test_p1b_null_checker_finds_nulls(mock_state, mock_gemini_client):
    """
    Tests the P1b node to ensure it generates a question when a null value is found.
    """
    # Arrange
    mock_state.ingredients_data = IngredientsData(
        ingredients=[IngredientItem(name='coke can', size='12oz', material=None)]
    )

    # Act
    with mock.patch('app.workflows.nodes.redis_service') as mock_redis:
        mock_redis.get.return_value = None
        result = await null_checker_node(mock_state)

    # Assert
    assert result["needs_user_input"] is True
    assert len(result["user_questions"]) >= 1

@pytest.mark.asyncio
async def test_p1b_null_checker_no_nulls(mock_state, mock_gemini_client):
    """
    Tests the P1b node to ensure it passes ingredients through when no nulls are present.
    """
    # Arrange
    mock_state.ingredients_data = IngredientsData(
        ingredients=[IngredientItem(name='coke can', size='12oz', material='aluminum')]
    )

    # Act
    result = await null_checker_node(mock_state)

    # Assert - should proceed to categorization or set current_node properly
    assert "current_node" in result

@pytest.mark.asyncio
async def test_p1c_ingredient_categorizer(mock_state, mock_gemini_client):
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

    # Act
    result = await ingredient_categorizer_node(mock_state)

    # Assert - categorization should complete
    assert "extraction_complete" in result or "ingredients_data" in result

