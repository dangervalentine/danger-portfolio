import Link from "next/link";

import type { CaseStudyLink } from "@/content/case-studies";

/** Closes the page the way it opened, with the outbound links on the right.
 *
 * A link with no href has nowhere to send the reader: an unreleased store, a
 * private repository. It renders as dimmed text rather than being dropped,
 * because the absence is information: the reader can see the app ships to
 * three platforms and that not all of them are public yet.
 *
 * Which makes this row a mixture of links and text in one colour, so the
 * links carry a standing underline rather than one that appears on hover.
 * Colour alone cannot be the difference (WCAG 1.4.1): the accent is 1.46:1
 * against the muted text around it, well under the 3:1 that would let it
 * stand on its own.
 *
 * The dimming is 75%, not 60%. At 60% the label measured 3.54:1 on the page
 * ground, under the 4.5:1 that 12px text has to meet; 75% is 4.84:1 and
 * still visibly a step below the links beside it. */
export function CaseStudyFooter({ links }: { links: CaseStudyLink[] }) {
  return (
    <footer className="mx-auto mt-12 w-full max-w-6xl border-t border-edge px-6 pt-5 pb-10">
      <div className="flex flex-col gap-4 font-mono text-xs text-muted sm:flex-row sm:items-baseline sm:justify-between">
        <Link
          href="/#projects"
          className="underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
                  className="underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {link.label}
                </a>
              ) : (
                <span className="opacity-75">{link.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
