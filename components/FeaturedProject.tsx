import Image from "next/image";

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
          order when the grid collapses to a single column below lg. */}
      <div className="lg:grid lg:grid-cols-12">
        <div className="border-b border-edge bg-background lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:border-b-0 lg:border-r">
          <div className="relative aspect-video w-full">
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              // Half the 1152px shell on desktop, full bleed below it.
              sizes="(min-width: 1024px) 576px, 100vw"
              priority={priority}
              className="object-cover"
            />
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
        <div className="px-6 pb-6 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:border-r lg:border-edge lg:bg-background lg:p-8 lg:pt-6">
          {/* Buttons only. An unreleased store now says so on its own badge,
              on hover or tap — see StoreButton — instead of a standing line of
              text under the row. */}
          <div className="flex flex-wrap items-center gap-3">
            {project.stores?.map((store) => (
              <StoreButton key={store.label} store={store} />
            ))}
            {project.liveHref ? (
              <StoreButton store={{ ...WEB_APP_BADGE, href: project.liveHref }} />
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}
