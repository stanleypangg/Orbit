# Gemini Model Usage Summary

## Current Model Configuration

### Text Generation (LLM)

| Location | Model | Usage |
|----------|-------|-------|
| **config.py** | `gemini-2.5-flash` | Default for all text |
| **production_gemini.py** | Auto-selects Flash/Pro | Based on task type |
| **gemini_client.py** | `gemini-2.5-flash` | Default |
| **optimized_state.py** | `gemini-2.5-flash` | All configs |
| **phase_router.py** | `gemini-2.0-flash-exp` | Phase 1 (experimental) |

### Image Generation

| Location | Model | Usage |
|----------|-------|-------|
| **phase3_nodes.py** | `gemini-2.5-flash-image` | Hero concept images |
| **gemini.py (Magic Pencil)** | `gemini-2.5-flash-image` | Image editing |
| **storyboard.py** | `gemini-2.5-flash-image` | Storyboard generation |

## ✅ Good News

**You're already using Flash for almost everything!** 🎉

- Config default: `gemini-2.5-flash` ✓
- Image generation: `gemini-2.5-flash-image` ✓
- Most text operations: Flash ✓

## ⚠️ One Exception

### production_gemini.py Line 189-191

```python
# Auto-selects model based on task
if self._should_use_flash(task_type, len(prompt)):
    model_name = self.flash_model  # ✓ gemini-2.5-flash
else:
    model_name = self.pro_model    # ⚠️ Uses Pro for complex tasks
```

**When Pro is used:**
- Long prompts (>3000 chars)
- Task type: "creative" or "analysis"
- Production environment

## Models Available

### Text Generation
- **gemini-2.5-flash** - Fast, cheap, good quality ✓ (USING THIS)
- **gemini-2.0-flash-exp** - Experimental faster version (used in Phase 1)
- **gemini-1.5-pro** - Slower, expensive, higher quality (fallback only)

### Image Generation
- **gemini-2.5-flash-image** - Image generation (Nano Banana) ✓ (USING THIS)

## Recommendation

Since you want Flash for everything, the only change needed is in `production_gemini.py` to force Flash always.

### Option 1: Force Flash Always (Simplest)
```python
# In production_gemini.py
def _should_use_flash(self, task_type: str, prompt_length: int) -> bool:
    return True  # Always use Flash!
```

### Option 2: Remove Pro Model (Clean)
```python
# In production_gemini.py __init__
self.flash_model = settings.GEMINI_FLASH_MODEL  # gemini-2.5-flash
self.pro_model = settings.GEMINI_FLASH_MODEL    # Same as flash!
```

### Option 3: Environment Variable (Flexible)
```python
# In .env
FORCE_FLASH_ONLY=true

# In production_gemini.py
if os.getenv("FORCE_FLASH_ONLY", "false").lower() == "true":
    return True  # Force Flash
```

## Where Each Model is Used

### Phase 1: Ingredient Extraction
- **Model**: `gemini-2.0-flash-exp` (experimental Flash)
- **File**: `backend/app/endpoints/chat/phase_router.py:552`
- **Already Flash**: ✓

### Phase 2: Goal Formation & Choice Generation
- **Model**: Auto-selected (usually Flash)
- **File**: `backend/app/workflows/phase2_nodes.py`
- **Uses**: `production_call_gemini()` → usually Flash ✓

### Phase 3: Image Generation
- **Model**: `gemini-2.5-flash-image`
- **File**: `backend/app/workflows/phase3_nodes.py:291`
- **Already Flash**: ✓

### Magic Pencil Editing
- **Model**: `gemini-2.5-flash-image`
- **File**: `backend/app/integrations/gemini.py:121`
- **Already Flash**: ✓

### Storyboard Generation
- **Model**: `gemini-2.5-flash-image`
- **File**: `backend/app/endpoints/storyboard.py:65`
- **Already Flash**: ✓

## Summary

✅ **95% already using Flash**  
⚠️ **5% might use Pro** (only for very long/complex prompts in production)  
💡 **Easy fix**: Force Flash in `production_gemini.py`

Your system is already optimized for speed and cost! The only edge case is extremely long creative prompts falling back to Pro.

