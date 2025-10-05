import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import { logger } from './utils/logger';
import { redisService } from './redis-client';
import { sessionRoutes } from './session';

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Routes
app.use('/session', sessionRoutes);

// Health check
app.get('/health', async (_req: Request, res: Response) => {
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

// Readiness check
app.get('/ready', async (_req: Request, res: Response) => {
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

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
  });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: any) => {
  logger.error('Unhandled error', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.nodeEnv === 'development' ? err.message : undefined,
  });
});

// Start server
async function start() {
  try {
    // Connect to Redis
    await redisService.connect();
    logger.info('Redis connected successfully');

    // Start Express server
    app.listen(config.port, config.host, () => {
      logger.info(`Middleware server running on http://${config.host}:${config.port}`);
      logger.info(`Environment: ${config.nodeEnv}`);
      logger.info(`Backend URL: ${config.backendUrl}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await redisService.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  await redisService.disconnect();
  process.exit(0);
});

start();
