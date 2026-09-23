import { getImageProps } from "next/image";
import Link from "next/link";

import { CONTROL_MARK, controlClass } from "@/components/controls";
import { ProjectSource } from "@/components/ProjectSource";
import { StoreButton } from "@/components/StoreButton";
import { TechStack } from "@/components/TechStack";
import { WEB_APP_BADGE, type Project } from "@/content/site";

export function FeaturedProject({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  // The button row, resolved up front: the stores the project ships to, and
  // the web build alongside them when there is a live URL. Kept apart rather
  // than concatenated because the two occupy different cells below — the
  // stores pair off, the web button spans the row.
  const stores = project.stores ?? [];
  const webApp = project.liveHref
    ? { ...WEB_APP_BADGE, href: project.liveHref }
    : null;
  // Every store still unreleased. Two dimmed buttons nobody can press is a
  // lot of the card's loudest treatment spent on absence, so the band
  // collapses to the web build and one line — see the grid below.
  const storesPending =
    stores.length > 0 && stores.every((store) => !store.href);

  const common = {
    alt: project.imageAlt ?? project.title,
    fill: true,
    // `priority` is deprecated in Next 16. For art direction its replacement
    // isn't `preload` either — which file is the LCP depends on the viewport,
    // and preloading would fetch one the browser may never use.
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : ("auto" as const),
  };

  // Above lg the art fills a column whose height comes from the text panel
  // beside it, so the square file is scaled to cover and cropped — generously
  // enough that the CSS width understates what it needs.
  const squareSizes = "(min-width: 1200px) 600px, 60vw";
  const {
    props: { srcSet: squareSrcSet },
  } = getImageProps({
    ...common,
    src: project.imageSquare ?? project.image,
    sizes: squareSizes,
  });
  const { props: wideImageProps } = getImageProps({
    ...common,
    src: project.image,
    sizes: "100vw",
  });

  return (
    <li
      // Presses like a grid card: the whole surface is a link, and it answers
      // to the pointer the same way, lifting on hover while the accent ring
      // stays reserved for keyboard focus. The link goes to the case study
      // when there is one, so the card opens this site's page about the
      // product; the live app stays one press away on the "Web App" button.
      className="group relative overflow-hidden rounded-lg border border-edge-strong bg-surface transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent"
    >
      {/* Three children, two rows. The left column stacks art over the store
          buttons; the text panel spans both rows on the right.

          The art used to sit centred in a cell stretched to the panel's full
          height, which left ~190px of background above and below it — 42% of
          the cell, and worse once the tech stack made the panel taller. Rather
          than crop these compositions (they are designed pieces, not
          screenshots) or shrink them, the buttons move into that space: they
          belong with the app art anyway.

          DOM order is art → text → buttons, which is also the right reading
          order when the grid collapses to a single column below lg.

          `grid-rows-[1fr_auto]` is what lets the art fill: the row-spanning
          text panel sets the card's height, the buttons take the height they
          need, and the art row absorbs whatever is left. Without it the extra
          height is split evenly between the two rows and the button band ends
          up as tall as the art. */}
      <div className="lg:grid lg:grid-cols-12 lg:grid-rows-[1fr_auto]">
        <div className="overflow-hidden border-b border-edge bg-background lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:border-b-0 lg:border-r">
          {/* 16:9 below lg, where the art is a full-bleed band across the top
              of the card and nothing constrains its height. From lg up it
              fills the column instead — see the grid's row template. */}
          <div className="relative aspect-video w-full lg:aspect-auto lg:h-full">
            {/* A <picture> rather than two <Image>s: the browser fetches only
                the file whose media query matches, so a phone never pays for
                the square art, and there is no hidden duplicate in the DOM. */}
            <picture>
              {project.imageSquare ? (
                <source
                  media="(min-width: 1024px)"
                  srcSet={squareSrcSet}
                  sizes={squareSizes}
                />
              ) : null}
              {/* A bare <img>, but every prop on it — src, srcSet, sizes,
                  decoding, the fill positioning — comes from next/image via
                  getImageProps, so it is still an optimized image.

                  The hover push-in is gentler than the grid cards’: theirs
                  grows an inset thumbnail out to the edges of its band, while
                  this art is already full-bleed, so anything more than a nudge
                  just crops the composition. */}
              <img
                {...wideImageProps}
                className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-within:scale-[1.03]"
                alt={common.alt}
              />
            </picture>
          </div>
        </div>

        <div className="flex flex-col p-6 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 lg:p-8">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              {/* Stretched link, as on the grid cards: the ::after covers the
                  whole <li>, so pressing anywhere on the card that is not one
                  of the controls below follows it. The visible focus ring
                  lives on the <li>. */}
              {project.slug ? (
                <Link
                  href={`/products/${project.slug}`}
                  className="outline-none after:absolute after:inset-0 after:rounded-lg"
                >
                  {project.title}
                </Link>
              ) : project.liveHref ? (
                <a
                  href={project.liveHref}
                  target="_blank"
                  rel="noreferrer"
                  className="outline-none after:absolute after:inset-0 after:rounded-lg"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            {project.platforms?.length ? (
              // The release stage rides on the end of the platform list
              // rather than taking a line of its own: "iOS · Android · Web ·
              // In production" is one fact about where the thing stands, and
              // a reader scanning the row reads it in one pass.
              <p className="font-mono text-xs text-accent">
                {[...project.platforms, project.status]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : null}
          </div>

          <p className="mt-3 text-foreground">{project.description}</p>

          {/* The description sells the product; this sells the build. Mono
              and muted so it reads as a specification under the prose rather
              than as a second sentence of it — and so the nouns someone is
              actually scanning for sit on their own line. */}
          {project.engineering ? (
            <p className="mt-2 font-mono text-xs text-muted">
              {project.engineering}
            </p>
          ) : null}

          {/* The stack panel stands in for the flat tag row on these two rows:
              a featured project has the space to name every layer, and naming
              them is the whole reason it is featured. Grid cards keep `tags`. */}
          {project.stack?.length ? (
            <TechStack groups={project.stack} />
          ) : project.tags?.length ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-edge-strong bg-raised px-2 py-0.5 font-mono text-xs text-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          {/* The card says what the project is; these two are the ways past
              it — into what building it took, and into the source. They share
              a row and a treatment because they are the same kind of offer.

              They wear the site's control skin (components/controls.ts) —
              a raised plate on its own shadow — while the store buttons in
              the column beside them keep the badges' dark livery. The two
              groups read as different families, which is the point: the
              stores are the card's call to action and these are the way
              further in, and a reader should be able to tell which is which
              without reading either.

              `mt-auto` pins the row to the bottom of the panel, so on a wide
              screen the two cards' buttons line up with each other instead of
              floating at whatever height their stack panels happen to end.

              Both are positioned so they sit above the title's stretched
              ::after — they come after it in tree order, so `relative` alone
              puts them on top — or the card-wide link would swallow the
              click. No z-index: see ProjectSource for why one here would
              scroll over the sticky nav. */}
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
            {project.slug ? (
              <Link
                href={`/products/${project.slug}`}
                className={controlClass("md")}
              >
                How it&rsquo;s built
                {/* Mint, like the marks on every other control — this one
                    trails the label rather than leading it, but the two
                    buttons share a row, and a bare arrow beside the
                    repository button's mint mark left the pair looking like
                    one finished control and one draft. */}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  className={CONTROL_MARK}
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5V8.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : null}
            <ProjectSource project={project} size="md" />
          </div>
        </div>

        {/* Left column, row 2 — directly under the art. `lg:bg-background`
            only: on a narrow screen this is just the last block of the card
            and should stay on the card's own surface.

            `relative` lifts the whole band above the title's stretched
            ::after — it comes after the title in tree order, so no z-index is
            needed, and one here would scroll over the sticky nav. Without it
            the card-wide link would swallow every button, including the web
            one it duplicates. */}
        <div className="relative px-6 pb-6 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:border-r lg:border-edge lg:bg-background lg:px-8 lg:py-5">
          {/* Buttons, when there is more than one thing to press. A store
              that is unreleased while another is live says so on its own
              button, on hover or tap — see StoreButton. When *every* store is
              unreleased there is no such row to join, and the band says it
              once in text instead.

              Two columns from sm. The stores pair off into them and the web
              build takes the full row underneath: it is the one thing here a
              reader can open right now, and on the card where both stores are
              still dark it is the only live control in the band. An odd
              number of stores spans the row for the same reason — a lone
              button should not sit half-width with a hole beside it.

              One per row below that, as in the contact row: half of a phone's
              width is not enough for "Download on the" on one line, and a
              wrapped eyebrow costs the buttons the badge silhouette that is
              the whole point of the two lines.

              These were fixed-width images that could only be centred, which
              under full-bleed art left the row looking adrift. They are
              elastic now, so the band is exactly as wide as the art above
              it. */}
          <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-2">
            {storesPending ? (
              <>
                {/* Nothing in this band is pressable except the web build,
                    so it leads rather than sitting under two switched-off
                    badges. The order is the reader's: here is the one you
                    can open, and here is what is still to come. */}
                {webApp ? (
                  <div className="flex sm:col-span-2">
                    <StoreButton store={webApp} />
                  </div>
                ) : null}
                {/* The stores, as a line instead of as two buttons. Muted,
                    not the buttons' dimmed white: this is a note about the
                    card, and the badge livery is reserved for things that
                    are, or will be, controls. The labels come from the store
                    list so the line cannot drift from what is in it. */}
                <p className="text-center font-mono text-xs text-muted sm:col-span-2">
                  {stores.map((store) => store.label).join(" & ")} &middot;
                  coming soon
                </p>
              </>
            ) : (
              <>
                {stores.map((store, index) => (
                  <div
                    key={store.label}
                    // `sm:` and not plain `col-span-2`: spanning two columns
                    // of a single-column grid conjures an implicit second
                    // one, and the stacked row below sm would go back to
                    // being half-width.
                    className={
                      stores.length % 2 === 1 && index === stores.length - 1
                        ? "flex sm:col-span-2"
                        : "flex"
                    }
                  >
                    <StoreButton store={store} />
                  </div>
                ))}
                {webApp ? (
                  <div className="flex sm:col-span-2">
                    <StoreButton store={webApp} />
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
