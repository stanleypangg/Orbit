# LangGraph AI Recycle-to-Market Generator Implementation Guide

## Overview

This implementation provides a production-ready LangGraph orchestration system for the AI Recycle-to-Market Generator with progressive ingredient discovery, Gemini 2.5 integration, and Redis-based state management.

## Architecture Components

### 1. State Management (`optimized_state.py`)

**Enhanced Features:**
- Type-safe state schema with Pydantic models
- Progressive ingredient discovery with confidence tracking
- Performance metrics integration
- Error handling with structured error types
- Checkpointing support for interrupt/resume patterns

**Key Classes:**
- `OptimizedWorkflowState`: Main workflow state with enhanced tracking
- `IngredientsData`: Container for ingredient discovery with completion metrics
- `IngredientItem`: Individual ingredient with confidence and source tracking
- `GeminiModelConfig`: Model selection strategy for different operations

### 2. LangGraph Orchestration (`langgraph_orchestrator.py`)

**Workflow Nodes:**
- `P1a_ingredient_extraction`: Structured ingredient extraction using Gemini
- `P1b_null_checker`: Progressive null-filling with targeted questions
- `P1c_categorize_ingredients`: Intelligent categorization with missing category detection
- `user_clarification`: Handle user responses and update ingredient data
- `error_handler`: Robust error handling with fallback strategies

**Features:**
- Interrupt/resume patterns for user clarification loops
- Conditional routing based on state conditions
- Redis-based temporary file storage
- Performance monitoring integration
- Structured error handling with retry logic

### 3. Gemini Integration (`gemini_structured.py`)

**Optimizations:**
- Structured output with response schemas
- Model selection strategy (Flash for speed, Pro for accuracy)
- Exponential backoff retry logic
- Specialized methods for ingredient extraction and categorization
- Safety settings optimized for DIY content

**Model Selection Strategy:**
- **Extraction/Parsing**: Gemini 2.5 Flash (speed optimized)
- **Evaluation/Safety**: Gemini 2.5 Pro (accuracy optimized)
- **Creative Generation**: Gemini 2.5 Flash (balanced)

### 4. FastAPI Integration (`workflow/router.py`)

**Endpoints:**
- `POST /workflow/start`: Start new workflow
- `GET /workflow/stream/{thread_id}`: SSE stream for real-time updates
- `POST /workflow/resume/{thread_id}`: Resume with user clarification
- `GET /workflow/status/{thread_id}`: Get workflow status
- `GET /workflow/ingredients/{thread_id}`: Get ingredient data
- `POST /workflow/ingredients/{thread_id}/update`: Update ingredient field
- `POST /workflow/ingredients/{thread_id}/add`: Add new ingredient

**Features:**
- Server-Sent Events for real-time workflow updates
- Background task processing with FastAPI
- Redis-based state persistence
- Comprehensive error handling

### 5. Performance Monitoring (`performance_monitor.py`)

**Metrics Tracked:**
- Node execution times (average, P95)
- Gemini API call counts and performance
- Redis operation metrics
- Error rates and retry patterns
- Phase completion times

**Optimization Features:**
- Real-time performance analysis
- Automatic optimization recommendations
- Performance level classification (Optimal/Good/Degraded/Poor)
- Bottleneck identification

## Progressive Ingredient Discovery Implementation

### Phase Flow

```
P1a: Ingredient Extraction
├── Extract materials from user input using Gemini structured output
├── Create temporary ingredient JSON in Redis
└── Set confidence scores and source tracking

P1b: Null Checker & Question Generator
├── Scan for missing critical fields (name, material)
├── Generate contextual clarification questions
├── Trigger interrupt() for user input
└── Loop back until all critical fields filled

P1c: Ingredient Categorizer
├── Categorize ingredients (containers, fasteners, decorative, tools)
├── Detect missing essential categories
├── Add null ingredients for missing categories
└── Loop back to P1b if new nulls added
```

### Null-Filling Strategy

1. **Critical Fields**: Name and material (must be filled)
2. **Important Fields**: Size and category (preferred)
3. **Progressive Questions**: One targeted question at a time
4. **Contextual Hints**: Provide examples based on identified materials
5. **Category Completion**: Ensure essential categories are represented

## Usage Examples

### 1. Start Workflow

```bash
curl -X POST "http://localhost:8000/workflow/start" \
     -H "Content-Type: application/json" \
     -d '{"user_input": "I have a Coke can and plastic bag, want to make a bracelet"}'
```

Response:
```json
{
  "thread_id": "recycle_a1b2c3d4e5f6",
  "status": "started",
  "message": "Workflow started successfully"
}
```

### 2. Stream Workflow Progress

```javascript
const eventSource = new EventSource('/workflow/stream/recycle_a1b2c3d4e5f6');

eventSource.onmessage = function(event) {
  const data = JSON.parse(event.data);

  switch(data.type) {
    case 'ingredients_update':
      console.log('Ingredients:', data.data);
      break;
    case 'user_question':
      console.log('Question:', data.data);
      break;
    case 'workflow_complete':
      console.log('Complete:', data.data);
      break;
  }
};
```

