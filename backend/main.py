"""
Portfolio API: contact form + optional OpenAI-powered chat.
Run: uvicorn main:app --reload --host 127.0.0.1 --port 8000
"""

from __future__ import annotations

import os
from contextlib import asynccontextmanager
from typing import List, Literal

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

# In-memory log of contact submissions (demo only — use email/DB in production)
contact_log: List[dict] = []


def _allowed_origins() -> list[str]:
    raw = os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    )
    return [o.strip() for o in raw.split(",") if o.strip()]


DEFAULT_PORTFOLIO_CONTEXT = """\
The student is Sapan Khadka: CS undergraduate, focus on Python, AI integration, and backends.
Notable projects: (1) Smart Email Auto-Responder — Python, Gmail API, NLP preprocessing, LLM replies with review.
(2) This portfolio — Next.js + FastAPI, contact API, optional chat. (3) Secure medicine store — full-stack with MySQL and auth.
Be accurate; do not invent employers or credentials. Keep answers concise."""


@asynccontextmanager
async def lifespan(_: FastAPI):
    yield


app = FastAPI(title="Portfolio API", version="1.0.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins(),
    # Any localhost / 127.0.0.1 port (Next.js often uses 3001, 3002, …)
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactBody(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=8000)


class ChatTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., min_length=1, max_length=12000)


class ChatBody(BaseModel):
    messages: List[ChatTurn] = Field(..., min_length=1, max_length=40)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/contact")
def contact(body: ContactBody):
    entry = {
        "name": body.name,
        "email": str(body.email),
        "message": body.message,
    }
    contact_log.append(entry)
    return {"ok": True}


@app.post("/chat")
async def chat(body: ChatBody):
    key = os.getenv("OPENAI_API_KEY")
    portfolio = os.getenv("PORTFOLIO_CONTEXT", DEFAULT_PORTFOLIO_CONTEXT)
    system_prompt = (
        "You are a concise assistant for this student's portfolio website. "
        "Use the context below; answer in short paragraphs or bullets (under ~200 words). "
        "If asked something unrelated, politely redirect to projects, stack, or contacting the student.\n\n"
        f"Context:\n{portfolio}"
    )

    if not key:
        return {
            "reply": (
                "The API is up, but OPENAI_API_KEY is not set on the server. "
                "Add it to backend/.env and restart uvicorn for live answers. "
                "Until then, browse Projects or use the contact form."
            )
        }

    # Keep last turns so we stay within typical context limits
    turns = body.messages[-20:]
    openai_messages: list[dict[str, str]] = [{"role": "system", "content": system_prompt}]
    for t in turns:
        openai_messages.append({"role": t.role, "content": t.content})

    try:
        from openai import OpenAI

        client = OpenAI(api_key=key)
        completion = client.chat.completions.create(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            messages=openai_messages,
            max_tokens=500,
        )
        text = completion.choices[0].message.content or ""
        return {"reply": text.strip()}
    except Exception as e:  # noqa: BLE001
        raise HTTPException(
            status_code=502,
            detail="Model request failed. Check OPENAI_API_KEY, model name, and quota.",
        ) from e
