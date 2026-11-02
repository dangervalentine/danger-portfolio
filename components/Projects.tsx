import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectGrid } from "@/components/ProjectGrid";
import { site } from "@/content/site";

// Cards in the first grid row are above the fold only on phones now that the
// Products rows sit above them, so the eager window is smaller than it was.
const EAGER_CARDS = 3;

// Two full rows at lg, three at sm, six on a phone. See ProjectGrid for why
// the rest start folded away.
const COLLAPSED_CARDS = 6;

export function Projects() {
  const featured = site.projects.filter((project) => project.featured);
  const rest = site.projects.filter((project) => !project.featured);

  return (
    // One section, two headed blocks. The nav's "Projects" link points at
    // this id and lands on "Products", which is the right first thing
    // to see: the whole block is the work, and the split below is about what
    // kind of work it is, not about two separate parts of the page.
    <section id="projects" className="mx-auto w-full max-w-6xl px-6 py-16">
      {featured.length > 0 ? (
        <div id="products" className="mb-16">
          {/* "Products" against "Side projects". This was "Shipped products"
              while every row had shipped; Riftwyrm has not, and the heading
              was not going to claim otherwise. The bare "Products" that came
              before it sat a letter away from a "Projects" heading, which the
              second block no longer has. */}
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-heading">
            Products
          </h2>
          {/* Real products, released or on the way: each with stores, a live
              URL or both to come, and a case study behind it. */}
          <ul className="flex flex-col gap-6">
            {featured.map((project, index) => (
              <FeaturedProject
                key={project.liveHref ?? project.title}
                project={project}
                // The first featured image is the largest thing above the
                // fold, so it carries the LCP that the first grid card used
                // to.
                priority={index === 0}
              />
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-heading">
          Side projects
        </h2>
        {/* Everything else: packages, tools and games built for their own
            sake, in that order — the order runs from the thing another
            developer can install to the thing that is there because it was
            fun to write. */}
        <ProjectGrid
          collapsedCount={COLLAPSED_CARDS}
          cards={rest.map((project, index) => (
            <ProjectCard
              // Key on the destination — titles can collide when a project
              // ships both standalone and as part of another app.
              key={project.liveHref ?? project.title}
              project={project}
              eager={index < EAGER_CARDS}
            />
          ))}
        />
      </div>
    </section>
  );
}
