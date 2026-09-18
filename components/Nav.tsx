import { site } from "@/content/site";

export function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-edge bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="#top"
          // Never wrap: on narrow screens the full name used to break onto a
          // second line and double the height of the sticky bar.
          className="truncate font-mono text-sm whitespace-nowrap text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {site.name}
        </a>
        <ul className="flex shrink-0 gap-6 font-mono text-sm">
          <li>
            <a
              href="#projects"
              className="text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
