import { site } from "@/content/site";

export function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-5xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-zinc-50">
        Projects
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2">
        {site.projects.map((project) => (
          <li key={project.title}>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-full flex-col rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-zinc-50">
                {project.title}
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
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
