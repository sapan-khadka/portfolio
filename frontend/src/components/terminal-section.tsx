"use client";

import { terminalLog } from "@/lib/content";
import { motion } from "framer-motion";

const fade = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.35 },
};

export function TerminalSection() {
  return (
    <section
      id="terminal"
      className="scroll-mt-24 border-t border-card-border px-4 py-16 sm:px-6 sm:py-20"
      aria-label="System-style activity log (illustrative)"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2 {...fade} className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Activity
        </motion.h2>
        <motion.h3
          {...fade}
          transition={{ ...fade.transition, delay: 0.03 }}
          className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Terminal-style trace
        </motion.h3>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.05 }}
          className="mt-3 text-sm text-muted"
        >
          Illustrative log lines — not a live feed. They mirror how the real pipelines are structured.
        </motion.p>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.08 }}
          className="mt-8 overflow-hidden rounded-2xl border border-cyan-500/15 bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-slate-400 shadow-xl shadow-cyan-500/5 sm:p-5 dark:border-cyan-400/10"
        >
          <div className="mb-3 flex items-center gap-2 border-b border-slate-700/80 pb-2 text-slate-500">
            <span className="h-2 w-2 rounded-full bg-red-400/90" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-amber-400/90" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-emerald-400/90" aria-hidden />
            <span className="ml-2 text-[10px] tracking-wide text-slate-500">local · portfolio</span>
          </div>
          <ul className="space-y-1.5">
            {terminalLog.map((row, i) => (
              <motion.li
                key={`${row.t}-${i}`}
                initial={{ opacity: 0, x: -4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                className={
                  row.t === "cmd"
                    ? "text-cyan-400"
                    : row.t === "out"
                      ? "text-slate-300"
                      : "text-slate-500"
                }
              >
                {row.m}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
