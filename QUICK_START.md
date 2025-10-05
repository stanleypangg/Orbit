# Quick Start Guide - Workflow Integration

## Prerequisites

You have two options:

### Option 1: Run Without Redis (Simplest)
- The backend has an in-memory fallback that works without Redis
- **Limitation**: No workflow interrupts/resume (clarification questions won't work perfectly)
- **Good for**: Testing the basic flow

### Option 2: Run With Redis (Full Features)
- Install Redis for full workflow features
- Supports interrupt/resume patterns for clarification questions

## Installation

### Install Redis (Optional but Recommended)

**macOS**:
```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian**:
```bash
sudo apt-get install redis-server
sudo systemctl start redis
```

**Windows**:
- Download from https://redis.io/download
- Or use Docker: `docker run -d -p 6379:6379 redis`

### Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Running the Application

### 1. Start the Backend

```bash
cd backend
uvicorn main:app --reload --port 8000
```

You should see:
```
INFO:     Workflow compiled without checkpointing (standard Redis mode)
INFO:     RecycleWorkflowOrchestrator initialized successfully
INFO:     Application startup complete.
```

### 2. Start the Frontend

```bash
cd frontend
npm run dev
```

### 3. Open the App

Navigate to: http://localhost:3000

Click on the laptop image → You'll be redirected to `/phase-workflow`

### 4. Test the Workflow

1. Enter a prompt like: "I have plastic bottles and aluminum cans"
2. Click "START WORKFLOW"
3. Watch the animation transform to chat mode
4. See ingredients being extracted in real-time via SSE
5. Answer clarification questions if prompted

## Troubleshooting

### SSE Connection Error

**Symptom**: `SSE error: {}` in browser console

**Causes & Fixes**:

1. **Backend not running**
   ```bash
   # Check if running
   curl http://localhost:8000/health
   # Should return: {"status": "healthy"}
   ```

2. **CORS issue**
   - Backend has CORS enabled for all origins
   - Check browser console for CORS errors

3. **Workflow initialization failed**
   ```bash
   # Check backend logs
   cd backend
   tail -f nohup.out  # or check terminal where uvicorn is running
   ```

4. **Redis connection (if using Redis)**
   ```bash
   # Test Redis
   redis-cli ping
   # Should return: PONG
   ```

### No Ingredients Appearing

**Check**:
1. Backend logs show workflow is running:
   ```
   INFO:     Starting workflow background task for recycle_...
   INFO:     Workflow result: {...}
   INFO:     Stored ingredients for recycle_...
   ```

2. Ingredients are in Redis:
   ```bash
   redis-cli keys "ingredients:*"
   redis-cli get "ingredients:recycle_..."
   ```

3. Frontend is connecting to SSE:
   - Open Network tab in browser dev tools
   - Look for `/workflow/stream/{thread_id}` with type `eventsource`
   - Should show status `200` and stay open

### Workflow Errors

**Check backend logs** for detailed error messages:

```bash
cd backend
# Run with verbose logging
LOG_LEVEL=DEBUG uvicorn main:app --reload --port 8000
```

Common errors:
- **Gemini API key not set**: Set `GEMINI_API_KEY` in `.env`
- **Import errors**: Run `pip install -r requirements.txt` again
- **State serialization errors**: Check that all state fields are JSON-serializable

## Environment Variables

Create `/Users/cute/Documents/vsc/HTV/backend/.env`:

```bash
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional
REDIS_URL=redis://localhost:6379/0
WORKFLOW_ENABLE_CHECKPOINTING=false  # Set to true if Redis with RedisJSON
WORKFLOW_ENABLE_INTERRUPTS=false     # Set to true for interrupt/resume
LOG_LEVEL=INFO
```

## Testing Without Redis

If Redis isn't installed, the backend will use an in-memory fallback automatically. You'll see this log:

```
INFO:     Workflow compiled without checkpointing (standard Redis mode)
```

**Limitations without Redis**:
- Workflow resume may not work perfectly
- State persistence across restarts is lost
- Multiple server instances won't share state

**Still works**:
- Basic workflow flow
- Ingredient extraction
- SSE streaming
- Error handling

## Verifying Everything Works

### 1. Backend Health Check

```bash
curl http://localhost:8000/health
# Expected: {"status": "healthy"}

curl http://localhost:8000/workflow/health
# Expected: {"status": "healthy", "redis": "connected", "orchestrator": "initialized"}
```

### 2. Start a Workflow via API

```bash
curl -X POST "http://localhost:8000/workflow/start" \
  -H "Content-Type: application/json" \
  -d '{"user_input": "I have plastic bottles"}'
  
# Expected: {"thread_id": "recycle_...", "status": "started", "message": "Workflow started successfully"}
```

### 3. Stream Workflow Progress

```bash
# Use the thread_id from above
curl -N "http://localhost:8000/workflow/stream/recycle_..."

# Expected: Stream of events like:
# data: {"type": "state_update", "data": {...}}
# data: {"type": "ingredients_update", "data": {...}}
```

### 4. Test Frontend

1. Open http://localhost:3000
2. Click laptop → `/phase-workflow`
3. Enter prompt and click "START WORKFLOW"
4. Check browser console for:
   ```
   Starting workflow...
   SSE connected
   Received event: ingredients_update
   ```

## Next Steps

Once everything is working:

1. **Test clarification flow**: Enter vague prompts to trigger questions
2. **Check phase transitions**: Watch as workflow progresses through phases
3. **Monitor Redis**: Use `redis-cli monitor` to see data flow
4. **Customize prompts**: Edit presets in `/frontend/app/phase-workflow/page.tsx`

## Getting Help

If you encounter issues:

1. Check backend logs (where uvicorn is running)
2. Check browser console (F12 → Console tab)
3. Check browser network tab (F12 → Network → Filter: eventsource)
4. Verify all environment variables are set
5. Ensure ports 3000 and 8000 are not in use by other services

## Production Deployment

For production, you should:

1. **Install Redis properly** with persistence
2. **Enable checkpointing**: Set `WORKFLOW_ENABLE_CHECKPOINTING=true`
3. **Enable interrupts**: Set `WORKFLOW_ENABLE_INTERRUPTS=true`
4. **Set Redis URL**: Point to production Redis instance
5. **Configure logging**: Set appropriate log levels
6. **Use process manager**: PM2, systemd, or Docker
7. **Setup monitoring**: Track workflow success rates and errors

See `backend/PRODUCTION_READY_GUIDE.md` for full production setup.

