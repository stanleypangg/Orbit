# Complete Workflow UI Mapping

## User Journey Through All Phases

### **Phase 1: Ingredient Discovery** ✅ Implemented

#### Node Flow
1. **P1a** (Extract) → Loading: "🔍 Analyzing your materials with AI..."
2. **P1b** (Null Check) → Loading: "🤔 Checking for missing details..."
   - **STOP** → Show clarification questions → **USER ANSWERS** ✋
3. **P1c** (Categorize) → Loading: "📦 Organizing ingredients..."

#### UI Components
- ✅ Ingredient cards with confidence badges
- ✅ Clarification question prompt
- ✅ User input text area

---

### **Phase 2: Goal Formation & Choice Generation** ✅ Now Implemented

#### Node Flow
1. **G1** (Goal Formation) → Loading: "🎯 Understanding your goals..."
2. **O1** (Choice Generation) → Loading: "💡 Generating 3 creative ideas..."
   - **STOP** → Show 3 project options as cards → **USER SELECTS ONE** ✋
3. **E1** (Evaluation) → Loading: "✨ Evaluating your choice..."

#### UI Components
- ✅ **Project Option Cards** (3 cards displayed):
  ```
  ┌─────────────────────────────────────┐
  │ 🎨 [Project Title]     [Difficulty] │
  │ Description of the project...       │
  │ ⏱️ 2 hours  🔧 3 materials  🛠️ tools│
  └─────────────────────────────────────┘
  ```
- ✅ Hover effects and click to select
- ✅ Shows: title, description, difficulty, time, materials, tools

---

### **Phase 3: Concept Visualization** ✅ Now Implemented

#### Node Flow
1. **PR1** (Prompt Builder) → Loading: "🎨 Crafting concept prompts..."
2. **IMG** (Image Generation) → Loading: "🖼️ Generating 3 concept images..."
   - **STOP** → Show 3 concept images in grid → **USER SELECTS ONE** ✋
3. **A1** (Assembly) → Loading: "📐 Assembling preview..."

#### UI Components
- ✅ **Concept Image Cards** (3x3 grid):
  ```
  ┌───────┐ ┌───────┐ ┌───────┐
  │ Image │ │ Image │ │ Image │
  │  #1   │ │  #2   │ │  #3   │
  │ Title │ │ Title │ │ Title │
  └───────┘ └───────┘ └───────┘
  ```
- ✅ Hover effects and click to select
- ✅ Shows: image, title, description

---

### **Phase 4: Final Package** (TODO)

#### Node Flow
1. **H1** (Packaging) → Loading: "📦 Packaging your project..."
2. **EXP** (Exports) → Show final deliverables
3. **ANALYTICS** → Show project metrics
4. **SHARE** → Share options

#### UI Components (TODO)
- Final project card with selected concept
- Download buttons (JSON, HTML, PDF)
- Share buttons (Instagram, Pinterest, etc.)
- ESG impact report
- BOM (Bill of Materials)
- DIY Instructions

---

## Loading States Summary

| Node | Loading Message | Duration | Next State |
|------|----------------|----------|------------|
| P1a | 🔍 Analyzing materials... | ~3s | Show ingredients |
| P1b | 🤔 Checking details... | ~1s | Ask question OR continue |
| P1c | 📦 Organizing... | ~2s | Show categorized ingredients |
| G1 | 🎯 Understanding goals... | ~5s | Continue to O1 |
| O1 | 💡 Generating 3 ideas... | ~10s | **STOP** Show 3 options |
| E1 | ✨ Evaluating choice... | ~5s | Continue to PR1 |
| PR1 | 🎨 Crafting prompts... | ~3s | Continue to IMG |
| IMG | 🖼️ Generating images... | ~15s | **STOP** Show 3 concepts |
| A1 | 📐 Assembling preview... | ~3s | Continue to H1 |
| H1 | 📦 Packaging project... | ~5s | Show final package |

**Total Time**: ~50-60 seconds (excluding user wait time)

---

## User Decision Points

### 1. **Clarification Questions** (P1b)
**Trigger**: Missing ingredient details  
**UI**: Text input for answering questions  
**Example**: "What size are the plastic bottles?"  
**Action**: User types answer → Resume workflow

### 2. **Project Option Selection** (After O1)
**Trigger**: 3 viable options generated  
**UI**: 3 clickable cards showing projects  
**Example**: "Bottle Planter", "Can Organizer", "Plastic Bracelet"  
**Action**: User clicks one → Proceed to E1 → PR1

### 3. **Concept Image Selection** (After IMG)
**Trigger**: 3 concept images generated  
**UI**: 3 image cards in grid  
**Example**: Minimalist style, Decorative style, Functional style  
**Action**: User clicks one → Proceed to H1

### 4. **Final Package** (After H1)
**Trigger**: Package complete  
**UI**: Final project display with downloads  
**Action**: User downloads or shares

---

## SSE Events and UI Mapping

| SSE Event | Workflow Phase | UI Action |
|-----------|----------------|-----------|
| `ingredients_update` | P1a/P1b/P1c | Show ingredient cards |
| `user_question` | P1b | Show clarification input |
| `choices_generated` | O1 | **Show 3 project option cards** |
| `concepts_generated` | IMG | **Show 3 concept image cards** |
| `project_package` | H1 | Show final deliverables |
| `workflow_complete` | END | Show completion message |
| `state_update` | Any | Update loading message |
| `error` | Any | Show error message |

---

## Implementation Status

✅ **Phase 1**: Complete with loading states  
✅ **Phase 2**: Complete with project option selection UI  
✅ **Phase 3**: Complete with concept image selection UI  
⏳ **Phase 4**: Final package UI pending  

✅ **Loading States**: All nodes have contextual messages  
✅ **SSE Events**: All events mapped and handled  
✅ **User Input**: Text input for clarifications  
✅ **User Selection**: Click cards to select options/concepts  

---

## What Makes Sense to Display

### ✅ Show as Loading (No user action needed)
- P1a, P1c, G1, E1, PR1, A1, H1
- These are processing steps where AI is working

### ✋ Stop and Wait for User
- **P1b**: Need more info → Show question input
- **After O1**: Generated 3 options → Show selection cards  
- **After IMG**: Generated 3 images → Show image cards

### 📦 Show as Result (Final state)
- Ingredients list (after P1c)
- Selected option confirmation
- Selected concept confirmation
- Final package with downloads

---

## Code Changes Summary

### Backend
- ✅ Added `choices_generated` SSE event in stream
- ✅ Added `/select-option/{thread_id}` endpoint

### Frontend
- ✅ Updated `useWorkflow` hook with:
  - `projectOptions` state
  - `concepts` state  
  - `needsSelection` flag
  - `selectionType` ('option' | 'concept')
  - `selectOption()` method
  - `selectConcept()` method
- ✅ Added loading messages for all nodes
- ✅ Created project option card UI
- ✅ Created concept image card UI
- ✅ Added selection handlers

---

## Testing the Complete Flow

1. **Start**: "I have plastic bottles and cans"
2. **P1a-P1c**: See ingredients extracted
3. **Answer question**: "500ml bottles"
4. **G1**: Loading "Understanding goals..."
5. **O1**: See 3 project ideas appear as cards
6. **Select project**: Click "Bottle Planter"
7. **E1-PR1**: Loading "Crafting prompts..."
8. **IMG**: See 3 concept images appear
9. **Select concept**: Click favorite image
10. **H1**: See final package with downloads

**Full user journey from start to finish with appropriate loading states and selection points!** 🎉

