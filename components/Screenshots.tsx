"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState, type KeyboardEvent } from "react";

import { controlClass } from "@/components/controls";
import type { Screenshot } from "@/content/case-studies";

/** Whether the reader has asked for less motion. Read at the moment of the
 * jump rather than held in state: it is only ever consulted inside a click. */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The product, shown working: one 16:9 frame at a time, full column width,
 * with a strip of thumbnails under it to jump straight to any screen.
 *
 * Two Embla instances. The stage owns the position; the thumbnail strip only
 * follows it, scrolling so the selected thumbnail stays in view, and sends
 * clicks back as `scrollTo`. Nothing else keeps an index of its own, so a
 * swipe, an arrow key and a thumbnail can never disagree about which slide is
 * showing.
 *
 * The stage loops: with a thumbnail for every slide there is no "end" to lose
 * the reader at, and the arrows never have to switch off. The strip does not
 * loop, since a repeated row of thumbnails would read as more screens.
 *
 * No autoplay. These frames are read, not glanced at, and a slide that moves
 * on while someone is reading it is the one carousel behaviour everybody
 * hates. */
export function Screenshots({
  title,
  screenshots,
}: {
  title: string;
  screenshots: Screenshot[];
}) {
  const count = screenshots.length;
  const [stageRef, stage] = useEmblaCarousel({ loop: true });
  const [stripRef, strip] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selected, setSelected] = useState(0);
  // Whether every thumbnail fits in the strip at once. Embla leaves a strip
  // like that at rest with a single snap point, so the row can be centred
  // with flex. One that overflows has to stay flush left, where Embla
  // measures it from, or the first thumbnail would sit out of reach.
  const [stripFits, setStripFits] = useState(false);
  // Every slide that has been shown, plus the one either side of the current
  // one. Those load eagerly, so the next swipe lands on a picture rather than
  // on its blur; the rest wait until the reader gets close.
  const [warmed, setWarmed] = useState(() => new Set([0, 1, count - 1]));

  const onSelect = useCallback(() => {
    if (!stage) return;
    const index = stage.selectedScrollSnap();
    setSelected(index);
    setWarmed((previous) => {
      const next = new Set(previous)
        .add(index)
        .add((index + 1) % count)
        .add((index - 1 + count) % count);
      return next.size === previous.size ? previous : next;
    });
    strip?.scrollTo(index);
  }, [stage, strip, count]);

  useEffect(() => {
    if (!stage) return;
    stage.on("select", onSelect).on("reInit", onSelect);
    return () => {
      stage.off("select", onSelect).off("reInit", onSelect);
    };
  }, [stage, onSelect]);

  useEffect(() => {
    if (!strip) return;
    const measure = () => setStripFits(strip.scrollSnapList().length <= 1);
    measure();
    strip.on("reInit", measure).on("resize", measure);
    return () => {
      strip.off("reInit", measure).off("resize", measure);
    };
  }, [strip]);

  const goTo = useCallback(
    (index: number) => stage?.scrollTo(index, prefersReducedMotion()),
    [stage],
  );
  const goPrev = useCallback(
    () => stage?.scrollPrev(prefersReducedMotion()),
    [stage],
  );
  const goNext = useCallback(
    () => stage?.scrollNext(prefersReducedMotion()),
    [stage],
  );

  // On the stage rather than the window, so the arrow keys only page the
  // carousel once the reader has put focus in it; anywhere else on the page
  // they still scroll the page.
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext],
  );

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      className="mx-auto mb-9 w-full max-w-6xl px-6"
    >
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Screens
        </h2>
        {/* Announced politely so a screen reader hears where it landed after
            a button or a key, without the whole slide being read again. */}
        <p aria-live="polite" className="font-mono text-xs text-muted">
          <span className="text-accent">{screenshots[selected].label}</span>
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          {selected + 1} / {count}
        </p>
      </div>

      <div className="mt-4">
        <div
          ref={stageRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="cursor-grab overflow-hidden rounded-[10px] border border-edge bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:cursor-grabbing"
        >
          {/* `touch-pan-y`: a vertical swipe still scrolls the page, and only
              a sideways one is handed to Embla as a drag. */}
          <div className="flex touch-pan-y">
            {screenshots.map((shot, index) => (
              <div
                key={shot.image.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}: ${shot.label}`}
                // Off-screen slides are hidden from assistive technology, so
                // a screen reader does not read every alt text in a row.
                aria-hidden={index !== selected}
                className="min-w-0 flex-[0_0_100%]"
              >
                <Image
                  src={shot.image}
                  alt={shot.alt}
                  // The content column, less its gutters, up to the 1152px cap.
                  sizes="(min-width: 1200px) 1104px, 100vw"
                  placeholder="blur"
                  // The first slide sits directly under the page header and is
                  // the LCP, the way the band it replaced was.
                  loading={warmed.has(index) ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                  draggable={false}
                  className="aspect-video w-full select-none"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* The arrows flank the thumbnails rather than sitting on the picture:
          every slide has its own headline and copy printed into it, and a
          button laid over the edge of the frame covered some of it. */}
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous screenshot"
          className={controlClass("sm")}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div ref={stripRef} className="min-w-0 flex-1 overflow-hidden">
          {/* Spacing as padding on each thumbnail rather than `gap`: Embla
              measures slides by their boxes, and a gap between them throws
              its snap points off. */}
          <ol
            className={`-ml-3 flex touch-pan-y ${stripFits ? "justify-center" : ""}`}
          >
            {screenshots.map((shot, index) => {
              const active = index === selected;
              return (
                <li
                  key={shot.image.src}
                  // Three and a bit on a phone so the row visibly continues,
                  // five on a tablet, a row of eight on a laptop.
                  className="min-w-0 flex-[0_0_30%] pl-3 sm:flex-[0_0_20%] lg:flex-[0_0_12.5%]"
                >
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Show screenshot ${index + 1}: ${shot.label}`}
                    aria-current={active ? "true" : undefined}
                    className="group/thumb block w-full text-left focus-visible:outline-none"
                  >
                    <span
                      className={[
                        "block overflow-hidden rounded-md border transition duration-200",
                        "group-focus-visible/thumb:outline-2 group-focus-visible/thumb:outline-offset-2 group-focus-visible/thumb:outline-accent",
                        active
                          ? "border-accent opacity-100"
                          : "border-edge opacity-50 group-hover/thumb:border-edge-strong group-hover/thumb:opacity-90",
                      ].join(" ")}
                    >
                      <Image
                        src={shot.image}
                        alt=""
                        // About an eighth of the column on a laptop and a
                        // third of the screen on a phone.
                        sizes="(min-width: 1024px) 140px, 30vw"
                        placeholder="blur"
                        draggable={false}
                        className="aspect-video w-full object-cover select-none"
                      />
                    </span>
                    {/* From sm up only. A phone's thumbnail is too narrow for
                        most of these names, and the header above the stage
                        already names the slide that is showing. */}
                    <span
                      className={[
                        "mt-1.5 hidden truncate font-mono text-[11px] transition-colors sm:block",
                        active
                          ? "text-accent"
                          : "text-muted group-hover/thumb:text-foreground",
                      ].join(" ")}
                    >
                      {shot.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next screenshot"
          className={controlClass("sm")}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
