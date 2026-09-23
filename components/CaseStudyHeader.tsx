import Link from "next/link";

import { CONTROL_MARK, controlClass } from "@/components/controls";
import { WEB_ICON_PATH } from "@/components/icons";

/** The case study's opening block.
 *
 * Deliberately not a hero: the argument this page makes is in the numbers and
 * the diagram below it, and a full-bleed title would push both under the fold
 * on the laptop screen most readers will open it on. */
export function CaseStudyHeader({
  title,
  platforms,
  years,
  summary,
  liveHref,
}: {
  title: string;
  platforms: string[];
  years: string;
  summary: string;
  /** The running web app. The card that links here used to go straight to
   * it; now that it opens this page instead, the page has to offer the way
   * on, and it does so up top rather than only in the footer. */
  liveHref?: string;
}) {
  return (
    <header className="mx-auto w-full max-w-6xl px-6 pt-10 pb-9">
      <Link
        href="/#projects"
        className="font-mono text-xs text-muted underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        ← Back to projects
      </Link>
      {/* Baseline-aligned so the platform list sits on the title's baseline
          rather than against its box, and wraps under it on a phone. */}
      <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 className="text-4xl font-bold tracking-tight text-heading sm:text-5xl">
          {title}
        </h1>
        <p className="font-mono text-xs text-accent sm:text-sm">
          {platforms.join(" · ")}
          {/* Muted so the dates read as a second fact rather than a fourth
              platform. */}
          <span className="text-muted">
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            {years}
          </span>
        </p>
      </div>
      {/* Capped well short of the column: this is one sentence of orientation
          and it should read as a line, not as a paragraph. */}
      <p className="mt-3 max-w-[760px] text-lg text-foreground">{summary}</p>
      {liveHref ? (
        <a
          href={liveHref}
          target="_blank"
          rel="noreferrer"
          className={controlClass("md", "mt-5")}
        >
          <svg
            viewBox="0 0 24 24"
            className={`${CONTROL_MARK} h-4 w-4`}
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path d={WEB_ICON_PATH} />
          </svg>
          Open the web app
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null}
    </header>
  );
}
