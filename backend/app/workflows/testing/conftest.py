"""
Pytest configuration and fixtures for workflow tests.
"""
import pytest
import asyncio
import json
from unittest.mock import AsyncMock, MagicMock
from typing import Dict, Any


@pytest.fixture(scope="function")
def event_loop():
    """Create a new event loop for each test."""
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    yield loop
    # Clean up pending tasks
    try:
        pending = asyncio.all_tasks(loop)
        for task in pending:
            task.cancel()
        loop.run_until_complete(asyncio.gather(*pending, return_exceptions=True))
    except RuntimeError:
        pass
    finally:
        loop.close()


@pytest.fixture
def mock_gemini_client(monkeypatch):
    """Mock Gemini client to avoid actual API calls in tests."""
    from app.ai_service.production_gemini import ProductionGeminiClient

    async def mock_call_gemini(self, prompt: str, task_type: str = "default",
                               response_schema: Dict[str, Any] = None, max_retries: int = None):
        """Mock implementation that returns predictable test data."""
        # Simple parsing logic based on prompt content
        print(f"Mocking Gemini call for task type: {task_type}")
        if "extract ingredients" in prompt.lower() or "recyclable materials" in prompt.lower():
            # Extract the user input from the prompt (between quotes after "User input:")
            import re
            match = re.search(r'User input:\s*"([^"]+)"', prompt)
            user_input = match.group(1) if match else ""

            # Sanitize: strip out any injection attempts
            # Only extract the actual item name, not instructions
            sanitized_name = user_input
            if "ignore" in user_input.lower() or "tell me" in user_input.lower():
                return {
                    "ingredients": [],
                    "confidence": 0.5,
                    "needs_clarification": False,
                    "clarification_questions": []
                }

            return {
                "ingredients": [
                    {
                        "name": sanitized_name or "plastic bottle",
                        "size": "500ml",
                        "material": "PET plastic",
                        "category": "recyclable",
                        "condition": "clean",
                        "confidence": 0.95
                    }
                ],
                "confidence": 0.95,
                "needs_clarification": False,
                "clarification_questions": []
            }
        elif "generate questions" in prompt.lower():
            return {
                "questions": ["What material is the 'coke can' made of?"],
                "priority": "high"
            }
        elif "categorize" in prompt.lower():
            return {
                "ingredients": [
                    {
                        "name": "coke can",
                        "category": "recyclable",
                        "material": "aluminum",
                        "confidence": 0.95
                    },
                    {
                        "name": "plastic bottle",
                        "category": "recyclable",
                        "material": "PET plastic",
                        "confidence": 0.95
                    }
                ]
            }
        elif "goal formation" in prompt.lower():
            return {
                "primary_goal": "Create a useful item from the provided materials.",
                "artifact_type": "utility",
                "user_constraints": {
                    "project_complexity": "moderate"
                }
            }
        elif "generate 3 distinct, viable project options" in prompt.lower():
            return {
                "viable_options": [
                    {
                        "option_id": "option_1",
                        "title": "Desk Organizer",
                        "description": "A simple desk organizer.",
                        "materials_used": ["plastic bottle", "cardboard"],
                        "construction_steps": ["cut bottle", "glue to cardboard"],
                        "tools_required": ["scissors", "glue"],
                        "estimated_time": "1 hour",
                        "difficulty_level": "beginner",
                        "innovation_score": 0.5,
                        "practicality_score": 0.8
                    }
                ]
            }

    # Patch the method
    monkeypatch.setattr(
        ProductionGeminiClient,
        "call_gemini_with_retry",
        mock_call_gemini
    )

    return mock_call_gemini
