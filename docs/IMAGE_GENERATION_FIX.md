# Image Generation and Serving Fix

## Problem

Concept images were not displaying in the frontend. The backend was generating placeholder image IDs like `generated_{thread_id}_{style}_{timestamp}` but these weren't actual displayable image URLs.

## Solution Overview

Created a complete image generation and serving pipeline:

1. **New Images Endpoint** (`/images/{image_id}`)
   - Serves generated or placeholder images
   - Creates styled placeholder images on-the-fly
   - Supports real AI-generated images via base64 or external URLs

2. **Updated Image Generation**
   - Stores proper metadata in Redis
   - Returns valid URLs pointing to `/images/` endpoint
   - Prepared for real AI image integration

3. **Frontend Compatible**
   - Images now have proper HTTP URLs
   - Standard `<img src={concept.image_url}>` works correctly

## Files Changed

### 1. `/backend/app/endpoints/images.py` (NEW)
```python
# New endpoint that serves images by ID
# Features:
# - Serves placeholder images with style-specific designs
# - Ready to serve real AI-generated images
# - Uses Pillow to create visual placeholders
```

### 2. `/backend/main.py`
```python
# Added images router
from app.endpoints.images import router as images_router
app.include_router(images_router)
```

### 3. `/backend/app/workflows/phase3_nodes.py`
- Updated `generate_single_image()` to store title metadata
- Changed image URLs to point to our `/images/` endpoint
- Added clear TODO comments for AI image integration

**Before:**
```python
image_url = variant.image_id  # "generated_12345_minimalist_98765"
```

**After:**
```python
image_url = f"http://localhost:8000/images/{variant.image_id}"  # Full URL
```

## How It Works

### Current Flow (Placeholder Images)

1. **Workflow Phase 3** → Creates concept variants with prompts
2. **Image Generation Node** → Stores metadata in Redis:
   ```json
   {
     "thread_id": "recycle_123",
     "style": "minimalist",
     "title": "The Skylight Cradle Planter",
     "prompt": "...",
     "status": "placeholder"
   }
   ```

3. **Images Endpoint** → Generates styled placeholder image using Pillow:
   - Different colors for each style (minimalist, decorative, functional)
   - Displays title and style on image
   - Returns PNG via `StreamingResponse`

4. **Frontend** → Displays image via standard `<img>` tag:
   ```tsx
   <img src="http://localhost:8000/images/generated_123_minimalist_456" />
   ```

### Placeholder Styles

- **Minimalist**: Light gray background, simple lines, clean design
- **Decorative**: Warm beige background, circular patterns, ornate
- **Functional**: Light blue background, grid pattern, technical

## Integrating Real AI Image Generation

To replace placeholders with real AI-generated images, modify `phase3_nodes.py`:

### Option 1: Google Imagen 3 (Recommended)

```python
async def generate_single_image(variant: ConceptVariant, semaphore: asyncio.Semaphore, title: str = "Concept"):
    async with semaphore:
        try:
            # Import Imagen client
            from google.cloud import aiplatform
            from google.cloud.aiplatform import ImageGenerationModel
            
            # Initialize model
            model = ImageGenerationModel.from_pretrained("imagegeneration@006")
            
            # Generate image
            images = model.generate_images(
                prompt=variant.image_prompt,
                number_of_images=1,
                aspect_ratio="1:1",
            )
            
            # Get image URL or convert to base64
            image_url = images[0].url  # If Imagen returns URL
            # OR
            image_base64 = images[0].to_base64()  # If need inline
            
            variant.image_id = f"generated_{state.thread_id}_{variant.style}_{int(time.time())}"
            
            # Store with actual image data
            image_metadata = {
                "thread_id": state.thread_id,
                "style": variant.style,
                "title": title,
                "prompt": variant.image_prompt,
                "generated_at": time.time(),
                "status": "generated",
                "url": image_url,  # External URL
                # OR
                "base64_data": image_base64,  # Inline image
            }
            redis_service.set(f"image:{variant.image_id}", json.dumps(image_metadata), ex=7200)
            
            return variant
            
        except Exception as e:
            logger.error(f"IMG: Real generation failed, using placeholder: {str(e)}")
            # Falls back to placeholder logic
```

### Option 2: Stability AI

