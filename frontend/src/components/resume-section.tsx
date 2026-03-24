"use client";

import { site } from "@/lib/content";
import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.35 },
};

export function ResumeSection() {
  return (
    <section id="resume" className="scroll-mt-24 border-t border-card-border px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.h2 {...fade} className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Resume
        </motion.h2>
        <motion.h3
          {...fade}
          transition={{ ...fade.transition, delay: 0.03 }}
          className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          One-page PDF
        </motion.h3>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.05 }}
          className="mt-3 max-w-xl text-sm leading-relaxed text-muted"
        >
          Same facts as the site, formatted for recruiters. Add your file as{" "}
          <code className="text-foreground/80">public/resume.pdf</code> so this button downloads it.
        </motion.p>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.08 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href={site.resumeUrl}
            download
            className="glass-panel glass-hover inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground"
          >
            <FileDown className="h-4 w-4" aria-hidden />
            Download resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
