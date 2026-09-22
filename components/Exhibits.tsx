import type { Exhibit } from "@/content/case-studies";

/** Resume entries, one card each: a title, the one-line problem, and three
 * bullets on how it was handled.
 *
 * The problem line is set larger than the bullets because it is the hook. The
 * bullets are written to be scanned and asked about, not read through, so they
 * get resume weight: short, verb-led, a small marker rather than a label. Two
 * columns from lg up so all four cards sit in one screen. */
export function Exhibits({ exhibits }: { exhibits: Exhibit[] }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-10 lg:pt-14">
      <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">
        Exhibits
      </h2>

      <ul className="mt-6 grid gap-4 lg:grid-cols-2">
        {exhibits.map((exhibit) => (
          <li
            key={exhibit.title}
            className="flex flex-col rounded-[10px] border border-edge bg-surface p-5 sm:p-7"
          >
            <h3 className="text-xl font-semibold tracking-tight text-heading">
              {exhibit.title}
            </h3>
            <p className="mt-2 text-[17px] leading-relaxed text-foreground">
              {exhibit.problem}
            </p>
            <ul className="mt-4 flex flex-col gap-2 border-t border-edge pt-4">
              {exhibit.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-sm leading-relaxed text-muted">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
