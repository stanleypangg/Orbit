"""
Optimized workflow state management for AI Recycle-to-Market Generator.
Enhanced for ML workflow optimization with proper error handling and performance tracking.
"""
from typing import Dict, List, Optional, Any, Annotated, Union
from pydantic import BaseModel, Field, validator
from langgraph.graph import add_messages
from langchain_core.messages import BaseMessage
import json
import time
from enum import Enum


class IngredientConfidence(str, Enum):
    """Confidence levels for ingredient data."""
    HIGH = "high"      # >0.8
    MEDIUM = "medium"  # 0.5-0.8
    LOW = "low"        # <0.5


class IngredientSource(str, Enum):
    """Source of ingredient information."""
    USER_INPUT = "user_input"
    ML_EXTRACTION = "ml_extraction"
    USER_CLARIFICATION = "user_clarification"
    DERIVED = "derived"


class IngredientItem(BaseModel):
    """Individual ingredient with progressive discovery fields."""
    name: Optional[str] = None
    size: Optional[str] = None
    material: Optional[str] = None
    category: Optional[str] = None
    condition: Optional[str] = None
    confidence: float = 0.0
    confidence_level: IngredientConfidence = IngredientConfidence.LOW
    source: IngredientSource = IngredientSource.ML_EXTRACTION
    last_updated: float = Field(default_factory=time.time)
    needs_validation: bool = True

    @validator('confidence')
    def validate_confidence(cls, v):
        return max(0.0, min(1.0, v))

    def has_critical_nulls(self) -> bool:
        """Check if critical fields (name, material) are missing."""
        return self.name is None or self.material is None

    def has_any_nulls(self) -> bool:
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
        if self.category is None:
            null_fields.append("category")
        return null_fields

    def update_confidence_level(self):
        """Update confidence level based on confidence score."""
        if self.confidence >= 0.8:
            self.confidence_level = IngredientConfidence.HIGH
        elif self.confidence >= 0.5:
            self.confidence_level = IngredientConfidence.MEDIUM
        else:
            self.confidence_level = IngredientConfidence.LOW


class IngredientsData(BaseModel):
    """Container for all discovered ingredients with ML workflow optimization."""
    ingredients: List[IngredientItem] = Field(default_factory=list)
    categories: Dict[str, List[str]] = Field(default_factory=lambda: {
        "containers": [],
        "fasteners": [],
        "decorative": [],
        "tools": []
    })
    confidence: float = 0.0
    needs_clarification: bool = False
    clarification_questions: List[str] = Field(default_factory=list)
    completed: bool = False
    last_question: Optional[str] = None
    extraction_attempts: int = 0
    max_extraction_attempts: int = 3

    def to_json(self) -> str:
        """Convert to JSON string for Redis storage."""
        return self.model_dump_json()

    @classmethod
    def from_json(cls, json_str: str) -> "IngredientsData":
        """Create from JSON string from Redis."""
        return cls.model_validate_json(json_str)

    def add_ingredient(self, ingredient: IngredientItem):
        """Add a new ingredient to the collection."""
        ingredient.update_confidence_level()
        self.ingredients.append(ingredient)
        self._update_overall_confidence()

    def update_ingredient(self, index: int, field: str, value: str, source: IngredientSource = IngredientSource.USER_CLARIFICATION):
        """Update specific ingredient field."""
        if 0 <= index < len(self.ingredients):
            setattr(self.ingredients[index], field, value)
            self.ingredients[index].source = source
            self.ingredients[index].last_updated = time.time()
            self.ingredients[index].needs_validation = False
            self.ingredients[index].update_confidence_level()
            self._update_overall_confidence()

    def has_critical_gaps(self) -> bool:
        """Check if any ingredients have critical missing data."""
        return any(ingredient.has_critical_nulls() for ingredient in self.ingredients)

    def has_incomplete_ingredients(self) -> bool:
        """Check if any ingredients have any null fields."""
        return any(ingredient.has_any_nulls() for ingredient in self.ingredients)

    def get_completion_percentage(self) -> float:
        """Calculate completion percentage based on filled fields."""
        if not self.ingredients:
            return 0.0

        total_fields = len(self.ingredients) * 4  # name, size, material, category
        filled_fields = sum(
            sum(1 for field in [ing.name, ing.size, ing.material, ing.category] if field is not None)
            for ing in self.ingredients
        )
        return filled_fields / total_fields if total_fields > 0 else 0.0

    def _update_overall_confidence(self):
        """Update overall confidence based on ingredient confidences."""
        if not self.ingredients:
            self.confidence = 0.0
            return

        self.confidence = sum(ing.confidence for ing in self.ingredients) / len(self.ingredients)

    def should_retry_extraction(self) -> bool:
        """Check if we should retry ML extraction."""
        return (self.extraction_attempts < self.max_extraction_attempts and
                (self.has_critical_gaps() or self.confidence < 0.5))


