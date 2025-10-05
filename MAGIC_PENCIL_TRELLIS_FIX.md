# Magic Pencil → Trellis Image Selection Fix

## Issue

The Magic Pencil page had a bug where the "Generate 3D Now" button always used the **original hero image** instead of checking if the user had made edits to the canvas.

### Problem Scenarios

**Before Fix:**
1. User selects concept → gets original image
2. User draws/edits in Magic Pencil
3. User clicks "Generate 3D Now" → ❌ **Uses original image, ignoring edits!**

This meant any user edits were lost when generating the 3D model immediately.

## Solution

Updated `handleGenerate3D()` to prioritize the **current canvas state** over the original image.

### File Modified

**`frontend/app/poc/magic-pencil/page.tsx`**

### Changes

#### 1. Updated `handleGenerate3D` Function

**Before:**
```typescript
const handleGenerate3D = async () => {
  // Always used uploadedImage (original)
  let processedImageUrl = uploadedImage;
  
  // Send to Trellis...
  localStorage.setItem("productImage", uploadedImage);
}
```

**After:**
```typescript
const handleGenerate3D = async () => {
  // Check if canvas exists (with potential edits)
  const canvas = canvasRef.current;
  let processedImageUrl: string;
  
  if (canvas) {
    // Use current canvas (includes edits if any)
    processedImageUrl = canvas.toDataURL("image/png");
    console.log("[Trellis] Using current canvas state (may include edits)");
  } else {
    // Fallback to original
    processedImageUrl = uploadedImage;
    console.log("[Trellis] Using original image (no canvas)");
  }
  
  // Send to Trellis...
  const finalImage = canvas ? canvas.toDataURL("image/png") : uploadedImage;
  localStorage.setItem("productImage", finalImage);
}
```

#### 2. Updated "Continue" Button

Also ensured the "Continue" button includes `threadId` for proper Trellis queue tracking.

**Before:**
```typescript
onClick={() => {
  const canvasDataUrl = canvas.toDataURL("image/png");
  localStorage.setItem("productImage", canvasDataUrl);
  window.location.href = "/product";
}}
```

**After:**
```typescript
onClick={() => {
  const canvasDataUrl = canvas.toDataURL("image/png");
  localStorage.setItem("productImage", canvasDataUrl);
  
  // Include threadId for Trellis polling
  const params = new URLSearchParams();
  if (threadId) params.set('thread', threadId);
  window.location.href = `/product?${params.toString()}`;
}}
```

## Behavior After Fix

### Scenario 1: User Makes Edits + Generate 3D Now
1. User selects concept → original image loaded
2. User draws/edits → canvas updated
3. User clicks "Generate 3D Now" → ✅ **Uses edited canvas**
4. Trellis generates 3D from **edited image**
5. Product page shows **edited image + 3D model**

### Scenario 2: User Doesn't Edit + Generate 3D Now
1. User selects concept → original image loaded
2. User does NOT draw/edit → canvas contains original
3. User clicks "Generate 3D Now" → ✅ **Uses canvas (which is original)**
4. Trellis generates 3D from **original image**
5. Product page shows **original image + 3D model**

### Scenario 3: User Makes Edits + Continue
1. User selects concept → original image loaded
2. User draws/edits → canvas updated
3. User clicks "Continue" → ✅ **Uses edited canvas**
4. Product page shows **edited image**
5. Product page polls for Trellis status (if queued in background)

### Scenario 4: User Uses Magic Pencil AI Generation
1. User draws mask + enters prompt
2. Clicks "Generate" → AI generates new image
3. New image replaces canvas content
4. User clicks any button → ✅ **Uses AI-generated image**

## Logic Flow

```
┌─────────────────────────────────┐
│ User in Magic Pencil            │
└────────────┬────────────────────┘
             │
             ├─ User makes edits?
             │  ├─ YES → Canvas has edits
             │  └─ NO → Canvas has original
             │
             ├─ "Generate 3D Now"
             │  └─ Uses canvas.toDataURL()
             │     (edited OR original)
             │
             ├─ "Generate" (AI edit)
             │  └─ Canvas updated with AI result
             │     Then uses canvas.toDataURL()
             │
             └─ "Continue"
                └─ Uses canvas.toDataURL()
                   (edited OR original)
```

## Key Principle

**Always use the current canvas state**, which represents:
- Original image (if no edits)
- User-drawn edits (if manual edits made)
- AI-generated result (if Magic Pencil AI used)

This ensures **whatever the user sees is what gets sent to Trellis and the product page**.

## Testing

### Manual Test Steps

1. **Test Edited Image:**
   - Select concept
   - Draw something on canvas
   - Click "Generate 3D Now"
   - Verify: Product page shows edited image
   - Verify: Console shows "[Trellis] Using current canvas state (may include edits)"

2. **Test Original Image (No Edits):**
   - Select concept
   - Do NOT draw anything
   - Click "Generate 3D Now"
   - Verify: Product page shows original image
   - Verify: Console shows "[Trellis] Using current canvas state (may include edits)"

3. **Test AI Generation:**
   - Select concept
   - Draw mask + enter prompt
   - Click "Generate" (AI edit)
   - Click "Generate 3D Now"
   - Verify: Product page shows AI-generated image

4. **Test Continue Button:**
   - Select concept
   - Make edits
   - Click "Continue"
   - Verify: Product page shows edited image
   - Verify: URL includes `?thread={threadId}`

## Related Files

- `frontend/app/poc/magic-pencil/page.tsx` - Updated ✅
- `frontend/app/product/page.tsx` - No changes needed (already reads from localStorage correctly)
- `backend/app/endpoints/trellis/router.py` - No changes needed (receives data URL)

## Status

✅ **COMPLETE and TESTED**

---

**Summary**: Magic Pencil now correctly uses the current canvas state (with or without edits) when sending images to Trellis, instead of always using the original hero image.

