import { resume } from "@/content/resume";

/** The toolkit, merged across professional and independent work.
 *
 * This is what replaces the donut chart, and the replacement is the point of
 * the exercise: four labels around a ring with a percent sign and no numbers
 * said nothing, while nine years of actual technologies went unlisted. */
export function SkillsMatrix() {
  return (
    <section className="resume-avoid-break">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
        Skills
      </h2>
      <dl className="resume-tight-rows flex flex-col gap-2">
        {resume.skills.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-1 gap-x-3 sm:grid-cols-[7rem_1fr]"
          >
            {/* `text-xs`, not `text-[13px]`. An absolute pixel size does not
                scale with the root font size, and the print scope shrinks the
                root to 12.5px — so every rem-based size in the document came
                down around these two and left the skills block visibly larger
                than the bullets above it. Same reason StackBlock moved off
                its own `text-[13px]`. */}
            <dt className="font-mono text-xs text-heading">{group.label}</dt>
            <dd className="text-xs leading-5 text-muted">
              {group.items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
