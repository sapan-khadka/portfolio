"use client";

import { BrandIcons } from "@/components/brand-icons";
import {
  PROJECT_FILTERS,
  type ProjectCategory,
  projects,
} from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const fade = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.35 },
};

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.categories.includes(filter));
  }, [filter]);

  return (
    <section id="projects" className="scroll-mt-24 border-t border-card-border px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.h2 {...fade} className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Projects
        </motion.h2>
        <motion.h3
          {...fade}
          transition={{ ...fade.transition, delay: 0.03 }}
          className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Problem → approach → result
        </motion.h3>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.05 }}
          className="mt-3 text-sm leading-relaxed text-muted"
        >
          Each entry is something shippable. Hover (desktop) or open the panels (mobile) for more mechanics.
        </motion.p>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.07 }}
          className="mt-6 flex flex-wrap gap-1"
          role="tablist"
          aria-label="Filter projects"
        >
          {PROJECT_FILTERS.map((tag) => {
            const active = filter === tag;
            return (
              <button
                key={tag}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tag)}
                className={`border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide transition ${
                  active
                    ? "border-accent/45 bg-accent-muted text-foreground"
                    : "border-transparent text-muted hover:bg-card hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </motion.div>

        <ul className="mt-12 space-y-0">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.li
                key={p.title}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="group border-t border-card-border py-10 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className="font-display text-xl font-semibold tracking-tight">{p.title}</h4>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-muted">{p.highlight}</span>
                </div>
                <p className="mt-3 text-sm font-medium text-foreground/90">{p.summary}</p>

                <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
                  <div className="glass-panel rounded-xl p-4">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-cyan-700 dark:text-cyan-400/70">
                      Problem
                    </dt>
                    <dd className="mt-2 leading-relaxed text-muted">{p.problem}</dd>
                  </div>
                  <div className="glass-panel rounded-xl p-4">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-cyan-700 dark:text-cyan-400/70">
                      Approach
                    </dt>
                    <dd className="mt-2 leading-relaxed text-muted">{p.approach}</dd>
                  </div>
                  <div className="glass-panel rounded-xl p-4 sm:col-span-1">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-cyan-700 dark:text-cyan-400/70">
                      Result
                    </dt>
                    <dd className="mt-2 leading-relaxed text-muted">{p.result}</dd>
                  </div>
                </dl>

                {/* Desktop: hover reveals deeper breakdown */}
                <p className="mt-4 hidden text-sm leading-relaxed text-muted transition-opacity duration-200 lg:block lg:opacity-0 lg:group-hover:opacity-100">
                  {p.deepDive}
                </p>

                {/* Mobile / keyboard: expandable */}
                <details className="glass-panel mt-4 rounded-xl lg:hidden">
                  <summary className="cursor-pointer px-3 py-2.5 font-mono text-xs text-foreground">
                    Technical notes
                  </summary>
                  <p className="border-t border-card-border px-3 py-3 text-sm leading-relaxed text-muted">{p.deepDive}</p>
                </details>

                <details className="glass-panel mt-2 rounded-xl">
                  <summary className="flex cursor-pointer items-center gap-2 px-3 py-2.5 font-mono text-xs text-foreground">
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
                    Architecture & boundaries
                  </summary>
                  <p className="border-t border-card-border px-3 py-3 text-sm leading-relaxed text-muted">{p.architecture}</p>
                </details>

                <p className="mt-4 font-mono text-[11px] text-muted">{p.tech.join(" · ")}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  {p.github && (
                    <Link
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-foreground underline decoration-card-border underline-offset-4 transition hover:decoration-foreground/40"
                    >
                      <BrandIcons.GitHub className="h-3.5 w-3.5" />
                      Source
                    </Link>
                  )}
                  {p.demo && (
                    <Link
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted underline decoration-card-border underline-offset-4 transition hover:text-foreground"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live demo
                    </Link>
                  )}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {filtered.length === 0 && (
          <p className="mt-8 text-sm text-muted">Nothing under that filter.</p>
        )}
      </div>
    </section>
  );
}
