"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import { Logo } from "@/components/Logo";
import type { NavLink } from "@/content/site";

/** One destination, plus whether it is the page currently open. The active
 * flag is worked out on the server and handed down as plain data: this file
 * is the client boundary, and importing the content module across it to
 * compare hrefs would ship every project and every image import to the
 * browser to colour one link. */
export type MobileNavLink = NavLink & { active: boolean };

/** Everything inside the panel that can take focus, for the Tab cycle below.
 * The backdrop is a button too, so `tabindex="-1"` is excluded explicitly —
 * it is a click target for a pointer, not a stop on the keyboard's tour. */
const FOCUSABLE = 'a[href], button:not([disabled]):not([tabindex="-1"])';

/** "Is there a document yet?", asked the way React wants it asked. The portal
 * needs a <body> to aim at, which the server render does not have; a
 * `useState` + `useEffect` mount flag says the same thing by setting state
 * from an effect, which is the cascading render the lint rule is there to
 * catch. This is a store that never changes — it just answers differently on
 * the server than on the client, which is the entire question. */
const NEVER_CHANGES = () => () => {};
const ON_CLIENT = () => true;
const ON_SERVER = () => false;

/** The bar's four links do not fit beside the wordmark on a phone. They used
 * to cope by hiding the two case studies below `sm`, which left the mark and
 * two links — a bar that fit, at the cost of two destinations not existing at
 * all on the device most people arrive on.
 *
 * So below `sm` the whole row collapses into this: one button, and a drawer
 * holding the same list at a size a thumb can actually hit.
 *
 * The panel is portalled to <body> rather than rendered where it sits. The
 * bar is `backdrop-blur`, and a backdrop filter makes its element the
 * containing block for any `position: fixed` descendant — an overlay left
 * inside it would size itself to the bar instead of to the viewport. */
export function MobileNav({ links }: { links: MobileNavLink[] }) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(NEVER_CHANGES, ON_CLIENT, ON_SERVER);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /** Close, and put focus back on the button that opened it. `inert` blurs
   * whatever is inside the panel the instant it closes; without this the
   * caret lands on <body> and the next Tab starts again from the top of the
   * document, which is nowhere near where the reader was. */
  const dismiss = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  /** Escape closes, and Tab cycles inside the panel rather than walking off
   * into the page behind it — the dialog has claimed the screen, so it has to
   * claim the keyboard with it. */
  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        dismiss();
        return;
      }
      if (event.key !== "Tab") return;

      const stops = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!stops || stops.length === 0) return;

      const first = stops[0];
      const last = stops[stops.length - 1];
      const on = document.activeElement;

      if (event.shiftKey && on === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && on === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, dismiss]);

  /** The page behind the panel must not scroll under it. Restores whatever
   * was there rather than clearing the property, so this cannot quietly undo
   * a lock something else set. */
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /** A phone rotated into landscape, or a window dragged narrow and back,
   * crosses `sm` with the drawer still open — and the button that closes it
   * is hidden at that width. Close it on the way past. */
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 40rem)");
    const sync = () => {
      if (desktop.matches) setOpen(false);
    };

    desktop.addEventListener("change", sync);
    return () => desktop.removeEventListener("change", sync);
  }, []);

  const iconClass = "h-6 w-6";
  const buttonClass =
    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-foreground transition-colors hover:bg-raised hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="site-menu"
        className={`-mr-2 sm:hidden ${buttonClass}`}
      >
        <svg
          viewBox="0 0 24 24"
          className={iconClass}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {mounted &&
        createPortal(
          /* Mounted at every width and merely inert when shut, rather than
             swapped in and out: a panel that only exists while open has
             nothing to slide from, and would arrive in place with a jump. */
          <div
            className={`fixed inset-0 z-50 sm:hidden ${open ? "" : "pointer-events-none"}`}
            inert={!open}
          >
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={dismiss}
              className={`absolute inset-0 h-full w-full cursor-default bg-background/80 backdrop-blur-sm transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                open ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              ref={panelRef}
              id="site-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className={`absolute inset-y-0 right-0 flex w-72 max-w-[80vw] flex-col border-l border-edge bg-surface transition-transform duration-200 ease-out motion-reduce:transition-none ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* The mark again, so the panel reads as this site's drawer and
                  not as a sheet that arrived from somewhere else. Not a link:
                  the one behind it already goes home, and two hit areas a
                  finger apart doing the same thing is a way to lose a tap. */}
              <div className="flex items-center justify-between border-b border-edge px-4 py-4">
                <Logo className="h-6 w-auto" />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={dismiss}
                  aria-label="Close menu"
                  className={`-mr-2 ${buttonClass}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={iconClass}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Site" className="p-3">
                <ul className="flex flex-col gap-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        // Closes without reclaiming focus, unlike every other
                        // way out of here: this one navigates, and dragging
                        // the caret back to a button the reader is leaving
                        // would fight the page they just asked for.
                        onClick={() => setOpen(false)}
                        aria-current={link.active ? "page" : undefined}
                        className={`block rounded-md px-3 py-3 font-mono text-base transition-colors hover:bg-raised hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                          link.active ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
