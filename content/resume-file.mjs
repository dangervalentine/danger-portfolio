// The name the résumé PDF is saved under, in one place.
//
// Deliberately a dependency-free .mjs rather than a .ts beside the other
// content modules: the three readers run in three different loaders — the
// React page, next.config.ts, and scripts/build-resume.mjs under plain Node —
// and this is the one file shape all three can import without a build step.
// Nothing else belongs in here for the same reason.

/** Where the public copy is served. Short, stable, and already linked from
 * elsewhere, so it stays a path a person can type. The pretty name below is
 * carried separately rather than put in the URL, where every space and comma
 * would arrive percent-encoded.
 *
 * Which means the name reaches a visitor only through the `download`
 * attribute on the résumé button — someone who opens this path directly and
 * saves from the PDF viewer still gets "resume.pdf". A
 * `Content-Disposition: inline; filename="…"` rule in next.config.ts is the
 * obvious fix and does not work here: `headers()` lands the rule in
 * routes-manifest.json, and `next start` — which is what serves production,
 * see scripts/deploy.ps1 — hands files in public/ to its static handler
 * without consulting it. Measured against 16.3.5, not assumed; the docs
 * claim headers are checked before the filesystem. Serving the PDF from a
 * route handler instead would work, at the cost of taking a static file off
 * the static path to rename it for a visitor who arrived by guessing a URL.
 * Not worth it — but that is the trade, if this comes up again. */
export const RESUME_PDF_PATH = "/resume.pdf";

/** What the file is called once it lands on someone's disk.
 *
 * Three facts, in the order that survives a Downloads folder: who (surname
 * first, so every document of mine sorts together in a recruiter's pile of
 * candidates), what role, and — the part a bare title leaves out — what kind
 * of document it is. "Senior Software Developer Resume" reads as one phrase,
 * so the document type costs a word rather than a second dash.
 *
 * No version, no date. Both age badly on a file that is re-generated, and a
 * "v2" in a filename is visible to the reader as indecision.
 *
 * Unaccented "Resume" on purpose. The site says Résumé, but this string is
 * matched by ATS keyword filters and typed into search boxes by people who
 * will not reach for an accented e. */
export const RESUME_PDF_FILENAME =
  "Valentine, Victor - Senior Software Developer Resume.pdf";
