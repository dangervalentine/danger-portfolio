import type { TechGroup } from "@/content/site";

/** The featured card's stack panel: one labelled row per layer of the system.
 *
 * A description list rather than nested <ul>s — the layer name genuinely
 * describes the chips beside it, so <dt>/<dd> is what a screen reader should
 * hear. The label takes its own column from sm up and stacks above the chips
 * below that, where a fixed label column would leave the longer rows only a
 * couple of characters to wrap in. */
export function TechStack({ groups }: { groups: TechGroup[] }) {
  return (
    <section className="mt-5" aria-label="Tech stack">
      <h4 className="font-mono text-xs uppercase tracking-widest text-muted">
        Tech stack
      </h4>
      <dl className="mt-3 flex flex-col gap-3 border-l border-edge pl-4">
        {groups.map((group) => (
          <div key={group.label} className="sm:flex sm:items-baseline sm:gap-4">
            <dt className="font-mono text-xs text-accent sm:w-28 sm:shrink-0">
              {group.label}
            </dt>
            {/* `sm:flex-1`: as a flex item the chip list would otherwise be
                sized to its own content, so a three-chip layer ended up with a
                much narrower row than a five-chip one and the layers no longer
                lined up. Every layer gets the panel's full width. */}
            <dd className="mt-1.5 min-w-0 sm:mt-0 sm:flex-1">
              {/* Chips are justified, not ragged. Chip widths vary by a factor
                  of three ("Skia" against "ASP.NET Core"), and at their natural
                  widths the rows ended at three different places and read as
                  clutter. `grow basis-26` instead packs each row with as many
                  chips as fit at ~6.5rem and then shares the leftover width
                  between them, so every row ends flush with the panel.

                  A basis rather than a grid track count because the panel's
                  width changes twice (full-bleed on a phone, half the card on
                  a wide screen) and a chip never shrinks below its text — the
                  row count follows the space available. */}
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="grow basis-26 rounded-md border border-edge-strong bg-raised px-2 py-1 text-center font-mono text-xs whitespace-nowrap text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