class GeminiModelConfig(BaseModel):
    """Configuration for Gemini model selection."""
    model_name: str = "gemini-2.5-flash"
    temperature: float = 0.3
    max_tokens: int = 1024
    use_structured_output: bool = True

    @classmethod
    def for_extraction(cls) -> "GeminiModelConfig":
        """Configuration for ingredient extraction (speed-optimized)."""
        return cls(
            model_name="gemini-2.5-flash",
            temperature=0.1,
            max_tokens=512,
            use_structured_output=True
        )

    @classmethod
    def for_evaluation(cls) -> "GeminiModelConfig":
        """Configuration for concept evaluation (accuracy-optimized)."""
        return cls(
            model_name="gemini-2.5-pro",
            temperature=0.3,
            max_tokens=1024,
            use_structured_output=True
        )

    @classmethod
    def for_generation(cls) -> "GeminiModelConfig":
        """Configuration for creative generation (balanced)."""
        return cls(
            model_name="gemini-2.5-flash",
            temperature=0.7,
            max_tokens=2048,
            use_structured_output=False
        )


class WorkflowPhase(str, Enum):
    """Workflow phases for state tracking."""
    INGREDIENT_DISCOVERY = "ingredient_discovery"
    GOAL_FORMATION = "goal_formation"
    CONCEPT_GENERATION = "concept_generation"
    OUTPUT_ASSEMBLY = "output_assembly"
    COMPLETED = "completed"
    ERROR = "error"


class NodeState(str, Enum):
    """Individual node states for fine-grained tracking."""
    P1A_EXTRACTION = "P1a"
    P1B_NULL_CHECK = "P1b"
    P1C_CATEGORIZATION = "P1c"
    G1_GOAL_FORMATION = "G1"
    O1_CHOICE_PROPOSER = "O1"
    E1_EVALUATOR = "E1"
    PR1_PROMPT_BUILDER = "PR1"
    NB_IMAGE_GENERATION = "NB"
    MP_MAGIC_PENCIL = "MP"
    H1_PACKAGE_OUTPUTS = "H1"


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
    generation_time: Optional[float] = None
    gemini_config: Optional[GeminiModelConfig] = None


class PerformanceMetrics(BaseModel):
    """Performance tracking for ML workflow optimization."""
    phase_start_times: Dict[str, float] = Field(default_factory=dict)
    phase_durations: Dict[str, float] = Field(default_factory=dict)
    node_execution_times: Dict[str, List[float]] = Field(default_factory=dict)
    gemini_api_calls: int = 0
    gemini_total_tokens: int = 0
    redis_operations: int = 0
    error_count: int = 0
    retry_count: int = 0

    def start_phase(self, phase: str):
        """Mark the start of a phase."""
        self.phase_start_times[phase] = time.time()

    def end_phase(self, phase: str):
        """Mark the end of a phase and calculate duration."""
        if phase in self.phase_start_times:
            self.phase_durations[phase] = time.time() - self.phase_start_times[phase]

    def record_node_execution(self, node: str, duration: float):
        """Record execution time for a specific node."""
        if node not in self.node_execution_times:
            self.node_execution_times[node] = []
        self.node_execution_times[node].append(duration)

    def get_total_duration(self) -> float:
        """Get total workflow duration."""
        return sum(self.phase_durations.values())


