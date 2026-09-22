/** The "at a glance" band: what the project demanded of the engineer, in six
 * short phrases.
 *
 * This used to be six figures — route counts, test-file counts, lines. Counts
 * age badly and invite the wrong argument, since a reader can always find a
 * bigger number somewhere. A capability reads the same in a year. */
export function Highlights({ items }: { items: string[] }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">
        At a glance
      </h2>
      <ul className="mt-4 grid grid-cols-2 border-t border-edge lg:grid-cols-3 lg:border-b">
        {items.map((item, index) => {
          // Two columns on a phone, three on a wide screen, so which cell
          // starts a row changes with the breakpoint. Both the dividers and
          // the flush-to-the-edge padding are therefore driven by the index
          // rather than by `odd:`/`first:` variants, which would have to fight
          // each other across the breakpoint.
          const startsPhoneRow = index % 2 === 0;
          const startsDesktopRow = index % 3 === 0;
          const endsDesktopRow = index % 3 === 2;

          return (
            <li
              key={item}
              className={[
                "flex items-start border-edge py-5",
                "border-b lg:border-b-0",
                startsPhoneRow ? "pr-4 pl-0" : "border-l pr-0 pl-4",
                startsDesktopRow
                  ? "lg:border-l-0 lg:pr-4 lg:pl-0"
                  : endsDesktopRow
                    ? "lg:border-l lg:pr-0 lg:pl-4"
                    : "lg:border-l lg:px-4",
              ].join(" ")}
            >
              <span className="text-[15px] leading-snug font-semibold text-heading lg:text-base">
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
