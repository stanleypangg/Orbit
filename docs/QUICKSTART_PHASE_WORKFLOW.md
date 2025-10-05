# Quick Start: Phase Workflow

## 🚀 Get Started in 3 Minutes

### 1. Start the Backend
```bash
cd backend
uvicorn main:app --reload --port 8000
```

### 2. Start the Frontend
```bash
cd frontend
npm run dev
```

### 3. Open the Demo
Navigate to: **http://localhost:3000/phase-workflow**

---

## 💡 Try It Out

### Example 1: Simple Materials
```
Input: "I have 3 plastic bottles and 5 aluminum cans"
Expected: Immediate extraction → 3 ideas → select one
```

### Example 2: Vague Materials (triggers clarification)
```
Input: "I have some bottles"
Expected: Questions like "What material?" "What size?" → answer → 3 ideas
```

### Example 3: Complex Materials
```
Input: "I have 2 large plastic bottles (500ml), 3 small aluminum cans (12oz), and some cardboard"
Expected: High confidence → 3 detailed ideas → refined image
```

---

## 📍 API Endpoints

### Requirements Loop
```bash
POST /api/chat/requirements
{
  "text": "I have 3 plastic bottles",
  "clarifications": {},
  "project_context": null
}
```

### Ideation Drafts
```bash
POST /api/chat/ideation-drafts
{
  "ingredients": [...],
  "assumptions": [],
  "confidence": 0.8
}
```

### Select Idea
```bash
POST /api/chat/select-idea
{
  "idea_id": "draft-1",
  "idea_name": "Bottle Planter",
  "one_liner": "Turn bottles into hanging planters",
  "ingredients": [...],
  "assumptions": []
}
```

---

## 🎯 Workflow Steps

1. **Requirements Phase**
   - Enter materials description
   - Answer clarification questions (if needed)
   - View extracted ingredients + confidence

2. **Ideation Phase**
   - Generate 3 distinct idea drafts
   - Each draft has a general image (placeholder)
   - Review assumptions for each idea

3. **Selection Phase**
   - Choose your favorite idea
   - View refined image (placeholder)
   - See complete project summary

---

## 🔧 Key Features

✅ **Clarify-or-Assume Logic**: Smart handling of missing info  
✅ **Max 3 Clarification Cycles**: Prevents infinite loops  
✅ **Assumptions Tracking**: Transparent about inferences  
✅ **3 Distinct Ideas**: Materially faithful variations  
✅ **General + Refined Images**: Two-stage visualization  
✅ **Project Context**: Persistent state across phases  

---

## 📚 Full Documentation

- **Complete Guide**: `PHASE_WORKFLOW_IMPLEMENTATION.md`
- **Summary**: `IMPLEMENTATION_DELTA_SUMMARY.md`
- **Repository Guidelines**: `AGENTS.md`

---

## ❓ Troubleshooting

### Backend not responding?
- Check backend is running on port 8000
- Verify GEMINI_API_KEY is set in `.env`
- Check logs: `uvicorn main:app --reload --port 8000`

### Frontend errors?
- Ensure backend CORS is configured
- Check browser console for errors
- Verify API_BASE URL in page.tsx

### No ideas generated?
- Check ingredients were extracted (confidence > 0)
- Review backend logs for errors
- Try simpler material descriptions

---

## 🎨 Customization

### Change Temperature
Edit `phase_router.py`:
```python
# For more creative ideas
temperature=0.9  # Default: 0.7

# For more consistent extraction
temperature=0.0  # Already set
```

### Adjust Clarification Cycles
Edit `page.tsx`:
```typescript
if (clarifyCycles >= 5) {  // Default: 3
  // Escape hatch
}
```

### Add Real Images
Replace `generate_image_placeholder()` in `phase_router.py`:
```python
def generate_image_with_gemini(prompt: str) -> Dict[str, Any]:
    client = genai.Client(api_key=settings.GEMINI_API_KEY)
    response = client.models.generate_content(
        model="gemini-2.5-flash-image",
        contents=prompt
    )
    # Extract and return image URL
```

---

## 💻 Development Tips

### View State in Real-Time
The demo page includes a "Project Context (Debug)" section at the bottom showing the complete state.

### Test Individual Endpoints
Use curl or Postman to test endpoints independently without the UI.

### Check Schemas
All schemas are in `frontend/lib/chat/schemas-and-prompts.ts` for easy reference.

---

**Need Help?** Check the full documentation or review the code comments in the implementation files.

