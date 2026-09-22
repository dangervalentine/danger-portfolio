import { CONTACT_ICONS } from "@/components/icons";
import { resume } from "@/content/resume";
import { site } from "@/content/site";

/** The handle a profile URL ends in — `dangervalentine` from both
 * `github.com/dangervalentine` and `linkedin.com/in/dangervalentine/`.
 *
 * Derived rather than stored so there is one copy of the username and it
 * cannot drift from the link beside it. Both platforms put the handle in the
 * last path segment, which is why this is three lines rather than a table. */
function handleFrom(href: string) {
  return new URL(href).pathname.replace(/\/+$/, "").split("/").pop() ?? "";
}

/** Name, title, summary and the contact line.
 *
 * A phone number is the one thing this document does not render. Everything
 * here is public: /resume is indexed, and public/resume.pdf is fetched at a
 * guessable static path and its text layer indexed like any other page. A
 * number on either is scraped into permanent spam volume, while a recruiter
 * reading the copy attached to an application expects to find one.
 *
 * So the contact line carries an empty slot instead, and the build script
 * fills it in the browser — after the page has loaded, for the private
 * render only. Nothing on the server ever holds the value, which is what
 * makes the guarantee a property of the code rather than of an environment
 * being configured correctly.
 *
 * An earlier version passed the number in as a prop, gated on a `?phone=1`
 * search param. That leaked: Next's route cache keys on the pathname and
 * ignores the query string, so the phone-bearing render was served back for
 * plain /resume/print. The slot exists because the value must not be
 * reachable by any request, cached or not. See scripts/build-resume.mjs. */
export function ResumeHeader() {
  return (
    <header className="resume-avoid-break">
      <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
        {resume.name}
      </h1>
      <p className="mt-1 font-mono text-sm text-accent">{resume.title}</p>

      <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted">
        <span>{site.email}</span>
        {/* Empty and `hidden` in every rendered document, including this
            one: display:none takes it out of the flex row entirely, so the
            public PDF is laid out exactly as if the slot were not here. The
            print script sets its text and drops the attribute. */}
        <span data-phone-slot hidden />
        <span>{resume.location}</span>
        {/* Real anchors, so Chrome's print pipeline emits PDF link
            annotations. The previous résumé contained no URLs at all, which
            left its central claim — shipped to both stores — unverifiable
            from the document a recruiter actually holds. */}
        {/* Underlined at rest: this line is a run of plain spans with
            links mixed into it, and the accent is 1.46:1 against the muted
            text beside it, so colour cannot be the only thing that says
            which half is clickable. The PDF is the case that settles it. */}
        <a href={site.url} className="text-accent underline underline-offset-2">
          {site.url.replace("https://", "")}
        </a>
        {/* The mark, then the username — not the platform's name. "GitHub"
            told a reader which site it was and nothing they could act on;
            the icon says that faster, and the space it frees carries the
            handle, which is the part someone actually looks for. */}
        {site.contact.map((link) => {
          const path = CONTACT_ICONS[link.label];
          if (!link.href) return null;

          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-accent underline underline-offset-2"
            >
              {path ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 shrink-0"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={path} />
                </svg>
              ) : null}
              {/* The accessible name still says which platform this is — an
                  icon plus a bare username announces as just the username. */}
              <span className="sr-only">{link.label}:</span>
              {handleFrom(link.href)}
            </a>
          );
        })}
      </p>

      <p className="mt-4 max-w-3xl text-sm leading-6 text-foreground">
        {resume.summary}
      </p>
    </header>
  );
}
