import { sessionManager } from '../../../src/session/session-manager';
import { redisService } from '../../../src/redis-client';
import axios from 'axios';

// Mock dependencies
jest.mock('../../../src/redis-client');
jest.mock('axios');
jest.mock('../../../src/utils/logger');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SessionManager', () => {
  let mockRedisClient: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Redis client
    mockRedisClient = {
      setEx: jest.fn().mockResolvedValue('OK'),
      get: jest.fn(),
      del: jest.fn().mockResolvedValue(1),
      keys: jest.fn().mockResolvedValue([]),
    };

    (redisService.getClient as jest.Mock).mockReturnValue(mockRedisClient);
  });

  describe('createSession', () => {
    it('should create a new session with generated threadId and sessionId', async () => {
      const session = await sessionManager.createSession();

      expect(session).toHaveProperty('threadId');
      expect(session).toHaveProperty('sessionId');
      expect(session.threadId).toMatch(/^recycle_[a-f0-9-]{12}$/);
      expect(session.createdAt).toBeLessThanOrEqual(Date.now());
      expect(session.lastActivity).toBeLessThanOrEqual(Date.now());
      expect(session.expiresAt).toBeGreaterThan(Date.now());
    });

    it('should create session with userId when provided', async () => {
      const userId = 'user123';
      const session = await sessionManager.createSession(userId);

      expect(session.userId).toBe(userId);
    });

    it('should create session with custom metadata', async () => {
      const metadata = { source: 'web', version: '1.0' };
      const session = await sessionManager.createSession(undefined, { metadata });

      expect(session.metadata).toEqual(metadata);
    });

    it('should create session with custom TTL', async () => {
      const customTTL = 7200;
      const session = await sessionManager.createSession(undefined, { ttl: customTTL });

      const expectedExpiry = session.createdAt + customTTL * 1000;
      expect(session.expiresAt).toBeCloseTo(expectedExpiry, -2);
    });

    it('should store session in Redis with correct TTL', async () => {
      const session = await sessionManager.createSession();

      expect(mockRedisClient.setEx).toHaveBeenCalledWith(
        `session:${session.threadId}`,
        expect.any(Number),
        expect.stringContaining(session.threadId)
      );
    });
  });

  describe('getSession', () => {
    it('should retrieve existing session', async () => {
      const mockSession = {
        threadId: 'recycle_test123',
        sessionId: 'session123',
        createdAt: Date.now() - 1000,
        lastActivity: Date.now() - 1000,
        expiresAt: Date.now() + 3600000,
        metadata: {},
      };

      mockRedisClient.get.mockResolvedValue(JSON.stringify(mockSession));

      const session = await sessionManager.getSession('recycle_test123');

      expect(session).toBeTruthy();
      expect(session?.threadId).toBe('recycle_test123');
      expect(session?.lastActivity).toBeGreaterThan(mockSession.lastActivity);
    });

    it('should return null for non-existent session', async () => {
      mockRedisClient.get.mockResolvedValue(null);

      const session = await sessionManager.getSession('nonexistent');

      expect(session).toBeNull();
    });

    it('should update last activity timestamp', async () => {
      const mockSession = {
        threadId: 'recycle_test123',
        sessionId: 'session123',
        createdAt: Date.now() - 1000,
        lastActivity: Date.now() - 1000,
        expiresAt: Date.now() + 3600000,
        metadata: {},
      };

      mockRedisClient.get.mockResolvedValue(JSON.stringify(mockSession));

      const session = await sessionManager.getSession('recycle_test123');

      expect(session?.lastActivity).toBeGreaterThan(mockSession.lastActivity);
      expect(mockRedisClient.setEx).toHaveBeenCalled();
    });

    it('should handle Redis errors gracefully', async () => {
      mockRedisClient.get.mockRejectedValue(new Error('Redis error'));

      const session = await sessionManager.getSession('test');

      expect(session).toBeNull();
    });
  });

  describe('resumeSession', () => {
    it('should resume session with user input', async () => {
      const mockSession = {
        threadId: 'recycle_test123',
        sessionId: 'session123',
        createdAt: Date.now() - 1000,
        lastActivity: Date.now() - 1000,
        expiresAt: Date.now() + 3600000,
        metadata: {},
      };

      mockRedisClient.get.mockResolvedValue(JSON.stringify(mockSession));
      mockedAxios.post.mockResolvedValue({ data: { status: 'resumed' } });

      await sessionManager.resumeSession('recycle_test123', 'User clarification');

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/workflow/resume/recycle_test123'),
        { user_input: 'User clarification' },
        expect.any(Object)
      );
    });

    it('should throw error for non-existent session', async () => {
      mockRedisClient.get.mockResolvedValue(null);

      await expect(
        sessionManager.resumeSession('nonexistent', 'input')
      ).rejects.toThrow('Session not found');
    });

    it('should update session metadata with resume info', async () => {
      const mockSession = {
        threadId: 'recycle_test123',
        sessionId: 'session123',
        createdAt: Date.now() - 1000,
        lastActivity: Date.now() - 1000,
        expiresAt: Date.now() + 3600000,
        metadata: { resumeCount: 1 },
      };

      mockRedisClient.get.mockResolvedValue(JSON.stringify(mockSession));
      mockedAxios.post.mockResolvedValue({ data: { status: 'resumed' } });

      await sessionManager.resumeSession('recycle_test123', 'input');

      const setExCall = mockRedisClient.setEx.mock.calls.find(
        (call: any[]) => call[0] === 'session:recycle_test123'
      );
      const updatedSession = JSON.parse(setExCall?.[2] || '{}');

      expect(updatedSession.metadata.resumeCount).toBe(2);
      expect(updatedSession.metadata.lastResume).toBeDefined();
    });

    it('should handle backend API errors', async () => {
      const mockSession = {
        threadId: 'recycle_test123',
        sessionId: 'session123',
        createdAt: Date.now() - 1000,
        lastActivity: Date.now() - 1000,
        expiresAt: Date.now() + 3600000,
        metadata: {},
      };

      mockRedisClient.get.mockResolvedValue(JSON.stringify(mockSession));
      mockedAxios.post.mockRejectedValue(new Error('Backend error'));

      await expect(
        sessionManager.resumeSession('recycle_test123', 'input')
      ).rejects.toThrow();
    });
  });

  describe('checkpointSession', () => {
    it('should create checkpoint for existing session', async () => {
      const mockSession = {
        threadId: 'recycle_test123',
        sessionId: 'session123',
        createdAt: Date.now() - 1000,
        lastActivity: Date.now() - 1000,
        expiresAt: Date.now() + 3600000,
        metadata: {},
      };

      mockRedisClient.get.mockResolvedValue(JSON.stringify(mockSession));

      await sessionManager.checkpointSession('recycle_test123');

      expect(mockRedisClient.setEx).toHaveBeenCalledWith(
        expect.stringMatching(/^checkpoint:recycle_test123:\d+$/),
        3600,
        expect.any(String)
      );
    });

    it('should throw error for non-existent session', async () => {
      mockRedisClient.get.mockResolvedValue(null);

      await expect(
        sessionManager.checkpointSession('nonexistent')
      ).rejects.toThrow('Session not found');
    });
  });

  describe('cleanupSession', () => {
    it('should delete session and checkpoints from Redis', async () => {
      mockRedisClient.keys.mockResolvedValue([
        'checkpoint:recycle_test123:1234567890',
        'checkpoint:recycle_test123:1234567891',
      ]);
      mockedAxios.delete.mockResolvedValue({ data: { deleted: true } });

      await sessionManager.cleanupSession('recycle_test123');

      expect(mockRedisClient.del).toHaveBeenCalledWith('session:recycle_test123');
      expect(mockRedisClient.del).toHaveBeenCalledWith([
        'checkpoint:recycle_test123:1234567890',
        'checkpoint:recycle_test123:1234567891',
      ]);
    });

    it('should call backend cleanup endpoint', async () => {
      mockRedisClient.keys.mockResolvedValue([]);
      mockedAxios.delete.mockResolvedValue({ data: { deleted: true } });

      await sessionManager.cleanupSession('recycle_test123');

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        expect.stringContaining('/workflow/ingredients/recycle_test123')
      );
    });

    it('should continue cleanup even if backend fails', async () => {
      mockRedisClient.keys.mockResolvedValue([]);
      mockedAxios.delete.mockRejectedValue(new Error('Backend error'));

      // Should not throw
      await expect(
        sessionManager.cleanupSession('recycle_test123')
      ).resolves.not.toThrow();

      expect(mockRedisClient.del).toHaveBeenCalledWith('session:recycle_test123');
    });
  });
});
