import { redisService } from '../../src/redis-client';
import { createClient } from 'redis';

jest.mock('redis');
jest.mock('../../src/utils/logger');

const mockedCreateClient = createClient as jest.MockedFunction<typeof createClient>;

describe('RedisService', () => {
  let mockClient: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Reset the singleton state
    (redisService as any).reset();

    mockClient = {
      connect: jest.fn().mockResolvedValue(undefined),
      disconnect: jest.fn().mockResolvedValue(undefined),
      ping: jest.fn().mockResolvedValue('PONG'),
      on: jest.fn(),
    };

    mockedCreateClient.mockReturnValue(mockClient as any);
  });

  describe('connect', () => {
    it('should connect to Redis successfully', async () => {
      await redisService.connect();

      expect(mockedCreateClient).toHaveBeenCalled();
      expect(mockClient.connect).toHaveBeenCalled();
    });

    it('should not reconnect if already connected', async () => {
      await redisService.connect();
      await redisService.connect();

      expect(mockClient.connect).toHaveBeenCalledTimes(1);
    });

    it('should setup event listeners', async () => {
      await redisService.connect();

      expect(mockClient.on).toHaveBeenCalledWith('error', expect.any(Function));
      expect(mockClient.on).toHaveBeenCalledWith('connect', expect.any(Function));
      expect(mockClient.on).toHaveBeenCalledWith('ready', expect.any(Function));
      expect(mockClient.on).toHaveBeenCalledWith('end', expect.any(Function));
    });

    it('should throw error on connection failure', async () => {
      mockClient.connect.mockRejectedValue(new Error('Connection failed'));

      await expect(redisService.connect()).rejects.toThrow('Connection failed');
    });
  });

  describe('disconnect', () => {
    it('should disconnect from Redis', async () => {
      await redisService.connect();
      await redisService.disconnect();

      expect(mockClient.disconnect).toHaveBeenCalled();
    });

    it('should handle disconnect when not connected', async () => {
      await expect(redisService.disconnect()).resolves.not.toThrow();
    });
  });

  describe('getClient', () => {
    it('should return Redis client when connected', async () => {
      await redisService.connect();

      const client = redisService.getClient();

      expect(client).toBe(mockClient);
    });

    it('should throw error when not connected', () => {
      expect(() => redisService.getClient()).toThrow('Redis client not connected');
    });
  });

  describe('isReady', () => {
    it('should return true when connected', async () => {
      await redisService.connect();

      // Simulate ready event
      const readyHandler = mockClient.on.mock.calls.find(
        (call: any[]) => call[0] === 'ready'
      )?.[1];
      readyHandler?.();

      expect(redisService.isReady()).toBe(true);
    });

    it('should return false when not connected', () => {
      expect(redisService.isReady()).toBe(false);
    });
  });

  describe('ping', () => {
    it('should return true when ping succeeds', async () => {
      await redisService.connect();

      const result = await redisService.ping();

      expect(result).toBe(true);
      expect(mockClient.ping).toHaveBeenCalled();
    });

    it('should return false when ping fails', async () => {
      await redisService.connect();
      mockClient.ping.mockRejectedValue(new Error('Ping failed'));

      const result = await redisService.ping();

      expect(result).toBe(false);
    });

    it('should return false when client not initialized', async () => {
      const result = await redisService.ping();

      expect(result).toBe(false);
    });
  });
});
