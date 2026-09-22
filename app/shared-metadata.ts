import type { Metadata } from "next";

import { OG_SIZE } from "@/components/og";
import { site } from "@/content/site";

/**
 * The site's Open Graph card, in the shape a page's `metadata` needs it.
 *
 * `app/opengraph-image.tsx` is a file-convention image, which every page
 * inherits — right up until that page declares an `openGraph` block of its
 * own. Next replaces `openGraph` wholesale rather than merging it field by
 * field, so a page that sets a title and a URL there drops the inherited
 * image with them, and the same goes for `twitter`. Nothing warns about it;
 * the tags are simply absent, and the link previews as a bare text card.
 *
 * So any page that declares either block spreads this into it:
 *
 *     openGraph: { type: "profile", url: "/resume", title, description,
 *                  ...siteOgImage },
 *     twitter:   { card: "summary_large_image", title, description,
 *                  ...siteOgImage },
 *
 * The exception is a page with a card of its own. The case studies each
 * generate one from app/products/[slug]/opengraph-image.tsx, and a file
 * convention in the page's own segment wins, so they neither need this nor
 * should use it.
 *
 * The URL is the route the generated image is served at. It is relative on
 * purpose: `metadataBase` in layout.tsx resolves it, which is the one place
 * the host is spelled out.
 *
 * One thing it does not carry, which an inherited card does: the content hash
 * Next appends to the file-convention URL (`/opengraph-image?3f67ef2c…`). That
 * hash is generated internally and is not exposed to read back, so a page
 * using this spread links the unhashed route. It serves the same image; the
 * only cost is that redrawing the card will not by itself bust a scraper's
 * cache for these pages, where an inherited card's would.
 */
export const siteOgImage = {
  images: [
    {
      url: "/opengraph-image",
      width: OG_SIZE.width,
      height: OG_SIZE.height,
      alt: `${site.name} · ${site.tagline}`,
    },
  ],
} satisfies Pick<NonNullable<Metadata["openGraph"]>, "images">;
