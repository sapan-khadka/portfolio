# Portfolio — Next.js + FastAPI

Personal portfolio: Next.js 14 (App Router), TypeScript, Tailwind, Framer Motion, dark/light theme, and an **optional** floating assistant backed by **FastAPI** + OpenAI. Contact is **email / links** (no in-browser form).

## Structure

| Path | Purpose |
|------|---------|
| `frontend/` | Next.js app — projects, skills, GitHub chart + live badges, terminal strip, resume link |
| `backend/` | FastAPI — `POST /chat`, `GET /health`, `POST /contact` (API still there if you wire email later) |
| `index.html` | Legacy single file (not used by the Next app) |

## Personalize

Edit **`frontend/src/lib/content.ts`** — name, links, projects, `githubPortfolioRepo` (slug for Shields badges, usually `portfolio`).

## Run locally

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # optional: OPENAI_API_KEY for /chat
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Leave **`NEXT_PUBLIC_API_URL`** unset in `.env.local` to use the dev **rewrite** to `http://127.0.0.1:8000`, or set it explicitly to that URL. See **`frontend/.env.example`**.

Open [http://localhost:3000](http://localhost:3000).

### OpenAI (optional)

In `backend/.env`:

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
```

Without a key, `/chat` returns a short fallback message.

## Deploy

- **Frontend:** Vercel (root **`frontend`**). Set **`NEXT_PUBLIC_API_URL`** to your public API URL (no trailing slash).
- **Backend:** Railway, Render, Fly.io, etc. Set **`ALLOWED_ORIGINS`** to your site origin(s). Bind `0.0.0.0` and use the host’s **`PORT`**.

## Scripts

```bash
cd frontend && npm run build && npm run start
```
