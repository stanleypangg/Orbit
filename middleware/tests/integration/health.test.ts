import request from 'supertest';
import express, { Express } from 'express';
import { redisService } from '../../src/redis-client';

jest.mock('../../src/redis-client');
jest.mock('../../src/utils/logger');

const mockedRedisService = redisService as jest.Mocked<typeof redisService>;

describe('Health Check Endpoints', () => {
  let app: Express;

  beforeEach(() => {
    jest.clearAllMocks();

    app = express();

    // Health check endpoint
    app.get('/health', async (_req, res) => {
      try {
        const redisHealthy = await redisService.ping();
        res.json({
          status: redisHealthy ? 'healthy' : 'degraded',
          redis: redisHealthy ? 'connected' : 'disconnected',
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        res.status(503).json({
          status: 'unhealthy',
          error: 'Service check failed',
        });
      }
    });

    // Readiness check endpoint
    app.get('/ready', async (_req, res) => {
      try {
        const redisReady = redisService.isReady();
        if (!redisReady) {
          return res.status(503).json({
            ready: false,
            message: 'Redis not ready',
          });
        }
        return res.json({
          ready: true,
          message: 'Service is ready',
        });
      } catch (error) {
        return res.status(503).json({
          ready: false,
          error: 'Readiness check failed',
        });
      }
    });
  });

  describe('GET /health', () => {
    it('should return healthy status when Redis is connected', async () => {
      mockedRedisService.ping.mockResolvedValue(true);

      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
      expect(response.body.redis).toBe('connected');
      expect(response.body.timestamp).toBeDefined();
    });

    it('should return degraded status when Redis is disconnected', async () => {
      mockedRedisService.ping.mockResolvedValue(false);

      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('degraded');
      expect(response.body.redis).toBe('disconnected');
    });

    it('should return unhealthy status on error', async () => {
      mockedRedisService.ping.mockRejectedValue(new Error('Connection error'));

      const response = await request(app).get('/health');

      expect(response.status).toBe(503);
      expect(response.body.status).toBe('unhealthy');
    });
  });

  describe('GET /ready', () => {
    it('should return ready when Redis is ready', async () => {
      mockedRedisService.isReady.mockReturnValue(true);

      const response = await request(app).get('/ready');

      expect(response.status).toBe(200);
      expect(response.body.ready).toBe(true);
    });

    it('should return not ready when Redis is not ready', async () => {
      mockedRedisService.isReady.mockReturnValue(false);

      const response = await request(app).get('/ready');

      expect(response.status).toBe(503);
      expect(response.body.ready).toBe(false);
      expect(response.body.message).toContain('Redis not ready');
    });
  });
});
