"use client";

import { BrandIcons } from "@/components/brand-icons";
import { site } from "@/lib/content";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-card-border px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.h2 {...fade} className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Contact
        </motion.h2>
        <motion.h3
          {...fade}
          transition={{ ...fade.transition, delay: 0.03 }}
          className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl"
        >
          Say hi
        </motion.h3>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className="mt-3 text-sm leading-relaxed text-muted"
        >
          Internship questions, repo bugs, whatever — email or LinkedIn works best.
        </motion.p>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.08 }}
          className="glass-panel mt-10 max-w-xl rounded-2xl p-5 sm:p-6"
        >
          <div className="space-y-5 text-sm">
            <div>
              <div className="flex items-center gap-2 text-muted">
                <Mail className="h-4 w-4" aria-hidden />
                <span className="font-medium text-foreground">Email</span>
              </div>
              <a href={`mailto:${site.email}`} className="mt-1 block hover:underline">
                {site.email}
              </a>
              <a
                href={`mailto:${site.schoolEmail}`}
                className="mt-0.5 block text-muted hover:text-foreground hover:underline"
              >
                {site.schoolEmail}
              </a>
            </div>
            <div>
              <p className="font-medium text-foreground">Phone</p>
              <a
                href={`tel:+1${site.phone.replace(/\D/g, "")}`}
                className="mt-1 block text-muted hover:text-foreground hover:underline"
              >
                {site.phone}
              </a>
            </div>
            <div>
              <p className="font-medium text-foreground">Elsewhere</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-muted">
                <Link
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground hover:underline"
                >
                  <BrandIcons.GitHub className="h-3.5 w-3.5" />
                  GitHub
                </Link>
                <Link
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground hover:underline"
                >
                  <BrandIcons.LinkedIn className="h-3.5 w-3.5" />
                  LinkedIn
                </Link>
                {site.kaggle && (
                  <Link
                    href={site.kaggle}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-foreground hover:underline"
                  >
                    <BrandIcons.Kaggle className="h-3.5 w-3.5" />
                    Kaggle
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
