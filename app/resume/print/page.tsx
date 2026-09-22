import type { Metadata } from "next";

import { ResumeDocument } from "@/components/resume/ResumeDocument";

/** A rendering target, not a destination. Kept out of the index because a
 * light-on-white copy of a page that already exists is precisely the
 * duplicate a search engine should not be offered. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** The same document, re-themed by one class.
 *
 * No component below this point knows it is being printed. `.resume-print`
 * redefines the custom properties that `:root` declares in globals.css, so
 * every `text-heading` and `border-edge` in the tree resolves to a light-
 * ground value without a single conditional. That is the whole mechanism.
 *
 * No Nav, no footer: this is the page the PDF is made from.
 *
 * It renders the same public document the site serves; nothing here is
 * audience-dependent and nothing here reads an env var, so there is no
 * configuration under which a request to this route returns a phone number.
 * The private PDF's number is injected into the loaded page by the build
 * script, not rendered by this component. See scripts/build-resume.mjs. */
export default function ResumePrintPage() {
  return (
    <main className="resume-print min-h-screen px-10 py-10">
      <ResumeDocument />
    </main>
  );
}
