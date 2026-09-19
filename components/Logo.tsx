/** The site mark: the same V as the browser tab icon, inlined as SVG so it
 * stays sharp at any size and takes its blue from the page's own palette.
 *
 * The artwork is `app/icon.svg` — keep the two paths in step if either moves.
 * Only the rounded tile is dropped: that tile is the page background, which
 * whatever the mark sits on is already showing, so carrying it here would just
 * waste half the box on invisible padding. The viewBox is cropped to the
 * glyph's stroked bounds for the same reason. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="5 7 54 45"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" strokeLinecap="square">
        <path d="M11 13 L32 46 L53 13" stroke="var(--accent-alt)" strokeWidth="8" />
        {/* Night Owl's coral — the one colour in the mark the page palette
            doesn't already name. */}
        <path d="M26 13 L32 24 L38 13" stroke="#f07178" strokeWidth="5.5" />
      </g>
    </svg>
  );
}
