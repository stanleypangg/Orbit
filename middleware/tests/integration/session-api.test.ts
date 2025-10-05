import request from 'supertest';
import express, { Express } from 'express';
import { sessionRoutes } from '../../src/session';
import { sessionManager } from '../../src/session/session-manager';

jest.mock('../../src/session/session-manager');
jest.mock('../../src/redis-client');
jest.mock('../../src/utils/logger');

const mockedSessionManager = sessionManager as jest.Mocked<typeof sessionManager>;

describe('Session API Routes', () => {
  let app: Express;

  beforeEach(() => {
    jest.clearAllMocks();

    app = express();
    app.use(express.json());
    app.use('/session', sessionRoutes);
  });

  describe('POST /session/create', () => {
    it('should create a new session', async () => {
      const mockSession = {
        threadId: 'recycle_test123',
        sessionId: 'session123',
        createdAt: Date.now(),
        lastActivity: Date.now(),
        expiresAt: Date.now() + 3600000,
        metadata: {},
      };

      mockedSessionManager.createSession.mockResolvedValue(mockSession);

      const response = await request(app)
        .post('/session/create')
        .send({});

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.session).toEqual(mockSession);
    });

    it('should create session with userId', async () => {
      const userId = 'user123';
      const mockSession = {
        threadId: 'recycle_test123',
        sessionId: 'session123',
        userId,
        createdAt: Date.now(),
        lastActivity: Date.now(),
        expiresAt: Date.now() + 3600000,
        metadata: {},
      };

      mockedSessionManager.createSession.mockResolvedValue(mockSession);

      const response = await request(app)
        .post('/session/create')
        .send({ userId });

      expect(response.status).toBe(200);
      expect(response.body.session.userId).toBe(userId);
      expect(mockedSessionManager.createSession).toHaveBeenCalledWith(
        userId,
        expect.any(Object)
      );
    });

    it('should handle errors', async () => {
      mockedSessionManager.createSession.mockRejectedValue(
        new Error('Redis error')
      );

      const response = await request(app)
        .post('/session/create')
        .send({});

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /session/:threadId', () => {
    it('should retrieve existing session', async () => {
      const mockSession = {
        threadId: 'recycle_test123',
        sessionId: 'session123',
        createdAt: Date.now(),
        lastActivity: Date.now(),
        expiresAt: Date.now() + 3600000,
        metadata: {},
      };

      mockedSessionManager.getSession.mockResolvedValue(mockSession);

      const response = await request(app).get('/session/recycle_test123');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.session).toEqual(mockSession);
    });

    it('should return 404 for non-existent session', async () => {
      mockedSessionManager.getSession.mockResolvedValue(null);

      const response = await request(app).get('/session/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /session/:threadId/resume', () => {
    it('should resume session with user input', async () => {
      mockedSessionManager.resumeSession.mockResolvedValue();

      const response = await request(app)
        .post('/session/recycle_test123/resume')
        .send({ userInput: 'User clarification' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(mockedSessionManager.resumeSession).toHaveBeenCalledWith(
        'recycle_test123',
        'User clarification'
      );
    });

    it('should return 400 if userInput is missing', async () => {
      const response = await request(app)
        .post('/session/recycle_test123/resume')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should handle errors', async () => {
      mockedSessionManager.resumeSession.mockRejectedValue(
        new Error('Session not found')
      );

      const response = await request(app)
        .post('/session/recycle_test123/resume')
        .send({ userInput: 'test' });

      expect(response.status).toBe(500);
      expect(response.body.error).toContain('Session not found');
    });
  });

  describe('DELETE /session/:threadId', () => {
    it('should cleanup session', async () => {
      mockedSessionManager.cleanupSession.mockResolvedValue();

      const response = await request(app).delete('/session/recycle_test123');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(mockedSessionManager.cleanupSession).toHaveBeenCalledWith(
        'recycle_test123'
      );
    });

    it('should handle errors', async () => {
      mockedSessionManager.cleanupSession.mockRejectedValue(
        new Error('Cleanup failed')
      );

      const response = await request(app).delete('/session/recycle_test123');

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });
});
