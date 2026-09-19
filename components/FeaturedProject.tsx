import { getImageProps } from "next/image";

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
  // The badge row, resolved up front: the stores the project ships to, plus
  // our own web badge when there is a live URL. Built here rather than inline
  // because the mobile layout below needs to know how many there are.
  const badges = [
    ...(project.stores ?? []),
    ...(project.liveHref
      ? [{ ...WEB_APP_BADGE, href: project.liveHref }]
      : []),
  ];

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
    <li className="overflow-hidden rounded-lg border border-edge-strong bg-surface">
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
        <div className="border-b border-edge bg-background lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:border-b-0 lg:border-r">
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
                  getImageProps, so it is still an optimized image. */}
              <img {...wideImageProps} className="object-cover" alt={common.alt} />
            </picture>
          </div>
        </div>

        <div className="flex flex-col p-6 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 lg:p-8">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              {project.liveHref ? (
                <a
                  href={project.liveHref}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            {project.platforms?.length ? (
              <p className="font-mono text-xs text-accent">
                {project.platforms.join(" · ")}
              </p>
            ) : null}
          </div>

          <div className="mt-2">
            <ProjectSource project={project} />
          </div>

          <p className="mt-3 text-foreground">{project.description}</p>

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

        </div>

        {/* Left column, row 2 — directly under the art. `lg:bg-background`
            only: on a narrow screen this is just the last block of the card
            and should stay on the card's own surface. */}
        <div className="px-6 pb-6 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:border-r lg:border-edge lg:bg-background lg:px-8 lg:py-5">
          {/* Buttons only. An unreleased store now says so on its own badge,
              on hover or tap — see StoreButton — instead of a standing line of
              text under the row.

              On a phone the row becomes an even two-up grid: the badges' own
              widths differ enough that a plain wrapped row left a short,
              left-packed first line and a third badge hanging under it. The
              cells are equal and centred, and an odd last badge takes the full
              width rather than sitting orphaned in the left column. From sm up
              there is room for all three side by side, so it is a plain row
              again.

              From lg the badges grow a size and centre: under full-bleed art,
              a row of small badges packed to the left left a wide gap on the
              right and read as floating. At lg size they very nearly span the
              column, so the strip is as wide as the art above it. */}
          <div className="grid grid-cols-2 items-center justify-items-center gap-3 sm:flex sm:flex-wrap sm:justify-start lg:justify-center">
            {badges.map((store, index) => (
              <div
                key={store.label}
                // `flex`, not the default block: the badge inside is
                // inline-flex, and on a line box it picks up the descender
                // space below the baseline — 7px of phantom padding under
                // every badge, which is most of why the row looked adrift.
                className={
                  badges.length % 2 === 1 && index === badges.length - 1
                    ? "flex col-span-2"
                    : "flex"
                }
              >
                <StoreButton store={store} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
