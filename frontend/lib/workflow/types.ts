/**
 * Workflow-specific types for LangGraph integration
 */

export interface WorkflowIngredient {
  name: string | null;
  size: string | null;
  material: string | null;
  category?: string | null;
  confidence: number;
  source?: string;
}

export interface WorkflowStatus {
  thread_id: string;
  current_phase: string;
  current_node: string;
  needs_user_input: boolean;
  user_questions: string[];
  completion_percentage: number;
  ingredients_count: number;
  errors: any[];
}

export interface WorkflowConcept {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  prompt?: string;
}

export interface WorkflowStartResponse {
  thread_id: string;
  status: string;
  message: string;
}

export interface WorkflowStreamEvent {
  type: 'state_update' | 'ingredients_update' | 'user_question' | 'concepts_generated' | 'workflow_complete' | 'error' | 'timeout';
  data: any;
  message?: string;
}

