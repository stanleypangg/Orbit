# Repository Guidelines

## Project Structure & Module Organization
- `backend/app` holds FastAPI services: `endpoints/` for HTTP routers, `workflows/` for LangGraph orchestration, `core/` for config and Redis access, and `lib/` for external clients.
- Backend tests live mainly in `backend/app/workflows/testing/` for unit and integration coverage, with phase regression scripts (`test_phase*.py`) at the backend root.
- `frontend/app` is the Next.js App Router; UI primitives live in `frontend/components/`, and shared helpers in `frontend/lib/`.
- Shared docs sit under `backend/` and the repo root; update the nearest doc when behavior shifts.

## Build, Test, and Development Commands
- Backend setup: `cd backend && pip install -r requirements.txt`.
- Local API: `uvicorn main:app --reload --port 8000`; Docker alternative: `docker-compose up --build`.
- Frontend setup: `cd frontend && npm install`; run locally with `npm run dev`, production build via `npm run build` then `npm run start`.
- Test suite: from `backend/`, run `python -m pytest app/workflows/testing -v` for unit/integration; use `python run_all_tests.py` to execute the full multi-phase regression.

## Coding Style & Naming Conventions
- Python follows PEP 8 with 4-space indents, type-hinted signatures, and module-level docstrings (`backend/app/workflows/graph.py` is the template).
- Keep LangGraph node names explicit (`P1a_extract`, `G1_goal_formation`) and mirror them in tests for traceability.
- TypeScript components stay in PascalCase (`ChatPanel.tsx`), hooks/utilities in camelCase, and keep Tailwind classes inline.
- No repo-wide formatter is wired; before opening a PR, self-format Python with `black`-compatible spacing and TypeScript with Prettier or `npm exec prettier --write`.

## Testing Guidelines
- Add backend tests beside the feature under `backend/app/workflows/testing/`; name files `test_<domain>.py`.
- Phase regression scripts (`test_phase2.py`–`test_phase4.py`) catch cross-node breakage—update them when workflow transitions change and ensure `python run_all_tests.py` passes.
- Frontend currently lacks automated tests; document manual QA steps in the PR.

## Commit & Pull Request Guidelines
- Match the existing history: single-line, imperative commits (e.g., `Integrate production AI agent with existing workflow`).
- Rebase onto the latest main, group logical changes, and reference issue IDs in the body if applicable.
- PRs must include: clear summary, testing evidence (`python run_all_tests.py`, `npm run build`), screenshots/GIFs for UI tweaks, and notes on config or doc updates.

## Environment & Security Notes
- Backend requires `.env` with `GEMINI_API_KEY`, optional Redis host overrides, and a running Redis instance (`redis-server` locally or docker service).
- Never commit secrets; instead, update `.env.example` when new variables are introduced and call out migrations in the PR description.
