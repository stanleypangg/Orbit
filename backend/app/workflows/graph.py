"""
LangGraph orchestrator for the AI Recycle-to-Market Generator workflow.
Implements the complete state machine with interrupt/resume patterns.
"""
import logging
import os
from typing import Dict, Any
from langgraph.graph import StateGraph, START, END
from app.workflows.state import WorkflowState
from app.workflows.nodes import (
    ingredient_extraction_node,
    ingredient_categorizer_node,
    should_continue_discovery
)
from app.workflows.phase2_nodes import (
    goal_formation_node,
    choice_proposer_node,
    evaluation_node,
    should_proceed_to_choices,
    should_proceed_to_evaluation,
    should_proceed_to_phase3
)
from app.workflows.phase3_nodes import (
    prompt_builder_node,
    image_generation_node,
    preview_assembly_node,
    should_proceed_to_magic_pencil,
    should_proceed_to_assembly
)
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
from app.core.checkpointer import create_redis_checkpointer

logger = logging.getLogger(__name__)


class RecycleWorkflowOrchestrator:
    """
    LangGraph orchestrator for the complete AI Recycle-to-Market Generator workflow.
    Handles state management, checkpointing, and interrupt/resume patterns.
    """

    def __init__(self):
        self.graph = None
        self.compiled_graph = None
        self._setup_graph()

    def _setup_graph(self):
        """Initialize and configure the LangGraph workflow."""
        # Create workflow graph
        workflow = StateGraph(WorkflowState)

        # Phase 1: Ingredient Discovery Nodes (simplified - no user questions)
        workflow.add_node("P1a_extract", ingredient_extraction_node)
        workflow.add_node("P1c_categorize", ingredient_categorizer_node)

        # Phase 2: Goal Formation & Choice Generation (simplified - no evaluation)
        workflow.add_node("G1_goal_formation", goal_formation_node)
        workflow.add_node("O1_choice_generation", choice_proposer_node)
        # E1_evaluation removed - user selects directly from O1 options

        # Phase 3: Image Generation (runs automatically after O1)
        workflow.add_node("PR1_prompt_builder", prompt_builder_node)
        workflow.add_node("IMG_generation", image_generation_node)
        # A1_assembly REMOVED - Phase 2 already has lite descriptions, Phase 4 generates full docs
        # workflow.add_node("A1_assembly", preview_assembly_node)
        
        # Phase 4: Final packaging triggered manually via /select-concept endpoint (not in graph)
        # Phase 4 will generate FULL documentation for SELECTED concept only

        # Entry point - always start with ingredient extraction
        workflow.add_edge(START, "P1a_extract")

        # Phase 1 Flow: Direct extraction to categorization (no user questions)
        workflow.add_edge("P1a_extract", "P1c_categorize")

        # Conditional routing from P1c - go straight to goal formation
        workflow.add_conditional_edges(
            "P1c_categorize",
            should_continue_discovery,
            {
                "goal_formation": "G1_goal_formation",
                "categorize": "P1c_categorize"
            }
        )

        # Phase 2 Flow - Simplified: G1 → O1 → [User selects] → PR1
        workflow.add_conditional_edges(
            "G1_goal_formation",
            should_proceed_to_choices,
            {
                "choice_generation": "O1_choice_generation",
                "goal_formation": "G1_goal_formation"  # Loop back if goals incomplete
            }
        )

        # Phase 2 → Phase 3: Automatically continue to image generation
        workflow.add_edge("O1_choice_generation", "PR1_prompt_builder")
        
        # Phase 3 Flow: PR1 → IMG → END (pause for user to select concept)
        workflow.add_edge("PR1_prompt_builder", "IMG_generation")
        workflow.add_edge("IMG_generation", END)  # End here - display 3 concepts, user selects
        
        # Phase 4 triggered manually via /select-concept endpoint
        # Phase 4 will generate full documentation (BOM, steps, ESG) for selected concept only

        # Setup Redis checkpointer for interrupt/resume
        # Note: Checkpointing requires Redis with RedisJSON module
        # For now, running without checkpointing to avoid JSON.SET errors
        enable_checkpointing = os.getenv("WORKFLOW_ENABLE_CHECKPOINTING", "false").lower() in {
            "1",
            "true",
            "yes",
            "on",
        }
        enable_interrupts = os.getenv("WORKFLOW_ENABLE_INTERRUPTS", "false").lower() in {
            "1",
            "true",
            "yes",
            "on",
        }
        compile_kwargs: Dict[str, Any] = {}
        # No interrupts needed - removed clarification flow

        if enable_checkpointing:
            try:
                checkpointer = create_redis_checkpointer()
                self.compiled_graph = workflow.compile(
                    checkpointer=checkpointer,
                    **compile_kwargs,
                )
                logger.info("Workflow compiled with Redis checkpointing enabled")
            except Exception as e:
                logger.warning(
                    "Redis checkpointer setup failed: %s. Running without checkpointing.",
                    e,
                )
                self.compiled_graph = workflow.compile(**compile_kwargs)
        else:
            # Compile without checkpointing (default for standard Redis without RedisJSON)
            self.compiled_graph = workflow.compile(**compile_kwargs)
            logger.info("Workflow compiled without checkpointing (standard Redis mode)")

        self.graph = workflow
        logger.info("RecycleWorkflowOrchestrator initialized successfully")

    async def start_workflow(self, thread_id: str, user_input: str) -> Dict[str, Any]:
        """
        Start a new workflow for recycling/upcycling generation.

        Args:
            thread_id: Unique identifier for this workflow session
            user_input: User's description of recyclable materials

        Returns:
            Dict containing initial workflow state and any immediate responses
        """
        logger.info(f"Starting workflow for thread {thread_id}")

        # Initialize workflow state
        initial_state = WorkflowState(
            thread_id=thread_id,
            user_input=user_input,
            initial_user_input=user_input,
            current_phase="ingredient_discovery",
            current_node="P1a",
            start_time=__import__('time').time()
        )

        try:
            # Run the workflow with interrupts enabled
            config = {
                "configurable": {"thread_id": thread_id},
                "recursion_limit": 50  # Increase from default 25
            }

            # Invoke the graph with the initial state
            result = await self.compiled_graph.ainvoke(
                initial_state.model_dump(),
                config=config
            )

            # Check if workflow is waiting for user input
            if result.get("needs_user_input", False):
                logger.info(f"Workflow paused for user input: {result.get('user_questions', [])}")
                return {
                    "status": "waiting_for_input",
                    "thread_id": thread_id,
                    "questions": result.get("user_questions", []),
                    "current_node": result.get("current_node", "unknown"),
                    "ingredients_discovered": len(result.get("ingredients_data", {}).get("ingredients", [])) if result.get("ingredients_data") else 0
                }

            logger.info(f"Workflow phase completed: {result.get('current_phase', 'unknown')}")
            return {
                "status": "phase_complete",
                "thread_id": thread_id,
                "current_phase": result.get("current_phase", "unknown"),
                "current_node": result.get("current_node", "unknown"),
                "result": result
            }

        except Exception as e:
            logger.error(f"Workflow execution failed: {str(e)}")
            return {
                "status": "error",
                "thread_id": thread_id,
                "error": str(e)
            }

    # continue_workflow removed - no longer needed without clarification flow

    async def get_workflow_status(self, thread_id: str) -> Dict[str, Any]:
        """Get current status of a workflow."""
        try:
            config = {"configurable": {"thread_id": thread_id}}
            current_state = self.compiled_graph.get_state(config)

            if not current_state:
                return {"status": "not_found", "thread_id": thread_id}

            state_values = current_state.values
            return {
                "status": "active",
                "thread_id": thread_id,
                "current_phase": state_values.get("current_phase", "unknown"),
                "current_node": state_values.get("current_node", "unknown"),
                "needs_user_input": state_values.get("needs_user_input", False),
                "user_questions": state_values.get("user_questions", []),
                "extraction_complete": state_values.get("extraction_complete", False),
                "errors": state_values.get("errors", [])
            }

        except Exception as e:
            logger.error(f"Failed to get workflow status: {str(e)}")
            return {"status": "error", "error": str(e)}

    # Placeholder nodes for future phases (Phase 2-4)
    async def _goal_formation_placeholder(self, state: WorkflowState) -> Dict[str, Any]:
        """Placeholder for G1 goal formation node."""
        logger.info("G1: Goal formation (placeholder)")
        state.goals = "Create useful household items from recycled materials"
        state.artifact_type = "household_utility"
        state.current_node = "O1"
        return {"goals": state.goals, "artifact_type": state.artifact_type, "current_node": "O1"}

    async def _choice_generation_placeholder(self, state: WorkflowState) -> Dict[str, Any]:
        """Placeholder for O1 choice generation node."""
        logger.info("O1: Choice generation (placeholder)")
        state.viable_options = [{"type": "storage_container", "description": "Repurpose containers for organization"}]
        state.current_node = "E1"
        return {"viable_options": state.viable_options, "current_node": "E1"}

    async def _evaluation_placeholder(self, state: WorkflowState) -> Dict[str, Any]:
        """Placeholder for E1 evaluation node."""
        logger.info("E1: Option evaluation (placeholder)")
        state.selected_option = state.viable_options[0] if state.viable_options else {}
        state.current_node = "PR1"
        return {"selected_option": state.selected_option, "current_node": "PR1"}




# Global workflow orchestrator instance
workflow_orchestrator = RecycleWorkflowOrchestrator()
