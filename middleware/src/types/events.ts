export type StreamEventType =
  | 'state_update'
  | 'ingredients_update'
  | 'user_question'
  | 'concepts_generated'
  | 'magic_pencil_complete'
  | 'concept_selected'
  | 'project_package'
  | 'workflow_complete'
  | 'error'
  | 'timeout';

export interface StreamEvent {
  type: StreamEventType;
  data: any;
  timestamp?: number;
}

export interface AnalyticsEvent {
  type: 'workflow_start' | 'workflow_complete' | 'error' | 'share' | 'export';
  threadId: string;
  userId?: string;
  timestamp: number;
  metadata: Record<string, any>;
}
