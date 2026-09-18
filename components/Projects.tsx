import Image from "next/image";

import { site } from "@/content/site";

// Cards in the first row are above the fold at every breakpoint (1 column on
// phones, 3 on desktop), so they load eagerly instead of lazily.
const EAGER_CARDS = 3;

export function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-heading">
        Projects
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.projects.map((project, index) => (
          <li
            // Key on the destination — titles can collide when a project ships
            // both standalone and as part of another app.
            key={project.liveHref ?? project.title}
            // Hover lifts the card; the accent ring is reserved for keyboard
            // focus so the two states stay tellable apart.
            className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-edge bg-surface transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent"
          >
            <div className="relative aspect-video border-b border-edge bg-background">
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                fill
                // Cards render at ~352px on desktop; the old 50vw hint made the
                // browser fetch the 1920w variant for every card.
                sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
                loading={index < EAGER_CARDS ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                // Inset at rest so the screenshot reads as a framed thumbnail,
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
              <p className="mt-2 flex-1 text-muted">{project.description}</p>
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
              <div className="mt-4 font-mono text-xs">
                {project.repoHref ? (
                  <a
                    href={project.repoHref}
                    target="_blank"
                    rel="noreferrer"
                    // Sits above the stretched link so it wins the click.
                    className="relative z-10 text-muted underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    View source
                  </a>
                ) : (
                  <span className="text-muted">{project.note}</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
