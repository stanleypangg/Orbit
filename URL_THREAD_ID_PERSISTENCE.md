# URL-Based Thread ID Persistence

## Problem

Chat sessions were not resumable because thread IDs weren't persisted in the URL. Refreshing the page or sharing a link would start a new workflow instead of resuming the existing one.

## Solution

Added URL-based thread ID persistence using Next.js `useSearchParams` and `useRouter`. Each workflow now has a unique, resumable URL like `/poc?thread=recycle_abc123`.

## Implementation

### 1. Frontend Hook: URL Persistence (`frontend/lib/workflow/useWorkflow.ts`)

**Added `initialThreadId` parameter:**

```typescript
interface UseWorkflowOptions {
  apiUrl?: string;
  onPhaseChange?: (phase: string) => void;
  initialThreadId?: string; // NEW: Resume existing workflow from URL
}

export function useWorkflow({
  apiUrl = 'http://localhost:8000',
  onPhaseChange,
  initialThreadId, // NEW: Accept thread ID from URL
}: UseWorkflowOptions = {}): UseWorkflowReturn {
  const [state, setState] = useState<WorkflowState>({
    phase: 'idle',
    threadId: initialThreadId || null, // NEW: Start with URL thread ID if present
    // ...
  });
```

**Auto-resume on mount:**

```typescript
// Line 295-305: Auto-resume workflow if initialThreadId is provided
useEffect(() => {
  if (initialThreadId && !hasConnectedRef.current) {
    hasConnectedRef.current = true;
    setState(prev => ({
      ...prev,
      phase: 'ingredient_discovery',
      isLoading: true,
      loadingMessage: '🔄 Resuming workflow...',
    }));
    connectToStream(initialThreadId); // Reconnect to SSE stream
  }
}, [initialThreadId, connectToStream]);
```

**Update URL on workflow start:**

```typescript
// Line 338-343: After starting workflow, update URL
const data = await response.json();
const threadId = data.thread_id;

// Update URL with thread ID for resumability
if (typeof window !== 'undefined') {
  const url = new URL(window.location.href);
  url.searchParams.set('thread', threadId);
  window.history.pushState({}, '', url);
}
```

### 2. Frontend Page: URL Reading (`frontend/app/poc/page.tsx`)

**Read thread ID from URL:**

```typescript
// Line 7: Import Next.js navigation hooks
import { useRouter, useSearchParams } from "next/navigation";

// Line 70-72: Read thread ID from URL
const router = useRouter();
const searchParams = useSearchParams();
const threadIdFromUrl = searchParams.get('thread');

// Line 74-77: Pass to useWorkflow hook
const { state: workflowState, startWorkflow, resumeWorkflow, selectOption, selectConcept } = useWorkflow({
  apiUrl: 'http://localhost:8000',
  initialThreadId: threadIdFromUrl || undefined, // Resume from URL if present
});
```

## User Flows

### Flow 1: Start New Workflow

```
1. User visits /poc
2. URL: /poc (no thread param)
3. User enters materials: "glass bottles, cord, bulb"
4. startWorkflow() called
5. Backend generates thread_id: "recycle_abc123"
6. URL updated: /poc?thread=recycle_abc123
7. SSE stream connected
8. Workflow proceeds...
```

### Flow 2: Resume from URL

```
1. User visits /poc?thread=recycle_abc123 (bookmark or shared link)
2. useWorkflow() initializes with threadId: "recycle_abc123"
3. Auto-resume effect triggers
4. SSE stream reconnects to existing workflow
5. Backend sends current state via SSE
6. UI updates with current phase (e.g., concept selection)
7. User continues from where they left off
```

### Flow 3: Refresh Page

```
1. User is at /poc?thread=recycle_abc123
2. User refreshes page (F5 or Cmd+R)
3. Page reloads
4. URL preserved: /poc?thread=recycle_abc123
5. Auto-resume triggers
6. Workflow state restored from backend (Redis)
7. User sees current phase
```

### Flow 4: Share Link