class OptimizedWorkflowState(BaseModel):
    """
    Optimized state for the AI Recycle-to-Market Generator workflow.
    Enhanced with ML workflow patterns, error handling, and performance tracking.
    """
    # Core identification
    thread_id: str
    session_id: Optional[str] = None

    # User input and intent
    user_input: str = ""
    user_intent: Optional[str] = None
    user_constraints: Dict[str, Any] = Field(default_factory=dict)

    # Progressive ingredient discovery (Phase 1) - Enhanced
    ingredients_data: Optional[IngredientsData] = None
    extraction_complete: bool = False
    current_extraction_strategy: str = "progressive"  # progressive, batch, hybrid

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

    # Output assembly (Phase 4)
    final_output: Optional[Dict[str, Any]] = None
    esg_report: Optional[Dict[str, Any]] = None
    diy_guide: Optional[Dict[str, Any]] = None
    bom_data: Optional[Dict[str, Any]] = None

    # Enhanced workflow control
    current_phase: WorkflowPhase = WorkflowPhase.INGREDIENT_DISCOVERY
    current_node: NodeState = NodeState.P1A_EXTRACTION
    needs_user_input: bool = False
    user_questions: List[str] = Field(default_factory=list)
    retry_count: int = 0
    max_retries: int = 3

    # Conversation tracking
    messages: Annotated[List[BaseMessage], add_messages] = Field(default_factory=list)

    # Enhanced error handling and interrupts
    errors: List[Dict[str, Any]] = Field(default_factory=list)  # Store structured errors
    interrupt_reason: Optional[str] = None
    fallback_strategies: List[str] = Field(default_factory=list)

    # Performance tracking and optimization
    performance_metrics: PerformanceMetrics = Field(default_factory=PerformanceMetrics)
    model_configs: Dict[str, GeminiModelConfig] = Field(default_factory=dict)

    # State management
    checkpoint_data: Dict[str, Any] = Field(default_factory=dict)
    should_checkpoint: bool = False

    class Config:
        arbitrary_types_allowed = True
        use_enum_values = True

    def to_dict(self) -> Dict[str, Any]:
        """Convert state to dictionary for Redis storage."""
        state_dict = self.model_dump()
        # Convert messages to serializable format
        state_dict["messages"] = [
            msg.dict() if hasattr(msg, 'dict') else str(msg)
            for msg in self.messages
        ]
        return state_dict

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "OptimizedWorkflowState":
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

    def add_error(self, error_type: str, message: str, node: str, recoverable: bool = True):
        """Add structured error with recovery information."""
        error_entry = {
            "type": error_type,
            "message": message,
            "node": node,
            "timestamp": time.time(),
            "recoverable": recoverable,
            "retry_count": self.retry_count
        }
        self.errors.append(error_entry)
        self.performance_metrics.error_count += 1

    def should_retry(self) -> bool:
        """Check if we should retry current operation."""
        return self.retry_count < self.max_retries

    def increment_retry(self):
        """Increment retry counter."""
        self.retry_count += 1
        self.performance_metrics.retry_count += 1

    def reset_retry_count(self):
        """Reset retry counter after successful operation."""
        self.retry_count = 0

    def mark_phase_complete(self, phase: WorkflowPhase, next_phase: WorkflowPhase, next_node: NodeState):
        """Mark current phase as complete and move to next."""
        self.performance_metrics.end_phase(self.current_phase.value)
        self.current_phase = next_phase
        self.current_node = next_node
        self.performance_metrics.start_phase(next_phase.value)
        self.reset_retry_count()
        self.should_checkpoint = True

    def get_model_config(self, operation: str) -> GeminiModelConfig:
        """Get appropriate model configuration for operation."""
        if operation in self.model_configs:
            return self.model_configs[operation]

        # Default configurations based on operation type
        if operation in ["extraction", "parsing"]:
            return GeminiModelConfig.for_extraction()
        elif operation in ["evaluation", "safety_check"]:
            return GeminiModelConfig.for_evaluation()
        elif operation in ["generation", "creative"]:
            return GeminiModelConfig.for_generation()
        else:
            return GeminiModelConfig()

    def should_use_fallback_strategy(self) -> bool:
        """Determine if we should switch to fallback strategy."""
        return (self.retry_count >= 2 or
                len(self.errors) > 3 or
                self.performance_metrics.error_count > 5)

    def get_next_fallback_strategy(self) -> Optional[str]:
        """Get next available fallback strategy."""
        available_strategies = [
            "simplified_extraction",
            "manual_input_only",
            "template_based",
            "minimal_requirements"
        ]

        for strategy in available_strategies:
            if strategy not in self.fallback_strategies:
                return strategy

        return None