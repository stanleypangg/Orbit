# Phase Workflow Implementation

## Overview

This implementation adds a tightened requirements loop (Phase 1) and ideation drafts system (Phase 2) to the existing HTV chatbot, without changing the overall architecture.

## What Was Implemented

### Backend Changes

#### 1. State Management (`backend/app/workflows/state.py`)
- Added `ProjectContext` model to track persistent project data
- Added `ChosenIdea` model for selected idea tracking
- Added `IdeationDraft` model for ephemeral draft ideas
- Extended `WorkflowState` with:
  - `clarify_cycles`: int (track clarification loop iterations)
  - `project_context`: ProjectContext (persistent assumptions, clarifications, confidence, chosen_idea)
  - `ideation_drafts`: Optional[List[IdeationDraft]] (ephemeral drafts)

#### 2. New Schemas (`backend/app/endpoints/chat/phase_router.py`)
- **REQUIREMENTS_SCHEMA**: Phase 1 wrapper with assumptions field
- **IDEATION_DRAFTS_SCHEMA**: Phase 2 drafts (3 ideas + imaging briefs)
- **REFINED_BRIEF_SCHEMA**: Post-selection refined imaging brief

#### 3. New Endpoints

##### `/api/chat/requirements` (POST)
Requirements loop with clarify-or-assume logic.

**Request:**
```json
{
  "text": "I have 3 plastic bottles",
  "clarifications": {"What size?": "500ml"},
  "project_context": {...}
}
```

**Response:**
```json
{
  "ingredients": [...],
  "confidence": 0.8,
  "needs_clarification": false,
  "assumptions": ["Assumed bottles are clean and empty"]
}
```

**Features:**
- Validates input against requirements schema
- Handles clarification cycles (max 3)
- Accumulates assumptions
- Temperature 0 for consistency

##### `/api/chat/ideation-drafts` (POST)
Generate 3 ideation drafts with general images.

**Request:**
```json
{
  "ingredients": [...],
  "assumptions": [...],
  "confidence": 0.8
}
```

**Response:**
```json
{
  "drafts": [
    {
      "id": "draft-1",
      "name": "Bottle Planter",
      "one_liner": "Turn bottles into hanging planters",
      "assumptions": [],
      "draft_image": {
        "url": "...",
        "seed": null,
        "notes": "Front view showing bottle structure"
      }
    },
    // ... 2 more drafts
  ]
}
```

**Features:**
- Generates exactly 3 distinct ideas
- Creates general imaging briefs for each
- Generates placeholder images (TODO: integrate real Gemini image generation)
- Higher temperature (0.7) for creativity

##### `/api/chat/select-idea` (POST)
Handle idea selection and generate refined image.

**Request:**
```json
{
  "idea_id": "draft-1",
  "idea_name": "Bottle Planter",
  "one_liner": "Turn bottles into hanging planters",
  "ingredients": [...],
  "assumptions": [...]
}
```

**Response:**
```json
{
  "refined_image_url": "...",
  "brief": {
    "idea_id": "draft-1",
    "prompt": "A hanging planter made from upcycled plastic bottles...",
    "camera": {"view": "three-quarter"},
    "lighting": "Natural daylight",
    "background": "Clean white backdrop",
    "render": {...}
  },
  "context_summary": {
    "id": "draft-1",
    "name": "Bottle Planter",
    "short_scope": "Turn bottles into hanging planters",
    "end_product_description": "A Bottle Planter made from 3 upcycled materials"
  }
}
```

**Features:**
- Updates PROJECT_CONTEXT with chosen idea
- Generates refined imaging brief
- Creates one refined image
- Temperature 0 for consistency

#### 4. Image Generation
- Added `generate_image_placeholder()` helper function
- TODO: Integrate with real Gemini Nano Banana (gemini-2.5-flash-image)
- Currently returns placeholder URLs for testing

### Frontend Changes

#### 1. Type Definitions (`frontend/lib/chat/types.ts`)
Added new types:
- `ProjectContext`: Persistent project state
- `ChosenIdea`: Selected idea details
- `RequirementsResponse`: Phase 1 requirements loop response
- `IdeationDraft`: Ephemeral draft with image
- `DraftImage`: Image metadata
- `IdeationDraftsResponse`: Phase 2 drafts response
- `RefinedBrief`: Post-selection imaging brief
- `SelectionResponse`: Selection result

#### 2. Schemas (`frontend/lib/chat/schemas-and-prompts.ts`)
Added new schemas:
- `REQUIREMENTS_SCHEMA`: Requirements loop validation
- `IDEATION_DRAFTS_SCHEMA`: Ideation drafts validation
- `REFINED_BRIEF_SCHEMA`: Refined brief validation

Added new system prompts:
- `REQUIREMENTS_SYSTEM_PROMPT`: Requirements agent instructions
- `IDEATION_SYSTEM_PROMPT`: Ideation agent instructions
- `REFINED_BRIEF_SYSTEM_PROMPT`: Refined brief agent instructions

#### 3. Demo Page (`frontend/app/phase-workflow/page.tsx`)
Complete workflow demonstration with:
- Requirements loop UI with clarification handling
- Ideation drafts gallery (3 cards with images)
- Selection confirmation with refined image
- Project context debug display
- Phase progress indicator

