import { Router, Request, Response } from 'express';
import { sessionManager } from './session-manager';
import { logger } from '../utils/logger';

const router = Router();

/**
 * POST /session/create
 * Create new session
 */
router.post('/create', async (req: Request, res: Response) => {
  try {
    const { userId, metadata, ttl } = req.body;

    const session = await sessionManager.createSession(userId, { metadata, ttl });

    res.json({
      success: true,
      session,
    });
  } catch (error) {
    logger.error('Failed to create session', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create session',
    });
  }
});

/**
 * GET /session/:threadId
 * Get session data
 */
router.get('/:threadId', async (req: Request, res: Response) => {
  try {
    const { threadId } = req.params;
    const session = await sessionManager.getSession(threadId);

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }

    return res.json({
      success: true,
      session,
    });
  } catch (error) {
    logger.error('Failed to get session', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get session',
    });
  }
});

/**
 * POST /session/:threadId/resume
 * Resume session with user input
 */
router.post('/:threadId/resume', async (req: Request, res: Response) => {
  try {
    const { threadId } = req.params;
    const { userInput } = req.body;

    if (!userInput) {
      return res.status(400).json({
        success: false,
        error: 'userInput is required',
      });
    }

    await sessionManager.resumeSession(threadId, userInput);

    return res.json({
      success: true,
      message: 'Session resumed successfully',
    });
  } catch (error) {
    logger.error('Failed to resume session', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to resume session',
    });
  }
});

/**
 * DELETE /session/:threadId
 * Cleanup session
 */
router.delete('/:threadId', async (req: Request, res: Response) => {
  try {
    const { threadId } = req.params;

    await sessionManager.cleanupSession(threadId);

    res.json({
      success: true,
      message: 'Session cleaned up successfully',
    });
  } catch (error) {
    logger.error('Failed to cleanup session', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cleanup session',
    });
  }
});

export { router as sessionRoutes };
