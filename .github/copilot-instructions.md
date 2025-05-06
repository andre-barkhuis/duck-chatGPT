# Copilot Instructions

This is a full-stack AI chat application. It saves user messages, extracts calendar events using GPT-4o, and displays them on a frontend calendar. The goal is automation — no buttons, just natural flow from chat to stored event.

---

## Behavior

- After saving a user message, extract events via GPT-4o
- Save events to CosmosDB
- Frontend auto-fetches events from `/api/calendar/events`

---

## Key Files

- `app.py`: Main backend logic and routes
- `backend/settings.py`: Loads config and environment vars
- `backend/utils.py`: Backend helpers
- `frontend/src/index.tsx`: React root
- `frontend/src/Layout.tsx`: Page layout
- `frontend/src/pages/CalendarView.tsx`: Displays calendar events
- `.env`: May be read (but not modified)

---

## Access Rules

You may use:
- `backend/**` (except `__pycache__/`)
- `frontend/src/**`
- `.env` (read-only, for config logic)

Ignore:
- `node_modules/`, `.venv/`, `__pycache__/`
- `infra/`, `infrastructure/`, `notebooks/`, `scripts/`, `tools/`, `tests/`, `static/`, `public/`
- Workflow YAMLs unless editing deployment

---

## Copilot Defaults

- Write clean, modular code
- Use `async/await` for backend logic
- Use `useEffect` for frontend effects and data
- Ask before renaming or deleting multiple files
- Comment all structural or architectural changes

---

## Context Recovery

If context is unclear:
- Refer to `README.md` and `README_azd.md` for setup and architecture
- Use `MermaidDiagram.md` to understand the intended system flow
- Call `@context7` tools:
  - `resolve-library-id`
  - `get-library-docs`
