import type { MetadataRoute } from "next";

const SITE_URL = "https://dangervalentine.com";

/** One page, one entry. It exists so the apex is submitted explicitly rather
 * than discovered, and so there is somewhere obvious to add per-project routes
 * if they ever land. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
