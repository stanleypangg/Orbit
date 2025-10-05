# Thread ID URL Removal

## Changes Made

All thread ID URL persistence code has been completely removed from the codebase.

### Files Modified

#### 1. `frontend/lib/workflow/useWorkflow.ts`

**Removed:**
- `initialThreadId` parameter from `UseWorkflowOptions` interface
- `initialThreadId` parameter from `useWorkflow` function
- `hasConnectedRef` useRef hook
- Auto-resume `useEffect` that connected to streams based on URL
- URL manipulation in error handlers (clearing `thread` query param)
- Initial state setting with `initialThreadId`

**Behavior Now:**
- Hook starts fresh every time
- No automatic workflow resumption from URL
- Simpler error handling without URL cleanup

#### 2. `frontend/app/poc/page.tsx`

**Removed:**
- `useRouter` and `useSearchParams` imports
- `router`, `searchParams`, `threadIdFromUrl` declarations
- `initialThreadId` prop passed to `useWorkflow`

**Behavior Now:**
- Page starts fresh workflow each time
- No URL query parameter reading for thread resumption
- Still passes `threadId` to Magic Pencil (for navigation params, not persistence)

#### 3. `frontend/app/poc/magic-pencil/page.tsx`

**Added:**
- Suspense boundary wrapper to fix prerender error
- Separated `MagicPencilContent` component that uses `useSearchParams`
- Wrapper `MagicPencilPage` component with Suspense

**Note:** This page still legitimately uses `useSearchParams` for:
- `imageUrl` - the hero image to edit
- `title` - project title
- `threadId` - for backend API calls
- `conceptId` - for backend API calls

These are **not** for URL persistence of workflow state, but for passing navigation parameters from the concept selection page.

### What Was Removed

```typescript
// ❌ REMOVED: URL-based thread persistence
const searchParams = useSearchParams();
const threadIdFromUrl = searchParams.get('thread');

const { state, ... } = useWorkflow({
  initialThreadId: threadIdFromUrl || undefined
});

// ❌ REMOVED: Auto-resume from URL
useEffect(() => {
  if (initialThreadId && !hasConnectedRef.current) {
    connectToStream(initialThreadId);
  }
}, [initialThreadId]);

// ❌ REMOVED: URL cleanup in errors
if (typeof window !== 'undefined') {
  const url = new URL(window.location.href);
  url.searchParams.delete('thread');
  window.history.replaceState({}, '', url);
}
```

### What Remains (Legitimate Use)

```typescript
// ✅ KEPT: Navigation params for Magic Pencil
const params = new URLSearchParams({
  imageUrl: selectedConcept.image_url,
  title: selectedConcept.title,
  threadId: workflowState.threadId || '',
  conceptId: conceptId
});
window.location.href = `/poc/magic-pencil?${params.toString()}`;
```

This is **navigation data**, not persistence. The Magic Pencil page needs these params to:
1. Display the correct hero image
2. Show the project title
3. Make backend API calls with the correct thread/concept IDs

## Build Status

✅ Frontend builds successfully:
```bash
cd frontend && npm run build
# ✓ Compiled successfully in 4.4s
# ✓ Generating static pages (10/10)
```

## Testing

### Before (Broken)
- SSE error referencing removed code
- TypeScript errors about `initialThreadId`
- Prerender errors on magic-pencil page

### After (Fixed)
- ✅ No console errors
- ✅ Clean TypeScript compilation
- ✅ Successful static page generation
- ✅ No URL-based thread persistence
- ✅ Fresh workflow starts each time

## Why This Was Removed

Per user request: "remember i told you to get rid of all thread url stuff"

The thread ID URL persistence was causing:
1. Console errors when resuming invalid/expired threads
2. Complexity in error handling
3. Confusion about when workflows auto-resume
4. User preference for fresh starts

## Summary

All thread ID URL persistence has been removed. Workflows now start fresh each time the user visits the page. The Magic Pencil page still accepts navigation parameters (image, title, IDs) but these are for display and API calls, not for persisting or resuming workflow state.
