/** Brand marks from Simple Icons, inlined rather than pulled from a package:
 * a handful of glyphs is not worth a dependency, and inlining lets each one
 * take its colour from whatever wraps it instead of shipping a fixed fill.
 *
 * They live here rather than beside their first consumer because the GitHub
 * mark is now used in three unrelated places — the hero, the contact section
 * and the repository button on every card.
 *
 * The envelope is Material's, not Simple Icons': email is a protocol, not a
 * brand, and no vendor's mark belongs on it. It is drawn solid so it carries
 * the same weight as the two glyphs it sits beside. */

export const GITHUB_ICON_PATH =
  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";

export const LINKEDIN_ICON_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z";

export const EMAIL_ICON_PATH =
  "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z";

/** Material's download glyph, for the résumé. Same reasoning as the envelope
 * above: a PDF has no vendor and wants no borrowed mark, and an arrow into a
 * tray is the one shape that says what the button does before it is read. */
export const DOWNLOAD_ICON_PATH =
  "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z";

/** A document with a folded corner. The Résumé entry used the download mark
 * while it was expected to point at a PDF; it points at a page now, and a
 * download arrow on a link that navigates is a promise the link does not
 * keep. The PDF has its own download link on that page, where the arrow is
 * accurate. */
const DOCUMENT_ICON_PATH =
  "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm0 2 4 4h-4V4zM8 13h8v2H8v-2zm0 4h8v2H8v-2zm0-8h3v2H8V9z";

/** Keyed by the label a contact link carries, so a link with no mark here
 * simply renders without one rather than leaving a blank square. */
export const CONTACT_ICONS: Record<string, string> = {
  Email: EMAIL_ICON_PATH,
  GitHub: GITHUB_ICON_PATH,
  LinkedIn: LINKEDIN_ICON_PATH,
  // "Résumé" — a plain "Resume" here would silently drop the mark.
  "Résumé": DOCUMENT_ICON_PATH,
};

/** Apple's mark, also Simple Icons, for the store buttons.
 *
 * The globe is Material's, for the same reason the envelope above is: the web
 * is not a store and has no vendor to borrow a mark from. */
export const APPLE_ICON_PATH =
  "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701";

export const WEB_ICON_PATH =
  "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z";

/** Keyed by the store's `label`, the same arrangement as CONTACT_ICONS: a
 * store with no mark here still renders, just without one.
 *
 * Google Play is deliberately absent — it is the one mark that is not a
 * single-color glyph. See GOOGLE_PLAY_SEGMENTS. */
export const STORE_ICONS: Record<string, string> = {
  "App Store": APPLE_ICON_PATH,
  "Web App": WEB_ICON_PATH,
};

/** The Play mark, in Google's colors rather than the button's.
 *
 * Everything else on this site takes `currentColor`, and a monochrome Play
 * triangle is the one thing here a reader would not recognise: the four
 * colors *are* the mark. They are the official logo's four gradients flattened
 * to their midpoints, which at 24px is a difference no one can see and saves
 * four gradient definitions per button.
 *
 * The four faces of the triangle, in paint order: the tip, the spine down the
 * left edge, the top face and the bottom face. */
export const GOOGLE_PLAY_SEGMENTS: { d: string; fill: string }[] = [
  {
    d: "M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z",
    fill: "#ffc400",
  },
  {
    d: "M1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924z",
    fill: "#00c3ff",
  },
  {
    d: "M13.544 10.989l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973z",
    fill: "#00de76",
  },
  {
    d: "M13.544 13.056l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z",
    fill: "#e63950",
  },
];
