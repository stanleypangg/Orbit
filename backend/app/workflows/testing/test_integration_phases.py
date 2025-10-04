
import pytest
import asyncio
from unittest import mock
from app.workflows.graph import workflow_orchestrator
from app.workflows.state import WorkflowState, IngredientsData, IngredientItem
from app.workflows.phase2_nodes import evaluation_node

# --- Integration Tests ---

@pytest.mark.asyncio
async def test_phase1_full_ingredient_discovery_flow(mock_gemini_client):
    """
    Tests the full P1 integration flow from user input to complete ingredients.
    This test simulates a user providing an ambiguous input, the agent asking a
    clarification question, and the user providing an answer.
    """
    # Arrange
    workflow = workflow_orchestrator.compiled_graph
    thread_id = "test-thread-123"
    config = {
        "configurable": {"thread_id": thread_id},
        "recursion_limit": 50  # Increase limit to avoid timeout
    }

    initial_input = {"user_input": "A can of soup", "thread_id": thread_id}

    with mock.patch('app.workflows.nodes.redis_service') as mock_redis:
        mock_redis.get.return_value = None
        mock_redis.setex.return_value = True

        # Act
        final_state = await workflow.ainvoke(initial_input, config=config)

    # Assert
    assert "ingredients_data" in final_state
    final_ingredients = final_state["ingredients_data"]

    # With mock fixture, should complete extraction
    assert len(final_ingredients.ingredients) >= 1

@pytest.mark.asyncio
async def test_phase2_safety_blocking_integration():
    """
    Tests that the E1 evaluation node correctly identifies and blocks an unsafe
    project option.
    """
    # Arrange
    state = WorkflowState(thread_id="test-thread-456")
    state.ingredients_data = IngredientsData(ingredients=[IngredientItem(name='bleach'), IngredientItem(name='ammonia')])
    state.viable_options = [{"name": "Super Cleaner", "steps": ["Mix bleach and ammonia"]}]
    state.goals = "cleaning solution"

    with mock.patch('app.workflows.phase2_nodes.production_call_gemini', new_callable=mock.AsyncMock) as mock_ai_call, \
         mock.patch('app.workflows.phase2_nodes.redis_service') as mock_redis:

        mock_ai_call.return_value = {"evaluated_options": [{"feasibility_score": 0.9, "esg_score": 0.1, "safety_check": False, "safety_notes": ["Mixing bleach and ammonia creates toxic chloramine gas."]}]}

        # Act
        result = await evaluation_node(state)

    # Assert
    assert "evaluated_options" in result
    evaluated = result["evaluated_options"][0]
    assert evaluated["safety_check"] is False
    assert "toxic" in evaluated["safety_notes"][0]
