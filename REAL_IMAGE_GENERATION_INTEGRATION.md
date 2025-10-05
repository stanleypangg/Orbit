# Real AI Image Generation Integration - FLUX

## What Changed

Integrated **FLUX-schnell** (by Black Forest Labs) for real AI image generation via Replicate API.

## Before (Placeholder Images)
- Simple geometric patterns generated with Pillow
- Low quality, cartoon-like appearance  
- No actual AI generation
- Just visual mockups

## After (FLUX Real Images)
- Professional AI-generated product photography
- High quality, photorealistic images
- Fast generation (~2-3 seconds per image)
- Follows detailed hero prompts

## How It Works

### 1. New Image Generation Service
**File:** `backend/app/integrations/image_generation.py`

```python
from app.integrations.image_generation import generate_concept_image

# Generate real AI image
image_url = await generate_concept_image(
    prompt=variant.image_prompt,  # Detailed hero prompt
    style=variant.style,
    model="flux-schnell"  # Fast FLUX model
)
```

### 2. Updated Phase 3 Node
**File:** `backend/app/workflows/phase3_nodes.py`

Now calls FLUX API instead of creating placeholders:
- Generates real images for all 3 concepts
- Returns actual URLs from Replicate
- Stores URLs in Redis metadata

### 3. Enhanced Image Endpoint
**File:** `backend/app/endpoints/images.py`

Now redirects to real generated images:
```python
if image_data.get("url"):
    # Redirect to Replicate-hosted image
    return RedirectResponse(url=image_data["url"])
```

## Setup Instructions

### 1. Get Replicate API Token

Visit: https://replicate.com/account/api-tokens

Sign up and create an API token.

### 2. Add to Environment

```bash
# backend/.env
REPLICATE_API_KEY=r8_your_api_token_here
```

### 3. Restart Backend

```bash
cd backend
docker-compose down
docker-compose up --build
```

### 4. Test It!

Run a workflow and watch the logs:
```bash
docker-compose logs -f backend | grep "IMG:"

# You should see:
# IMG: Generating real AI image for The Bottle Beacon (minimalist)
# IMG: ✓ Generated real AI image for The Bottle Beacon: https://replicate.delivery/...
```

## Available Models

### FLUX Models (Recommended)
- **flux-schnell** ⚡ Fast & high quality (4 steps, ~2-3s) - **CURRENT DEFAULT**
- **flux-dev**: Best quality (28 steps, ~10s)
- **flux-pro**: Professional ultra-high quality (~15s)

### Stable Diffusion XL
- **sdxl**: Good quality (25 steps, ~5s)
- **sdxl-lightning**: Fast SDXL (4 steps, ~2s)

### To Change Model

Edit `backend/app/workflows/phase3_nodes.py` line 283:

```python
image_url = await generate_concept_image(
    prompt=variant.image_prompt,
    style=variant.style,
    model="flux-dev"  # or flux-pro, sdxl, sdxl-lightning
)
```

## Why FLUX-schnell?

1. ⚡ **Fast**: Only 4 inference steps, ~2-3 seconds per image
2. 🎨 **High Quality**: Produces photorealistic, detailed images
3. 💰 **Cost Effective**: Fewer steps = lower cost
4. 🎯 **Prompt Following**: Excellent at following detailed prompts
5. 📐 **Flexible**: Works well with 0 guidance scale (natural looking)

## Image Generation Flow

```
User Input
    ↓
Phase 2: Generate 3 project options
    ↓
Phase 3: PR1 - Create detailed hero prompts
    ↓
IMG Node: For each concept:
    ├─ Call FLUX API with detailed prompt
    ├─ Wait ~2-3 seconds for generation
    ├─ Receive image URL from Replicate
    └─ Store URL in Redis metadata
    ↓
Frontend: Display 3 real AI images
    ├─ Load from http://localhost:8000/images/{id}
    ├─ Backend redirects to Replicate URL
    └─ Browser displays real generated image
```

## Cost Breakdown

