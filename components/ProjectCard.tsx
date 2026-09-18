import Image from "next/image";

import { ProjectSource } from "@/components/ProjectSource";
import type { Project } from "@/content/site";

export function ProjectCard({
  project,
  eager,
}: {
  project: Project;
  eager?: boolean;
}) {
  return (
    <li
      // Hover lifts the card; the accent ring is reserved for keyboard
      // focus so the two states stay tellable apart.
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-edge bg-surface transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent"
    >
      <div className="relative aspect-video border-b border-edge bg-background">
        <Image
          src={project.image}
          alt={project.imageAlt ?? project.title}
          fill
          // Cards render at ~352px on desktop; the old 50vw hint made the
          // browser fetch the 1920w variant for every card.
          sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
          loading={eager ? "eager" : "lazy"}
          // Inset at rest so the image reads as a framed thumbnail,
          // growing to the full width of the band on hover/focus.
          // origin-bottom keeps it flush to the divider, so the margin
          // only ever appears on the top and sides.
          className="origin-bottom scale-95 object-cover transition-transform duration-300 ease-out group-hover:scale-100 group-focus-within:scale-100 motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-heading">
          {project.liveHref ? (
            <a
              href={project.liveHref}
              target="_blank"
              rel="noreferrer"
              // Stretched link: covers the whole card so the card itself
              // opens the published version, without nesting anchors.
              // The visible focus ring lives on the <li>.
              className="outline-none after:absolute after:inset-0 after:rounded-lg"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <div className="mt-1.5">
          <ProjectSource project={project} stretched />
        </div>
        <p className="mt-2 flex-1 text-muted">{project.description}</p>
        {project.tags?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
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
    </li>
  );
}
