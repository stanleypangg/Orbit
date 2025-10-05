export interface SessionData {
  threadId: string;
  sessionId: string;
  userId?: string;
  createdAt: number;
  lastActivity: number;
  expiresAt: number;
  metadata?: Record<string, any>;
}

export interface SessionOptions {
  ttl?: number;
  metadata?: Record<string, any>;
}
