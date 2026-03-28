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
          transition={{ ...fade.transition, delay: 0.055 }}
          className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <p className="text-xs text-muted sm:mr-2">Live on this repo —</p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`https://github.com/${user}/${site.githubPortfolioRepo}/commits`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block leading-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- shields.io dynamic badge */}
              <img
                src={`https://img.shields.io/github/last-commit/${encodeURIComponent(user)}/${encodeURIComponent(site.githubPortfolioRepo)}?style=flat-square&logo=github&label=last%20push&color=0891b2`}
                alt="Last commit on portfolio repository"
                height={20}
                className="h-5"
                loading="lazy"
              />
            </Link>
            <Link
              href={`https://github.com/${user}/${site.githubPortfolioRepo}/graphs/commit-activity`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block leading-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.shields.io/github/commit-activity/m/${encodeURIComponent(user)}/${encodeURIComponent(site.githubPortfolioRepo)}?style=flat-square&logo=github&label=commits%20%2F%20month&color=0891b2`}
                alt="Commits per month on portfolio repository"
                height={20}
                className="h-5"
                loading="lazy"
              />
            </Link>
          </div>
        </motion.div>

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
