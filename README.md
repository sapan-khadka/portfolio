# Portfolio — Next.js + Tailwind + FastAPI

A modern, deployment-ready personal portfolio for an undergraduate in software engineering and AI: responsive layout, dark mode, Framer Motion accents, a **FastAPI** backend for the contact form, and an **optional OpenAI-powered** assistant widget.

## Structure

| Path | Purpose |
|------|---------|
| `frontend/` | Next.js 14 (App Router), TypeScript, Tailwind, `next-themes`, Framer Motion |
| `backend/` | FastAPI — `POST /contact`, `POST /chat`, `GET /health` |
| `index.html` | Legacy single-file portfolio (optional; not used by the new app) |

## Personalize

Edit **`frontend/src/lib/content.ts`** — name, title, links, about copy, education, and projects. Update GitHub URLs to your real repositories.

## Run locally

### 1. Backend (terminal A)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # optional: add OPENAI_API_KEY for /chat
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### 2. Frontend (terminal B)

```bash
cd frontend
cp .env.example .env.local  # points to http://127.0.0.1:8000
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The contact form and floating assistant call the API at `NEXT_PUBLIC_API_URL`.

### Optional: OpenAI

Add to `backend/.env`:

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
```

Without a key, `/chat` still responds with a friendly fallback message.

## Production deployment

- **Frontend (Vercel / Netlify):** Connect the `frontend` directory (or monorepo with root set to `frontend`). Set env **`NEXT_PUBLIC_API_URL`** to your public API URL (no trailing slash).
- **Backend:** Deploy `backend` to Railway, Render, Fly.io, or similar. Set **`ALLOWED_ORIGINS`** to your real site origin(s), comma-separated, e.g. `https://yourname.vercel.app`.
- **GitHub Pages:** Export the Next app (`output: 'export'` in `next.config.mjs`) or host only the static `out/` folder; you still need a **separately hosted** API for the form and chat.

## Contact form note

Submissions are appended to an in-memory list for demos. For production, wire `POST /contact` to email (Resend, SendGrid) or a database.

## Scripts

```bash
cd frontend && npm run build   # production build
cd frontend && npm run start   # serve built app
```
