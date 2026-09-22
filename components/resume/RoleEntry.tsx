import { SourceDomain } from "@/components/resume/SourceDomain";
import { StackBlock } from "@/components/resume/StackBlock";
import type { Engagement } from "@/content/resume";

/** One employer.
 *
 * `resume-avoid-break` is the print-media class from globals.css: a role
 * split across a page boundary leaves its bullets stranded under no company
 * name. */
export function RoleEntry({ role }: { role: Engagement }) {
  return (
    // No `resume-avoid-break` here on purpose. A role is the largest block in
    // the document and refusing to split one does not keep it together — it
    // pushes the whole thing to the next page and leaves the remainder of this
    // one blank. The header below carries `resume-keep-with-next` instead, so
    // the bullets may flow across a page boundary while the company name above
    // them can never be the last thing on a page.
    <article className="resume-role border-t border-edge py-5 first:border-t-0 first:pt-0">
      {/* Company, dates, title, location and the summary are one unit and
          break together.
         *
         * `break-after: avoid` on the header alone was not enough: it stopped
         * a break immediately after the company name, and the page then broke
         * one line lower instead, leaving "ImageTrend / Software Developer
         * I → II" alone at the foot of a page with everything it introduces
         * overleaf. A reader turning the page has to carry the company name
         * in their head to make sense of the first bullet.
         *
         * So the opening is a block that cannot split. If it does not fit in
         * the room left, the whole role moves to the next page — which is the
         * right trade here, and is affordable precisely because the bullets
         * below it may still flow. */}
      <div className="resume-avoid-break">
        <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          {/* The company name is not the link; the domain beside it is. A
              reader checking whether an employer is real should not have to
              leave the document to find out where they are being sent, and
              the heading should read as a heading rather than as something to
              click. In the PDF the domain is still a real link annotation,
              and on paper it is an address someone can type. */}
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h3 className="text-lg font-semibold tracking-tight text-heading">
              {role.company}
            </h3>
            <SourceDomain href={role.href} />
          </div>
          <p className="font-mono text-xs text-muted">
            {role.dates.start} &ndash; {role.dates.end}
          </p>
        </header>

        <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2 text-sm">
          <span className="text-accent">{role.title}</span>
          <span className="text-muted">{role.location}</span>
        </p>

        {role.summary ? (
          <p className="mt-2 text-sm text-foreground">{role.summary}</p>
        ) : null}
      </div>

      <ul className="mt-3 flex flex-col gap-2">
        {role.bullets.map((bullet) => (
          // The marker is a real list marker rather than a drawn glyph, so
          // the PDF's text layer contains the bullet text and nothing else.
          // An ATS parser reading a decorative character as content is the
          // class of defect this whole document is being rebuilt to avoid.
          <li
            key={bullet}
            className="relative pl-4 text-sm leading-6 text-foreground before:absolute before:left-0 before:text-accent before:content-['\2013']"
          >
            {bullet}
          </li>
        ))}
      </ul>

      {role.stack ? <StackBlock groups={role.stack} /> : null}
    </article>
  );
}
