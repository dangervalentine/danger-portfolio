import { site } from "@/content/site";

export function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm text-zinc-400 hover:text-accent">
          {site.name}
        </a>
        <ul className="flex gap-6 font-mono text-sm">
          <li>
            <a href="#projects" className="text-zinc-300 hover:text-accent">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="text-zinc-300 hover:text-accent">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
