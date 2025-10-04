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