### 3. Resume with User Clarification

```bash
curl -X POST "http://localhost:8000/workflow/resume/recycle_a1b2c3d4e5f6" \
     -H "Content-Type: application/json" \
     -d '{"user_input": "12oz standard can"}'
```

### 4. Get Workflow Status

```bash
curl "http://localhost:8000/workflow/status/recycle_a1b2c3d4e5f6"
```

Response:
```json
{
  "thread_id": "recycle_a1b2c3d4e5f6",
  "current_phase": "ingredient_discovery",
  "current_node": "P1b",
  "needs_user_input": true,
  "user_questions": ["What size is your soda can? (12oz standard, 16oz, 20oz, or other?)"],
  "completion_percentage": 75.0,
  "ingredients_count": 2,
  "errors": []
}
```

## Performance Optimization Recommendations

### 1. Model Selection Strategy

```python
# For speed-critical operations (P1a, P1b)
config = GeminiModelConfig.for_extraction()  # Uses Gemini 2.5 Flash

# For accuracy-critical operations (E1, safety checks)
config = GeminiModelConfig.for_evaluation()  # Uses Gemini 2.5 Pro

# For creative operations (PR1, concept generation)
config = GeminiModelConfig.for_generation()  # Uses Gemini 2.5 Flash
```

### 2. Redis State Management

- **Temporary Files**: Ingredient JSON stored with 1-hour TTL
- **State Persistence**: Workflow state with checkpointing
- **Performance**: Redis operations tracked and optimized
- **Cleanup**: Automatic cleanup on workflow completion

### 3. Error Handling Strategy

```python
# Structured error handling with recovery
state.add_error("extraction_error", str(e), "P1a", recoverable=True)

# Retry logic with exponential backoff
if state.should_retry():
    state.increment_retry()
    return {"action": "retry"}

# Fallback strategies for persistent errors
if state.should_use_fallback_strategy():
    strategy = state.get_next_fallback_strategy()
    # Implement simplified extraction or manual input
```

## Production Deployment Considerations

### 1. Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
```

### 2. Performance Targets

- **P1a Extraction**: <3s average
- **P1b Null Check**: <1s average
- **P1c Categorization**: <2s average
- **Overall Workflow**: <30s total (excluding user wait time)
- **Gemini API Calls**: <15 per workflow

### 3. Monitoring and Alerting

```python
# Get performance recommendations
recommendations = performance_monitor.get_optimization_recommendations(thread_id)

# Monitor slow nodes
summary = performance_monitor.get_performance_summary()
if summary["performance_distribution"]["poor"] > 0.1:  # >10% poor performance
    trigger_alert("Performance degradation detected")
```

### 4. Error Recovery

- **Automatic Retries**: Up to 3 attempts with exponential backoff
- **Fallback Strategies**: Simplified extraction, manual input, template-based
- **Circuit Breaker**: Prevent cascade failures
- **Graceful Degradation**: Continue with partial data when possible

## Testing Strategy

### 1. Unit Tests

```python
# Test ingredient extraction
async def test_ingredient_extraction():
    orchestrator = RecycleWorkflowOrchestrator()
    result = await orchestrator.extract_ingredients({
        "user_input": "Coke can and plastic bag",
        "thread_id": "test_123"
    })
    assert len(result["ingredients_data"].ingredients) == 2

# Test null checking
async def test_null_checker():
    # Test with incomplete ingredients
    state = OptimizedWorkflowState(
        thread_id="test",
        ingredients_data=IngredientsData(...)
    )
    result = await orchestrator.check_nulls_and_question(state)
    assert result["needs_user_input"] == True
```

### 2. Integration Tests

```python
# Test complete workflow
async def test_complete_workflow():
    result = await orchestrator.run_workflow(
        "Coke can + plastic bag → bracelet",
        "test_thread"
    )
    assert result["extraction_complete"] == True
```

### 3. Performance Tests

```python
# Test performance under load
async def test_performance():
    start_time = time.time()
    await orchestrator.run_workflow(test_input, thread_id)
    duration = time.time() - start_time
    assert duration < 30  # 30s SLA
```

## Security Considerations

1. **Input Validation**: All user inputs validated before processing
2. **API Rate Limiting**: Implement rate limiting for Gemini API calls
3. **Data Sanitization**: Clean user inputs to prevent injection attacks
4. **Redis Security**: Use authentication and encryption for Redis
5. **Error Information**: Don't leak sensitive information in error messages

## Future Enhancements

1. **Parallel Processing**: Run P1a extraction in parallel with categorization hints
2. **ML Caching**: Cache common ingredient patterns to reduce API calls
3. **User Profiles**: Learn from user preferences to improve recommendations
4. **Visual Recognition**: Add image upload for ingredient identification
5. **Real-time Collaboration**: Multi-user workflows with shared state

This implementation provides a robust, production-ready foundation for the AI Recycle-to-Market Generator with excellent performance characteristics and comprehensive error handling.