import Link from "next/link";

import { resume } from "@/content/resume";

/** Nine years of employment, compressed to what a visitor needs before
 * deciding whether to read further.
 *
 * The site had no surface for this at all: every project on the home page is
 * independent work, so a reader arriving cold met an extremely productive
 * hobbyist with no visible job history. The `availability` line already
 * advertises senior full-stack and mobile roles; this is the evidence under
 * that claim.
 *
 * One line per role, not the résumé's bullets. The full document is one
 * click away and this band exists to establish that it is worth the click. */
export function Experience() {
  return (
    <section id="experience" className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-heading">
        Experience
      </h2>

      <ol className="flex flex-col">
        {resume.engagements.map((role) => (
          <li
            key={role.company}
            className="border-t border-edge py-5 first:border-t-0 first:pt-0"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              {/* The company name links out, as it does on the résumé page —
                  the same fact should behave the same way in both places. */}
              <h3 className="text-lg font-semibold tracking-tight text-heading">
                <a
                  href={role.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {role.company}
                </a>
              </h3>
              <p className="font-mono text-xs text-muted">
                {role.dates.start} &ndash; {role.dates.end}
              </p>
            </div>
            <p className="mt-0.5 font-mono text-[13px] text-accent">
              {role.title}
            </p>
            {/* The role's own summary where it has one, and its first bullet
                where it does not — every current engagement has a summary,
                but the fallback keeps this from breaking the day one is
                added without. */}
            <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground">
              {role.summary ?? role.bullets[0]}
            </p>
            {/* Grouped by layer rather than flattened. Creed's stack is 25
                items, and as one undifferentiated run they read as a wall to
                skip, which is a waste: this line is the only place on the
                home page where the professional technologies appear at
                all. The labels cost a word each and turn the run into five
                things a reader can scan for. */}
            {role.stack ? (
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
                {role.stack.map((group) => (
                  <li key={group.label}>
                    <span className="text-accent">{group.label}</span>{" "}
                    {group.items.join(" · ")}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>

      <p className="mt-8 font-mono text-[13px] text-muted">
        Full history, independent products and the complete stack on the{" "}
        <Link
          href="/resume"
          className="text-accent underline-offset-2 hover:underline"
        >
          résumé
        </Link>
        .
      </p>
    </section>
  );
}
