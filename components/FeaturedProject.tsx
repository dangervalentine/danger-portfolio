import Image from "next/image";

import { WEB_APP_BADGE, type Project, type StoreLink } from "@/content/site";

/** A store badge. Live listings link out; a store with no href has no listing
 * yet and renders as inert, dimmed art rather than a link nobody can follow.
 * The badges are normalised to a common height because Apple's and Google's
 * official art ships at different aspect ratios (3.00 vs 3.40). */
function StoreButton({ store }: { store: StoreLink }) {
  const badge = (
    <Image
      src={store.badge}
      alt={store.href ? store.label : `${store.label} — coming soon`}
      width={store.width}
      height={store.height}
      // These are small, fixed-size line art with fine text. Running them
      // through the optimizer resamples to a width that matches neither the
      // source nor the display size and then re-encodes lossily, which visibly
      // smears the lettering. Serving the PNG untouched is both sharper and
      // smaller than the optimizer's output at this size.
      unoptimized
      className="h-10 w-auto"
    />
  );

  if (!store.href) {
    return (
      <span className="inline-flex cursor-not-allowed opacity-40 grayscale">
        {badge}
      </span>
    );
  }

  return (
    <a
      href={store.href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {badge}
    </a>
  );
}

export function FeaturedProject({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  // Derived from the same data as the badges so the two cannot disagree. This
  // says nothing about the web app, which can be live while the mobile builds
  // are still unreleased — hence "Mobile apps", not a bare "Coming soon".
  const mobileComingSoon =
    !!project.stores?.length && project.stores.every((s) => !s.href);

  return (
    <li className="overflow-hidden rounded-lg border border-edge-strong bg-surface">
      <div className="lg:grid lg:grid-cols-12 lg:items-stretch">
        {/* The cell stretches so its divider runs the full height of the row,
            but the art inside keeps its own 16:9 and centres in that space.
            Letting the image stretch instead would crop these compositions,
            which are designed pieces rather than screenshots. */}
        <div className="flex border-b border-edge bg-background lg:col-span-5 lg:border-b-0 lg:border-r">
          <div className="relative aspect-video w-full lg:my-auto">
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              // Just under half the 1152px shell on desktop, full bleed below it.
              sizes="(min-width: 1024px) 480px, 100vw"
              priority={priority}
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col p-6 lg:col-span-7 lg:p-8">
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

          <p className="mt-3 text-foreground">{project.description}</p>
          {project.blurb ? (
            <p className="mt-3 text-sm text-muted">{project.blurb}</p>
          ) : null}

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

          {/* mt-auto pins the actions to the bottom so both rows line up even
              when one has more copy than the other. */}
          <div className="mt-auto pt-6">
            <div className="flex flex-wrap items-center gap-3">
              {project.stores?.map((store) => (
                <StoreButton key={store.label} store={store} />
              ))}
              {project.liveHref ? (
                <StoreButton
                  store={{ ...WEB_APP_BADGE, href: project.liveHref }}
                />
              ) : null}
              {project.repoHref ? (
                <a
                  href={project.repoHref}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-muted underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  View source
                </a>
              ) : (
                <span className="font-mono text-xs text-muted">
                  {project.note}
                </span>
              )}
            </div>
            {mobileComingSoon ? (
              <p className="mt-3 font-mono text-xs text-accent-alt">
                Mobile apps coming soon
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}
