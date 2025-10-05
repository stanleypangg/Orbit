export interface Ingredient {
  name: string | null;
  size: string | null;
  material: string | null;
  category?: string | null;
  condition?: string | null;
  confidence: number;
}

export interface WorkflowResponse {
  threadId: string;
  status: string;
  message: string;
}

export interface WorkflowStatus {
  threadId: string;
  currentPhase: string;
  currentNode: string;
  needsUserInput: boolean;
  userQuestions: string[];
  completionPercentage: number;
  ingredientsCount: number;
  errors: Array<{ code: string; message: string }>;
}

export interface ProjectPackage {
  threadId: string;
  finalConcept: any;
  bom: any[];
  instructions: any[];
  analytics: any;
  exports: {
    json?: any;
    html?: string;
    pdfConfig?: any;
  };
}

export interface Analytics {
  threadId: string;
  workflowMetrics: any;
  performanceMetrics: any;
  userEngagement: any;
}

export type ExportFormat = 'json' | 'html' | 'pdf_config';

export interface ExportData {
  format: ExportFormat;
  data: any;
  generatedAt: string;
  threadId: string;
}

export interface ShareResponse {
  message: string;
  platform: string;
  contentPreview: string;
  shareUrl: string;
  status: string;
}
