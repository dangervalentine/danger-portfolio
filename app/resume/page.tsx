import type { Metadata } from "next";

import { CONTROL_MARK, controlClass } from "@/components/controls";
import { DOWNLOAD_ICON_PATH } from "@/components/icons";
import { Nav } from "@/components/Nav";
import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { resume } from "@/content/resume";
import { RESUME_PDF_FILENAME, RESUME_PDF_PATH } from "@/content/resume-file.mjs";

import { siteOgImage } from "../shared-metadata";

const TITLE = `${resume.name} | Résumé`;
const DESCRIPTION =
  "Nine years of full-stack and mobile engineering: .NET and SQL backends, " +
  "React and Next.js web clients, and applications shipped to the App Store " +
  "and Google Play.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/resume" },
  /* `...siteOgImage` in both blocks: declaring either one replaces what the
   * root layout and app/opengraph-image.tsx would have supplied, image
   * included. See app/shared-metadata.ts. */
  openGraph: {
    type: "profile",
    url: "/resume",
    title: TITLE,
    description: DESCRIPTION,
    ...siteOgImage,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    ...siteOgImage,
  },
};

/** The unabridged résumé, in the site's own skin.
 *
 * This is the destination the Résumé button points at, rather than the PDF.
 * A page is linkable, indexable, always current, and can offer the file;
 * dropping a visitor into a PDF viewer from a web link is the worse half of
 * that trade. The PDF is what gets attached to an application, which is a
 * different act by a different person. */
export default function ResumePage() {
  return (
    <>
      <Nav activeHref="/resume" />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        {/* Above the document, not under it.
         *
         * This sat at the foot of the page as a sentence, which put the one
         * thing a recruiter arrives wanting behind the whole résumé — and
         * described the file as a one-page copy, which stopped being true.
         * A control at the top needs no sentence: the mark says download and
         * the label says what. */}
        <p className="mb-8">
          {/* `download` carries a value rather than standing bare: bare, the
            * browser names the saved file after the last path segment, and
            * "resume.pdf" in a stranger's Downloads folder is a file with no
            * owner. The served path stays short; the name it lands under is
            * the one a recruiter has to find again. */}
          <a
            href={RESUME_PDF_PATH}
            download={RESUME_PDF_FILENAME}
            className={controlClass("sm")}
          >
            <svg
              viewBox="0 0 24 24"
              className={`${CONTROL_MARK} h-4 w-4`}
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path d={DOWNLOAD_ICON_PATH} />
            </svg>
            Download PDF
          </a>
        </p>
        <ResumeDocument />
      </main>
    </>
  );
}
