import { ImageResponse } from "next/og";

import {
  OG_ACCENT,
  OG_CHIP,
  OG_CHIP_LIMIT,
  OG_CHIP_ROW,
  OG_CONTENT_TYPE,
  OG_FOREGROUND,
  OG_FRAME,
  OG_HEADING,
  OG_MUTED,
  OG_SIZE,
  sampleStack,
} from "@/components/og";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";

/**
 * A card per case study.
 *
 * The site card (app/opengraph-image.tsx) leads with the name, because the
 * thing being shared there is the person. A case-study link is shared to say
 * "look at this product", so this one leads with the product and keeps the
 * name in the eyebrow. Same palette, same chip, same frame — see
 * components/og.ts, which both files draw from.
 *
 * It also repairs the page's metadata by existing at all: the case-study page
 * declares its own `openGraph` block, which replaces the inherited one and
 * takes the root card with it. A file-convention image *in this segment*
 * applies to this segment, so the page gets an og:image again — a better one
 * than the one it lost.
 */
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

/** Both slugs are known at build time, the same two the page enumerates. This
 * is a separate route from the page, so it needs its own copy rather than
 * inheriting the page's. */
export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

/**
 * One image per route, and the only reason this is here rather than a static
 * `alt` export: `alt` cannot vary by slug, and "Open Graph image" is not alt
 * text. What a card actually shows is the product's name over its platforms,
 * its summary, and the stack, so that is what gets described.
 */
export async function generateImageMetadata({
  params,
}: {
  /* The docs for `generateImageMetadata` type this as a plain object, unlike
   * the default export's. They are stale: Next 16 passes a promise to both,
   * and reading `params.slug` off it yields `undefined`, which fails the
   * build during page-data collection rather than at request time. */
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];

  /* Next calls this once with empty params while collecting page data, before
   * it knows any slug, purely to learn the shape of the image set. Answering
   * that call with the placeholder keeps the build from throwing on a lookup
   * that cannot succeed; it is never the entry that reaches a page, because
   * every real render arrives with a slug. Verified in the built HTML: both
   * case studies carry their own alt text, not this. */
  if (!study) {
    return [
      {
        id: "card",
        size: OG_SIZE,
        contentType: OG_CONTENT_TYPE,
        alt: `How it's built · ${site.name}`,
      },
    ];
  }

  return [
    {
      id: study.slug,
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
      alt:
        `${study.title} on a dark navy card: the project name above the ` +
        `platforms it ships to (${study.platforms.join(", ")}), a one-line ` +
        `summary of what it does, and chips naming the technologies it is ` +
        `built with.`,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];

  /* The stack comes off the project, not the case study, for the same reason
   * the page reads it from there: there is only ever one list of what a
   * project is built with. The card has no room for the layer labels, so the
   * groups are sampled across rather than flattened — see sampleStack, which
   * exists because flattening dropped a whole layer off one of these cards. */
  const project = site.projects.find((candidate) => candidate.slug === slug);
  const chips = sampleStack(project?.stack ?? [], OG_CHIP_LIMIT);

  return new ImageResponse(
    (
      // Satori needs an explicit display:flex on every element with more than
      // one child — it has no block layout to fall back on.
      <div style={OG_FRAME}>
        {/* The eyebrow is the only thing on this card that says whose work
            it is. The big type belongs to the product. */}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: OG_MUTED,
            letterSpacing: "0.04em",
          }}
        >
          {`${site.name} · How it's built`}
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", marginTop: 18 }}>
          <div
            style={{ fontSize: 82, color: OG_HEADING, letterSpacing: "-0.03em" }}
          >
            {study.title}
          </div>
          <div
            style={{ fontSize: 82, color: OG_ACCENT, letterSpacing: "-0.03em" }}
          >
            .
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 30,
            color: OG_ACCENT,
          }}
        >
          {study.platforms.join(" · ")}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 26,
            color: OG_FOREGROUND,
            maxWidth: 960,
            lineHeight: 1.45,
          }}
        >
          {study.summary}
        </div>

        <div style={{ ...OG_CHIP_ROW, marginTop: 40 }}>
          {chips.map((chip) => (
            <div key={chip} style={OG_CHIP}>
              {chip}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 24,
            color: OG_ACCENT,
          }}
        >
          {`dangervalentine.com/products/${study.slug}`}
        </div>
      </div>
    ),
    size,
  );
}
