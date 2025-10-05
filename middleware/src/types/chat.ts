export type Role = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
}

export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface RequirementsResponse {
  ingredients: any[];
  confidence: number;
  needsClarification: boolean;
  clarifyingQuestions?: string[];
  assumptions?: string[];
}

export interface IdeationDraft {
  id: string;
  name: string;
  oneLiner: string;
  assumptions: string[];
  draftImage?: {
    url: string;
    seed: number | null;
    notes: string;
  };
}

export interface IdeationDraftsResponse {
  drafts: IdeationDraft[];
}

export interface SelectionResponse {
  refinedImageUrl: string;
  brief: any;
  contextSummary: any;
}

export interface Phase1Response {
  ingredients: any[];
  confidence: number;
  needsClarification: boolean;
  clarifyingQuestions?: string[];
  ideas: any[];
}

export interface Phase2Response {
  ideaId: string;
  prompt: string;
  negativePrompt?: string;
  camera?: any;
  lighting?: string;
  background?: string;
  render: any;
  acceptanceCriteria?: string[];
}
