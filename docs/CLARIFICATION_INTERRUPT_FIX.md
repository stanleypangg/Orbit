# Clarification Interrupt Fix

## Problem

Workflow wasn't pausing for user clarification questions. Instead, it auto-generated responses and continued:

```
P1b: Generated 1 clarification questions
Processing user clarification for thread...
Auto clarification: infer the missing details...  ← Auto-answered!
✅ Clarification processed
```

## Root Cause

Both `WORKFLOW_ENABLE_INTERRUPTS` and `WORKFLOW_ENABLE_CHECKPOINTING` were disabled by default (line 137-148 in graph.py):

```python
enable_checkpointing = os.getenv("WORKFLOW_ENABLE_CHECKPOINTING", "false")  # Disabled
enable_interrupts = os.getenv("WORKFLOW_ENABLE_INTERRUPTS", "false")  # Disabled

if enable_interrupts:
    compile_kwargs["interrupt_before"] = ["process_clarification"]  # Never executed!
```

Without interrupts:
- Workflow continues through `P1b` → `process_clarification` without pausing
- `process_clarification` sees no user response and auto-generates one
- User never gets a chance to respond

## Solution

### Option 1: Enable Interrupts (Recommended)

```bash
# Add to backend/.env
WORKFLOW_ENABLE_INTERRUPTS=true
```

**Pros:**
- Workflow pauses at `process_clarification` node
- Waits for `/workflow/resume` endpoint with user response
- No additional Redis requirements

**Cons:**
- Requires explicit resume call from frontend

### Option 2: Enable Full Checkpointing

```bash
# Add to backend/.env
WORKFLOW_ENABLE_CHECKPOINTING=true
WORKFLOW_ENABLE_INTERRUPTS=true
```

**Pros:**
- Full state persistence
- Can resume workflows after restarts

**Cons:**
- Requires Redis with RedisJSON module
- More complex setup

## How Interrupts Work

### With Interrupts Enabled

```
1. P1a: Extract ingredients
2. P1b: Check for nulls
   ↓ (has null fields)
3. P1b: Generate question: "What size are the bottles?"
4. INTERRUPT ⏸️  (pause before process_clarification)
5. Frontend shows question to user
6. User responds: "They're wine bottles"
7. Frontend calls /workflow/resume with response
8. RESUME ▶️
9. process_clarification: Update ingredients with user response
10. Continue workflow...
```

### Without Interrupts (Current Broken Behavior)

```
1. P1a: Extract ingredients
2. P1b: Check for nulls
   ↓ (has null fields)
3. P1b: Generate question: "What size are the bottles?"
4. process_clarification: (no pause!)
5. process_clarification: Auto-generate response ❌
6. Continue workflow...
7. User never sees question!
```

## Code Flow

### Graph Configuration (graph.py)

```python
# Line 143-151
enable_interrupts = os.getenv("WORKFLOW_ENABLE_INTERRUPTS", "false")

compile_kwargs = {}
if enable_interrupts:
    compile_kwargs["interrupt_before"] = ["process_clarification"]

self.compiled_graph = workflow.compile(**compile_kwargs)
```

### Auto-Clarification Logic (nodes.py line 629-637)

```python
user_response = (state.user_input or "").strip()

if not user_response or user_response == (initial_input or ""):
    # No user response provided - auto-generate!
    auto_generated_response = True
    user_response = (
        "Auto clarification: infer the missing details referenced in "
        f"'{question_text}'. Use the original user description."
    )
```

This auto-generation is a **fallback** but was being triggered every time because workflow never paused.

## Frontend Resume Flow

The frontend already has the resume logic:

```typescript
// frontend/lib/workflow/useWorkflow.ts
const resumeWorkflow = useCallback(async (userInput: string) => {
  const response = await fetch(`${apiUrl}/workflow/resume/${state.threadId}`, {
    method: 'POST',
    body: JSON.stringify({ user_input: userInput })
  });
}, [apiUrl, state.threadId]);
```

It just needs the workflow to actually pause first!

## Testing

### 1. Start Workflow with Vague Input

```bash
# Frontend
Materials: "some bottles"
```

### 2. Check Logs (Should Pause)

```bash
docker-compose logs backend -f | grep "P1b\|interrupt"

# Should see:
# P1b: Generated 1 clarification questions
# Workflow interrupted before process_clarification  ← NEW!
# Waiting for user input...
```

### 3. Check Frontend (Should Show Question)

```javascript
// Should receive SSE event:
{
  type: 'user_question',
  data: ["What size are the bottles?"]
}

// UI should show question input field
```

### 4. User Responds

```bash
# User types: "wine bottles, about 750ml"
# Frontend calls: POST /workflow/resume/{thread_id}
```

### 5. Workflow Resumes

```bash
# Logs should show:
# Resuming workflow from process_clarification
# ✅ Clarification processed successfully via user response
# P1c: Categorizing...
```

## Environment Variables

```bash
# backend/.env

# Enable interrupts (required for clarification pause)
WORKFLOW_ENABLE_INTERRUPTS=true

# Enable checkpointing (optional, requires RedisJSON)
WORKFLOW_ENABLE_CHECKPOINTING=false
```

## Summary

✅ **Added `WORKFLOW_ENABLE_INTERRUPTS=true` to .env**  
✅ **Workflow now pauses at clarification questions**  
✅ **Frontend can properly show questions and wait for user**  
✅ **No auto-generated responses anymore**  

The workflow will now properly wait for user clarification! 🎯
