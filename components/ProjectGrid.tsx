"use client";

import { useState, type ReactNode } from "react";

import { CONTROL_MARK, controlClass } from "@/components/controls";

/** The side-projects grid and the one control that changes it.
 *
 * Thirteen cards is four rows of scrolling between the products above and the
 * contact row below, and the reader who came for the products has to pass all
 * of it. Six is two rows — enough to show the range without the page turning
 * into a catalogue — and the rest are one press away.
 *
 * The cards arrive already rendered, as elements rather than as data. That
 * keeps `content/site.ts` and both card components on the server: the only
 * thing that actually needs the browser here is a boolean, and shipping the
 * whole project list to hold it would be a poor trade. */
export function ProjectGrid({
  cards,
  collapsedCount,
}: {
  cards: ReactNode[];
  collapsedCount: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const collapsible = cards.length > collapsedCount;
  const visible = showAll || !collapsible ? cards : cards.slice(0, collapsedCount);

  return (
    <>
      <div className="relative">
        <ul
          id="side-projects"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible}
        </ul>
        {/* While folded, the last row fades into the page. A small button
            under a grid that ends cleanly read as the end of the section, and
            readers missed it; a row that visibly runs on says there is more
            before the button is even read. `pointer-events-none` so the
            faded cards stay clickable through it. */}
        {collapsible && !showAll ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background"
          />
        ) : null}
      </div>
      {collapsible ? (
        // Centred under the grid rather than beside the heading: it acts on
        // what is above it, and at the foot of the last row it is where the
        // reader's eye already is when they run out of cards. The rules either
        // side run the width of the grid, so the control reads as a divider
        // the whole section hangs on rather than a stray button.
        <div
          className={`flex items-center gap-4 ${showAll ? "mt-10" : "mt-4"}`}
        >
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-linear-to-r from-transparent to-edge-strong"
          />
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className={controlClass("lg")}
            aria-expanded={showAll}
            aria-controls="side-projects"
          >
            {showAll ? "Show fewer" : `Show all ${cards.length} projects`}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${CONTROL_MARK} transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-linear-to-l from-transparent to-edge-strong"
          />
        </div>
      ) : null}
    </>
  );
}
