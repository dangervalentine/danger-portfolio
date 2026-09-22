"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { GOOGLE_PLAY_SEGMENTS, STORE_ICONS } from "@/components/icons";
import type { StoreLink } from "@/content/site";

/** How long the tap reveal stays up. Long enough to read two words, short
 * enough that it is gone before the reader wonders how to dismiss it. */
const TAP_REVEAL_MS = 1600;

/** A store button. Live listings link out; a store with no `href` has no
 * listing yet and renders as inert, dimmed text rather than a link nobody can
 * follow.
 *
 * This was Apple's and Google's official badge art, served as PNGs. It is
 * built now, from real type and an inlined mark, so it sharpens with the
 * display instead of blurring — but it keeps the badges' own livery, dark
 * under a pale rule, rather than joining the card's palette. Two reasons: the
 * shape is what a reader recognises from every other app page they have ever
 * seen, and a plate darker than the card is what makes this row read as the
 * call to action next to the outlined buttons beside it.
 *
 * Not the badge art's pure black on pure white, though. At full strength this
 * row was the highest-contrast thing on the page — higher than the headings,
 * higher than the app art it is selling — and three of them stacked under a
 * card read as the loudest thing in it. The fill is a near-black the palette
 * could have produced, the rule is a fifth-strength white, and the type sits
 * just under full. Same livery, a third of the voice.
 *
 * The "coming soon" state used to be a standing line of text under the row.
 * It is attached to the button it describes and only shown on demand — hover
 * on a mouse, a brief reveal on touch — so the card is not carrying a
 * permanent caveat about something that has not shipped.
 *
 * It shows in the button's own top line, in place of "Download on the", which
 * is where the sentence it completes already is. As a floating tooltip it had
 * nowhere to go: the buttons are full-width rows on a phone, so anything
 * above one lands on top of the button before it.
 *
 * Note this is only the *visual* treatment: the button's text already ends in
 * a screen-reader-only "— coming soon", so assistive technology gets the
 * state without waiting for a pointer. */
