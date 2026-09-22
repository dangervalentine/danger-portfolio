import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";

/** The apex, the résumé, and one entry per case study. `/resume/print` is
 * deliberately absent: it is the source the PDF is rendered from, not a page
 * anyone should arrive at, and it carries `noindex` to say so twice. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...Object.keys(caseStudies).map((slug) => ({
      url: `${site.url}/products/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
