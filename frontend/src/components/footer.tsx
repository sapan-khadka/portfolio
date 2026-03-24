import { BrandIcons } from "@/components/brand-icons";
import { site } from "@/lib/content";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-card-border px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-muted">
          © {year} {site.name}.
        </p>
        <div className="flex gap-4 text-muted">
          <Link
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
            aria-label="GitHub"
          >
            <BrandIcons.GitHub className="h-4 w-4" />
          </Link>
          <Link
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
            aria-label="LinkedIn"
          >
            <BrandIcons.LinkedIn className="h-4 w-4" />
          </Link>
          {site.kaggle && (
            <Link
              href={site.kaggle}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
              aria-label="Kaggle"
            >
              <BrandIcons.Kaggle className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