export function StoreButton({ store }: { store: StoreLink }) {
  const [revealed, setRevealed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  // A reveal left running past unmount would set state on a dead component.
  useEffect(() => clear, [clear]);

  const path = STORE_ICONS[store.label];
  const live = Boolean(store.href);

  // Shared by both states so the disabled one occupies exactly the space the
  // live one would — a row of three must not reflow when a listing goes up.
  // `w-full`: the grid cell decides the width, not the text inside.
  //
  // The store name and the mark grow at lg but the padding does not: 1024px
  // is the tightest this button ever gets — the card has just gone
  // two-column, so each of the paired store buttons is only ~200px wide —
  // and the larger type needs every pixel of that back. The eyebrow is the
  // exception; it is 11px throughout, see below.
  const shape =
    "flex w-full items-center justify-center gap-3 rounded-lg border bg-[#010d17] px-4 py-2.5 lg:py-3";

  // Three weights of white per state rather than one colour for the whole
  // button. The rule is the quietest of them: a full-strength edge around
  // three stacked buttons is what made this row shout, and dropping it to a
  // fifth costs nothing a reader was using. The eyebrow then sits a step
  // under the store name, which is the relationship the badge art draws with
  // type size — worth keeping now that both lines are real text.
  //
  // Raw values rather than palette tokens: this is the badges' own livery,
  // deliberately not the card's, so a token here would be a lie the next
  // person to retheme the site would have to untangle.
  const tone = live
    ? {
        edge: "border-white/20",
        name: "text-white/90",
        eyebrow: "text-white/55",
      }
    : {
        // Dimmed, but still readable. These were /35 and /30, which measure
        // 3.15:1 and 2.61:1 on the plate and miss the 4.5:1 that text this
        // size owes. Nothing here is a real disabled control that the
        // contrast rule would excuse: it is a span of ordinary text. /60 and
        // /50 are 7.27:1 and 5.32:1, and against the live button's /90 and
        // /55 they still read as the same plate switched off.
        edge: "border-white/10",
        name: "text-white/60",
        eyebrow: "text-white/50",
      };

  const markClass = `h-6 w-6 shrink-0 lg:h-7 lg:w-7 ${live ? "" : "opacity-30"}`;

  const mark =
    store.label === "Google Play" ? (
      <svg
        viewBox="0 0 24 24"
        className={markClass}
        aria-hidden="true"
        focusable="false"
      >
        {GOOGLE_PLAY_SEGMENTS.map((segment) => (
          <path key={segment.fill} d={segment.d} fill={segment.fill} />
        ))}
      </svg>
    ) : path ? (
      <svg
        viewBox="0 0 24 24"
        className={markClass}
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d={path} />
      </svg>
    ) : null;

  // No colour here: the two lines that share this are coloured differently
  // — the eyebrow one step below the name, the reveal in the accent — and two
  // text-colour utilities on one element resolve by stylesheet order rather
  // than by the order they are written in.
  //
  // 11px at every width. This started at 9px, went to 10px, and is here now
  // because 10px is still inside what an automated audit flags as very small
  // text: the threshold is "10 pixels or smaller", so 10 was on the wrong
  // side of it by one. The tracking comes back a notch to pay for the extra
  // pixel, since "Download on the" is the widest line in the button and it
  // may not wrap: 11px at 0.1em sets narrower than 10px at 0.14em did.
  const eyebrowClass =
    "font-mono text-[11px] leading-none whitespace-nowrap tracking-[0.1em] uppercase";

  const contents = (
    <>
      {mark}
      {/* The two lines are one block so the mark centres against both, the
          way it does on the badge art. `leading-none` on each: the default
          line box would open a gap between them that no margin can close. */}
      <span className="flex flex-col items-start">
        {/* Both top lines occupy the same grid cell, so the block is as wide
            as the longer of them whichever is showing. They used to swap by
            replacing the text, which changed the width of a centred row and
            slid the whole button's contents sideways on hover. */}
        <span className="grid">
          <span
            className={`${eyebrowClass} ${tone.eyebrow} col-start-1 row-start-1 transition-opacity duration-150 motion-reduce:transition-none ${
              revealed ? "opacity-0" : "opacity-100"
            }`}
          >
            {store.eyebrow}
          </span>
          {live ? null : (
            <span
              aria-hidden="true"
              // Decorative and stacked over its sibling, so it must not take
              // the pointer: without this the invisible layer is what the
              // cursor lands on, and it is also what a drag-select copies.
              className={`${eyebrowClass} pointer-events-none col-start-1 row-start-1 text-accent-alt select-none transition-opacity duration-150 motion-reduce:transition-none ${
                revealed ? "opacity-100" : "opacity-0"
              }`}
            >
              Coming soon
            </span>
          )}
        </span>
        <span className="mt-1 text-[15px] leading-none font-semibold tracking-tight lg:text-base">
          {store.label}
        </span>
        {/* The state, for anyone who is not going to see the dimming or the
            reveal. Part of the button's text rather than a replacement for
            it, so it reads as "Download on the App Store, coming soon". */}
        {live ? null : <span className="sr-only">, coming soon</span>}
      </span>
    </>
  );

  if (live) {
    return (
      <a
        href={store.href}
        target="_blank"
        rel="noreferrer"
        // The accent is kept for the focus ring alone. A mint border on hover
        // would pull these back into the page's palette, which is the one
        // thing this livery is here to avoid; the plate lifting a shade and
        // the rule coming up says the same thing without repainting it.
        className={`${shape} ${tone.edge} ${tone.name} transition-colors hover:border-white/35 hover:bg-[#04192a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
      >
        {contents}
      </a>
    );
  }

  return (
    // The same plate, everything on it a step quieter, so an unreleased store
    // reads as this button switched off rather than as a different thing.
    <span
      className={`${shape} ${tone.edge} ${tone.name} cursor-not-allowed`}
      // Hover is a mouse affordance: a touch pointer also fires enter, but it
      // fires it on tap and never fires leave, so the label would stick.
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        clear();
        setRevealed(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        clear();
        setRevealed(false);
      }}
      // Touch and pen get the timed reveal instead. Deliberately not onClick:
      // a mouse click would start the timer too, hiding the label 1.6s later
      // while the cursor was still sitting on the button — and leaving it
      // hidden until the pointer left and came back.
      onPointerUp={(event) => {
        if (event.pointerType === "mouse") return;
        clear();
        setRevealed(true);
        timer.current = setTimeout(() => setRevealed(false), TAP_REVEAL_MS);
      }}
    >
      {contents}
    </span>
  );
}
