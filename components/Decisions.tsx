import type { Decision } from "@/content/case-studies";

/** The choices a reviewer would ask about, each with the reason in one line.
 * Short by design: the content file keeps only choices that are neither the
 * default for this kind of product nor already told by an exhibit. */
export function Decisions({ decisions }: { decisions: Decision[] }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-10 lg:pt-14">
      <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">
        Decisions
      </h2>

      <ul className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-x-10">
        {decisions.map((decision) => (
          <li key={decision.claim} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              // A top margin rather than a baseline alignment: the marker
              // should sit against the first line's x-height, and a flex item
              // has no baseline to align to here.
              className="mt-2 size-2 shrink-0 rounded-[2px] bg-accent"
            />
            <p className="text-[15px] leading-relaxed">
              <strong className="font-semibold text-heading">
                {decision.claim}
              </strong>{" "}
              <span className="text-muted">{decision.why}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
