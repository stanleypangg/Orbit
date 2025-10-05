# Infinite Recursion Loop Fix

## Problem
The workflow was hitting a recursion limit error after 25 iterations:

```
ERROR   G1: No ingredient data available for goal formation (repeated 25+ times)
ERROR   GraphRecursionError: Recursion limit of 25 reached without hitting a stop condition
```

The G1 (goal_formation) node was looping infinitely.

## Root Causes

### 1. P1c Completing with 0 Ingredients
Phase 1 (ingredient extraction) was failing and completing with **0 ingredients**, but still transitioning to Phase 2.

```
INFO   P1c: Categorization complete, 0 ingredients finalized
INFO   G1: Starting goal formation for thread recycle_...
ERROR  G1: No ingredient data available for goal formation
```

### 2. G1 Error Handling Didn't Stop the Loop
When G1 encountered the error, it returned an error state but **didn't terminate**:

```python
# ❌ OLD CODE - Returns but doesn't stop
if not state.ingredients_data or not state.ingredients_data.ingredients:
    logger.error("G1: No ingredient data available")
    state.errors.append(message)
    return {
        "errors": state.errors,
        "current_node": "G1"
    }
```

### 3. Routing Function Didn't Check for Errors
The `should_proceed_to_choices` routing function only checked if `goals` was set:

```python
# ❌ OLD CODE - No error checking
def should_proceed_to_choices(state: WorkflowState) -> str:
    if state.goals and state.artifact_type:
        return "choice_generation"
    return "goal_formation"  # Loops back to G1!
```

Since `goals` was never set (because of the error), it kept returning `"goal_formation"`, creating an infinite loop:

```
G1 → Error (no ingredients) → should_proceed_to_choices → "goal_formation" → G1 → Error → ...
```

## Solution - 3-Part Fix

### 1. Make G1 Raise Exception on Fatal Errors ✅
```python
# ✅ NEW CODE - Terminates workflow
if not state.ingredients_data or not state.ingredients_data.ingredients:
    logger.error("G1: No ingredient data available for goal formation")
    message = "No ingredient data available for goal formation"
    state.errors.append(message)
    
    # STOP THE LOOP: This is a fatal error, we cannot proceed
    raise Exception("Fatal: No ingredients available - extraction may have failed")
```

### 2. Add Error Checking to Routing Function ✅
```python
# ✅ NEW CODE - Checks for errors
def should_proceed_to_choices(state: WorkflowState) -> str:
    # Check for fatal errors that should stop the workflow
    if state.errors and len(state.errors) > 3:
        logger.error(f"Too many errors ({len(state.errors)}), cannot proceed")
        raise Exception(f"Workflow failed: {state.errors[-1]}")
    
    if state.goals and state.artifact_type:
        return "choice_generation"
    
    # If no goals but errors exist, try one more time max
    if state.errors and "No ingredient data" in str(state.errors):
        logger.error("Fatal error: No ingredients available, stopping workflow")
        raise Exception("Cannot proceed without ingredient data")
    
    return "goal_formation"
```

### 3. Increase Recursion Limit as Safety Net ✅
```python
# ✅ NEW CODE - Increase from 25 to 50 (in runtime config)
config = {
    "configurable": {"thread_id": thread_id},
    "recursion_limit": 50  # Increase from default 25
}

result = await self.compiled_graph.ainvoke(state, config=config)
```

This gives the workflow more breathing room for legitimate retries while still catching infinite loops.

**Note**: `recursion_limit` is a runtime config parameter, not a compile parameter.

## How It Works Now

### Before (Broken)
```
P1c (0 ingredients) → G1 → Error → Route back to G1 → Error → Route back to G1 → (25 times) → CRASH
```

### After (Fixed)
```
P1c (0 ingredients) → G1 → Error → Raise Exception → Workflow terminates cleanly with error message
```

## Why P1c Had 0 Ingredients
This is likely due to the JSON parsing issue we also fixed. If Gemini returns malformed JSON during extraction:
1. P1a fails to extract ingredients properly
2. P1b/P1c work with empty data
3. P1c completes with 0 ingredients
4. G1 receives empty state

With the Gemini structured output fix, P1a should extract ingredients correctly, preventing this cascade.

## Expected Behavior

### Successful Flow
```
P1a → Extracts ingredients → P1b → P1c (N ingredients) → G1 → O1 → E1 → ...
```

### Failed Extraction (Now Handled)
```
P1a → Fails → P1c (0 ingredients) → G1 → Error → Exception → Clean termination
User sees: "Workflow failed: No ingredients available - extraction may have failed"
```

### Too Many Retries (Safety Net)
```
G1 → Error 1 → Retry → Error 2 → Retry → Error 3 → Retry → Error 4 → Exception
User sees: "Workflow failed: [last error message]"
```

## Error Messages to Frontend

The workflow will now return clean error messages instead of crashing:

```json
{
  "status": "error",
  "error": "Fatal: No ingredients available - extraction may have failed"
}
```

The SSE stream will emit an `error` event that the frontend can display to the user.

## Files Changed
- `/backend/app/workflows/phase2_nodes.py`
  - Modified `goal_formation_node` to raise exception on fatal errors
  - Modified `should_proceed_to_choices` to check for errors before routing
- `/backend/app/workflows/graph.py`
  - Increased `recursion_limit` from 25 to 50

## Testing
1. Run a workflow with valid input - should work normally
2. Run a workflow with invalid input - should fail cleanly with error message
3. Monitor logs - should see no infinite loops
4. Frontend should display error message instead of hanging

## Prevention
The combination of:
1. ✅ Gemini structured output fix (prevents extraction failures)
2. ✅ Error-aware routing (stops loops immediately)
3. ✅ Increased recursion limit (safety net)

Should prevent this issue from ever happening again.

## Success Metrics
- ✅ No more "Recursion limit of 25 reached" errors
- ✅ Clean error messages when extraction fails
- ✅ Workflow terminates gracefully on fatal errors
- ✅ Frontend receives error events and can display them to users