```
1. User A at /poc?thread=recycle_abc123 (concept selection phase)
2. User A copies URL
3. User A shares link with User B
4. User B opens /poc?thread=recycle_abc123
5. User B sees User A's workflow at concept selection phase
6. Both users can interact with same workflow
```

## Data Flow

### URL → Frontend → Backend

```
URL: /poc?thread=recycle_abc123
       ↓
searchParams.get('thread')
       ↓
useWorkflow({ initialThreadId: 'recycle_abc123' })
       ↓
setState({ threadId: 'recycle_abc123' })
       ↓
connectToStream('recycle_abc123')
       ↓
SSE: GET /workflow/stream/recycle_abc123
       ↓
Backend retrieves state from Redis
       ↓
Backend streams current state events
       ↓
Frontend updates UI with current phase
```

### Backend State Persistence

The backend already stores workflow state in Redis:

```python
# backend/app/endpoints/workflow/router.py
state_key = f"workflow_state:{thread_id}"
redis_service.set(state_key, json.dumps(state), ex=3600)  # 1 hour TTL

concepts_key = f"concepts:{thread_id}"
redis_service.set(concepts_key, json.dumps(concepts), ex=3600)

ingredients_key = f"ingredients:{thread_id}"
redis_service.set(ingredients_key, json.dumps(ingredients), ex=3600)
```

**No backend changes needed** - state persistence already implemented!

## URL Format

```
/poc?thread=recycle_abc123
      └──┬──┘ └────┬─────┘
    param name   thread ID
```

**Thread ID Format:**
- Prefix: `recycle_` (for workflow type)
- Unique ID: Generated by backend (UUID or timestamp-based)
- Example: `recycle_1696530000_abc123`

## Benefits

### ✅ Resumability
- Refresh page → workflow continues
- Close tab → reopen link → resume

### ✅ Shareability
- Copy URL → share with colleague
- Both see same workflow state

### ✅ Bookmarkability
- Save URL → return later
- Works like any web app

### ✅ Multi-device
- Start on desktop → continue on mobile
- Same URL = same workflow

### ✅ No localStorage
- Uses backend Redis as source of truth
- URL is the only "client-side" persistence

## Edge Cases

### Case 1: Thread ID not found in backend

**Scenario:** User visits `/poc?thread=invalid_id`

**Behavior:**
```typescript
// Backend returns 404 or empty state
// SSE connection fails or sends error event

// Frontend handles:
case 'error':
  setState(prev => ({
    ...prev,
    error: 'Workflow not found. Please start a new one.',
    phase: 'error',
    isLoading: false,
  }));
```

**Resolution:** User sees error message, can start new workflow

### Case 2: Expired thread (TTL exceeded)

**Scenario:** Redis key expired (> 1 hour old)

**Behavior:**
- Backend: 404 on `/workflow/stream/{thread_id}`
- Frontend: Shows error, prompts to start new workflow

**Resolution:** User starts fresh workflow

### Case 3: Concurrent users on same thread

**Scenario:** User A and User B both on `/poc?thread=recycle_abc123`

**Behavior:**
- Both receive SSE updates
- Last selection wins (e.g., if both select different concepts)
- Backend uses single Redis state per thread

**Note:** This is by design - allows collaboration!

### Case 4: User starts new workflow with existing thread in URL

**Scenario:** User at `/poc?thread=old_id`, enters new materials

**Behavior:**
```typescript
// startWorkflow() called
const newThreadId = data.thread_id; // New ID from backend

// URL updated with NEW thread ID
url.searchParams.set('thread', newThreadId); // Replaces old_id
window.history.pushState({}, '', url);
```

**Result:** Old workflow abandoned, new workflow starts, URL updated

## Testing

### Test 1: URL Update on Start

```bash
# Steps:
1. Visit http://localhost:3000/poc
2. Enter materials: "glass bottles"
3. Click Generate

# Expected:
# URL changes to: http://localhost:3000/poc?thread=recycle_...
# Console logs: "Starting workflow for thread: recycle_..."
```

