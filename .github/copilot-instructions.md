# Copilot Instructions
- Always check TaskContext.md if you forget or need to think about the task. so you never forget
## ✅ Behavior

- After saving a user message, extract events/tasks using Azure OpenAI (GPT-4o)
- Extracted tasks must include `description` and `date` (ISO format)
- Normalize task `date` to the Monday of that week
- Save valid tasks to a CosmosDB `events` collection
- Frontend automatically fetches tasks from `/api/calendar/events`
- Tasks are displayed in a calendar view on the correct week

---

## 📁 Key Files

- `app.py`: Main backend logic and chat/message handling routes
- `backend/events.py`: Event extraction logic (new module)
- `backend/settings.py`: Loads environment and Azure/OpenAI configs
- `backend/utils.py`: Backend utility functions (optional)
- `frontend/src/pages/CalendarView.tsx`: Fetches and displays calendar tasks
- `frontend/src/api.ts`: Defines API call to `/api/calendar/events`
- `frontend/src/Layout.tsx`: App layout wrapper and route shell
- `.env`: Read-only, used for config (e.g., Azure model settings)

---

## 🔐 Access Rules

You may:
-  if asked to start app you are allowed to start the app direcly in terminal, run the virtual envrionment in  `.venv` ./.venv/Scripts/Activate.ps1 and only after this is run! not in the same line run  ./start.cmd to start the backend.
- Modify files under `backend/**` and `frontend/src/**`
- Read `.env` to access configuration values

Do not go into:
- `node_modules/`, `.venv/` internals, `__pycache__/`
- `infra/`, `infrastructure/`, `notebooks/`, `scripts/`, `tools/`, `tests/`, `static/`, `public/`
- GitHub workflows or deployment YAMLs unless explicitly updating deployment logic

---

## 🧠 Copilot Defaults

- Use `async def` / `await` in backend Python code
- Use `useEffect`, `useState`, and `fetch` in frontend React logic
- Ask before renaming or deleting files
- Write clean, modular, well-typed, and documented code
- Handle errors gracefully with fallbacks where appropriate

---

## 🆘 Context Recovery

If documentation or file structure is unclear:
- Refer to `README.md` or `README_azd.md` for project architecture and setup
- Refer to `MermaidDiagram.md` for system flow
- You can also use the following tools for live documentation:
  - `@context7 resolve-library-id`
  - `@context7 get-library-docs`
