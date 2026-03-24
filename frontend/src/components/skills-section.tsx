"use client";

import { skillGroups } from "@/lib/content";
import { motion } from "framer-motion";

const fade = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.35 },
};

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-card-border px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.h2 {...fade} className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Skills
        </motion.h2>
        <motion.h3
          {...fade}
          transition={{ ...fade.transition, delay: 0.03 }}
          className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Tools and focus areas
        </motion.h3>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.05 }}
          className="mt-3 text-sm text-muted"
        >
          Grouped for scanning — depth is in the project writeups.
        </motion.p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((g, idx) => (
            <motion.div
              key={g.title}
              {...fade}
              transition={{ ...fade.transition, delay: 0.07 + idx * 0.04 }}
              className="glass-panel glass-hover rounded-2xl p-6"
            >
              <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-400/80">
                {g.title}
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-cyan-500/60 dark:text-cyan-400/50" aria-hidden>
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
