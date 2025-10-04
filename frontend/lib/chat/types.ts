/**
 * Shared types for chat functionality
 */

export type Role = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  phase1Data?: Phase1Response;
}

export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface StreamEvent {
  delta?: string;
  done?: boolean;
  error?: {
    code: string;
    message: string;
  };
}

// Phase 1 Types
export interface Ingredient {
  name: string | null;
  size: string | null;
  material: string | null;
  category?: string | null;
  condition?: string | null;
  confidence: number;
}

export interface Idea {
  id: string;
  title: string;
  one_liner: string;
}

export interface Phase1Response {
  ingredients: Ingredient[];
  confidence: number;
  needs_clarification: boolean;
  clarifying_questions?: string[];
  ideas: Idea[];
}

// Phase 2 Types
export interface Camera {
  view: 'front' | 'three-quarter' | 'top' | 'detail';
  focal_length_mm?: number;
  aperture_f?: number;
  distance_m?: number;
}

export interface Constraints {
  materials_must_match?: boolean;
  show_construction_details?: boolean;
  show_scale_reference?: boolean;
}

export interface RenderConfig {
  aspect_ratio: '1:1' | '4:3' | '3:4' | '16:9' | '9:16';
  image_size: '1K' | '2K';
  count: number;
  seed?: number | null;
}

export interface Phase2Response {
  idea_id: string;
  prompt: string;
  negative_prompt?: string;
  camera?: Camera;
  lighting?: string;
  background?: string;
  constraints?: Constraints;
  render: RenderConfig;
  acceptance_criteria?: string[];
  assumptions?: string[];
  needs_clarification?: boolean;
  clarifying_questions?: string[];
}

