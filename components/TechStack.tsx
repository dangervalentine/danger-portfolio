import type { TechGroup } from "@/content/site";

/** The stack panel: one labelled row per layer of the system, drawn as a table.
 *
 * A description list rather than a <table>, because the shape is a label and
 * the values it describes, not a grid — each layer's values share that row's
 * width, so nothing lines up into columns down the panel and a real table's
 * column model would have to be overridden to get there. <dt>/<dd> is also
 * what a screen reader should hear: the layer name genuinely describes the
 * values beside it.
 *
 * The rules are gaps, not borders. The panel is one --edge plate with every
 * cell painted --surface on top of it and a 1px gap between them, so a
 * divider appears wherever two cells meet — between the label and its values,
 * between the values, between the layers, and between wrapped lines of values
 * — without a single nth-child rule deciding which edges a cell should draw.
 *
 * The label takes its own column from sm up and stacks above the values below
 * that, where a fixed label column would leave the longer rows only a couple
 * of characters to wrap in. */
export function TechStack({
  groups,
  headingLevel = "h4",
}: {
  groups: TechGroup[];
  /** `h4` on a featured card, where the panel sits under the card's own `h3`.
   * The case-study page renders it as a section in its own right, alongside
   * "At a glance" and "Decisions", so there it takes `h2` and their
   * treatment — an `h4` following an `h2` there skipped two levels for no
   * reason a reader or a screen reader could see. */
  headingLevel?: "h2" | "h4";
}) {
  const Heading = headingLevel;
  // The level and the treatment move together: both are saying the same
  // thing about where this panel sits, and splitting them into two props
  // would only let them disagree.
  const headingClass =
    headingLevel === "h2"
      ? "font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase"
      : "font-mono text-xs uppercase tracking-widest text-muted";

  return (
    /* A plain wrapper, not a labelled <section>. A <section> with an
       accessible name is a landmark, and this panel was claiming one twice on
       the home page, where both featured cards render it, and claiming a
       second one inside the case study's own section. Two landmarks called
       "Tech stack" are two identical entries in a screen reader's landmark
       list and no way to tell them apart; the heading below already puts the
       panel in the document outline, which is where a panel inside a card
       belongs. */
    <div className="mt-5">
      <Heading className={headingClass}>Tech stack</Heading>
      {/* One grid for the whole panel from sm up, rather than a flex row per
          layer: the label column is sized once, by `max-content`, so it is as
          wide as the longest label ("Infrastructure") and every layer's values
          start at the same x. Per-row flex sized each label to its own text,
          which left that one row's divider standing 25px right of the other
          three. `sm:contents` dissolves the row wrapper into the grid so the
          cells are the grid's own children; below sm the wrapper goes back to
          being a flex column and the label stacks above its values. */}
      <dl className="mt-3 flex flex-col gap-px overflow-hidden rounded-md border border-edge bg-edge sm:grid sm:grid-cols-[max-content_1fr]">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-px sm:contents">
            {/* Centred both ways from sm up, where the label is a cell in a
                column beside centred values. Left-aligned and top-aligned it
                read as a caption that had drifted — most visibly in a featured
                card, where a layer whose values wrap makes the cell two lines
                tall and the label sat against its top edge. Below sm the label
                is a full-width row of its own, which is a group heading rather
                than a cell, so it stays left. */}
            <dt className="bg-surface px-3 py-2 font-mono text-xs text-accent sm:flex sm:items-center sm:justify-center sm:text-center">
              {group.label}
            </dt>
            {/* `1fr` in the grid above, so a three-value layer takes exactly
                as much width as a five-value one and the layers line up. */}
            <dd className="min-w-0">
              {/* The values are justified, not ragged. Their widths vary by a
                  factor of three ("Skia" against "ASP.NET Core"), and at their
                  natural widths the rows ended at three different places and
                  read as clutter. `grow basis-26` instead packs each row with
                  as many values as fit at ~6.5rem and then shares the leftover
                  width between them, so every row ends flush with the panel.

                  A basis rather than a fixed number of columns because the
                  panel's width changes twice (full-bleed on a phone, half the
                  card on a wide screen) and a value never shrinks below its
                  text — the number of lines follows the space available. On
                  the case-study page there is room for a layer's values on one
                  line; in a featured card the longer layers wrap, and the gap
                  draws the rule between the lines. */}
              <ul className="flex h-full flex-wrap gap-px">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="grow basis-26 bg-surface px-2 py-2 text-center font-mono text-xs whitespace-nowrap text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
