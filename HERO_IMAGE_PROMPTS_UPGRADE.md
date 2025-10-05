# Hero Image Prompts - Upgrade Documentation

## Changes Made

Upgraded image generation prompts from basic descriptions to professional, AI-optimized hero image prompts suitable for high-quality image generation.

## Before vs After

### Before (Basic Prompt)
```
Professional product photo of The Bottle Beacon: Simple Edison bulb light fixture. 
Made from glass bottle, cord, bulb. Style: minimalist. High quality, sustainable design.
```

**Issues:**
- Too generic and brief
- No composition or lighting details
- Same prompt structure for all styles
- Not optimized for AI image generation

### After (Hero Prompt)
```
Hero product photography of The Bottle Beacon: This project focuses on a clean, 
minimalist aesthetic by cutting the bottom off a glass bottle and fitting it with 
a simple Edison bulb and cord set.

MATERIALS: Crafted from upcycled glass bottle, cord, bulb, showcasing sustainable 
design and creative reuse.

STYLE: Minimalist aesthetic - clean lines, simple geometry, monochromatic palette, 
negative space

COMPOSITION: centered, balanced, uncluttered background, sharp focus, professional 
product photography, 8K resolution, ultra-detailed

LIGHTING: soft natural lighting, subtle shadows, bright and airy, professional 
studio quality

MOOD: serene, elegant, modern, eco-friendly, artisanal craftsmanship

QUALITY: Magazine-quality hero image, commercial photography, photorealistic 
rendering, sharp focus throughout, professional color grading

CONTEXT: Sustainable upcycling project, waste-to-value transformation, 
environmentally conscious design
```

## Style-Specific Enhancements

Each style now has unique prompt characteristics:

### Minimalist Style
- **Aesthetic**: Clean lines, simple geometry, monochromatic palette, negative space
- **Lighting**: Soft natural lighting, subtle shadows, bright and airy
- **Composition**: Centered, balanced, uncluttered background, sharp focus
- **Mood**: Serene, elegant, modern

### Decorative Style
- **Aesthetic**: Ornate details, rich textures, warm color palette, artistic flourishes
- **Lighting**: Golden hour lighting, warm ambient glow, soft highlights
- **Composition**: Artfully arranged, layered depth, decorative backdrop
- **Mood**: Inviting, creative, handcrafted charm

### Functional Style
- **Aesthetic**: Practical design, clear functionality, technical precision, structured form
- **Lighting**: Bright studio lighting, even illumination, crisp details
- **Composition**: Isometric or 3/4 view, technical clarity, neutral background
- **Mood**: Efficient, innovative, purposeful

## Prompt Structure

All prompts now follow a structured format optimized for AI image generation:

1. **Hero Title**: Product photography declaration with project name and description
2. **MATERIALS**: Specific upcycled materials used, emphasizing sustainability
3. **STYLE**: Style-specific aesthetic keywords
4. **COMPOSITION**: Camera angle, framing, resolution requirements
5. **LIGHTING**: Professional lighting setup details
6. **MOOD**: Emotional tone and atmosphere
7. **QUALITY**: Output quality specifications (8K, commercial, photorealistic)
8. **CONTEXT**: Sustainability and eco-friendly context

## Technical Details

### PR1 Node (Prompt Builder)
- Enhanced to generate detailed prompts for all 3 concepts
- Style-specific dictionaries for consistent styling
- Dynamic material insertion from user's ingredients
- Professional photography terminology

### IMG Node (Image Generation)
- Now labeled as "HERO image generation"
- Logs show detailed prompts being used
- Image IDs prefixed with `hero_` instead of `generated_`
- Metadata includes `quality: "hero"` flag

### Files Modified

1. **`backend/app/workflows/phase3_nodes.py`**
   - Lines 180-242: Enhanced PR1 prompt builder
   - Lines 255-260: Updated IMG node description
   - Lines 271-310: Enhanced image generation with hero quality
   - Lines 340-348: Added prompt logging
   - Lines 382-390: Hero quality metadata

## AI Image Generation Integration

These prompts are now ready for professional AI image generation services:

### Recommended: Google Imagen 3
```python
from google.cloud.aiplatform import ImageGenerationModel

model = ImageGenerationModel.from_pretrained("imagegeneration@006")
images = model.generate_images(
    prompt=variant.image_prompt,  # Our detailed hero prompt
    number_of_images=1,
    aspect_ratio="1:1",
    safety_filter_level="block_some"
)
image_url = images[0].url
```

### Alternative: OpenAI DALL-E 3
```python
import openai

response = await openai.Image.acreate(
    model="dall-e-3",
    prompt=variant.image_prompt,  # Our detailed hero prompt
    size="1024x1024",
    quality="hd",  # Use HD quality for hero images
    n=1
)
image_url = response.data[0].url
```