```python
import stability_sdk

async def generate_single_image(variant: ConceptVariant, semaphore: asyncio.Semaphore, title: str = "Concept"):
    async with semaphore:
        try:
            stability_api = stability_sdk.client.StabilityInference(
                key=os.environ["STABILITY_KEY"],
            )
            
            answers = stability_api.generate(
                prompt=variant.image_prompt,
                height=512,
                width=512,
            )
            
            for resp in answers:
                for artifact in resp.artifacts:
                    if artifact.type == generation.ARTIFACT_IMAGE:
                        # Save to bytes
                        img_bytes = artifact.binary
                        img_base64 = base64.b64encode(img_bytes).decode()
                        
                        # Store with base64 data
                        variant.image_id = f"generated_{state.thread_id}_{variant.style}_{int(time.time())}"
                        image_metadata = {
                            "thread_id": state.thread_id,
                            "style": variant.style,
                            "title": title,
                            "prompt": variant.image_prompt,
                            "generated_at": time.time(),
                            "status": "generated",
                            "base64_data": img_base64,
                        }
                        redis_service.set(f"image:{variant.image_id}", json.dumps(image_metadata), ex=7200)
                        
            return variant
```

### Option 3: OpenAI DALL-E 3

```python
import openai

async def generate_single_image(variant: ConceptVariant, semaphore: asyncio.Semaphore, title: str = "Concept"):
    async with semaphore:
        try:
            client = openai.AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])
            
            response = await client.images.generate(
                model="dall-e-3",
                prompt=variant.image_prompt,
                size="1024x1024",
                quality="standard",
                n=1,
            )
            
            image_url = response.data[0].url
            
            variant.image_id = f"generated_{state.thread_id}_{variant.style}_{int(time.time())}"
            image_metadata = {
                "thread_id": state.thread_id,
                "style": variant.style,
                "title": title,
                "prompt": variant.image_prompt,
                "generated_at": time.time(),
                "status": "generated",
                "url": image_url,  # DALL-E returns temporary URL
            }
            redis_service.set(f"image:{variant.image_id}", json.dumps(image_metadata), ex=7200)
            
            return variant
```

## Testing the Fix

### 1. Backend Test
```bash
cd backend
docker-compose up --build

# Test placeholder endpoint
curl http://localhost:8000/images/placeholder/minimalist?title=Test+Planter

# Should return a PNG image
```

### 2. Frontend Test
1. Start frontend: `cd frontend && npm run dev`
2. Run a workflow through Phase 3
3. Check that concept images display correctly
4. Open browser DevTools → Network tab to verify image requests

### 3. Redis Verification
```bash
# Connect to Redis
docker exec -it <redis-container> redis-cli

# Check stored image metadata
GET image:generated_<thread_id>_minimalist_<timestamp>
```

## Environment Variables (for Real AI)

Add to `.env`:

```env
# For Google Imagen
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# For Stability AI
STABILITY_KEY=sk-...

# For OpenAI DALL-E
OPENAI_API_KEY=sk-...
```

## Production Considerations

1. **Image Storage**
   - Current: Images generated on-the-fly from metadata
   - Production: Store generated images in S3/GCS/CDN
   - Update metadata to point to permanent URLs

2. **Caching**
   - Add CDN caching for `/images/` endpoint
   - Cache placeholder images at CDN edge

3. **Rate Limiting**
   - AI image generation APIs have rate limits
   - Implement request queuing and retries
   - Consider caching generated images permanently

4. **Cost Optimization**
   - AI image generation costs per image
   - Cache aggressively
   - Consider image compression

5. **CORS**
   - Already configured in `main.py`
   - For production, restrict origins appropriately

## API Reference

### GET `/images/{image_id}`
Serve an image by its ID.

**Response:** PNG image or redirect to external URL

### GET `/images/placeholder/{style}`
Generate placeholder image for a style.

**Query Parameters:**
- `title` (string): Title to display on placeholder

**Response:** PNG image

## Troubleshooting

### Images not displaying
1. Check browser console for CORS errors
2. Verify Redis contains image metadata
3. Test image endpoint directly in browser
4. Check backend logs for generation errors

### Placeholder images look wrong
1. Check if Pillow/PIL is installed: `pip list | grep -i pillow`
2. Verify font paths in `images.py` for your OS
3. Test endpoint directly: `/images/placeholder/minimalist?title=Test`

### Real AI images fail
1. Check API key environment variables
2. Verify API quotas/billing
3. Check backend logs for detailed errors
4. Test API directly with curl/Postman first

