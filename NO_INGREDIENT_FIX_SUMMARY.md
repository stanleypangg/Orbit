# Fix: No Ingredient Extraction → User Clarification

## Problem
When a user enters input that results in no material extraction (e.g., "hello"), the workflow was entering an infinite loop:
- `G1_goal_formation` would see no ingredients and try to ask for clarification
- The routing function `should_proceed_to_choices` would see no goals and route back to `G1_goal_formation`
- This loop continued 50+ times until hitting the recursion limit

## Root Cause
The LangGraph routing function `should_proceed_to_choices` only checked for `state.goals` and didn't handle the `needs_user_input` flag. When no ingredients were available, goals couldn't be formed, so it kept looping back to goal_formation.

## Solution

### 1. Updated `goal_formation_node` (Phase 2)
When no ingredients are detected:
- Creates a friendly clarification question asking the user what they want to make
- Saves the question to Redis for frontend retrieval  
- Adds the question to `state.user_questions`
- Returns with `needs_user_input: True` flag
- Sets `goals: None` and `artifact_type: None` to signal incomplete state

### 2. Updated `should_proceed_to_choices` Routing Function
- Added check for `state.needs_user_input` flag
- When user input is needed, routes to `choice_generation` (which won't execute)
- This allows the orchestrator to check the result and pause the workflow
- **Critically**: Prevents the infinite loop by not routing back to `goal_formation`

### 3. Orchestrator Handling (Already Existed)
The `RecycleWorkflowOrchestrator.start_workflow` method at line 212-220 already:
- Checks `result.get("needs_user_input", False)` after workflow execution
- Returns `"waiting_for_input"` status with questions
- Prevents further workflow execution until user responds

### 4. Frontend Display (Already Existed)
The frontend at `poc/page.tsx` lines 277-303 already:
- Watches for `workflowState.question` changes
- Adds clarification questions as assistant messages  
- Displays them in the chat interface

## Flow After Fix

1. User: "hello"
2. P1a (extraction): Finds 0 ingredients
3. P1b (null check): No nulls to check (0 ingredients)
4. P1c (categorize): Nothing to categorize
5. **G1 (goal_formation)**: Detects no ingredients → Returns `needs_user_input: True`
6. **Routing**: `should_proceed_to_choices` sees `needs_user_input` → Routes to "choice_generation"
7. **Orchestrator**: Checks result, sees `needs_user_input: True` → Returns `"waiting_for_input"` **BEFORE** O1 runs
8. **Frontend**: Displays: "I couldn't identify any specific materials from your input. Could you tell me what you'd like to make?"
9. User responds: "I want to make a lamp from glass bottles"
10. Workflow continues from P1a with new input

## Files Modified
- `backend/app/workflows/phase2_nodes.py`:
  - `goal_formation_node()` (lines 234-258): Handle no ingredients gracefully
  - `should_proceed_to_choices()` (lines 781-798): Check `needs_user_input` flag

## Testing
Test with minimal input: "hello", "test", or any string without material descriptions.
Expected: Clarification question displayed, no infinite loop, no recursion error.

