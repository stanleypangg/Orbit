// Test setup file
import { config } from '../src/config';

// Override config for testing
config.nodeEnv = 'test';
config.logging.level = 'error';

// Global test timeout
jest.setTimeout(10000);

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