### Replicate Pricing (FLUX-schnell)
- **Price**: ~$0.003 per image (4 steps)
- **Per workflow**: $0.009 (3 images)
- **100 workflows**: ~$0.90
- **1000 workflows**: ~$9.00

Very affordable for high-quality AI generation!

### Comparison
- **FLUX-dev**: ~$0.01 per image (more steps)
- **FLUX-pro**: ~$0.055 per image (ultra quality)
- **SDXL**: ~$0.0032 per image

## Caching Strategy

Images are cached in Redis for 2 hours (7200s):
- First request: Generate with AI
- Subsequent requests: Use cached URL
- After 2 hours: Generate fresh if requested again

This minimizes costs while keeping images fresh.

## Error Handling

If image generation fails:
1. Service logs the error
2. Falls back to placeholder images
3. Workflow continues without blocking
4. User still sees concepts (with placeholder)

```python
if image_url:
    logger.info(f"✓ Generated real AI image")
else:
    logger.warning(f"Failed to generate, using placeholder")
```

## Prompt Quality Matters

The detailed hero prompts we created are crucial:

```
Hero product photography of The Bottle Beacon: This project focuses on...

MATERIALS: Crafted from upcycled glass bottle, cord, bulb...
STYLE: Minimalist aesthetic - clean lines, simple geometry...
COMPOSITION: centered, balanced, 8K resolution, ultra-detailed...
LIGHTING: soft natural lighting, subtle shadows, bright and airy...
MOOD: serene, elegant, modern, eco-friendly...
QUALITY: Magazine-quality hero image, photorealistic rendering...
CONTEXT: Sustainable upcycling project, waste-to-value...
```

These prompts give FLUX all the context needed to generate stunning images!

## Troubleshooting

### "No REPLICATE_API_KEY configured"
**Fix:** Add `REPLICATE_API_KEY=r8_...` to `backend/.env`

### Images still showing placeholders
**Check:**
1. API key is correct
2. Backend restarted after adding key
3. Check logs for API errors:
   ```bash
   docker-compose logs backend | grep "Image generation failed"
   ```

### Slow generation
**Try:**
- Current FLUX-schnell is already optimized (4 steps)
- For even faster: Try `sdxl-lightning` (2-4 steps)
- For better quality: Try `flux-dev` (28 steps, ~10s)

### API rate limits
**Replicate limits:**
- Free tier: Limited requests per minute
- Paid tier: Higher limits
- Use caching to minimize requests

## Example Output

When working, you'll see logs like:

```
INFO: IMG: Generating HERO image 1/3 (minimalist): The Bottle Beacon
INFO: IMG: Using detailed prompt: Hero product photography of The Bottle Beacon...
INFO: ImageGenerationService initialized with model: flux-schnell
INFO: Generating image with flux-schnell
INFO: Prompt: Hero product photography of The Bottle Beacon: This project focuses on a clean, min...
INFO: Image generated successfully: https://replicate.delivery/pbxt/abc123...
INFO: IMG: ✓ Generated real AI image for The Bottle Beacon: https://replicate.delivery/pbxt...
```

## Next Steps

### Optional Enhancements

1. **Try Different Models**
   ```python
   model="flux-dev"  # Better quality, slower
   model="flux-pro"  # Best quality, slower
   ```

2. **Adjust Generation Parameters**
   ```python
   num_inference_steps=8  # More steps = better quality
   guidance_scale=3.5     # Higher = stricter prompt following
   ```

3. **Batch Optimization**
   ```python
   # Generate all 3 images in parallel
   urls = await service.generate_batch(prompts)
   ```

4. **Permanent Storage**
   - Download images from Replicate
   - Upload to S3/GCS for permanent hosting
   - Update URLs to point to your CDN

## Summary

✅ **Real AI image generation** with FLUX-schnell  
✅ **Fast**: ~2-3 seconds per image  
✅ **High quality**: Photorealistic product photography  
✅ **Cost effective**: ~$0.003 per image  
✅ **Easy setup**: Just add REPLICATE_API_KEY  
✅ **Graceful fallback**: Placeholders if generation fails  

Your concepts now have stunning, professional AI-generated images! 🎨✨

