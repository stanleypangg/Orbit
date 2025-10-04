# HTV

## Chatbot Feature

A minimal, production-ready chatbot powered by Google's Gemini API with real-time streaming support.

### Quick Start

1. **Backend Setup**:
   ```bash
   cd backend
   
   # Create .env file with your Gemini API key
   echo "GEMINI_API_KEY=your_key_here" > .env
   echo "GEMINI_MODEL=gemini-1.5-pro" >> .env
   
   # Option A: Local Python
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   
   # Option B: Docker
   docker-compose up --build
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open http://localhost:3000 and start chatting!

### Documentation

See [CHATBOT_SETUP.md](./CHATBOT_SETUP.md) for detailed documentation including:
- Architecture overview
- API reference
- Configuration options
- How to swap LLM providers
- Production deployment guide
- Troubleshooting

### Features

✅ Real-time streaming responses (SSE)  
✅ Clean, accessible UI with Tailwind CSS  
✅ Generic LLM interface (easy to swap providers)  
✅ Error handling and loading states  
✅ Keyboard shortcuts (Enter to send, Shift+Enter for newline)  
✅ Auto-scroll and focus management  
✅ Request telemetry and logging  

---

# HTV Project

Minimal boilerplate for a Next.js frontend and FastAPI backend.

## Frontend (Next.js)

Located in `frontend/` directory.

### Features

- Next.js with TypeScript
- Tailwind CSS
- App Router (no src directory)
- No ESLint

### Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## Backend (FastAPI)

Located in `backend/` directory.

### Features

- FastAPI with CORS enabled
- Domain-based structure in `app/domains/`
- Example domain included
- Docker support with hot reload

### Setup (Local)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Setup (Docker)

```bash
cd backend
docker build -t backend .
docker run -p 8000:8000 -v $(pwd):/app backend
```

The backend will run on `http://localhost:8000`

- API docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

## Project Structure

```
HTV/
├── frontend/           # Next.js application
│   ├── app/           # Next.js App Router
│   ├── public/        # Static assets
│   └── ...
└── backend/           # FastAPI application
    ├── app/
    │   └── domains/   # Domain-based modules
    │       └── example/
    ├── main.py        # FastAPI entry point
    ├── Dockerfile     # Docker configuration
    └── requirements.txt
```
