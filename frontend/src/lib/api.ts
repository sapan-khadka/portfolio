/**
 * If NEXT_PUBLIC_API_URL is set → call that origin (needs CORS on the API).
 * Otherwise → same-origin `/api/portfolio` (Next rewrites to FastAPI in dev, or BACKEND_REWRITE_TARGET in prod).
 */
function apiBase(): string {
  if (typeof window === "undefined") return "";
  const explicit = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  return "/api/portfolio";
}

export type ChatTurn = { role: "user" | "assistant"; content: string };

export async function sendChatMessage(messages: ChatTurn[]) {
  const base = apiBase();
  const res = await fetch(`${base}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const detail = (err as { detail?: string | unknown }).detail;
    const msg =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
          ? detail.map((d: { msg?: string }) => d?.msg).filter(Boolean).join(" ")
          : "Chat failed";
    throw new Error(msg || "Chat failed");
  }
  return res.json() as Promise<{ reply: string }>;
}
