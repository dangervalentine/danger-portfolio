import { ContactLinks } from "@/components/ContactLinks";
import { site } from "@/content/site";

export function Header() {
  return (
    <header id="top" className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
      {/* One line at every width. The name used to break in two places and in
          the same wrong way at both — "Valentine." alone on a second line
          under 560px at `text-5xl`, and again from 640 to ~880 at `text-7xl`,
          where "Victor Danger" fits a line and the last word does not. Three
          words split two-and-one read as a typesetting accident rather than
          as a name.

          So the size follows the viewport until the full 72px fits, and the
          line is simply never allowed to break. 7.25vw is the number that
          makes that safe: the name sets ~11.6× its own font size wide, and
          the content box is `100vw - 48px` after the gutters, so anything
          much above 7.5vw puts the h1 wider than the page and scrolls the
          whole document sideways. It reaches the 4.5rem ceiling at 993px, and
          72px needs 885px of viewport to fit on one line — `lg` sits safely
          past both, so from 1024 up this is exactly the 7xl it has always
          been, with `whitespace-normal` back as the safety valve should the
          name ever get longer. */}
      <h1 className="text-[clamp(1.25rem,7.25vw,4.5rem)] font-bold tracking-tight whitespace-nowrap text-heading lg:whitespace-normal lg:text-7xl">
        {site.name}
        <span className="text-accent">.</span>
      </h1>
      {/* Sans, not mono — this is a subtitle, not a label. */}
      <p className="mt-4 text-lg text-muted sm:text-xl">{site.tagline}</p>
      {/* Mono, because this one *is* a label: the stack, named where a reader
          scanning for it will actually look. The colon is the accent's only
          job here: it marks the turn from what the work is built with to what
          became of it, without spending a colour on either half.

          It was an em dash, which is the obvious mark for that turn and is
          not one this site uses anywhere. A colon does the same work and sets
          tighter, so it sits against the last technology instead of floating
          in a space of its own. The middle dots between the technologies are
          muted and this is not, which is what stops it reading as a fifth
          separator. */}
      <p className="mt-3 font-mono text-[13px] text-muted">
        {site.stackLine.technologies}
        <span className="text-accent">:</span> {site.stackLine.outcome}
      </p>
      {/* Flush left with the name above it — the buttons carry their own
          border, so unlike the bare icons they replaced there is no hit-area
          padding to pull back. */}
      <ContactLinks className="mt-8" />
    </header>
  );
}
