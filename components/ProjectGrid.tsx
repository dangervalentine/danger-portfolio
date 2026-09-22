"use client";

import { useState, type ReactNode } from "react";

import { controlClass } from "@/components/controls";

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
      <ul
        id="side-projects"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible}
      </ul>
      {collapsible ? (
        // Centred under the grid rather than beside the heading: it acts on
        // what is above it, and at the foot of the last row it is where the
        // reader's eye already is when they run out of cards.
        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className={controlClass("md")}
            aria-expanded={showAll}
            aria-controls="side-projects"
          >
            {showAll ? "Show fewer" : `Show all ${cards.length} projects`}
          </button>
        </div>
      ) : null}
    </>
  );
}
