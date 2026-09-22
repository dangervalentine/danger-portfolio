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
        {project.kind ? (
          // Sits over the art rather than in the body: it answers "what is
          // this" before the eye reaches the title, and it stays out of the
          // tech-chip row, which answers a different question. The panel
          // background is opaque enough to stay legible over promotional art
          // of any colour.
          <span className="absolute right-3 top-3 rounded-md border border-edge-strong bg-surface/90 px-2 py-0.5 font-mono text-xs uppercase tracking-wide text-accent backdrop-blur-sm">
            {project.kind}
          </span>
        ) : null}
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
        {/* Directly under the title, where the source line used to sit: the
            stack is the second thing a reader wants after the name, and the
            foot of the card is now spoken for by the repository button. */}
        {project.tags?.length ? (
          <ul className="mt-2.5 flex flex-wrap gap-2">
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
        <p className="mt-3 flex-1 text-muted">{project.description}</p>
        {/* `mt-4` off the description, which is `flex-1`, so this is pinned to
            the bottom of the card and the buttons line up across a row of
            cards whatever length their copy runs to. */}
        <div className="mt-4 flex">
          <ProjectSource project={project} />
        </div>
      </div>
    </li>
  );
}
