# Magic Pencil Workflow Implementation

## Overview

The Magic Pencil feature allows users to selectively edit images using AI by drawing over specific areas they want to change and providing a natural language prompt.

## Complete Workflow

### 1. **User Interaction (Frontend)**

- User uploads an image
- User draws red markings over areas they want to edit
- User provides a natural language prompt (e.g., "make this area blue", "turn this into a cat")
- User clicks "Apply Magic"

### 2. **Image Processing (Backend)**

The backend receives and processes 2 uploaded images:

1. **Original Image** - The reference image that must be preserved outside edit areas
2. **Drawn Overlay** - Canvas with red markings showing where to edit

### 3. **Pure Mask Generation (Backend - Automatic)**

The backend automatically generates a **Pure Mask** from the drawn overlay:

- Extracts red channel from drawn overlay
- Creates binary mask:
  - **WHITE** = Areas user drew (edit zones)
  - **BLACK** = Untouched areas (preserve zones)
- This mask isolates the exact edit boundaries

### 4. **Gemini API Call**

The backend sends **4 inputs** to Gemini Nano Banana:

#### Input 1: System Prompt (Strongly Constrained)

```
You are a precise image editing AI. You will receive 4 inputs:

**INPUTS:**
1. Reference Image: The original that must be preserved EXACTLY outside edit areas
2. Drawn Overlay: Shows red markings indicating where user wants edits
3. Pure Mask: Binary mask (white = edit, black = preserve)
4. User Prompt: "{user_prompt}"

**CRITICAL CONSTRAINTS:**
1. The Reference Image is SACRED - must remain PIXEL-PERFECT in black mask areas
2. ONLY modify pixels in WHITE mask areas
3. The edit MUST be constrained to the masked region - NO changes outside
4. Blend edited areas seamlessly at boundaries
5. Match lighting, style, color temperature of surrounding areas
6. Preserve all original details outside the mask

**OUTPUT REQUIREMENT:**
Return edited image where:
- BLACK mask areas are IDENTICAL to Reference Image
- WHITE mask areas contain requested edits
- Seamless boundaries between edited and preserved areas
```

#### Input 2: Reference Image (Base64)

The original image that AI must preserve outside the mask.

#### Input 3: Drawn Overlay (Base64)

The canvas with red markings showing edit locations.

#### Input 4: Pure Mask (Base64)

Binary mask isolating the edit zones (white = edit, black = preserve).

#### Input 5: User Prompt

Natural language description of desired changes.

### 5. **Gemini Response Processing**

- Gemini returns an edited image
- Backend extracts image from response
- Converts to base64 data URL
- Returns to frontend

### 6. **Fallback (POC Mode)**

If Gemini integration is not ready or fails:

- Backend creates a composite showing the drawn overlay on the original
- This proves the mask capture logic works correctly
- Message indicates POC status

## Key Features

### 🎯 Precision

- Pure mask ensures exact edit boundaries
- No changes outside marked areas
- Pixel-perfect preservation of unmarked regions

### 🎨 Natural Results

- AI blends edited areas seamlessly
- Matches lighting and style of surroundings
- No visible seams or artifacts

### 🔒 Strong Constraints

- System prompt explicitly forbids editing outside mask
- Multiple layers of instruction ensure constraint adherence
- Reference image is treated as "sacred" in preserve zones

## Technical Implementation

### Backend Files

- **`app/endpoints/magic_pencil/router.py`**: API endpoint handling
- **`app/integrations/gemini.py`**: Gemini API integration and prompt generation

### Process Flow

1. Download original and drawn overlay images
2. Generate pure mask by extracting red channel
3. Convert all images to base64
4. Create comprehensive system prompt
5. Call Gemini API with all 4 inputs
6. Extract and return edited image

### Image Formats

- **Input**: URLs from temporary image host
- **Processing**: PIL Image objects in RGBA format
- **API Call**: Base64-encoded PNG
- **Output**: Base64 data URL for immediate display

## Testing the Feature

1. Navigate to `/magic-pencil`
2. Upload an image
3. Draw red markings over areas to edit
4. Enter prompt (e.g., "make this area blue")
5. Click "Apply Magic"
6. View the result

## Next Steps

- Verify Gemini API key is set in `.env`
- Test with various prompts and mask shapes
- Adjust mask detection threshold if needed (currently: `r > 100, a > 50`)
- Fine-tune response parsing based on actual Gemini response format
