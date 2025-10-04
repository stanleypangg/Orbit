# Chatbot Feature Setup

A minimal, production-ready chatbot implementation using the Gemini API with streaming support.

## Features

- **Streaming responses**: Real-time token streaming using Server-Sent Events (SSE)
- **Clean architecture**: Generic LLM interface that can be swapped for other providers
- **Modern UI**: Responsive chat interface with auto-scroll and loading states
- **Accessible**: ARIA labels, keyboard navigation, and screen reader support
- **Error handling**: Graceful degradation with user-friendly error messages

## Prerequisites

1. **Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Python 3.8+** and **Node.js 18+**

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-1.5-pro
```

### 3. Start the Backend Server

```bash
cd backend
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### 4. Run with Docker (Alternative)

If you prefer Docker:

```bash
cd backend

# Create .env file first (required)
echo "GEMINI_API_KEY=your_key_here" > .env
echo "GEMINI_MODEL=gemini-1.5-pro" >> .env

# Build and run with docker-compose
docker-compose up --build

# Or with docker directly
docker build -t htv-backend .
docker run -p 8000:8000 --env-file .env -v $(pwd):/app htv-backend
```

The Dockerfile automatically installs all dependencies from `requirements.txt` and the `.env` file provides the Gemini API configuration.

### API Endpoints

- `POST /api/chat` - Stream chat responses (SSE)
- `GET /api/chat/health` - Health check endpoint

#### Example Request

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "options": {
      "temperature": 0.7,
      "max_tokens": 1024
    }
  }'
```

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start the Development Server

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:3000`

### 3. Configure API URL (Optional)

If your backend is running on a different port or domain, update the `apiUrl` in the `useChat` hook:

```typescript
// In components/Chat.tsx or where you use the hook
const { messages, send, ... } = useChat({
  apiUrl: 'https://your-backend-url.com/api/chat',
});
```

## Architecture

### Backend Structure

```
backend/
├── app/
│   ├── lib/
│   │   └── gemini_client.py      # Gemini API adapter
│   └── endpoints/
│       └── chat/
│           └── router.py          # Chat streaming endpoint
├── main.py                        # FastAPI app entry point
└── requirements.txt
```

### Frontend Structure

```
frontend/
├── lib/
│   └── chat/
│       ├── types.ts               # Shared TypeScript types
│       └── useChat.ts             # Chat state management hook
├── components/
│   └── Chat.tsx                   # Chat UI component
└── app/
    └── page.tsx                   # Main page
```

## Key Components

### Backend: Gemini Client (`app/lib/gemini_client.py`)

Generic LLM adapter that can be swapped for other providers:

```python
client = GeminiClient()
async for token in client.send_message_stream(messages, options):
    yield token
```

### Backend: Chat Router (`app/endpoints/chat/router.py`)

Handles streaming chat requests with SSE format:

- Validates input messages
- Streams tokens as they arrive
- Returns errors in standardized format
- Logs telemetry (latency, token count)

### Frontend: useChat Hook (`lib/chat/useChat.ts`)

Manages chat state and streaming lifecycle:

- Optimistic message updates
- SSE stream parsing
- Error handling
- Abort support

### Frontend: Chat Component (`components/Chat.tsx`)

Minimal, accessible UI:

- User/assistant message bubbles
- Auto-scroll on new messages
- Enter to send, Shift+Enter for newline
- Loading states and error display

## Configuration Options

### ChatOptions

```typescript
interface ChatOptions {
  temperature?: number;      // 0.0 - 1.0 (default: 0.7)
  maxTokens?: number;        // Max response length (default: 1024)
  systemPrompt?: string;     // System instruction (optional)
}
```

### Default System Prompt

> "You are a concise, helpful assistant. Answer directly unless asked to elaborate."

To customize:

```typescript
<Chat systemPrompt="You are a helpful coding assistant." />
```

## Swap LLM Providers

The architecture is designed to easily swap providers:

1. **Create new adapter** (e.g., `app/lib/openai_client.py`):

```python
class OpenAIClient:
    async def send_message_stream(self, messages, options):
        # Implement OpenAI streaming
        pass
```

2. **Update router** to use new client:

```python
from app.lib.openai_client import OpenAIClient
client = OpenAIClient()
```

3. **No frontend changes needed** - the interface remains the same!

## Error Handling

### Server Errors

- `400` - Invalid request (empty message, wrong role)
- `500` - Configuration error (missing API key)
- `504` - Model timeout

### Client Errors

The UI displays user-friendly error messages:

- Network errors
- Timeout errors
- Model content safety blocks
- Aborted requests

## Future Enhancements

Ready to add (leave TODOs in code):

- Tool calling / function execution
- File uploads and multimodal inputs
- Database persistence for chat history
- Authentication and user management
- Long-term memory and RAG
- Agentic workflows

## Telemetry

Each request logs:

```
[request_id] Chat stream completed: tokens=X, latency=Xms, status=ok
```

No PII is logged. Telemetry includes:

- Request ID (UUID)
- Token count
- Latency (milliseconds)
- Status (ok/error)

## Testing

### Manual Testing

1. Start both backend and frontend
2. Open http://localhost:3000
3. Type a message and press Enter
4. Verify tokens stream in real-time
5. Test error cases (empty input, network issues)

### Backend Health Check

```bash
curl http://localhost:8000/api/chat/health
# Expected: {"status":"healthy","model":"gemini"}
```

## Production Deployment

### Backend

1. Set environment variables in your hosting platform
2. Use a production ASGI server (already using uvicorn)
3. Enable HTTPS and proper CORS settings
4. Set up monitoring and logging
5. Configure rate limiting

### Frontend

1. Update `apiUrl` to your production backend
2. Build for production: `npm run build`
3. Deploy to Vercel, Netlify, or your preferred host
4. Enable environment-based configuration

## Troubleshooting

### gRPC ALTS Warning (Safe to Ignore)

If you see this warning in Docker logs:
```
E0000 00:00:... ALTS creds ignored. Not running on GCP and untrusted ALTS is not enabled.
```

**This is completely harmless!** It's just gRPC logging that it can't use ALTS credentials (which only work on Google Cloud Platform). Your chatbot works perfectly—this is just noise during initialization.

**Why it happens**: The Gemini SDK uses gRPC, which checks for various auth methods during startup. Outside GCP, ALTS isn't available, so it logs this warning and falls back to standard TLS. Everything still works fine!

**Already mitigated**: The `docker-compose.yml` sets `GRPC_VERBOSITY=ERROR` to minimize these logs. You might see it once during first initialization—that's expected and safe to ignore.

### "GEMINI_API_KEY environment variable is required"

- Ensure `.env` file exists in `backend/` directory
- Check that the key is valid and not expired

### Streaming doesn't work

- Check browser console for CORS errors
- Verify backend is running on port 8000
- Ensure SSE is not blocked by network/proxy

### Tokens not appearing in UI

- Check Network tab for streaming response
- Verify SSE events are formatted correctly
- Look for JavaScript errors in console

## License

MIT

