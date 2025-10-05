# HTV-2025 Middleware

Unified middleware layer for the AI Recycle-to-Market Generator connecting Next.js frontend with FastAPI backend.

## Features

- ✅ Session management with Redis persistence
- ✅ API gateway with request routing
- ✅ SSE streaming coordination
- ✅ Workflow orchestration interface
- ✅ Caching layer for performance
- ✅ Error handling with circuit breakers
- ✅ Analytics and monitoring

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

### Production

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

### Docker

```bash
# Build image
docker build -t htv-middleware .

# Run container
docker run -p 3001:3001 --env-file .env htv-middleware
```

## API Endpoints

### Session Management
- `POST /session/create` - Create new session
- `GET /session/:threadId` - Get session data
- `POST /session/:threadId/resume` - Resume session
- `DELETE /session/:threadId` - Cleanup session

### Health & Monitoring
- `GET /health` - Health check
- `GET /ready` - Readiness check

## Environment Variables

See `.env.example` for all configuration options.

## Architecture

```
middleware/
├── src/
│   ├── index.ts              # Express app entry
│   ├── config.ts             # Configuration
│   ├── redis-client.ts       # Redis connection
│   ├── types/                # TypeScript types
│   ├── session/              # Session management
│   ├── gateway/              # API Gateway
│   ├── streaming/            # SSE coordinator
│   ├── workflow/             # Workflow interface
│   ├── chat/                 # Chat interface
│   ├── image/                # Image processing
│   ├── error-handling/       # Error handling
│   ├── cache/                # Caching layer
│   ├── analytics/            # Analytics
│   └── utils/                # Utilities
└── tests/                    # Test suites
```

## Development

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

## License

Private - HTV-2025 Project
