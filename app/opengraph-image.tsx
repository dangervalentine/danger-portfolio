import { ImageResponse } from "next/og";

import {
  OG_ACCENT,
  OG_CHIP,
  OG_CHIP_ROW,
  OG_CONTENT_TYPE,
  OG_FOREGROUND,
  OG_FRAME,
  OG_HEADING,
  OG_MUTED,
  OG_SIZE,
} from "@/components/og";
import { site } from "@/content/site";

/** File-convention Open Graph image, and the card every page falls back to.
 * Next picks this up automatically and emits the og:image / twitter:image
 * tags, so `metadata` in layout.tsx does not declare an image of its own.
 *
 * Two things about that fallback are worth knowing before adding a page. A
 * page that declares an `openGraph` block *replaces* the inherited one rather
 * than extending it, and so silently loses this card: `siteOgImage` in
 * app/shared-metadata.ts exists to hand it back, and every such page spreads
 * it. The case studies are the one deliberate exception — they have a card of
 * their own, from the sibling of this file at
 * app/products/[slug]/opengraph-image.tsx.
 *
 * Drawn from the site's own tokens rather than a screenshot: the card has to
 * carry a name and a stack at thumbnail size in a LinkedIn feed, and a
 * shrunken page render carries neither. The two featured projects have their
 * own promotional art, but that art is theirs — this one has to be Victor's. */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${site.name} · Senior Software Developer`;

/** Ten technologies, at `OG_CHIP_LIMIT`: two rows that fit without shrinking
 * the type, and past that the row is texture rather than information.
 *
 * Which ten changed when the résumé arrived. This row used to be the stack of
 * the two applications the page below shows, which made the card claim a
 * subset of a nine-year career: no Angular, no Node.js, no engine but
 * PostgreSQL. It now spans both halves of the work (backend, web, mobile,
 * data, platform) because a card in a feed is the first and often only thing
 * a recruiter sees, and what it leaves out it is understood to lack.
 *
 * Nothing here is implied by anything else here, which is the rule that
 * decides the last few slots. A card is a PNG: no crawler reads it and no ATS
 * matches against it, so a chip earns its place only by telling a person
 * something the chip beside it did not. That rules out C# next to .NET, Expo
 * next to React Native, and ASP.NET Core next to both. All three are still on
 * the page's `keywords` and the `Person`'s `knowsAbout`, where a machine does
 * read and the redundancy is free. */
const CHIPS = [
  ".NET",
  "Node.js",
  "TypeScript",
  "React",
  "Angular",
  "Next.js",
  "React Native",
  "PostgreSQL",
  "SQL Server",
  "Azure",
];

export default function Image() {
  return new ImageResponse(
    (
      // Satori needs an explicit display:flex on every element with more than
      // one child — it has no block layout to fall back on.
      <div style={OG_FRAME}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div
            style={{ fontSize: 86, color: OG_HEADING, letterSpacing: "-0.03em" }}
          >
            {site.name}
          </div>
          <div
            style={{ fontSize: 86, color: OG_ACCENT, letterSpacing: "-0.03em" }}
          >
            .
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 36,
            color: OG_MUTED,
          }}
        >
          {site.tagline}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 27,
            color: OG_FOREGROUND,
            maxWidth: 940,
            lineHeight: 1.45,
          }}
        >
          {/* The line said "on one backend I build and run myself", which was
              true and was the wrong boast: it described someone working
              alone, when the fact worth carrying is that the same engineer
              does this inside a team on client engagements and again on his
              own products. Both halves are named, in the order a reader
              weighs them, and no first person: that was what made the old
              line read as a hobby. */}
          Nine years shipping production systems end to end: client
          engagements and independent products, across web, iOS and Android.
        </div>

        <div style={{ ...OG_CHIP_ROW, marginTop: 44 }}>
          {CHIPS.map((chip) => (
            <div key={chip} style={OG_CHIP}>
              {chip}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 24,
            color: OG_ACCENT,
          }}
        >
          dangervalentine.com
        </div>
      </div>
    ),
    size,
  );
}
