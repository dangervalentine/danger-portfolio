import { site } from "@/content/site";

export function Header() {
  return (
    <header id="top" className="mx-auto w-full max-w-5xl px-6 pt-24 pb-16">
      <h1 className="text-5xl font-bold tracking-tight text-zinc-50 sm:text-7xl">
        {site.name}
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-4 font-mono text-lg text-zinc-400">{site.tagline}</p>
    </header>
  );
}