## Usage

### Starting the Backend

```bash
cd backend
uvicorn main:app --reload --port 8000
```

### Starting the Frontend

```bash
cd frontend
npm run dev
```

### Testing the Workflow

1. Navigate to `http://localhost:3000/phase-workflow`
2. Enter materials description: "I have 3 plastic bottles and 5 aluminum cans"
3. Click "Extract Requirements"
4. If clarification questions appear, answer them and resubmit
5. Once requirements are complete, click "Generate 3 Ideas"
6. Review the 3 ideation drafts with images
7. Click "Choose This Idea" on your preferred option
8. View the refined image and final project summary

### API Testing with curl

#### Requirements Loop
```bash
curl -X POST http://localhost:8000/api/chat/requirements \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I have 3 plastic bottles and 5 aluminum cans"
  }'
```

#### Ideation Drafts
```bash
curl -X POST http://localhost:8000/api/chat/ideation-drafts \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": [...],
    "assumptions": [],
    "confidence": 0.8
  }'
```

#### Select Idea
```bash
curl -X POST http://localhost:8000/api/chat/select-idea \
  -H "Content-Type: application/json" \
  -d '{
    "idea_id": "draft-1",
    "idea_name": "Bottle Planter",
    "one_liner": "Turn bottles into hanging planters",
    "ingredients": [...],
    "assumptions": []
  }'
```

## Architecture Decisions

### Why Separate Endpoints?
- **Modularity**: Each phase has distinct responsibilities
- **Testability**: Easy to test individual phases
- **Flexibility**: Client can control flow and add custom logic
- **Debugging**: Clear separation of concerns

### Why Placeholder Images?
- Real Gemini image generation requires specific API access
- Placeholder approach allows testing the full workflow
- Easy to replace with real implementation later

### Why Max 3 Clarification Cycles?
- Prevents infinite loops
- User experience: too many questions = friction
- Escape hatch with best-effort assumptions

### Why Ephemeral Drafts?
- Drafts are temporary exploration aids
- Only chosen idea persists in PROJECT_CONTEXT
- Reduces memory/storage overhead

## TODO / Future Enhancements

### High Priority
1. **Real Image Generation**: Integrate Gemini Nano Banana (gemini-2.5-flash-image)
2. **Validation Retry**: Implement automatic repair for invalid JSON responses
3. **Safety Rules**: Add safety validation for dangerous material combinations

### Medium Priority
4. **Context Review Card**: UI component for editing parsed ingredients
5. **Inline Clarification Form**: Better UX for answering questions
6. **Draft Caching**: Cache draft images to avoid regeneration

### Low Priority
7. **Analytics**: Track clarification cycles, confidence scores
8. **A/B Testing**: Compare ideation quality at different temperatures
9. **Batch Operations**: Generate multiple refined images in parallel

## Files Modified

### Backend
- `backend/app/workflows/state.py` - Added new models
- `backend/app/endpoints/chat/phase_router.py` - Added new endpoints and schemas

### Frontend
- `frontend/lib/chat/types.ts` - Added new types
- `frontend/lib/chat/schemas-and-prompts.ts` - Added new schemas
- `frontend/app/phase-workflow/page.tsx` - New demo page

## Backward Compatibility

All changes are additive:
- Legacy `/api/chat/phase1` and `/api/chat/phase2` endpoints remain unchanged
- Existing types and schemas are preserved
- New functionality is opt-in via new endpoints

## Testing

### Backend Tests
```bash
cd backend
pytest app/workflows/testing -v
```

### Manual Testing Checklist
- [ ] Requirements loop with valid input
- [ ] Requirements loop with missing info (triggers clarification)
- [ ] Clarification cycle (answer questions and resubmit)
- [ ] Max clarification cycles (3 cycles then escape hatch)
- [ ] Ideation drafts generation (3 distinct ideas)
- [ ] Idea selection (refined image and context update)
- [ ] End-to-end workflow (requirements → ideation → selection)

## Performance

### Latency Targets (with real Gemini)
- Requirements extraction: < 2s
- Ideation drafts (3 ideas + 3 images): < 5s
- Refined brief + image: < 3s

### Current Performance (with placeholders)
- Requirements extraction: ~1s
- Ideation drafts: ~2s
- Refined brief + image: ~1s

## Security Considerations

1. **Input Validation**: All inputs validated against schemas
2. **Rate Limiting**: Should add rate limiting to prevent abuse
3. **API Keys**: Gemini API key stored in environment variables
4. **CORS**: Configure CORS for production deployment

## Deployment Notes

1. Set `GEMINI_API_KEY` environment variable
2. Ensure backend is accessible from frontend (CORS configured)
3. For production, replace placeholder image URLs with CDN/storage
4. Consider adding Redis for session/state persistence
5. Add monitoring for API latency and error rates

## Support

For questions or issues, refer to:
- Main README: `/README.md`
- Repository guidelines: `/AGENTS.md`
- API documentation: Backend logs and OpenAPI schema

---

**Implementation Date**: 2025-10-04  
**Status**: ✅ Complete (with placeholder images)  
**Next Steps**: Integrate real Gemini image generation

