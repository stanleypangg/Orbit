# ⚠️ DEPRECATED: Chat Endpoint

## Status: **REPLACED BY WORKFLOW API**

This chat endpoint (`/api/chat`) is **deprecated** and no longer used by the main application.

## Replacement

Use the workflow API instead:
- `/workflow/start` - Start new workflow
- `/workflow/stream/{thread_id}` - SSE stream
- `/workflow/resume/{thread_id}` - Resume with clarification

## Why Deprecated

### Old Approach (Chat)
- **Stateless**: No workflow orchestration
- **Simple**: Just streams Gemini responses
- **Limited**: No interrupt/resume patterns
- **No structure**: Free-form conversation

### New Approach (Workflow)
- **Stateful**: Full LangGraph orchestration with Redis
- **Deterministic**: 13-node workflow (P1a → P1b → ... → H1)
- **Progressive**: Interrupt/resume for user clarifications
- **Structured**: Type-safe state with Pydantic models

## What This Endpoint Does

**File**: `backend/app/endpoints/chat/router.py`

- Streams Gemini API responses via SSE
- Simple conversational chat interface
- No state management or workflow logic
- Used by old `/poc` page (also deprecated)

## Current Usage

**None**. The main application now uses:
- `/phase-workflow` page (frontend)
- `/workflow/*` endpoints (backend)

## Can It Be Deleted?

**Options**:

### Option 1: Keep for Backward Compatibility
- Might be used by other tools/tests
- Simple Gemini streaming still useful for debugging
- Low maintenance overhead

### Option 2: Delete
- Clean up codebase
- Remove confusion
- Reduce API surface area

### Option 3: Repurpose
- Use for simple chatbot features
- Admin console interaction
- Quick testing interface

## Recommendation

**KEEP** for now as it's a simple, standalone endpoint that:
1. Doesn't interfere with workflow API
2. Useful for testing Gemini connectivity
3. Could be used for simple chat features later
4. Well-implemented with proper error handling

---

**TL;DR**: This endpoint works fine but is replaced by the more powerful workflow API. Safe to keep for backward compatibility or delete if you want to simplify.

