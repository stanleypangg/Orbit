# Thread URL Complete Removal

## Problem
The URL was still showing `?thread=recycle_587a49e069ca` even after previous removal attempts.

## Root Cause
**Lines 338-343** in `frontend/lib/workflow/useWorkflow.ts` were still updating the URL with thread ID:

```typescript
// Update URL with thread ID for resumability
if (typeof window !== 'undefined') {
  const url = new URL(window.location.href);
  url.searchParams.set('thread', threadId);
  window.history.pushState({}, '', url);
}
```

This code was executed in the `startWorkflow` callback after receiving the thread ID from the backend.

## Solution

Removed lines 338-343 from `useWorkflow.ts`:

**Before:**
```typescript
setState(prev => ({
  ...prev,
  threadId,
  phase: 'ingredient_discovery',
  isLoading: true,
  loadingMessage: '🔍 Analyzing your materials...',
}));

// Update URL with thread ID for resumability  ← REMOVED
if (typeof window !== 'undefined') {             ← REMOVED
  const url = new URL(window.location.href);     ← REMOVED
  url.searchParams.set('thread', threadId);      ← REMOVED
  window.history.pushState({}, '', url);         ← REMOVED
}                                                 ← REMOVED

// Connect to SSE stream
connectToStream(threadId);
```

**After:**
```typescript
setState(prev => ({
  ...prev,
  threadId,
  phase: 'ingredient_discovery',
  isLoading: true,
  loadingMessage: '🔍 Analyzing your materials...',
}));

// Connect to SSE stream
connectToStream(threadId);
```

## Verification

```bash
# Check for any remaining URL manipulation
grep -r "url.searchParams.set\|window.history.pushState" frontend/
# Result: No matches (except in Magic Pencil navigation params)
```

## What Remains

- ✅ `threadId` is still tracked internally in state (needed for API calls)
- ✅ Magic Pencil navigation params (legitimate use case)
- ❌ NO thread ID in URL on main `/poc` page
- ❌ NO auto-resume from URL
- ❌ NO URL history manipulation

## Summary

All thread ID URL persistence has been completely removed. The URL will stay clean as `/poc` without any thread query parameters. The workflow still tracks thread IDs internally for backend API communication, but never exposes them in the browser URL.
