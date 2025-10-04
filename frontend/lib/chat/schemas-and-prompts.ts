// schemas-and-prompts.ts

// ---------------
// 0) Your exact INGREDIENT_SCHEMA (unchanged)
// ---------------
export const INGREDIENT_SCHEMA = {
  type: "object",
  properties: {
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: ["string", "null"] },
          size: { type: ["string", "null"] },
          material: { type: ["string", "null"] },
          category: { type: ["string", "null"] },
          condition: { type: ["string", "null"] },
          confidence: { type: "number", minimum: 0, maximum: 1 }
        },
        required: ["name", "size", "material"]
      }
    },
    confidence: { type: "number", minimum: 0, maximum: 1 },
    needs_clarification: { type: "boolean" }
  },
  required: ["ingredients", "confidence", "needs_clarification"]
} as const;

// ---------------
// 1) Phase-1 response schema (superset of INGREDIENT_SCHEMA)
//    - Reuses all INGREDIENT_SCHEMA properties and required
//    - Adds ideas[] and optional clarifying_questions[]
// ---------------
export const PHASE1_SCHEMA = {
  type: "object",
  properties: {
    ...INGREDIENT_SCHEMA.properties,
    clarifying_questions: {
      type: "array",
      items: { type: "string" }
    },
    ideas: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          one_liner: { type: "string" }
        },
        required: ["id", "title", "one_liner"]
      },
      minItems: 3,
      maxItems: 5
    }
  },
  required: [
    ...INGREDIENT_SCHEMA.required, // "ingredients","confidence","needs_clarification"
    "ideas"
  ]
} as const;

// ---------------
// 2) Phase-2 Imaging Brief schema (for the image loop)
// ---------------
export const IMAGING_BRIEF_SCHEMA = {
  type: "object",
  properties: {
    idea_id: { type: "string" },
    prompt: { type: "string" },
    negative_prompt: { type: "string" },
    camera: {
      type: "object",
      properties: {
        view: { type: "string", enum: ["front", "three-quarter", "top", "detail"] },
        focal_length_mm: { type: "number" },
        aperture_f: { type: "number" },
        distance_m: { type: "number" }
      },
      required: ["view"]
    },
    lighting: { type: "string" },
    background: { type: "string" },
    constraints: {
      type: "object",
      properties: {
        materials_must_match: { type: "boolean" },
        show_construction_details: { type: "boolean" },
        show_scale_reference: { type: "boolean" }
      }
    },
    render: {
      type: "object",
      properties: {
        aspect_ratio: { type: "string", enum: ["1:1","4:3","3:4","16:9","9:16"], default: "1:1" },
        image_size: { type: "string", enum: ["1K","2K"], default: "1K" },
        count: { type: "integer", minimum: 1, maximum: 4, default: 4 },
        seed: { type: ["integer","null"] }
      },
      required: ["aspect_ratio","count"]
    },
    acceptance_criteria: { type: "array", items: { type: "string" } },
    assumptions: { type: "array", items: { type: "string" } },
    needs_clarification: { type: "boolean" },
    clarifying_questions: { type: "array", items: { type: "string" } }
  },
  required: ["idea_id","prompt","render"]
} as const;

// ---------------
// 3) System prompts
// ---------------
export const PHASE1_SYSTEM_PROMPT = `
You extract DIY upcycling requirements and propose ideas.
Output ONLY valid JSON that follows the provided responseSchema.

Rules:
1) Populate "ingredients" from the user's materials using short, literal strings. 
2) Set an overall "confidence" in [0,1]. If any essential field is < 0.6 confidence, set "needs_clarification": true and propose up to 3 concise "clarifying_questions".
3) Propose 3–5 distinct "ideas" with id, title, and a one-liner. Do not include step-by-step instructions here.
4) Prefer common tools/materials when unspecified. Do not include unsafe actions. 
5) No commentary outside JSON fields.
`.trim();

export const PHASE2_SYSTEM_PROMPT = `
You are a rendering director. Output ONLY valid JSON that follows the responseSchema.

Input: chosen idea, ingredients, user tweaks, and optional prior feedback.
Tasks:
1) Produce an "Imaging Brief" that can be sent directly to the image model.
2) If any critical visual detail is ambiguous, set "needs_clarification": true and propose up to 3 "clarifying_questions".
3) Keep "prompt" concise and literal. Avoid commentary.
4) If feedback is provided, revise the brief to address it while staying faithful to the materials and chosen idea.
5) Keep or change "seed" only if the user requests reproducibility or variation, respectively.
`.trim();
