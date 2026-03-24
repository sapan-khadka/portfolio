"use client";

import { experience } from "@/lib/content";
import { motion } from "framer-motion";

const fade = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.35 },
};

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-card-border px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.h2 {...fade} className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Experience
        </motion.h2>
        <motion.h3
          {...fade}
          transition={{ ...fade.transition, delay: 0.03 }}
          className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Roles and context
        </motion.h3>

        <ul className="mt-10 space-y-6">
          {experience.map((job, idx) => (
            <motion.li
              key={`${job.org}-${job.role}`}
              {...fade}
              transition={{ ...fade.transition, delay: 0.05 + idx * 0.05 }}
              className="glass-panel glass-hover rounded-2xl p-6"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <p className="font-medium text-foreground">{job.role}</p>
                  <p className="text-sm text-muted">{job.org}</p>
                </div>
                <p className="font-mono text-xs text-cyan-700/80 dark:text-cyan-400/70">{job.period}</p>
              </div>
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted">
                {job.bullets.map((b) => (
                  <li key={b.slice(0, 40)}>{b}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
