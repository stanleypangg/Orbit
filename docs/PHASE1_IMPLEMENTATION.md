# Phase 1 Implementation Guide

## Overview

Phase 1 of the upcycling chatbot extracts materials from user descriptions and generates creative project ideas. This implementation follows the provided schema specification and integrates with the existing backend Gemini API.

## Architecture

### Frontend Components

1. **Schema Definitions** (`frontend/lib/chat/schemas-and-prompts.ts`)
   - `INGREDIENT_SCHEMA`: Base schema for ingredient extraction
   - `PHASE1_SCHEMA`: Extended schema with ideas and clarifying questions
   - `IMAGING_BRIEF_SCHEMA`: Phase 2 schema for image generation briefs
   - System prompts for both phases

2. **Validation & API Calls** (`frontend/lib/chat/validator-and-calls.ts`)
   - AJV-based JSON schema validation
   - API client functions for Phase 1 and Phase 2
   - Error handling with detailed validation feedback

3. **Type Definitions** (`frontend/lib/chat/types.ts`)
   - TypeScript interfaces for Phase 1 and Phase 2 responses
   - Ingredient, Idea, Camera, RenderConfig types
   - Extended ChatMessage with phase1Data

4. **UI Components** (`frontend/components/Phase1Chat.tsx`)
   - Material description input
   - Real-time ingredient extraction display
   - Interactive idea cards
   - Clarifying questions display
   - Confidence indicators

5. **Demo Page** (`frontend/app/phase1/page.tsx`)
   - Complete Phase 1 workflow demonstration
   - Example inputs
   - Step-by-step guide
   - Sidebar with instructions

### Backend Endpoints

1. **Phase Router** (`backend/app/endpoints/chat/phase_router.py`)
   - `POST /api/chat/phase1`: Material extraction and idea generation
   - `POST /api/chat/phase2`: Imaging brief generation
   - `GET /api/chat/phases/health`: Health check

2. **Integration** (`backend/main.py`)
   - Phase router registered in main FastAPI app

## API Specifications

### Phase 1 Endpoint

**POST** `/api/chat/phase1`

**Request:**
```json
{
  "text": "I have 3 plastic bottles and 5 aluminum cans",
  "existing_ingredients": [] // optional
}
```

**Response:**
```json
{
  "ingredients": [
    {
      "name": "plastic bottle",
      "size": "standard",
      "material": "plastic",
      "category": "container",
      "condition": "empty",
      "confidence": 0.95
    }
  ],
  "confidence": 0.9,
  "needs_clarification": false,
  "clarifying_questions": [],
  "ideas": [
    {
      "id": "idea-1",
      "title": "Vertical Garden Planter",
      "one_liner": "Create a hanging garden using cut bottles as planters"
    }
  ]
}
```

### Phase 2 Endpoint

**POST** `/api/chat/phase2`

**Request:**
```json
{
  "ideaId": "idea-1",
  "ingredients": [...],
  "tweaks": {},
  "previousBrief": null,
  "feedback": null
}
```

**Response:**
```json
{
  "idea_id": "idea-1",
  "prompt": "A vertical garden planter made from upcycled plastic bottles...",
  "camera": {
    "view": "three-quarter",
    "focal_length_mm": 50,
    "aperture_f": 2.8,
    "distance_m": 1.5
  },
  "render": {
    "aspect_ratio": "4:3",
    "image_size": "2K",
    "count": 4,
    "seed": null
  },
  "needs_clarification": false
}
```

## Setup Instructions

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```
   The following packages are required:
   - `ajv`: JSON schema validation
   - `ajv-formats`: Additional format validators

2. **Environment Variables**
   Create `.env.local` if needed:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access Phase 1 Demo**
   Navigate to: `http://localhost:3000/phase1`

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Configure Environment**
   Ensure `.env` contains:
   ```env
   GEMINI_API_KEY=your_api_key_here
   GEMINI_MODEL=gemini-2.0-flash-exp
   ```

3. **Run Backend Server**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

4. **Test Endpoints**
   ```bash
   # Health check
   curl http://localhost:8000/api/chat/phases/health
   
   # Phase 1 test
   curl -X POST http://localhost:8000/api/chat/phase1 \
     -H "Content-Type: application/json" \
     -d '{"text": "I have 3 plastic bottles"}'
   ```

## Usage Flow

