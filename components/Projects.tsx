import Image from "next/image";

import { site } from "@/content/site";

export function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-5xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-zinc-50">
        Projects
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2">
        {site.projects.map((project) => (
          <li
            key={project.title}
            className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-colors focus-within:border-accent hover:border-accent"
          >
            <div className="relative aspect-video border-b border-zinc-800 bg-zinc-950">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div
                  aria-hidden
                  className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,--theme(--color-accent)_0%,transparent_60%)] opacity-15"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold text-zinc-50">
                {project.liveHref ? (
                  <a
                    href={project.liveHref}
                    target="_blank"
                    rel="noreferrer"
                    // Stretched link: covers the whole card so the card itself
                    // opens the published version, without nesting anchors.
                    className="outline-none after:absolute after:inset-0 after:rounded-lg"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p className="mt-2 flex-1 text-zinc-400">{project.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded border border-zinc-700 px-2 py-0.5 font-mono text-xs text-zinc-300"
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
                    className="relative z-10 text-zinc-500 underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    View source
                  </a>
                ) : (
                  <span className="text-zinc-600">{project.note}</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
