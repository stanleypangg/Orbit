import { v4 as uuidv4 } from 'uuid';
import { redisService } from '../redis-client';
import { SessionData, SessionOptions } from '../types/session';
import { config } from '../config';
import { logger } from '../utils/logger';
import axios from 'axios';

class SessionManager {
  private readonly SESSION_PREFIX = 'session:';
  private readonly CHECKPOINT_PREFIX = 'checkpoint:';

  /**
   * Create a new workflow session
   */
  async createSession(userId?: string, options?: SessionOptions): Promise<SessionData> {
    const threadId = `recycle_${uuidv4().substring(0, 12)}`;
    const sessionId = uuidv4();
    const now = Date.now();
    const ttl = options?.ttl || config.session.ttl;

    const sessionData: SessionData = {
      threadId,
      sessionId,
      userId,
      createdAt: now,
      lastActivity: now,
      expiresAt: now + ttl * 1000,
      metadata: options?.metadata || {},
    };

    const redis = redisService.getClient();
    const key = this.getSessionKey(threadId);

    await redis.setEx(key, ttl, JSON.stringify(sessionData));

    logger.info(`Session created: ${threadId}`, { userId, sessionId });

    return sessionData;
  }

  /**
   * Get session data
   */
  async getSession(threadId: string): Promise<SessionData | null> {
    try {
      const redis = redisService.getClient();
      const key = this.getSessionKey(threadId);
      const data = await redis.get(key);

      if (!data) {
        return null;
      }

      const sessionData: SessionData = JSON.parse(data);

      // Update last activity timestamp
      sessionData.lastActivity = Date.now();
      await redis.setEx(
        key,
        Math.floor((sessionData.expiresAt - Date.now()) / 1000),
        JSON.stringify(sessionData)
      );

      return sessionData;
    } catch (error) {
      logger.error(`Failed to get session: ${threadId}`, error);
      return null;
    }
  }

  /**
   * Resume interrupted workflow with user clarification
   */
  async resumeSession(threadId: string, userInput: string): Promise<void> {
    const session = await this.getSession(threadId);

    if (!session) {
      throw new Error(`Session not found: ${threadId}`);
    }

    try {
      // Call backend to resume workflow
      await axios.post(
        `${config.backendUrl}/workflow/resume/${threadId}`,
        { user_input: userInput },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Update session metadata
      session.lastActivity = Date.now();
      session.metadata = {
        ...session.metadata,
        lastResume: Date.now(),
        resumeCount: (session.metadata?.resumeCount || 0) + 1,
      };

      const redis = redisService.getClient();
      const key = this.getSessionKey(threadId);
      const ttl = Math.floor((session.expiresAt - Date.now()) / 1000);

      await redis.setEx(key, ttl, JSON.stringify(session));

      logger.info(`Session resumed: ${threadId}`);
    } catch (error) {
      logger.error(`Failed to resume session: ${threadId}`, error);
      throw error;
    }
  }

  /**
   * Create workflow checkpoint
   */
  async checkpointSession(threadId: string): Promise<void> {
    const session = await this.getSession(threadId);

    if (!session) {
      throw new Error(`Session not found: ${threadId}`);
    }

    try {
      const redis = redisService.getClient();
      const checkpointKey = this.getCheckpointKey(threadId, Date.now());

      // Store checkpoint with 1 hour TTL
      await redis.setEx(checkpointKey, 3600, JSON.stringify(session));

      logger.info(`Checkpoint created: ${threadId}`);
    } catch (error) {
      logger.error(`Failed to create checkpoint: ${threadId}`, error);
      throw error;
    }
  }

  /**
   * Clean up session data
   */
  async cleanupSession(threadId: string): Promise<void> {
    try {
      const redis = redisService.getClient();

      // Delete session
      const sessionKey = this.getSessionKey(threadId);
      await redis.del(sessionKey);

      // Delete checkpoints
      const checkpointPattern = `${this.CHECKPOINT_PREFIX}${threadId}:*`;
      const checkpointKeys = await redis.keys(checkpointPattern);
      if (checkpointKeys.length > 0) {
        await redis.del(checkpointKeys);
      }

      // Call backend cleanup
      try {
        await axios.delete(`${config.backendUrl}/workflow/ingredients/${threadId}`);
      } catch (error) {
        logger.warn(`Backend cleanup failed for ${threadId}`, error);
      }

      logger.info(`Session cleaned up: ${threadId}`);
    } catch (error) {
      logger.error(`Failed to cleanup session: ${threadId}`, error);
      throw error;
    }
  }

  private getSessionKey(threadId: string): string {
    return `${this.SESSION_PREFIX}${threadId}`;
  }

  private getCheckpointKey(threadId: string, timestamp: number): string {
    return `${this.CHECKPOINT_PREFIX}${threadId}:${timestamp}`;
  }
}

export const sessionManager = new SessionManager();
