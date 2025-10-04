// validator-and-calls.ts

import Ajv from "ajv";
import addFormats from "ajv-formats";
import {
  PHASE1_SCHEMA,
  IMAGING_BRIEF_SCHEMA,
} from "./schemas-and-prompts";

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validatePhase1 = ajv.compile(PHASE1_SCHEMA);
const validateBrief = ajv.compile(IMAGING_BRIEF_SCHEMA);

type Validation<T> = { ok: true; value: T } | { ok: false; errors: string[] };

export function validateJson<T>(data: unknown, kind: "phase1" | "brief"): Validation<T> {
  const validate = kind === "phase1" ? validatePhase1 : validateBrief;
  const ok = validate(data);
  if (ok) return { ok: true, value: data as T };
  const errors = (validate.errors || []).map((e: any) => `${e.instancePath || "(root)"} ${e.message}`);
  return { ok: false, errors };
}

// ---------- Backend API calls ----------

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function callPhase1(userTextOrObj: string | object) {
  const input = typeof userTextOrObj === "string" ? { text: userTextOrObj } : userTextOrObj;
  
  const response = await fetch(`${API_BASE_URL}/api/chat/phase1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Phase 1 API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export async function callPhase2(payload: {
  ideaId: string;
  ingredients: unknown;
  tweaks?: Record<string, any>;
  previousBrief?: unknown;
  feedback?: unknown;
}) {
  const response = await fetch(`${API_BASE_URL}/api/chat/phase2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Phase 2 API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

// ---------- Chatbot-friendly handlers (minimal) ----------

 export async function handlePhase1(input: string) {
  const raw = await callPhase1(input);
  const v = validateJson<typeof raw>(raw, "phase1");
  if (v.ok) return v.value;

  // If validation fails, throw error with details
  throw new Error(`Phase1 validation failed: ${v.errors.join("; ")}`);
}

export async function handlePhase2(phase2Input: {
  ideaId: string;
  ingredients: unknown;
  tweaks?: Record<string, any>;
  previousBrief?: unknown;
  feedback?: unknown;
}) {
  const raw = await callPhase2(phase2Input);
  const v = validateJson<typeof raw>(raw, "brief");
  if (v.ok) return v.value;

  // If validation fails, throw error with details
  throw new Error(`Phase2 validation failed: ${v.errors.join("; ")}`);
}
