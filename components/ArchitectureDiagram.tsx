import { Fragment } from "react";

import type {
  DiagramBand,
  DiagramBox,
  DiagramRow,
} from "@/content/case-studies";

/** How many columns a row of N boxes gets on a wide screen. Written out rather
 * than computed because Tailwind scans for complete class strings — a template
 * literal like `lg:grid-cols-${n}` compiles to nothing at all.
 *
 * Seven and eight boxes wrap onto two rows of four rather than stretching
 * across one: past five, a box gets narrower than its own subtitle.
 *
 * Every row also pairs off at sm before it reaches these: a single stack of
 * eight boxes is most of a phone screen twice over, and at 640px there is
 * room for two of them side by side. */
const ROW_COLUMNS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-3",
  7: "lg:grid-cols-4",
  8: "lg:grid-cols-4",
};

/** The line between two bands, or between two rows of one band, carrying the
 * traffic that crosses it.
 *
 * Two labels are spaced along a single line for a row whose boxes are reached
 * by different protocols — the datastores, reached by SQL and over HTTP. */
function Rail({ label }: { label: string | string[] }) {
  const labels = Array.isArray(label) ? label : [label];

  return (
    <div className="flex flex-col items-center">
      <span className="h-4 w-px bg-edge-strong" />
      <span className="flex w-full items-center gap-4">
        {labels.map((text, index) => (
          <Fragment key={text}>
            <span className="h-px flex-1 bg-edge-strong" />
            <span className="text-center font-mono text-xs tracking-[0.06em] text-accent-alt">
              {text}
            </span>
            {index === labels.length - 1 ? (
              <span className="h-px flex-1 bg-edge-strong" />
            ) : null}
          </Fragment>
        ))}
      </span>
      <span className="h-4 w-px bg-edge-strong" />
    </div>
  );
}

function Box({ box }: { box: DiagramBox }) {
  return (
    // `min-w-0` so the box can never be wider than the grid track it sits in.
    // A grid item sizes to its own min-content by default, so one long chip
    // was enough to push a box past its band, its page gutter and the
    // viewport itself — see the chip list below.
    <div className="flex min-w-0 flex-col gap-1.5 rounded-lg border border-edge-strong bg-raised px-4 py-3">
      <span className="text-sm font-semibold text-heading">{box.name}</span>
      <span className="font-mono text-xs leading-relaxed text-muted">
        {box.subtitle}
      </span>
      {box.chips?.length ? (
        // On `surface`, a step darker than the box: a chip inside a box inside
        // a band needs a third value or the nesting stops being legible.
        <ul className="mt-1 flex flex-wrap gap-2">
          {box.chips.map((chip) => (
            <li
              key={chip}
              // These used to be `whitespace-nowrap`, which is the right
              // instinct for a chip holding one technology and wrong for one
              // holding a clause. A phone leaves a box about 165px of content
              // at 320px, and "MMKV · auth session + preferences" sets 235px
              // on a single line: the chip set the box's min-content width,
              // the box outgrew its band, and the whole document scrolled
              // sideways. A chip that has to wrap on a phone is a far smaller
              // cost than that, and at every width with room to spare nothing
              // wraps anyway.
              className="rounded-md border border-edge-strong bg-surface px-2 py-0.5 font-mono text-[11px] text-foreground"
            >
              {chip}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Row({ row }: { row: DiagramRow }) {
  return (
    <div
      className={`grid gap-3 sm:grid-cols-2 ${ROW_COLUMNS[row.boxes.length] ?? "lg:grid-cols-4"}`}
    >
      {row.boxes.map((box) => (
        <Box key={box.name} box={box} />
      ))}
    </div>
  );
}

/** The system, grouped by trust boundary rather than by tier.
 *
 * The bands are the argument. What a reader should take away is which code
 * runs somewhere an attacker controls, and that every credential sits on the
 * far side of the rail. Grouping by tier instead would put the mobile app next
 * to the API and lose that distinction entirely.
 *
 * Boxes and rails are ordinary elements, not SVG: the whole figure has to
 * reflow to a single column on a phone, and an SVG would either scroll
 * sideways or shrink its labels past legibility. */
export function ArchitectureDiagram({
  bands,
  caption,
}: {
  bands: DiagramBand[];
  caption: string;
}) {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 pt-10 lg:pt-14"
      aria-label="System architecture"
    >
      <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">
        System architecture
      </h2>

      <div className="mt-6 flex flex-col">
        {bands.map((band) => (
          <Fragment key={band.label}>
            {band.rail ? <Rail label={band.rail} /> : null}
            <div className="rounded-[10px] border border-edge bg-band px-5 pt-4 pb-5">
              <h3 className="font-mono text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
                {band.label}
              </h3>
              <div className="mt-3.5 flex flex-col gap-3">
                {band.rows.map((row) => (
                  <Fragment key={row.boxes.map((box) => box.name).join("|")}>
                    {row.rail ? <Rail label={row.rail} /> : null}
                    <Row row={row} />
                  </Fragment>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      <p className="mt-5 max-w-[900px] text-[15px] leading-relaxed text-muted">
        {caption}
      </p>
    </section>
  );
}
