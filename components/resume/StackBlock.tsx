import type { TechGroup } from "@/content/site";

/** A role's stack, grouped by layer.
 *
 * The same shape the featured project cards use, and for the same stated
 * reason: fifteen chips in a single row read as noise, the same fifteen under
 * four labels read as a system with a front end, a back end and somewhere to
 * run.
 *
 * There is no client here and no prop that could carry one. See the comment
 * on `Engagement` in `content/resume.ts`. */
export function StackBlock({ groups }: { groups: TechGroup[] }) {
  return (
    <dl className="mt-3 flex flex-col gap-1.5">
      {groups.map((group) => (
        // `text-xs` rather than an absolute `text-[13px]`: a px size ignores
        // the root scale, and the print scope drops the root to 12.5px. See
        // SkillsMatrix for the long version.
        <div key={group.label} className="flex flex-wrap gap-x-2 text-xs">
          <dt className="shrink-0 font-mono text-accent">{group.label}</dt>
          <dd className="text-muted">{group.items.join(" · ")}</dd>
        </div>
      ))}
    </dl>
  );
}
