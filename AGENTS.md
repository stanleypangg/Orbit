# Repository Guidelines

## Project Structure & Module Organization
HTV splits into `frontend/` (Next.js App Router) and `backend/` (FastAPI, LangGraph workflows). UI routes live in `frontend/app/`, shared components in `frontend/components/`, and utilities in `frontend/lib/`. Backend routers sit in `backend/app/endpoints/`, while workflow logic and state models are under `backend/app/workflows/` with tests colocated in `backend/app/workflows/testing/`. Docker assets reside in `backend/docker-compose*.yml`; monitoring and load tools live beside them.

## Build, Test, and Development Commands
Install backend dependencies with `cd backend && pip install -r requirements.txt`, then run `uvicorn main:app --reload --port 8000`. For the UI, run `cd frontend && npm install` and `npm run dev` (Turbopack) on port 3000. Execute the full regression suite via `cd backend && python run_all_tests.py`, or target the core unit tests with `pytest app/workflows/testing -v --tb=short`. Container workflows use `cd backend && docker-compose up --build` to launch the API, Redis, and nginx.

## Coding Style & Naming Conventions
Backend Python adheres to PEP 8, 4-space indents, and type-annotated functions (`backend/app/workflows/state.py`). Keep routers modular (`router = APIRouter()` per domain) and handle IO with explicit `async`/`await`. In the Next.js app, prefer `const`, `camelCase` hooks, and PascalCase components (`frontend/components/ChatHeader.tsx`); colocate styles via Tailwind utility classes ordered layout → spacing → typography. Environment helpers belong inside the backend to avoid leaking secrets to the browser.

## Testing Guidelines
Tests rely on `pytest` and `pytest-asyncio`, stored under `backend/app/workflows/testing/`. Name files `test_<feature>.py`, and share fixtures through `conftest.py` when mocking Redis or Gemini clients. Extend the phase harnesses (`test_phase2.py`–`test_phase4.py`) when modifying workflow steps, asserting both happy-path and interruption branches. Run `python run_all_tests.py` before commits and attach console excerpts to PRs on failure.

## Commit & Pull Request Guidelines
Stay consistent with the log: short, present-tense subjects such as `workflow` or `fixed docker compose issue`. Split backend and frontend work into separate commits when changes are independent. PRs must describe motivation, list commands executed (e.g., `python run_all_tests.py`), link tracking issues, and include screenshots or recordings for UI changes. Note environment or schema updates in a dedicated checklist so reviewers can reproduce quickly.

## Environment & Secrets
Copy `backend/.env.example` to `.env`, populate `GEMINI_API_KEY`, `GEMINI_MODEL`, and Redis settings, and keep the file untracked. Start Redis locally with `brew services start redis` or via Docker Compose before running the API. Expose only `NEXT_PUBLIC_*` variables to the frontend; keep all other credentials server-side. Review `backend/nginx.prod.conf` before deploying containers to ensure SSE and websocket routes remain accessible.
