"use client";

import { BrandIcons } from "@/components/brand-icons";
import { HeroTyping } from "@/components/hero-typing";
import { site } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const githubDisplay = site.github.replace(/^https?:\/\/(www\.)?github\.com\//, "");
  const linkedinDisplay = site.linkedin.replace(/^https?:\/\/(www\.)?/, "");

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-card-border px-4 pb-24 pt-28 sm:px-6 sm:pb-28 sm:pt-32"
    >
      {/* Floating accent tags */}
      <motion.div
        className="pointer-events-none absolute right-4 top-24 hidden select-none md:block lg:right-8 lg:top-28"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <motion.span
          className="glass-panel mb-3 block rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-600 dark:text-cyan-300"
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          Available · internships
        </motion.span>
        <motion.span
          className="glass-panel ml-8 block rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-blue-600/90 dark:text-blue-300/90"
          animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          Python · AI systems
        </motion.span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.p {...fade} className="mb-6 font-mono text-[12px] text-muted sm:text-[13px]">
          {site.location}
        </motion.p>

        <motion.h1
          {...fade}
          transition={{ ...fade.transition, delay: 0.03 }}
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.65rem]"
        >
          <span className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:via-cyan-100 dark:to-cyan-400/90">
            {site.name}
          </span>
        </motion.h1>

        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className="mt-3 text-base font-medium text-foreground/95 sm:text-lg"
        >
          {site.headline}
        </motion.p>

        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.09 }}
          className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-base"
        >
          {site.tagline}
        </motion.p>

        <HeroTyping />

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.14 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            href="#projects"
            className="inline-flex rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-500/40 dark:from-cyan-400 dark:to-blue-500 dark:shadow-cyan-400/20"
          >
            View projects
          </Link>
          <a
            href={site.resumeUrl}
            download
            className="glass-panel glass-hover inline-flex rounded-full px-5 py-2.5 text-sm font-medium text-foreground"
          >
            Resume (PDF)
          </a>
          <Link
            href="#contact"
            className="px-2 text-sm text-muted underline decoration-cyan-500/30 underline-offset-4 transition hover:text-foreground dark:decoration-cyan-400/30"
          >
            Contact
          </Link>
        </motion.div>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.17 }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          <div className="flex gap-3">
            <Link
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition hover:text-cyan-600 dark:hover:text-cyan-300"
              aria-label="GitHub"
            >
              <BrandIcons.GitHub className="h-5 w-5" />
            </Link>
            <Link
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition hover:text-cyan-600 dark:hover:text-cyan-300"
              aria-label="LinkedIn"
            >
              <BrandIcons.LinkedIn className="h-5 w-5" />
            </Link>
          </div>
          <span className="hidden h-4 w-px bg-card-border sm:block" aria-hidden />
          <p className="font-mono text-[11px] text-muted sm:text-xs">
            <a href={site.github} className="hover:text-foreground">
              {githubDisplay}
            </a>
            <span className="mx-2 text-card-border">·</span>
            <a href={site.linkedin} className="hover:text-foreground">
              {linkedinDisplay}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
