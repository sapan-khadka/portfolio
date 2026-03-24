"use client";

import { site } from "@/lib/content";
import { useEffect, useState } from "react";

/**
 * Subtle terminal-style line rotation — respects reduced motion.
 */
export function HeroTyping() {
  const lines = site.typingLines;
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (reduced || lines.length <= 1) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % lines.length), 4200);
    return () => window.clearInterval(id);
  }, [reduced, lines.length]);

  if (lines.length === 0) return null;

  return (
    <div
      className="glass-panel mt-8 rounded-xl px-4 py-3 font-mono text-[11px] leading-relaxed text-muted sm:text-xs"
      aria-live="polite"
    >
      <span className="text-cyan-600/70 dark:text-cyan-400/60">~ </span>
      <span className="text-foreground/90">{lines[i]}</span>
      {!reduced && (
        <span
          className="ml-0.5 inline-block h-3 w-1 translate-y-0.5 bg-cyan-500 animate-pulse dark:bg-cyan-400"
          aria-hidden
        />
      )}
    </div>
  );
}
