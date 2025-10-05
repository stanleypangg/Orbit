# Phase 2 Loading State Fix

## Problem
The frontend was not showing loading states when transitioning from Phase 1 to Phase 2 (Goal Formation & Choice Generation). The workflow would appear to "hang" after the user answered clarification questions.

## Root Cause
The workflow backend was progressing through phases (P1a → P1b → P1c → G1 → O1 → E1), but **it wasn't updating Redis with the current state** as it moved through nodes. 

The SSE stream in `stream_workflow` was checking `workflow_state:{thread_id}` in Redis, but this key was:
1. Only updated ONCE at the END of the workflow
2. Never updated during intermediate phase transitions

This meant the frontend couldn't see progress updates and showed no loading states for Phase 2.

## Solution
Added **real-time state updates** to all workflow nodes:

### 1. Modified `run_workflow_background` (router.py)
- Initialize `workflow_state:{thread_id}` immediately when workflow starts
- Update with initial state: `P1a_extract` / `ingredient_discovery`

### 2. Added Redis State Updates to Phase 1 Nodes (nodes.py)
Each node now updates Redis at the start:

```python
# Update Redis with current state
from app.core.redis import redis_service
import json
state_key = f"workflow_state:{thread_id}"
redis_service.set(state_key, json.dumps({
    "status": "running",
    "current_phase": "ingredient_discovery",
    "current_node": "P1a_extract",  # or P1b_null_check, P1c_categorize
    "result": {}
}), ex=3600)
```

**Nodes updated:**
- `ingredient_extraction_node` (P1a)
- `null_checker_node` (P1b)
- `ingredient_categorizer_node` (P1c)

### 3. Added Redis State Updates to Phase 2 Nodes (phase2_nodes.py)
Same pattern for Phase 2:

```python
state_key = f"workflow_state:{thread_id}"
redis_service.set(state_key, json.dumps({
    "status": "running",
    "current_phase": "goal_formation",
    "current_node": "G1_goal_formation",  # or O1_choice_generation, E1_evaluation
    "result": {}
}), ex=3600)
```

**Nodes updated:**
- `goal_formation_node` (G1)
- `choice_proposer_node` (O1)
- `evaluation_node` (E1)

## How It Works Now

```
┌─────────────────────────────────────────────────────────┐
│ User starts workflow: "ocean plastic fashion accessory" │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ P1a_extract → Updates Redis                            │
│ Frontend SSE sees: "🔍 Analyzing your materials..."    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ P1b_null_check → Updates Redis                         │
│ Frontend SSE sees: "🤔 Checking for missing details..." │
│ → Asks clarification question                           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼ (user answers)
┌─────────────────────────────────────────────────────────┐
│ P1c_categorize → Updates Redis                         │
│ Frontend SSE sees: "📦 Organizing ingredients..."      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ G1_goal_formation → Updates Redis                      │
│ Frontend SSE sees: "🎯 Understanding your goals..."    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ O1_choice_generation → Updates Redis                   │
│ Frontend SSE sees: "💡 Generating creative options..." │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ E1_evaluation → Updates Redis                          │
│ Frontend SSE sees: "✨ Evaluating feasibility..."      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ choices_generated event → Shows 3 project options      │
└─────────────────────────────────────────────────────────┘
```

## Frontend Integration
The frontend `useWorkflow.ts` already had the loading message mapping:

```typescript
const loadingMessages: Record<string, string> = {
  'P1a_extract': '🔍 Analyzing your materials with AI...',
  'P1b_null_check': '🤔 Checking for missing details...',
  'P1c_categorize': '📦 Organizing ingredients...',
  'G1_goal_formation': '🎯 Understanding your goals...',
  'O1_choice_generation': '💡 Generating creative options...',
  'E1_evaluation': '✨ Evaluating feasibility...',
};
```

Now these messages will actually display because the SSE stream receives `state_update` events with the correct `current_node` values!

## Testing
1. Refresh frontend
2. Enter: "Generate a fashion accessory from recycled ocean plastic bottles"
3. Click "GENERATE"
4. You should see loading states for EVERY phase:
   - Phase 1: "🔍 Analyzing..." → "🤔 Checking..." → clarification question
   - After answering: "📦 Organizing..." → "🎯 Understanding..." → "💡 Generating..."
   - Finally: 3 project option cards appear

## Files Changed
- `/backend/app/endpoints/workflow/router.py` - Initialize state early, better final state storage
- `/backend/app/workflows/nodes.py` - Added state updates to P1a, P1b, P1c
- `/backend/app/workflows/phase2_nodes.py` - Added state updates to G1, O1, E1

## Next Steps
- Add state updates to Phase 3 nodes (PR1, IMG, concept selection)
- Add state updates to Phase 4 nodes (final packaging)
- Consider consolidating state update logic into a helper function to reduce duplication