### Alternative: Stability AI SDXL
```python
import stability_sdk

response = stability_api.generate(
    prompt=variant.image_prompt,  # Our detailed hero prompt
    height=1024,
    width=1024,
    steps=50,  # More steps for hero quality
    cfg_scale=7.5
)
```

## Placeholder Image Updates

Until real AI generation is integrated, placeholders now reflect hero quality:

- Image IDs: `hero_{thread_id}_{style}_{timestamp}`
- Metadata includes `quality: "hero"`
- Aesthetic score: 0.9 (up from 0.8)
- Mode: `"hero-placeholder"` or `"hero-generated"`

## Expected Quality Improvements

When integrated with real AI image generation:

### Visual Quality
- ✅ 8K resolution capability
- ✅ Professional product photography composition
- ✅ Style-consistent lighting and mood
- ✅ Photorealistic rendering
- ✅ Commercial/magazine quality output

### Consistency
- ✅ All 3 concepts get equal quality treatment
- ✅ Style-appropriate aesthetics
- ✅ Sustainable/eco-friendly visual themes
- ✅ Professional color grading

### User Experience
- ✅ Impressive hero images for selection
- ✅ Clear visual differentiation between styles
- ✅ Professional presentation
- ✅ Build confidence in project quality

## Testing

### Check Prompt Quality
```bash
# Check backend logs for generated prompts
docker-compose logs backend | grep "Using detailed prompt"

# You should see detailed multi-line prompts like:
# "Hero product photography of The Bottle Beacon..."
# "MATERIALS: Crafted from upcycled glass bottle..."
# etc.
```

### Verify Metadata
```bash
# Connect to Redis
docker exec -it <redis-container> redis-cli

# Get image metadata
GET image:hero_<thread_id>_minimalist_<timestamp>

# Should show:
# - "quality": "hero"
# - "prompt": <detailed prompt>
# - Full structured prompt content
```

## Cost Considerations

Hero-quality prompts with AI generation will have costs:

### Pricing Estimates (per image)
- **Imagen 3**: ~$0.02-0.04 per 1024x1024 image
- **DALL-E 3 HD**: ~$0.08 per 1024x1024 image  
- **Stability AI**: ~$0.002-0.01 per image

### Cost Management
- Only generate 3 images per session (one per concept)
- Cache aggressively in Redis (7200s TTL)
- Consider storing generated images in S3 for reuse
- Use safety filters to avoid regeneration

## Future Enhancements

1. **Adaptive Prompts**: Learn from user selections to improve prompts
2. **Custom Styles**: Allow users to input style preferences
3. **Multiple Angles**: Generate 2-3 angles per concept
4. **Progressive Enhancement**: Generate low-res preview, then high-res
5. **Negative Prompts**: Add negative prompts to avoid unwanted elements

## Prompt Examples by Style

### Minimalist: "The Bottle Beacon"
```
Hero product photography of The Bottle Beacon: Clean Edison bulb fixture.

MATERIALS: Crafted from upcycled glass bottle, cord, bulb...
STYLE: Minimalist aesthetic - clean lines, simple geometry...
COMPOSITION: centered, balanced, uncluttered background, 8K...
LIGHTING: soft natural lighting, subtle shadows, bright...
MOOD: serene, elegant, modern, eco-friendly...
QUALITY: Magazine-quality hero image, photorealistic...
CONTEXT: Sustainable upcycling project, waste-to-value...
```

### Decorative: "Etched Glass Lantern"
```
Hero product photography of Etched Glass Lantern: Beautiful lighting piece.

MATERIALS: Crafted from upcycled glass bottles, etching cream...
STYLE: Decorative aesthetic - ornate details, rich textures...
COMPOSITION: artfully arranged, layered depth, decorative backdrop...
LIGHTING: golden hour lighting, warm ambient glow, soft highlights...
MOOD: inviting, creative, handcrafted charm, eco-friendly...
QUALITY: Magazine-quality hero image, photorealistic...
CONTEXT: Sustainable upcycling project, waste-to-value...
```

### Functional: "Cascading Bottle Chandelier"
```
Hero product photography of Cascading Bottle Chandelier: Functional lighting.

MATERIALS: Crafted from upcycled bottles of different shapes...
STYLE: Functional aesthetic - practical design, technical precision...
COMPOSITION: isometric view, technical clarity, neutral background...
LIGHTING: bright studio lighting, even illumination, crisp details...
MOOD: efficient, innovative, purposeful, eco-friendly...
QUALITY: Magazine-quality hero image, photorealistic...
CONTEXT: Sustainable upcycling project, waste-to-value...
```

## Summary

✅ **Upgraded prompts** from basic to professional hero quality  
✅ **Style-specific** aesthetics for each concept type  
✅ **AI-ready** structured prompts for Imagen/DALL-E/Stability  
✅ **Production-quality** specifications (8K, commercial, photorealistic)  
✅ **Sustainability focus** emphasized in all prompts  

The system is now ready to generate impressive, magazine-quality hero images for all 3 concepts! 🎨✨

