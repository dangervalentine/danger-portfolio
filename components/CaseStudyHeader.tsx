import Link from "next/link";

/** The case study's opening block.
 *
 * Deliberately not a hero: the argument this page makes is in the numbers and
 * the diagram below it, and a full-bleed title would push both under the fold
 * on the laptop screen most readers will open it on. */
export function CaseStudyHeader({
  title,
  platforms,
  summary,
}: {
  title: string;
  platforms: string[];
  summary: string;
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
        </p>
      </div>
      {/* Capped well short of the column: this is one sentence of orientation
          and it should read as a line, not as a paragraph. */}
      <p className="mt-3 max-w-[760px] text-lg text-foreground">{summary}</p>
    </header>
  );
}
