import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

export function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-edge bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        {/* The mark, not the name. Spelling out "Victor Danger Valentine" here
            repeated the hero two lines below it and, on a phone, ate most of
            the bar to do it. The name still reaches assistive technology
            through the link's own label. */}
        <a
          href="#top"
          className="inline-flex shrink-0 rounded-md transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Logo className="h-7 w-auto" />
          <span className="sr-only">{site.name} — back to top</span>
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
