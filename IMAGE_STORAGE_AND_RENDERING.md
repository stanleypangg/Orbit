# Image Storage and Chat Card Rendering - Complete Guide

## Image Storage (Current Implementation)

### ⚠️ Important: Images Are NOT Stored as Files

Currently, **actual image files are NOT stored anywhere**. Here's what's actually happening:

### What IS Stored: Metadata in Redis

**Location:** Redis in-memory database

**Storage Key:** `image:{image_id}`

**Example:**
```json
{
  "thread_id": "recycle_abc123",
  "style": "minimalist",
  "title": "The Bottle Beacon",
  "prompt": "Hero product photography of The Bottle Beacon...",
  "quality": "hero",
  "status": "placeholder",
  "generated_at": 1234567890
}
```

**Code:** `backend/app/workflows/phase3_nodes.py` lines 293-309
```python
image_key = f"image:{variant.image_id}"
image_metadata = {
    "thread_id": state.thread_id,
    "style": variant.style,
    "title": title,
    "prompt": variant.image_prompt,
    "quality": "hero",
    "status": "placeholder"
}
redis_service.set(image_key, json.dumps(image_metadata), ex=7200)
```

### What IS NOT Stored

❌ No PNG/JPG files on disk  
❌ No image data in database  
❌ No S3/cloud storage  
❌ No base64 image data (yet)

## Image Generation & Serving Flow

### 1. Backend Creates Image ID

**File:** `backend/app/workflows/phase3_nodes.py`

```python
# Line 290
variant.image_id = f"hero_{state.thread_id}_{variant.style}_{int(time.time())}"
# Example: "hero_recycle_abc123_minimalist_1234567890"
```

### 2. Backend Creates Image URL

**File:** `backend/app/workflows/phase3_nodes.py` line 317

```python
image_url = f"{API_BASE_URL}/images/{variant.image_id}"
# Example: "http://localhost:8000/images/hero_recycle_abc123_minimalist_1234567890"
```

### 3. Backend Sends to Frontend

**File:** `backend/app/endpoints/workflow/router.py` line 174

```python
concepts_key = f"concepts:{thread_id}"
concepts = {
    "concepts": [
        {
            "concept_id": "concept_0",
            "title": "The Bottle Beacon",
            "image_url": "http://localhost:8000/images/hero_...",
            "style": "minimalist",
            "description": "..."
        }
    ]
}
redis_service.set(concepts_key, json.dumps(concepts), ex=3600)

# Stream to frontend
yield f"data: {json.dumps({'type': 'concepts_generated', 'data': concepts})}\n\n"
```

### 4. Frontend Renders Image Tag

**File:** `frontend/app/poc/page.tsx` line 556

```tsx
<img 
  src={concept.image_url}  // "http://localhost:8000/images/hero_..."
  alt={concept.title} 
  className="w-full h-full object-cover" 
/>
```

### 5. Browser Requests Image

```
Browser → GET http://localhost:8000/images/hero_recycle_abc123_minimalist_1234567890
```

### 6. Backend Serves Image (On-the-Fly)

**File:** `backend/app/endpoints/images.py` lines 101-136

```python
@router.get("/{image_id}")
async def get_image(image_id: str):
    # Get metadata from Redis
    image_key = f"image:{image_id}"
    image_data = json.loads(redis_service.get(image_key))
    
    # Check if we have real image data
    if image_data.get("base64_data"):
        # Serve real AI-generated image
        return Response(content=base64.b64decode(image_data["base64_data"]))
    
    elif image_data.get("url"):
        # Redirect to external URL
        return RedirectResponse(url=image_data["url"])
    
    else:
        # Generate placeholder image on-the-fly using Pillow
        style = image_data.get("style")
        title = image_data.get("title")
        img_bytes = create_placeholder_image(style, title)
        return StreamingResponse(img_bytes, media_type="image/png")
```

### 7. Placeholder Generation (Current)

**File:** `backend/app/endpoints/images.py` lines 21-98

Uses Python Pillow library to generate styled PNG on-the-fly:

```python
def create_placeholder_image(style: str, title: str):
    # Create 512x512 image
    img = Image.new('RGB', (512, 512), background_color)
    draw = ImageDraw.Draw(img)
    
    # Add style-specific decorations
    # - Minimalist: Simple lines
    # - Decorative: Circles and patterns
    # - Functional: Grid pattern
    
    # Add title text
    # Add style label
    
    # Return as PNG bytes
    return img_byte_arr
```

## Chat Card Rendering

### Location: `frontend/app/poc/page.tsx`

### Message Structure

```typescript
interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  projectOptions?: WorkflowOption[];  // Phase 2 options
  concepts?: WorkflowConcept[];       // Phase 3 concepts with images
}
```

### Project Options Cards (Phase 2)

**Rendered at:** Lines 489-541

```tsx
{message.projectOptions && message.projectOptions.length > 0 && (
  <div className="mt-4">
    <div className="grid grid-cols-1 gap-3">
      {message.projectOptions.map((option) => (
        <div
          key={option.option_id}
          onClick={() => handleOptionSelect(option.option_id)}
          className="bg-[#1a2030] border-[0.5px] border-[#3a4560] 
                     hover:border-[#4ade80] rounded-lg p-4 
                     cursor-pointer transition-all hover:scale-[1.02]"
        >
          <h3 className="text-white font-semibold text-base">
            {option.title}
          </h3>
          
          {option.tagline && (
            <p className="text-gray-300 text-sm mt-1 italic">
              {option.tagline}
            </p>
          )}
          
          <p className="text-gray-400 text-sm mt-2">
            {option.description}
          </p>
          
          {/* Materials, tools, difficulty, etc. */}
        </div>
      ))}
    </div>
  </div>
)}
```

