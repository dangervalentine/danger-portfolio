import { CONTROL_MARK, controlClass } from "@/components/controls";
import { GITHUB_ICON_PATH } from "@/components/icons";
import type { Project } from "@/content/site";

/** Provenance, as a control rather than a line of text: a button to the
 * repository, or the reason there isn't one ("Part of NextQuest").
 *
 * It used to be a small underlined "View source" link tucked under the title.
 * A button carries the same information at the weight it deserves — on the
 * grid cards it is the only thing besides the card's own surface you can
 * press, and on the featured rows it now stands beside "How it's built" as
 * half of a matched pair.
 *
 * `size` follows the card it sits on: `md` matches the featured rows'
 * "How it's built" button exactly, so the two read as one control group; `sm`
 * is the grid cards' tighter footprint. The skin itself is shared with every
 * other non-store control on the site — see components/controls.ts, which
 * also explains why the button has to be positioned. */
export function ProjectSource({
    project,
    size = "sm",
}: {
    project: Project;
    size?: "sm" | "md";
}) {
    if (!project.repoHref) {
        return project.note ? (
            // Padded to the button's own height, not just its text: without
            // it a row mixing the two has the note floating a few pixels
            // above the buttons beside it.
            <p className="relative inline-flex items-center px-0.5 py-2 font-mono text-xs leading-5 text-muted">
                {project.note}
            </p>
        ) : null;
    }

    return (
        <a
            href={project.repoHref}
            target="_blank"
            rel="noreferrer"
            className={controlClass(size)}
        >
            <svg
                viewBox="0 0 24 24"
                className={`${CONTROL_MARK} ${size === "md" ? "h-4 w-4" : "h-3.5 w-3.5"}`}
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
            >
                <path d={GITHUB_ICON_PATH} />
            </svg>
            View repository
        </a>
    );
}
