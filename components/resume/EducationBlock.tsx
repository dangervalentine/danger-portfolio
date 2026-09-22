import { resume } from "@/content/resume";

/** Degree and route into the field.
 *
 * The old résumé named a degree and two minors and no institution at all,
 * which reads as an omission rather than as brevity. */
export function EducationBlock() {
  const { education, entry } = resume;

  return (
    <section className="resume-avoid-break">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
        Education
      </h2>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="text-base font-semibold text-heading">
          {education.institution}
        </h3>
        <p className="font-mono text-xs text-muted">{education.years}</p>
      </div>
      <p className="mt-0.5 text-sm text-foreground">
        {education.credential}
        <span className="text-muted">
          {" "}
          &middot; Minors in {education.minors.join(" and ")}
        </span>
      </p>
      <p className="mt-2 text-sm leading-6 text-muted">{entry}</p>
    </section>
  );
}
