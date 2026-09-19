import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/content/site";

export function Header() {
  return (
    <header id="top" className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
      <h1 className="text-5xl font-bold tracking-tight text-heading sm:text-7xl">
        {site.name}
        <span className="text-accent">.</span>
      </h1>
      {/* Sans, not mono — this is a subtitle, not a label. */}
      <p className="mt-4 text-lg text-muted sm:text-xl">{site.tagline}</p>
      {/* Pulled back by the icons' own hit-area padding so the first mark
          lines up with the left edge of the name above it. */}
      <SocialLinks className="mt-6 -ml-1" />
    </header>
  );
}
