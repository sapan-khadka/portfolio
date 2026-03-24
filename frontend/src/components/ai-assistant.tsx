"use client";

import { sendChatMessage } from "@/lib/api";
import { site } from "@/lib/content";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export function AiAssistant() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: `Hi — I’m a small assistant for ${site.name.split(" ")[0]}’s portfolio. Ask about projects, stack, or how things are built. Answers come from the FastAPI \`/chat\` route (OpenAI when \`OPENAI_API_KEY\` is set on the server).`,
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const historyForApi = [...messages, { role: "user" as const, text }].map((m) => ({
      role: m.role,
      content: m.text,
    }));
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const { reply } = await sendChatMessage(historyForApi);
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (e) {
      const detail = e instanceof Error ? e.message : "Request failed";
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: `Couldn’t reach the chat API (${detail}). Run \`uvicorn main:app --reload --host 127.0.0.1 --port 8000\` in /backend, or clear \`NEXT_PUBLIC_API_URL\` in .env.local to use the dev proxy at /api/portfolio.`,
        },
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      });
    }
  }, [input, loading, messages]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[130] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/40 ring-2 ring-cyan-400/30 dark:from-cyan-500 dark:to-blue-600 dark:shadow-cyan-500/30 md:bottom-8 md:right-8"
        aria-label="Open assistant"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -10, 0],
              }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] flex items-end justify-end bg-slate-950/50 p-4 backdrop-blur-md sm:items-center sm:justify-end sm:p-8 dark:bg-black/60"
            role="presentation"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="glass-panel flex h-[min(520px,85vh)] w-full max-w-md flex-col overflow-hidden rounded-2xl border-cyan-500/20 shadow-2xl shadow-cyan-500/10 dark:border-cyan-400/15"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio assistant"
            >
              <div className="flex items-center justify-between border-b border-card-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-700 dark:text-cyan-300">
                    <Bot className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Portfolio assistant</p>
                    <p className="text-[11px] text-muted">OpenAI when configured</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-muted hover:bg-foreground/5 hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div
                ref={listRef}
                className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 text-sm"
              >
                {messages.map((m, i) => (
                  <div
                    key={`${i}-${m.text.slice(0, 12)}`}
                    className={`max-w-[90%] rounded-2xl px-3 py-2 leading-relaxed ${
                      m.role === "user"
                        ? "ml-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 dark:from-cyan-500 dark:to-blue-600"
                        : "glass-panel mr-auto border border-card-border text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
                {loading && (
                  <div className="glass-panel mr-auto flex items-center gap-2 rounded-2xl px-3 py-2 text-muted">
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-500" />
                    Thinking…
                  </div>
                )}
              </div>

              <form
                className="flex gap-2 border-t border-card-border p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  void send();
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something…"
                  className="min-w-0 flex-1 rounded-xl border border-card-border bg-background/50 px-3 py-2.5 text-sm outline-none backdrop-blur-sm focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/15"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white transition hover:opacity-90 disabled:opacity-40"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
