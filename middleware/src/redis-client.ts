import { createClient } from 'redis';
import { config } from './config';
import { logger } from './utils/logger';

export type RedisClient = ReturnType<typeof createClient>;

class RedisService {
  private client: RedisClient | null = null;
  private isConnected = false;

  async connect(): Promise<void> {
    if (this.isConnected) {
      logger.info('Redis already connected');
      return;
    }

    try {
      this.client = createClient({
        url: config.redis.url,
        socket: {
          host: config.redis.host,
          port: config.redis.port,
        },
        database: config.redis.db,
      });

      this.client.on('error', (err) => {
        logger.error('Redis Client Error', err);
      });

      this.client.on('connect', () => {
        logger.info('Redis client connected');
      });

      this.client.on('ready', () => {
        logger.info('Redis client ready');
        this.isConnected = true;
      });

      this.client.on('end', () => {
        logger.info('Redis client disconnected');
        this.isConnected = false;
      });

      await this.client.connect();
    } catch (error) {
      logger.error('Failed to connect to Redis', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client && this.isConnected) {
      await this.client.disconnect();
      this.client = null;
      this.isConnected = false;
      logger.info('Redis disconnected');
    }
  }

  getClient(): RedisClient {
    if (!this.client || !this.isConnected) {
      throw new Error('Redis client not connected. Call connect() first.');
    }
    return this.client;
  }

  isReady(): boolean {
    return this.isConnected;
  }

  async ping(): Promise<boolean> {
    try {
      if (!this.client) return false;
      const pong = await this.client.ping();
      return pong === 'PONG';
    } catch {
      return false;
    }
  }

  // For testing purposes only
  reset(): void {
    this.client = null;
    this.isConnected = false;
  }
}

export const redisService = new RedisService();
