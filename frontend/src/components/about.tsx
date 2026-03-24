"use client";

import { about, education } from "@/lib/content";
import { motion } from "framer-motion";

const fade = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.35 },
};

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.h2 {...fade} className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          About
        </motion.h2>
        <motion.h3
          {...fade}
          transition={{ ...fade.transition, delay: 0.03 }}
          className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          How I work
        </motion.h3>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className="mt-8 space-y-4 text-sm leading-relaxed text-muted sm:text-base"
        >
          {about.lines.map((line) => (
            <p key={line.slice(0, 48)}>{line}</p>
          ))}
        </motion.div>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.09 }}
          className="glass-panel glass-hover mt-10 rounded-2xl p-5"
        >
          <p className="font-mono text-[11px] uppercase tracking-wide text-cyan-600 dark:text-cyan-400/90">
            Education
          </p>
          <p className="mt-2 text-sm text-foreground">
            {education.degree}, {education.institution} — {education.expectedGraduation}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
