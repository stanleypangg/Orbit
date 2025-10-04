/**
 * Shared types for chat functionality
 */

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

export interface StreamEvent {
  delta?: string;
  done?: boolean;
  error?: {
    code: string;
    message: string;
  };
}

