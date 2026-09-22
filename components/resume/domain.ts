/** The bare domain a URL points at — `creedinteractive.com` from
 * `https://www.creedinteractive.com/`.
 *
 * Derived rather than stored, for the same reason `handleFrom` in
 * `ResumeHeader` is: there is one copy of the address, so the visible label
 * cannot drift from the `href` beside it. The `www.` goes because it is
 * noise nobody types any more, and the document is already tight on the
 * horizontal. */
export function domainFrom(href: string) {
  return new URL(href).hostname.replace(/^www\./, "");
}
