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
            <dd className="mt-1.5 sm:mt-0">
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-edge-strong bg-raised px-2 py-0.5 font-mono text-xs text-foreground"
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
