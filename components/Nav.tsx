import Link from "next/link";

import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { navLinks, site } from "@/content/site";

/** `activeHref` is the destination the reader is already at, passed down by
 * the page that knows it — `/products/nextquest`, `/resume`. A `usePathname`
 * would read the same thing off the client, but this nav is otherwise almost
 * entirely static markup, and making it a client component to accent one link
 * would ship the whole content module — every project, every image import —
 * to the browser to do it.
 *
 * The drawer under `sm` is the one piece that has to be a client component,
 * and it takes its links as plain serialisable data for the same reason. */
export function Nav({ activeHref }: { activeHref?: string } = {}) {
  const linkClass =
    "transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

  const links = navLinks.map((link) => ({
    ...link,
    active: link.href === activeHref,
  }));

  return (
    <nav
      aria-label="Main"
      className="sticky top-0 z-10 border-b border-edge bg-background/90 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        {/* The mark and the name, as one link home.

            The mark used to stand here alone: three words of "Victor Danger
            Valentine" ate most of a phone's bar, and the hero repeated them
            two lines below anyway. The bar no longer holds a row of links on
            a phone, so the room the name needs is room nothing else wants —
            and on the case-study and résumé pages, which is most of where
            this renders, there is no hero underneath to say whose site this
            is.

            `min-w-0` with `truncate` rather than a `shrink-0`: at 320px the
            name is wider than what is left of the bar after the mark and the
            button, and a name clipped with an ellipsis is a smaller failure
            than a page that scrolls sideways.

            Every destination here is root-relative rather than a bare hash:
            this nav also renders on the case-study pages, where "#projects"
            would resolve against /products/<slug> and do nothing at all. */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-md transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Logo className="h-7 w-auto shrink-0" />
          {/* A point smaller until `sm`. At 320px the name at 14px is two
              characters wider than what the mark and the button leave of the
              bar, and truncation there costs the last syllable of a surname —
              which is the one part of a wordmark that cannot be guessed. */}
          <span className="truncate font-mono text-[13px] tracking-tight text-heading sm:text-sm">
            {site.name}
            {/* The hero's full stop, at the hero's size. Decoration, not
                punctuation — the link's accessible name is the name. */}
            <span aria-hidden="true" className="text-accent">
              .
            </span>
          </span>
        </Link>

        {/* From `sm` up, the row. All four fit: the name and the links
            together need ~580px of the 640 the breakpoint hands over, which
            is why the collapse happens here and not at `md`. */}
        <ul className="hidden shrink-0 gap-6 font-mono text-sm sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                // The page you are on, in the accent — the same job the
                // section links do by scrolling, done by colour because
                // there is nowhere to scroll to.
                className={`${link.active ? "text-accent" : "text-foreground"} ${linkClass}`}
                aria-current={link.active ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Below it, the same four behind a hamburger. */}
        <MobileNav links={links} />
      </div>
    </nav>
  );
}
