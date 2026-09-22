import { EducationBlock } from "@/components/resume/EducationBlock";
import { ResumeHeader } from "@/components/resume/ResumeHeader";
import { RoleEntry } from "@/components/resume/RoleEntry";
import { SkillsMatrix } from "@/components/resume/SkillsMatrix";
import { SourceDomain } from "@/components/resume/SourceDomain";
import { resume } from "@/content/resume";
import type { ProductEntry } from "@/content/resume";

/** The whole résumé, in reading order. Both routes render exactly this; the
 * print route differs only by the class it is wrapped in.
 *
 * Employment and independent products are separate sections under separate
 * headings, which is structural rather than cosmetic: on the old résumé
 * NextQuest sat between two employers in identical treatment and read as a
 * job someone held. */
export function ResumeDocument() {
  return (
    // `resume-stack` is a print hook, not a style: the gap below is what the
    // document is designed at on screen, and the print scope tightens it —
    // see globals.css. Reading space and paper space are different budgets.
    <div className="resume-stack flex flex-col gap-8">
      <ResumeHeader />

      <section>
        <h2 className="resume-keep-with-next mb-3 font-mono text-xs uppercase tracking-widest text-accent">
          Experience
        </h2>
        <div className="flex flex-col">
          {resume.engagements.map((role) => (
            <RoleEntry key={role.company} role={role} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="resume-keep-with-next mb-3 font-mono text-xs uppercase tracking-widest text-accent">
          Independent products
        </h2>
        <div className="resume-tight-rows flex flex-col gap-5">
          {/* Annotated rather than inferred. `satisfies ProductEntry[]` keeps
              the literal shape of each entry, so a product whose platforms
              all lack an `href` — Density, until the mobile builds are
              listed — infers a platform type with no `href` at all and the
              optional-link branch below stops type-checking. The declared
              type is the one this renders against. */}
          {(resume.products as ProductEntry[]).map((product) => (
            <article key={product.name} className="resume-avoid-break">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                {/* The site sits beside the name, exactly as an employer's
                    domain does — it is the one address a reader might type,
                    and it used to be stranded at the end of the store links
                    on the far side of the header. */}
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="text-base font-semibold text-heading">
                    {product.name}
                  </h3>
                  {product.href ? <SourceDomain href={product.href} /> : null}
                </div>
                {/* Platform and link are one thing, not two: a store listing
                    and the word for its platform are not separate facts, so
                    the platform is the link. A platform with no listing yet
                    renders as plain text, which is exactly why the links are
                    underlined at rest: "iOS · Android · In production" is a
                    row where some words go somewhere and some do not, and the
                    accent alone is 1.46:1 against the rest of it. */}
                <p className="flex flex-wrap gap-x-2 font-mono text-xs text-muted">
                  {product.platforms.map((platform, i) => (
                    <span key={platform.label} className="flex gap-x-2">
                      {i > 0 ? <span aria-hidden="true">&middot;</span> : null}
                      {platform.href ? (
                        <a
                          href={platform.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent underline underline-offset-2"
                        >
                          {platform.label}
                        </a>
                      ) : (
                        <span>{platform.label}</span>
                      )}
                    </span>
                  ))}
                  <span aria-hidden="true">&middot;</span>
                  <span>{product.status}</span>
                </p>
              </div>
              <p className="mt-1 text-sm text-foreground">{product.description}</p>
              {product.bullets.length > 0 ? (
                <ul className="mt-2 flex flex-col gap-2">
                  {product.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative pl-4 text-sm leading-6 text-foreground before:absolute before:left-0 before:text-accent before:content-['\2013']"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <SkillsMatrix />
      <EducationBlock />
    </div>
  );
}
