# Middleware Test Suite

Comprehensive test coverage for the HTV-2025 middleware layer.

## Test Structure

```
tests/
├── setup.ts              # Global test configuration
├── unit/                 # Unit tests
│   ├── session/
│   │   └── session-manager.test.ts
│   └── redis-client.test.ts
├── integration/          # Integration tests
│   ├── session-api.test.ts
│   └── health.test.ts
└── load/                 # Load tests (to be added)
```

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Specific Test File
```bash
npm test -- session-manager
```

### Integration Tests Only
```bash
npm test -- tests/integration
```

## Test Coverage

### Session Management Module
- ✅ `createSession()` - Session creation with various options
- ✅ `getSession()` - Session retrieval and activity updates
- ✅ `resumeSession()` - Workflow resumption with backend integration
- ✅ `checkpointSession()` - Checkpoint creation
- ✅ `cleanupSession()` - Complete cleanup with error handling

### Redis Client
- ✅ Connection management
- ✅ Error handling
- ✅ Health checks
- ✅ Client lifecycle

### API Routes
- ✅ POST /session/create
- ✅ GET /session/:threadId
- ✅ POST /session/:threadId/resume
- ✅ DELETE /session/:threadId
- ✅ GET /health
- ✅ GET /ready

## Coverage Goals

- **Overall**: > 80%
- **Critical Paths**: 100%
- **Error Handlers**: 100%

## Writing Tests

### Unit Test Template
```typescript
describe('ModuleName', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('functionName', () => {
    it('should do something', async () => {
      // Arrange
      // Act
      // Assert
    });

    it('should handle errors', async () => {
      // Test error case
    });
  });
});
```

### Integration Test Template
```typescript
describe('API Endpoint', () => {
  it('should return 200 on success', async () => {
    const response = await request(app)
      .post('/endpoint')
      .send({ data: 'test' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
    });
  });
});
```

## Mocking Guidelines

- Mock external dependencies (Redis, Axios, Logger)
- Use `jest.mock()` for module mocks
- Clear mocks in `beforeEach()`
- Mock only what's necessary for the test

## CI/CD Integration

Tests run automatically on:
- Pull requests
- Merges to main
- Pre-deployment checks

### Required Checks
- All tests pass
- Coverage > 80%
- No linting errors
