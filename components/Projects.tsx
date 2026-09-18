import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectCard } from "@/components/ProjectCard";
import { site } from "@/content/site";

// Cards in the first grid row are above the fold only on phones now that the
// featured rows sit above them, so the eager window is smaller than it was.
const EAGER_CARDS = 3;

export function Projects() {
  const featured = site.projects.filter((project) => project.featured);
  const rest = site.projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-heading">
        Projects
      </h2>

      {featured.length > 0 ? (
        <ul className="mb-12 flex flex-col gap-6">
          {featured.map((project, index) => (
            <FeaturedProject
              key={project.liveHref ?? project.title}
              project={project}
              // The first featured image is the largest thing above the fold,
              // so it carries the LCP that the first grid card used to.
              priority={index === 0}
            />
          ))}
        </ul>
      ) : null}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, index) => (
          <ProjectCard
            // Key on the destination — titles can collide when a project ships
            // both standalone and as part of another app.
            key={project.liveHref ?? project.title}
            project={project}
            eager={index < EAGER_CARDS}
          />
        ))}
      </ul>
    </section>
  );
}