### Step 1: Material Description
User describes their recyclable materials:
- "I have 3 plastic bottles and 5 aluminum cans"
- "Empty glass jars and cardboard boxes"
- "Old fabric scraps and bottle caps"

### Step 2: Material Extraction
Backend extracts structured ingredient data:
- Names (e.g., "plastic bottle", "aluminum can")
- Materials (e.g., "plastic", "aluminum")
- Sizes, conditions, categories
- Confidence scores

### Step 3: Idea Generation
System generates 3-5 creative upcycling ideas:
- Unique ID for each idea
- Title (e.g., "Vertical Garden Planter")
- One-liner description

### Step 4: Clarification (if needed)
If confidence is low (<0.6), system asks clarifying questions:
- "What size are the bottles?"
- "Are the materials clean?"
- "Do you have any tools available?"

### Step 5: Idea Selection
User selects their preferred idea and proceeds to Phase 2 (image generation).

## Key Features

### Frontend
- ✅ Real-time material extraction display
- ✅ Confidence indicators for each ingredient
- ✅ Interactive idea cards with hover effects
- ✅ Clarifying questions display
- ✅ Responsive design with Tailwind CSS
- ✅ Loading states and error handling

### Backend
- ✅ Structured JSON output using Gemini 2.0 Flash
- ✅ Schema-driven responses with validation
- ✅ Retry logic with exponential backoff
- ✅ Comprehensive logging
- ✅ CORS support for local development
- ✅ Type-safe with Pydantic models

## Testing

### Manual Testing
1. Start backend: `uvicorn main:app --reload --port 8000`
2. Start frontend: `npm run dev`
3. Navigate to `http://localhost:3000/phase1`
4. Try example inputs:
   - "3 plastic bottles and 5 aluminum cans"
   - "cardboard boxes and glass jars"
   - "fabric scraps and bottle caps"

### API Testing
```bash
# Test Phase 1
curl -X POST http://localhost:8000/api/chat/phase1 \
  -H "Content-Type: application/json" \
  -d '{"text": "I have 5 plastic bottles and 10 aluminum cans"}'

# Test Health
curl http://localhost:8000/api/chat/phases/health
```

## Integration with Existing System

The Phase 1 implementation integrates seamlessly with:

1. **Existing Chat System**: Uses the same API patterns and types
2. **Gemini Integration**: Leverages `GeminiStructuredClient` for structured output
3. **Styling**: Uses existing Tailwind configuration
4. **Routing**: Follows Next.js App Router conventions

## Next Steps (Phase 2)

Phase 2 will build on this foundation:
1. Use selected idea + ingredients from Phase 1
2. Generate imaging briefs for visualization
3. Call image generation API (Imagen, Flux, etc.)
4. Display generated images
5. Collect feedback and iterate

## File Structure

```
HTV/
├── frontend/
│   ├── app/
│   │   └── phase1/
│   │       └── page.tsx          # Phase 1 demo page
│   ├── components/
│   │   └── Phase1Chat.tsx        # Main Phase 1 component
│   └── lib/
│       └── chat/
│           ├── schemas-and-prompts.ts  # JSON schemas
│           ├── validator-and-calls.ts  # Validation & API
│           └── types.ts                # TypeScript types
└── backend/
    ├── app/
    │   └── endpoints/
    │       └── chat/
    │           └── phase_router.py     # Phase 1/2 endpoints
    └── main.py                         # Router registration
```

## Troubleshooting

### Frontend Issues
- **AJV errors**: Ensure `ajv` and `ajv-formats` are installed
- **API connection**: Check `NEXT_PUBLIC_API_URL` environment variable
- **CORS errors**: Verify backend CORS middleware is configured

### Backend Issues
- **Gemini API errors**: Verify `GEMINI_API_KEY` is set correctly
- **Import errors**: Ensure all dependencies are installed
- **Structured output errors**: Check Gemini model supports structured output (use `gemini-2.0-flash-exp`)

## Performance Notes

- **Phase 1 latency**: ~2-4 seconds typical
- **Structured output**: Ensures consistent JSON format
- **Retry logic**: Automatic retry on transient failures
- **Validation**: Client-side validation for fast feedback

## Security Considerations

- API key stored server-side only
- Input validation on both client and server
- CORS configured for specific origins in production
- Rate limiting recommended for production deployment

## Credits

Implementation based on the Phase 1 specification with schemas, system prompts, and validation logic provided in the project requirements.

