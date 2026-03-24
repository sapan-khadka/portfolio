"use client";

import { site } from "@/lib/content";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      {/* Top bar — always above menu + scrim */}
      <div
        className={`relative z-[120] border-b transition-all ${
          scrolled
            ? "border-cyan-500/10 bg-background/75 shadow-lg shadow-cyan-500/5 backdrop-blur-xl dark:border-white/5 dark:shadow-black/40"
            : "border-transparent bg-background/40 backdrop-blur-md dark:bg-background/30"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="#top"
            className="flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => setOpen(false)}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 to-blue-600/10 font-mono text-xs font-bold text-cyan-700 dark:text-cyan-300">
              {site.name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)}
            </span>
            <span className="hidden text-sm font-medium sm:inline">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-5 text-sm text-muted lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition hover:text-foreground dark:hover:text-cyan-200/90"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-card-border bg-card/50 backdrop-blur-sm lg:hidden"
              aria-expanded={open}
              aria-controls={open ? "mobile-nav" : undefined}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile only when open — avoids z-index fights with page content */}
      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-x-0 bottom-0 top-14 z-[105] bg-slate-950/55 backdrop-blur-sm lg:hidden dark:bg-black/65"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-x-0 bottom-0 top-14 z-[110] flex flex-col overflow-y-auto border-t border-card-border bg-background shadow-2xl lg:hidden dark:shadow-black/50"
          >
            <nav className="flex flex-col px-4 py-4 sm:px-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="border-b border-card-border py-3.5 text-sm font-medium transition hover:text-cyan-600 dark:hover:text-cyan-300 last:border-b-0"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
