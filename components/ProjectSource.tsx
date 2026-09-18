import type { Project } from "@/content/site";

/** The source line: a link to the repository, or the reason there isn't one
 * ("Private repository", "Part of NextQuest").
 *
 * It sits directly under the title on both card types rather than at the foot
 * of the card. Provenance is something a reader wants while they are still
 * deciding whether the project is interesting, and at the bottom it read as an
 * afterthought competing with the store buttons for the same corner.
 *
 * `stretched` is for the grid cards, whose whole surface is a link via an
 * ::after overlay: without raising this above that layer the overlay swallows
 * the click and the repo link is unreachable. */
export function ProjectSource({
  project,
  stretched,
}: {
  project: Project;
  stretched?: boolean;
}) {
  if (!project.repoHref && !project.note) return null;

  return (
    <p className={`font-mono text-xs ${stretched ? "relative z-10" : ""}`}>
      {project.repoHref ? (
        <a
          href={project.repoHref}
          target="_blank"
          rel="noreferrer"
          className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          View source
        </a>
      ) : (
        <span className="text-muted">{project.note}</span>
      )}
    </p>
  );
}
