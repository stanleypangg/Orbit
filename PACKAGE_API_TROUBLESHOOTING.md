# Package API "Failed to fetch" Troubleshooting

## Error
```
Failed to fetch
  at ProductDetail.useEffect.fetchPackageData (app/product/page.tsx:106:32)
```

## Root Causes & Solutions

### 1. Backend Not Running ❌

**Check:**
```bash
# Is the backend running?
curl http://localhost:8000/health
```

**Solution:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

### 2. Wrong Port Number ❌

**Check:**
The frontend is trying to connect to `http://localhost:8000` but your backend might be on a different port.

**Solution:**
Update `.env.local` in frontend:
```env
NEXT_PUBLIC_API_URL=http://localhost:YOUR_PORT
```

### 3. CORS Issue ❌

**Check:**
Open browser console → Network tab → Look for CORS errors

**Solution:**
Backend already has CORS enabled in `main.py`, but verify:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Should allow localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 4. Package Data Not Generated Yet ⚠️

**Check:**
```bash
# Check if package exists in Redis
redis-cli
> GET final_package:YOUR_THREAD_ID
> GET package_essential:YOUR_THREAD_ID
```

**Solution:**
This is expected behavior! The package API returns 404 if:
- User navigates to `/product` directly without going through workflow
- Phase 4 hasn't completed yet
- Thread ID is invalid

The page will use **fallback data** (demo data) in this case.

### 5. Endpoint Path Mismatch ❌

**Check:**
Verify the endpoint exists:
```bash
curl http://localhost:8000/api/package/package/test123
```

**Expected Response:**
- `200 OK` with package data (if exists)
- `404 Not Found` with error message (if doesn't exist)
- **NOT** connection refused or CORS error

**Endpoint Structure:**
```
Main app: /api/package (prefix in main.py)
Router: /package/{thread_id} (in package.py)
Full URL: /api/package/package/{thread_id} ✅
```

## Quick Diagnosis Script

Run this to check everything:

```bash
#!/bin/bash

echo "=== Backend Health Check ==="
curl -s http://localhost:8000/health || echo "❌ Backend not responding"

echo -e "\n=== Package Endpoint Test ==="
curl -s http://localhost:8000/api/package/package/test123 || echo "❌ Endpoint not responding"

echo -e "\n=== Redis Check ==="
redis-cli ping || echo "❌ Redis not running"

echo -e "\n=== Frontend Env ==="
cat frontend/.env.local 2>/dev/null || echo "⚠️ No .env.local found (using defaults)"
```

## Current Fix Applied

Added better error handling in `frontend/app/product/page.tsx`:

1. **Logs the full URL** being fetched for debugging
2. **Handles 404 gracefully** (package not ready yet)
3. **Doesn't crash** if backend is unavailable
4. **Uses fallback data** if API fails

This means the product page will work even if:
- Backend is not running (demo mode)
- Package hasn't been generated yet
- Thread ID is invalid

## Expected Console Output

### When Backend Running + Package Exists:
```
[Product Page] Fetching package from: http://localhost:8000/api/package/package/recycle_abc123
[Product Page] ✓ Loaded package data: {executive_summary: {...}, ...}
```

### When Backend Running + Package Not Ready:
```
[Product Page] Fetching package from: http://localhost:8000/api/package/package/recycle_abc123
[Product Page] Package not ready yet (404), using fallback
```

### When Backend Not Running:
```
[Product Page] Fetching package from: http://localhost:8000/api/package/package/recycle_abc123
[Product Page] Error loading package data: TypeError: Failed to fetch
(Page uses fallback data)
```

## Verification Steps

1. **Start Backend:**
   ```bash
   cd backend
   uvicorn main:app --reload --port 8000
   ```

2. **Verify Health:**
   ```bash
   curl http://localhost:8000/health
   # Should return: {"status":"healthy"}
   ```

3. **Test Package Endpoint:**
   ```bash
   curl http://localhost:8000/api/package/package/test123
   # Should return: 404 with {"detail":"No package data found..."}
   ```

4. **Run Full Workflow:**
   - Start frontend: `npm run dev`
   - Go through workflow: `/poc`
   - Select concept → Magic Pencil
   - Continue to Product page
   - Product page should fetch real data

5. **Check Console:**
   - Should see: `[Product Page] ✓ Loaded package data:`
   - Should NOT see: `Failed to fetch`

## Still Having Issues?

If the error persists after verification:

1. **Check Network Tab:**
   - Open DevTools → Network
   - Look for the `/api/package/package/...` request
   - Check the response status and error

2. **Check Backend Logs:**
   ```bash
   # Look for errors in backend terminal
   tail -f backend/uvicorn.log
   ```

3. **Verify Redis:**
   ```bash
   redis-cli
   > KEYS final_package:*
   > KEYS package_essential:*
   ```

4. **Test Direct API Call:**
   ```bash
   # With real thread_id from workflow
   curl http://localhost:8000/api/package/package/YOUR_THREAD_ID
   ```

## Status

✅ **Error handling improved** - Page now gracefully falls back to demo data
⚠️ **Need to verify** - Backend is running and accessible
📝 **Note** - 404 errors are expected if package hasn't been generated yet

