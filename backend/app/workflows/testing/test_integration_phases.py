
import pytest
import asyncio
from unittest import mock
from app.workflows.graph import workflow_orchestrator
from app.workflows.state import WorkflowState, IngredientsData, IngredientItem

# --- Integration Tests ---

@pytest.mark.asyncio
async def test_phase1_full_ingredient_discovery_flow():
    """
    Tests the full P1 integration flow from user input to complete ingredients.
    This test simulates a user providing an ambiguous input, the agent asking a
    clarification question, and the user providing an answer.
    """
    # Arrange
    workflow = workflow_orchestrator.compiled_graph
    thread_id = "test-thread-123"
    config = {"configurable": {"thread_id": thread_id}}

    initial_input = {"user_input": "A can of soup", "thread_id": thread_id}

    with mock.patch('app.workflows.nodes.call_gemini_with_retry', new_callable=mock.AsyncMock) as mock_gemini_call, \
         mock.patch('app.workflows.nodes.redis_service') as mock_redis:
        mock_redis.get.return_value = None
        mock_gemini_call.side_effect = [
            mock.Mock(text='{"ingredients": [{"name": "can of soup", "size": "10.75oz", "material": null}], "needs_clarification": true, "confidence": 0.8}'),
            mock.Mock(text="What material is the can made of?"),
            mock.Mock(text='{"ingredients": [{"name": "can of soup", "size": "10.75oz", "material": "steel"}], "needs_clarification": false, "confidence": 0.9}'),
            mock.Mock(text='{"ingredients": [{"name": "can of soup", "material": "steel", "category": "metal"}], "overall_assessment": {}, "discovery_complete": true}')
        ]

        # Act
        final_state = await workflow.ainvoke(initial_input, config=config)

    # Assert
    assert "ingredients_data" in final_state
    final_ingredients = final_state["ingredients_data"]
    
    assert not final_ingredients.needs_clarification
    assert len(final_ingredients.ingredients) == 1
    assert final_ingredients.ingredients[0].material == "steel"
    assert final_ingredients.ingredients[0].category == "metal"

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

    with mock.patch('app.workflows.phase2_nodes.call_gemini_with_retry', new_callable=mock.AsyncMock) as mock_gemini_call, \
         mock.patch('app.workflows.phase2_nodes.redis_service') as mock_redis:
        
        mock_gemini_call.return_value = mock.Mock(text='{"evaluated_options": [{"feasibility_score": 0.9, "esg_score": 0.1, "safety_check": false, "safety_notes": ["Mixing bleach and ammonia creates toxic chloramine gas."]}]}')

        # Act
        result = await evaluation_node(state)

    # Assert
    assert "evaluated_options" in result
    evaluated = result["evaluated_options"][0]
    assert evaluated["safety_check"] is False
    assert "toxic" in evaluated["safety_notes"][0]
