"use client";

import { site } from "@/lib/content";
import { motion } from "framer-motion";
import Link from "next/link";

const fade = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.35 },
};

function githubUsername(url: string): string | null {
  try {
    const u = new URL(url);
    const parts = u.pathname.replace(/^\/+|\/+$/g, "").split("/");
    return parts[0] || null;
  } catch {
    return null;
  }
}

/**
 * Optional contribution heatmap via third-party SVG (no API key).
 * @see https://github.com/2016rshah/github-chart-api
 */
export function GitHubContributions() {
  const user = githubUsername(site.github);
  if (!user) return null;

  const chartSrc = `https://ghchart.rshah.org/${encodeURIComponent(user)}`;

  return (
    <section
      id="github-activity"
      className="scroll-mt-24 border-t border-card-border px-4 py-16 sm:px-6 sm:py-16"
      aria-label="GitHub activity"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2 {...fade} className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          GitHub
        </motion.h2>
        <motion.h3
          {...fade}
          transition={{ ...fade.transition, delay: 0.03 }}
          className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl"
        >
          Contribution history
        </motion.h3>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.05 }}
          className="mt-2 text-sm text-muted"
        >
          Chart hosted by{" "}
          <a
            href="https://github.com/2016rshah/github-chart-api"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-card-border underline-offset-2 hover:text-foreground"
          >
            ghchart
          </a>
          ; palette follows their default.
        </motion.p>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.07 }}
          className="glass-panel glass-hover mt-6 overflow-x-auto rounded-2xl p-4"
        >
          <Link href={site.github} target="_blank" rel="noopener noreferrer" className="block w-max min-w-full">
            {/* eslint-disable-next-line @next/next/no-img-element -- external dynamic SVG */}
            <img
              src={chartSrc}
              alt={`GitHub contribution graph for ${user}`}
              width={800}
              height={128}
              className="h-auto max-w-none rounded-lg opacity-95 dark:brightness-110 dark:contrast-95"
              loading="lazy"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
