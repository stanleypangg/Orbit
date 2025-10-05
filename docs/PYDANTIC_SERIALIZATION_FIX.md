# Pydantic Serialization Fix

## Problem

The workflow was failing with the error:
```
TypeError: Object of type ConceptVariant is not JSON serializable
```

This occurred when trying to store workflow state in Redis using `json.dumps()` on state that contained Pydantic `BaseModel` objects like `ConceptVariant`, `IngredientsData`, etc.

## Root Cause

The backend workflow router (`backend/app/endpoints/workflow/router.py`) was attempting to serialize workflow state to JSON for Redis storage, but Pydantic models are not JSON-serializable by default. The code only handled `IngredientsData` conversion, but didn't handle other Pydantic models like:

- `ConceptVariant` (in `concept_variants` list)
- `selected_concept` (ConceptVariant)
- Other potential Pydantic models in the state

## Solution

Created a recursive helper function `serialize_pydantic()` that:
1. Detects Pydantic models via `hasattr(obj, "model_dump")`
2. Converts them to dictionaries using `.model_dump()`
3. Recursively processes nested structures (dicts, lists, tuples)
4. Preserves primitives (str, int, float, bool, None)

## Changes Made

### Added Helper Function
```python
def serialize_pydantic(obj):
    """Recursively convert Pydantic models to dictionaries for JSON serialization."""
    if hasattr(obj, "model_dump"):
        return obj.model_dump()
    elif isinstance(obj, dict):
        return {k: serialize_pydantic(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [serialize_pydantic(item) for item in obj]
    elif isinstance(obj, tuple):
        return [serialize_pydantic(item) for item in obj]
    else:
        return obj
```

### Updated Functions
Applied `serialize_pydantic()` to all workflow state serialization points:

1. **`run_workflow_background()`** - Line 982, 1009-1010
   - Main workflow completion state
   
2. **`resume_workflow_background()`** - Lines 1112-1113, 1118
   - Resume workflow state updates
   
3. **`generate_detailed_and_continue()`** - Lines 1083, 1091
   - Phase 4 final packaging results
   
4. **`process_magic_pencil_edit()`** - Lines 1157, 1169
   - Magic Pencil edit results with updated concepts

## Files Modified

- `backend/app/endpoints/workflow/router.py`

## Testing

To verify the fix:
1. Start the backend: `cd backend && docker-compose up --build`
2. Run a complete workflow through Phase 3 (concept generation)
3. Verify no JSON serialization errors in logs
4. Check that workflow state is properly stored in Redis

## Related Issues

This fix ensures that:
- All workflow phases can complete without serialization errors
- State is properly persisted in Redis
- Frontend receives properly serialized data
- Magic Pencil edits work correctly

## Future Considerations

Consider:
1. Using a custom JSON encoder class for automatic Pydantic serialization
2. Adding type hints to make serialization requirements explicit
3. Creating a base serialization utility module for reuse across endpoints

