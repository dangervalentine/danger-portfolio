import Link from "next/link";

import type { CaseStudyLink } from "@/content/case-studies";

/** Closes the page the way it opened, with the outbound links on the right.
 *
 * A link with no href has nowhere to send the reader — an unreleased store, a
 * private repository. It renders as dimmed text rather than being dropped,
 * because the absence is information: the reader can see the app ships to
 * three platforms and that not all of them are public yet. */
export function CaseStudyFooter({ links }: { links: CaseStudyLink[] }) {
  return (
    <footer className="mx-auto mt-12 w-full max-w-6xl border-t border-edge px-6 pt-5 pb-10">
      <div className="flex flex-col gap-4 font-mono text-xs text-muted sm:flex-row sm:items-baseline sm:justify-between">
        <Link
          href="/#projects"
          className="underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          ← Back to projects
        </Link>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((link) => (
            <li key={link.label}>
              {link.href ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {link.label}
                </a>
              ) : (
                <span className="opacity-60">{link.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
