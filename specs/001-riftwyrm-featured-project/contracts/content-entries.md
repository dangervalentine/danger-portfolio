# Contract: Riftwyrm content entries

The portfolio's interface for this feature is the pair of content entries that the
existing components render. Each component expects the following of them.

| Consumer | Reads | Requires |
|---|---|---|
| `components/Projects.tsx` | `featured` | `true`. Order in `site.projects` is the display order. |
| `components/FeaturedProject.tsx` | `slug`, `stores`, `liveHref`, `image`, `imageSquare`, `imageAlt`, `platforms`, `status`, `description`, `engineering`, `stack` | If every store lacks an `href`, the band renders "<labels joined as A, B & C> · coming soon" and the web button only if `liveHref` is set. |
| `components/ProjectSource.tsx` | `repoHref`, `note` | With no `repoHref`, `note` is rendered as text. |
| `app/products/[slug]/page.tsx` | `caseStudies[slug]`, and the project with the same `slug` | The slug must exist in both files, or the page renders without stack or art. |
| `app/products/[slug]/opengraph-image.tsx` | `title`, `platforms`, `summary`, `slug` | Summary short enough for the card. No em dash. |
| `app/sitemap.ts` | keys of `caseStudies` | automatic |
| `components/og.ts` | `stack` | Groups front to back. The chip limit is 10. |
| `components/Screenshots.tsx` | `screenshots[]` | 16:9 images. A non-empty `label` and `alt` on each. |
| `components/CaseStudyFooter.tsx` | `links[]` | A link with no `href` renders dimmed with its own label. |

Invariant: switching any destination live is an edit to these two entries only (FR-015, SC-007).
