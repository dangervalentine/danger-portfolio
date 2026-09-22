/** The skin every pressable control on the site shares, except the store
 * badges — those keep their own livery on purpose (see StoreButton) and are
 * the loudest thing on a card by design.
 *
 * Everything else used to be a flat outlined rectangle: a hairline border, no
 * fill, and a label that was mint in one place and blue in another depending
 * on which component had been written first. Three problems in one. Nothing
 * looked pressable, nothing looked like it belonged to the same set, and the
 * two accents were doing no work — mint and blue both mean "interactive"
 * here, so using both only told the reader the page was inconsistent.
 *
 * So: one plate, lit from the top, sitting on its own shadow. The label is
 * page text and the mark is mint, which is the split that gives the row its
 * colour without spending an accent on the word itself. Hover lifts the plate
 * a pixel, takes the border to the accent and blooms a mint glow underneath;
 * press puts it back down under an inset shadow. The accent outline stays
 * reserved for keyboard focus, as everywhere else on the site.
 *
 * Colours and shadows are tokens in globals.css, not literals here — a
 * retheme should not have to come through this file. */

/** Padding, gap and type size per size step. The skin is identical across
 * all three; only the footprint changes.
 *
 * These are the footprints the buttons already had, kept to the pixel: `md`
 * is the featured rows' pair ("How it's built" beside "View repository"),
 * `sm` the grid cards' tighter one, `lg` the contact rows. Changing the skin
 * should not reflow a single card. */
export const CONTROL_SIZES = {
  sm: "gap-2 px-3 py-2 text-xs leading-5",
  md: "gap-2.5 px-3.5 py-3 text-[13px] leading-5",
  lg: "gap-2.5 px-4 py-2.5 text-sm leading-5 sm:px-5",
} as const;

export type ControlSize = keyof typeof CONTROL_SIZES;

/** The mark inside a control. Mint at rest and mint on hover: the label is
 * what brightens, and moving both at once would just read as the button
 * changing colour rather than lighting up.
 *
 * `shrink-0` because several of these labels are long enough to wrap the
 * button before they wrap themselves — an email address on a phone, most
 * of all — and a squashed icon is worse than a wrapped word. */
export const CONTROL_MARK = "shrink-0 text-accent";

/** The mark on a control that is switched off. Muted, like the label beside
 * it: the accent is the site's word for "you can press this", and leaving it
 * lit on a plate nobody can press is the one thing that would make the state
 * ambiguous. */
export const CONTROL_MARK_INERT = "shrink-0 text-muted";

const CONTROL_BASE = [
  // `relative`: both card types lay a stretched link over their whole
  // surface, and a control that is not positioned sits under it and cannot
  // be clicked. Position alone is enough — these come after the title that
  // owns the overlay, so they paint above it in tree order. A z-index here
  // would escape the card into the root and scroll over the sticky nav; see
  // ProjectSource for the long version.
  "relative inline-flex items-center justify-center rounded-md border font-mono",

  // The plate. `bg-raised` is the fill; the gradient painted over it is the
  // light — white catching the top edge, gone by the middle, and a wash of
  // the accent pooling in the bottom of the plate. The mint is at a
  // twentieth strength and is not meant to be seen as colour: it is there so
  // the plate has somewhere to go between its lit edge and its shadow that
  // isn't further navy.
  //
  // Fill and gradient are two properties rather than one two-colour
  // gradient, so hover can move the fill underneath while the light stays
  // put — background-color transitions, gradient stops do not.
  "border-edge-strong bg-raised bg-linear-to-b from-white/10 via-transparent via-45% to-accent/[0.07]",
  "text-foreground shadow-[var(--shadow-control)]",

  // Covers colour, border, fill, shadow and transform in one — every
  // property the states below move.
  "transition duration-200 ease-out",

  // Hover: up a pixel, the fill up a step, the border to the accent, and
  // the glow (in the token) arriving under it.
  "hover:border-accent/60 hover:bg-edge hover:text-heading",
  "hover:shadow-[var(--shadow-control-hover)]",
  "motion-safe:hover:-translate-y-px",

  // Press. `active` also fires on touch, where there is no hover to undo,
  // so it has to restate the resting position rather than assume it.
  "active:translate-y-0 active:shadow-[var(--shadow-control-active)]",

  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
].join(" ");

/** The same plate with the lights off, for a control whose destination does
 * not exist yet — the résumé button while the PDF is still being written.
 *
 * Same shape, same footprint, same size step, so it reads as this button
 * switched off rather than as a different kind of thing sitting in the row;
 * this is the treatment StoreButton already gives an unreleased store, and
 * the two should not disagree.
 *
 * What goes is the light. The gradient, the shadow and every state — hover,
 * press, focus — come off, the border drops from `edge-strong` to `edge` and
 * the fill from `raised` to `surface`, so the plate sits flat in the page
 * instead of on top of it. No `focus-visible` because there is nothing here
 * to focus: the caller renders a <span>, not a link, and a control that
 * cannot be reached by keyboard must not pretend otherwise by taking a ring.
 *
 * The label still says what it will be. The state reaches assistive
 * technology as an sr-only suffix on the caller's side, the way it does on a
 * dark store badge — see ContactButton. */
const CONTROL_INERT = [
  "relative inline-flex items-center justify-center rounded-md border font-mono",
  "border-edge bg-surface text-muted",
  "cursor-not-allowed select-none",
].join(" ");

/** The full class list for a control of the given size. `extra` is appended
 * last so a caller can add layout (a `w-full`, a grid placement) without
 * having to reassemble the skin. */
export function controlClass(size: ControlSize, extra?: string) {
  return `${CONTROL_BASE} ${CONTROL_SIZES[size]}${extra ? ` ${extra}` : ""}`;
}

/** `controlClass` for a control that is not pressable yet. Same arguments,
 * same footprint — see CONTROL_INERT. */
export function inertControlClass(size: ControlSize, extra?: string) {
  return `${CONTROL_INERT} ${CONTROL_SIZES[size]}${extra ? ` ${extra}` : ""}`;
}
