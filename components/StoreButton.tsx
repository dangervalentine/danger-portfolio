"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { StoreLink } from "@/content/site";

/** How long the tap reveal stays up. Long enough to read two words, short
 * enough that it is gone before the reader wonders how to dismiss it. */
const TAP_REVEAL_MS = 1600;

/** A store badge. Live listings link out; a store with no `href` has no
 * listing yet and renders as inert, dimmed art rather than a link nobody can
 * follow.
 *
 * The "coming soon" state used to be a standing line of text under the row.
 * It is now attached to the badge it describes and only shown on demand —
 * hover on a mouse, a brief reveal on touch — so the card is not carrying a
 * permanent caveat about something that has not shipped.
 *
 * Note this is only the *visual* treatment: the badge's alt text already ends
 * in "— coming soon", so assistive technology gets the state without needing
 * the tooltip, and the tooltip itself is hidden from it. */
export function StoreButton({ store }: { store: StoreLink }) {
  const [revealed, setRevealed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  // A reveal left running past unmount would set state on a dead component.
  useEffect(() => clear, [clear]);

  const badge = (
    <Image
      src={store.badge}
      alt={store.href ? store.label : `${store.label} — coming soon`}
      width={store.width}
      height={store.height}
      // These are small, fixed-size line art with fine text. Running them
      // through the optimizer resamples to a width that matches neither the
      // source nor the display size and then re-encodes lossily, which visibly
      // smears the lettering. Serving the PNG untouched is both sharper and
      // smaller than the optimizer's output at this size.
      unoptimized
      className="h-10 w-auto lg:h-12"
    />
  );

  if (store.href) {
    return (
      <a
        href={store.href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {badge}
      </a>
    );
  }

  return (
    <span
      className="relative inline-flex"
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
      // while the cursor was still sitting on the badge — and leaving it
      // hidden until the pointer left and came back.
      onPointerUp={(event) => {
        if (event.pointerType === "mouse") return;
        clear();
        setRevealed(true);
        timer.current = setTimeout(() => setRevealed(false), TAP_REVEAL_MS);
      }}
    >
      <span className="inline-flex cursor-not-allowed opacity-40 grayscale">
        {badge}
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md border border-edge-strong bg-raised px-2 py-1 font-mono text-[11px] whitespace-nowrap text-accent-alt transition-opacity duration-150 motion-reduce:transition-none ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        Coming soon
      </span>
    </span>
  );
}
