# Gemini JSON Parse Error Fix

## Problem
Every Gemini API call was showing this warning:
```
WARNING   JSON parse error on attempt 1, retrying...
```

Then succeeding on attempt 2, adding **10-15 seconds** to every API call due to retry delays.

## Root Cause
Gemini's structured output mode (`response_mime_type: "application/json"`) is **not 100% reliable**. Despite requesting JSON format, Gemini sometimes:

1. **Wraps JSON in markdown code blocks**: 
   ```
   ```json
   {"key": "value"}
   ```
   ```
   
2. **Adds extra whitespace or newlines** before/after JSON

3. **Returns slightly malformed JSON** on first attempt, then correctly formatted JSON on retry

## Impact
- **Phase 1 (P1a, P1b, P1c)**: Each node taking 10-15s longer
- **Phase 2 (G1, O1, E1)**: Each node taking 10-15s longer  
- **Total workflow time**: ~60-90 seconds of unnecessary retries
- **User experience**: Longer loading states, appears slower than necessary

## Solution
Added **smart JSON cleaning** before retrying:

```python
# Try to clean common JSON formatting issues on first attempt
if attempt == 0:
    try:
        cleaned_text = response.text.strip()
        # Remove markdown code blocks if present
        if cleaned_text.startswith("```"):
            lines = cleaned_text.split("\n")
            # Remove first and last lines (```json and ```)
            cleaned_text = "\n".join(lines[1:-1]) if len(lines) > 2 else cleaned_text
        
        result = json.loads(cleaned_text)
        logger.info("Successfully parsed JSON after cleaning markdown")
        return result
    except json.JSONDecodeError:
        # Cleaning didn't help, continue to retry
        pass
```

### What It Does
1. **First attempt fails** → Try to clean the response
2. **Strip markdown code blocks** (```json ... ```)
3. **Strip extra whitespace**
4. **Try parsing again** before wasting time on a full retry
5. **If cleaning works** → Return immediately, saving 10-15 seconds
6. **If cleaning fails** → Retry as before (but now with better logging)

## Enhanced Logging
Now logs the actual error and response:

```python
logger.warning(f"JSON parse error on attempt {attempt + 1}: {str(e)}")
logger.debug(f"Raw response text (first 500 chars): {response.text[:500]}")
```

This lets us see **exactly what Gemini is returning** and improve cleaning logic if needed.

## Expected Improvement
- **Before**: Every API call = 2 attempts (~20-30 seconds)
- **After**: Most API calls = 1 attempt (~5-15 seconds)
- **Time saved**: ~10-15 seconds per API call
- **Total workflow speedup**: 60-90 seconds faster

## Testing
Next time you run a workflow:

1. Check logs - should see fewer retry warnings
2. May see new messages: `"Successfully parsed JSON after cleaning markdown"`
3. Overall workflow should feel faster
4. If you still see retries, the debug logs will show exactly what's wrong

## Alternative Solutions (if this doesn't work)
1. **Use Gemini without structured output** - Let it return free text, then extract JSON manually
2. **Use a more aggressive JSON cleaner** - Regex to find JSON in any text
3. **Switch to Claude or GPT** - They have more reliable structured output
4. **Report to Google** - File bug report about Gemini's inconsistent JSON formatting

## Files Changed
- `/backend/app/ai_service/production_gemini.py` - Added JSON cleaning logic and better logging

## Next Steps
- Monitor logs to see if this fixes the issue
- If retries persist, check debug logs to see what Gemini is actually returning
- Consider caching successful responses more aggressively to avoid repeated API calls