### Concept Image Cards (Phase 3)

**Rendered at:** Lines 543-554

```tsx
{message.concepts && message.concepts.length > 0 && (
  <div className="mt-4">
    <div className="grid grid-cols-3 gap-4">
      {message.concepts.map((concept) => (
        <div
          key={concept.concept_id}
          onClick={() => handleConceptSelect(concept.concept_id)}
          className="bg-[#1a2030] border-[0.5px] border-[#3a4560] 
                     hover:border-[#4ade80] rounded-lg overflow-hidden 
                     cursor-pointer transition-all hover:scale-[1.05]"
        >
          {/* Image Display */}
          {concept.image_url && (
            <div className="w-full h-48 bg-[#232937] 
                            flex items-center justify-center">
              <img 
                src={concept.image_url}  // ← Backend URL
                alt={concept.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          
          {/* Title & Description */}
          <div className="p-3">
            <h4 className="text-white font-medium text-sm">
              {concept.title}
            </h4>
            {concept.description && (
              <p className="text-gray-400 text-xs mt-1">
                {concept.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)}
```

### Card Component Breakdown

#### Project Option Card Structure
```
┌─────────────────────────────────────┐
│ [Title]                             │ ← option.title
│ "Tagline goes here..."              │ ← option.tagline
│                                     │
│ Description paragraph explaining    │ ← option.description
│ the project concept...              │
│                                     │
│ 🎨 Materials • ⏱️ 2-3 hours        │ ← key_materials, estimated_time
│ 🛠️ Tools required                   │ ← tools_required
│ Difficulty: Beginner                │ ← difficulty_level
└─────────────────────────────────────┘
```

#### Concept Image Card Structure
```
┌───────────────┐
│               │
│    [IMAGE]    │ ← 512x512 hero image from /images endpoint
│               │
├───────────────┤
│ The Bottle    │ ← concept.title
│ Beacon        │
│               │
│ Description   │ ← concept.description
│ text...       │
└───────────────┘
```

## Complete Flow Diagram

```
Backend Workflow
  ├─ Phase 1: Extract ingredients
  ├─ Phase 2: Generate 3 options (TEXT ONLY)
  │   ├─ Store in Redis: choices:{thread_id}
  │   ├─ SSE → Frontend: 'choices_generated'
  │   └─ Frontend renders: projectOptions cards
  │
  └─ Phase 3: Generate 3 concepts (WITH IMAGES)
      ├─ Create image IDs
      ├─ Store metadata: image:{image_id} → Redis
      ├─ Build URLs: http://localhost:8000/images/{id}
      ├─ Store concepts: concepts:{thread_id} → Redis
      ├─ SSE → Frontend: 'concepts_generated'
      ├─ Frontend renders: concepts cards with <img>
      ├─ Browser requests: GET /images/{id}
      └─ Backend serves: Placeholder PNG (on-the-fly)
```

## For Real AI Image Integration

To use real AI-generated images, modify `phase3_nodes.py`:

```python
async def generate_single_image(variant, semaphore, title):
    # Generate real image with AI
    image_url = await generate_with_imagen(variant.image_prompt)
    # OR generate base64
    image_base64 = await generate_with_dall_e(variant.image_prompt)
    
    # Store with real image data
    image_metadata = {
        # ... existing fields ...
        "status": "generated",  # Mark as real
        "url": image_url,  # External URL
        # OR
        "base64_data": image_base64,  # Inline image
    }
    redis_service.set(image_key, json.dumps(image_metadata))
```

Then the `/images/{id}` endpoint will serve the real image instead of placeholder.

## Storage Recommendations

### Current (Development)
- ✅ Metadata in Redis (7200s TTL)
- ✅ Placeholder generated on-the-fly
- ✅ No persistent storage needed

### Production
- 📦 **Real AI images**: Store in S3/GCS/Azure Blob
- 🔗 **Update metadata**: Store permanent URL
- ⚡ **CDN**: Cache images at edge
- 💾 **Database**: Track image usage/analytics

## File Locations Summary

### Backend
- **Image endpoint**: `backend/app/endpoints/images.py`
- **Image generation**: `backend/app/workflows/phase3_nodes.py`
- **SSE streaming**: `backend/app/endpoints/workflow/router.py`

### Frontend
- **Card rendering**: `frontend/app/poc/page.tsx` lines 489-574
- **State management**: `frontend/lib/workflow/useWorkflow.ts`
- **Type definitions**: Lines 11-34 of page.tsx

### Storage
- **Redis keys**:
  - `image:{image_id}` - Image metadata
  - `concepts:{thread_id}` - Concept payload with URLs
  - `choices:{thread_id}` - Project options

## Summary

🖼️ **Images**: Metadata in Redis, generated on-the-fly as PNG  
🎴 **Cards**: Rendered inline in chat messages at lines 489-574  
🔄 **Flow**: Backend generates → SSE streams → Frontend renders → Browser requests → Backend serves  
📍 **Files**: `images.py` (serve) + `page.tsx` (render) + `phase3_nodes.py` (generate)