### Test 2: Auto-Resume

```bash
# Steps:
1. Copy URL with thread: http://localhost:3000/poc?thread=recycle_abc123
2. Open in new tab or incognito window

# Expected:
# Page loads showing "🔄 Resuming workflow..."
# SSE reconnects
# UI shows current phase (e.g., concept selection)
# Console logs: "Resuming workflow from URL: recycle_abc123"
```

### Test 3: Refresh Persistence

```bash
# Steps:
1. Start workflow, reach concept selection phase
2. URL: http://localhost:3000/poc?thread=recycle_abc123
3. Press F5 or Cmd+R to refresh

# Expected:
# Page reloads
# URL still has ?thread=recycle_abc123
# Workflow resumes at concept selection
# All 3 concepts displayed
```

### Test 4: Share Link

```bash
# Steps:
1. User A reaches concept selection phase
2. User A copies URL: http://localhost:3000/poc?thread=recycle_abc123
3. User A sends to User B
4. User B opens link

# Expected:
# User B sees same workflow at concept selection
# User B can select a concept
# Selection affects shared workflow state
```

## Implementation Checklist

✅ **Hook Updates:**
- [x] Add `initialThreadId` to `UseWorkflowOptions`
- [x] Initialize state with `threadId: initialThreadId || null`
- [x] Add auto-resume `useEffect` hook
- [x] Update URL in `startWorkflow()`

✅ **Page Updates:**
- [x] Import `useRouter` and `useSearchParams`
- [x] Read `thread` param from URL
- [x] Pass `initialThreadId` to `useWorkflow()`

✅ **Backend (No Changes Needed):**
- [x] State already persisted in Redis
- [x] SSE stream already supports resuming
- [x] Thread IDs already unique and stable

## Future Enhancements

### 1. Explicit Save/Resume Buttons

```typescript
// Add save notification
const SaveNotification = () => (
  <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded">
    ✓ Progress saved! Bookmark this page to resume later.
  </div>
);
```

### 2. Session History

```typescript
// Store recent thread IDs in localStorage
const saveToHistory = (threadId: string) => {
  const history = JSON.parse(localStorage.getItem('workflow_history') || '[]');
  history.unshift({ threadId, timestamp: Date.now() });
  localStorage.setItem('workflow_history', JSON.stringify(history.slice(0, 10)));
};

// Show recent workflows
<RecentWorkflows>
  {history.map(item => (
    <a href={`/poc?thread=${item.threadId}`}>Resume from {formatDate(item.timestamp)}</a>
  ))}
</RecentWorkflows>
```

### 3. Workflow Naming

```typescript
// Allow users to name their workflows
const updateWorkflowName = async (threadId: string, name: string) => {
  await fetch(`${apiUrl}/workflow/${threadId}/name`, {
    method: 'PUT',
    body: JSON.stringify({ name }),
  });
};

// Display in URL or UI
<h1>{workflowName || 'Untitled Workflow'}</h1>
```

### 4. Expiration Warning

```typescript
// Show warning when workflow is about to expire
useEffect(() => {
  if (workflowState.threadId) {
    const checkExpiration = async () => {
      const response = await fetch(`${apiUrl}/workflow/status/${workflowState.threadId}`);
      const { ttl } = await response.json();
      
      if (ttl < 300) { // Less than 5 minutes
        setShowExpirationWarning(true);
      }
    };
    
    const interval = setInterval(checkExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }
}, [workflowState.threadId]);
```

## Summary

✅ **URL-based persistence** - Thread ID in URL query param  
✅ **Auto-resume** - Automatically reconnects on page load  
✅ **Refresh-safe** - Workflow state persists across refreshes  
✅ **Shareable** - Copy URL to share workflow with others  
✅ **No backend changes** - Leverages existing Redis persistence  
✅ **Clean architecture** - URL as single source of "current session"  

Users can now bookmark, share, and resume workflows using the URL! 🔗✨

