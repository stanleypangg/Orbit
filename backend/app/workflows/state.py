"""
Workflow state management for the AI Recycle-to-Market Generator.
Defines the state schema for LangGraph orchestration.
"""
from typing import Dict, List, Optional, Any, Annotated
from pydantic import BaseModel, Field
from langgraph.graph import add_messages
from langchain_core.messages import BaseMessage
import json


class IngredientItem(BaseModel):
    """Individual ingredient with progressive discovery fields."""
    name: Optional[str] = None
    size: Optional[str] = None
    material: Optional[str] = None
    category: Optional[str] = None
    condition: Optional[str] = None
    confidence: float = 0.0

    def has_null_fields(self) -> bool:
        """Check if any required fields are still null."""
        return any(field is None for field in [self.name, self.size, self.material])

    def get_null_fields(self) -> List[str]:
        """Get list of field names that are still null."""
        null_fields = []
        if self.name is None:
            null_fields.append("name")
        if self.size is None:
            null_fields.append("size")
        if self.material is None:
            null_fields.append("material")
        return null_fields


class IngredientsData(BaseModel):
    """Container for all discovered ingredients."""
    ingredients: List[IngredientItem] = Field(default_factory=list)
    confidence: float = 0.0
    needs_clarification: bool = False
    clarification_questions: List[str] = Field(default_factory=list)

    def to_json(self) -> str:
        """Convert to JSON string for Redis storage."""
        return self.model_dump_json()

    @classmethod
    def from_json(cls, json_str: str) -> "IngredientsData":
        """Create from JSON string from Redis."""
        return cls.model_validate_json(json_str)

    def add_ingredient(self, ingredient: IngredientItem):
        """Add a new ingredient to the collection."""
        self.ingredients.append(ingredient)

    def has_incomplete_ingredients(self) -> bool:
        """Check if any ingredients have null fields."""
        return any(ingredient.has_null_fields() for ingredient in self.ingredients)


class ConceptVariant(BaseModel):
    """A single concept variation for the upcycled product."""
    style: str  # minimalist, decorative, functional
    description: str
    image_prompt: str
    image_id: Optional[str] = None
    feasibility_score: float = 0.0
    aesthetic_score: float = 0.0
    esg_score: float = 0.0
    safety_check: bool = True
    estimated_time: Optional[str] = None
    difficulty_level: str = "beginner"  # beginner, intermediate, advanced


class WorkflowState(BaseModel):
    """
    Complete state for the AI Recycle-to-Market Generator workflow.
    This state flows through all LangGraph nodes.
    """
    # Core identification
    thread_id: str
    session_id: Optional[str] = None

    # User input and intent
    user_input: str = ""
    user_intent: Optional[str] = None
    user_constraints: Dict[str, Any] = Field(default_factory=dict)

    # Progressive ingredient discovery (Phase 1)
    ingredients_data: Optional[IngredientsData] = None
    extraction_complete: bool = False

    # Goal formation (Phase 2)
    goals: Optional[str] = None
    artifact_type: Optional[str] = None

    # Choice generation and evaluation
    viable_options: List[Dict[str, Any]] = Field(default_factory=list)
    selected_option: Optional[Dict[str, Any]] = None

    # Image generation and refinement (Phase 3)
    concept_variants: List[ConceptVariant] = Field(default_factory=list)
    selected_concept: Optional[ConceptVariant] = None
    edit_requests: List[str] = Field(default_factory=list)
    concept_images: Optional[Dict[str, Any]] = None
    project_preview: Optional[Dict[str, Any]] = None

    # Output assembly (Phase 4)
    final_output: Optional[Dict[str, Any]] = None
    esg_report: Optional[Dict[str, Any]] = None
    diy_guide: Optional[Dict[str, Any]] = None
    bom_data: Optional[Dict[str, Any]] = None

    # Workflow control
    current_phase: str = "ingredient_discovery"  # ingredient_discovery, goal_formation, concept_generation, output_assembly
    current_node: str = "P1a"
    needs_user_input: bool = False
    user_questions: List[str] = Field(default_factory=list)

    # Conversation tracking
    messages: Annotated[List[BaseMessage], add_messages] = Field(default_factory=list)

    # Error handling and interrupts
    errors: List[str] = Field(default_factory=list)
    interrupt_reason: Optional[str] = None

    # Performance tracking
    start_time: Optional[float] = None
    phase_times: Dict[str, float] = Field(default_factory=dict)

    class Config:
        arbitrary_types_allowed = True

    def to_dict(self) -> Dict[str, Any]:
        """Convert state to dictionary for Redis storage."""
        state_dict = self.model_dump()
        # Convert messages to serializable format
        state_dict["messages"] = [msg.dict() if hasattr(msg, 'dict') else str(msg) for msg in self.messages]
        return state_dict

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "WorkflowState":
        """Create state from dictionary from Redis."""
        # Handle messages reconstruction if needed
        if "messages" in data and data["messages"]:
            # For now, skip message reconstruction - can be enhanced later
            data["messages"] = []
        return cls.model_validate(data)

    def get_ingredients_json(self) -> str:
        """Get ingredients as JSON string for temp file storage."""
        if self.ingredients_data:
            return self.ingredients_data.to_json()
        return IngredientsData().to_json()

    def update_ingredients_from_json(self, json_str: str):
        """Update ingredients from JSON string."""
        self.ingredients_data = IngredientsData.from_json(json_str)

    def add_user_question(self, question: str):
        """Add a clarification question for the user."""
        self.user_questions.append(question)
        self.needs_user_input = True

    def clear_user_questions(self):
        """Clear pending user questions."""
        self.user_questions = []
        self.needs_user_input = False

    def mark_phase_complete(self, phase: str, next_phase: str, next_node: str):
        """Mark current phase as complete and move to next."""
        self.current_phase = next_phase
        self.current_node = next_node
        # Record phase completion time if tracking
        import time
        if self.start_time:
            self.phase_times[phase] = time.time() - self.start_time
