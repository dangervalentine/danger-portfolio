# Implementation Plan: Riftwyrm Featured Project

**Branch**: `001-riftwyrm-featured-project` | **Date**: 2026-11-02 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-riftwyrm-featured-project/spec.md`

## Summary

Add Riftwyrm as a third featured row on the home page and give it a "How it's built"
case study, both as content entries that the existing components already render.
Only two small rendering changes are needed:

1. The block heading "Shipped products" becomes "Products", since Riftwyrm has not shipped.
2. The all-pending store line learns to list three items, so the web build can be
   shown as coming soon beside the two stores.

The case study's diagram shows a client-only game that talks to Game Center and
Google Play Games, with no server of the project's own. Images come from the game
repository's existing seeded store-screenshot pipeline, extended there with a 16:9
portfolio size. They are converted to WebP and committed under
`public/projects/riftwyrm/`.

## Technical Context

**Language/Version**: TypeScript 5 (strict), React 19.2, Next.js 16.3 (App Router)

**Primary Dependencies**: next/image, next/og (existing); embla-carousel-react (existing carousel). No new runtime dependencies.

**Storage**: N/A (content is TypeScript modules in `content/`; images are static files in `public/`)

**Testing**: no unit test suite in this repo. Verification is `npm run lint`, `npm run build`, the em dash grep on build output, and a browser check at phone and desktop widths (constitution quality gates). The game repo's own suite (`tools/test.sh`) covers the screenshot pipeline change there.

**Target Platform**: static site served by `next start` on the Windows production box (port 3100 behind cloudflared)

**Project Type**: web application (single Next.js app, no backend)

**Performance Goals**: no regression in home page LCP. The first featured image keeps eager loading. Riftwyrm's row, placed third, loads lazily. Images are WebP at the same sizes as existing featured art.

**Constraints**:
- No em dashes on any surface, including baked-in headlines.
- No third-party IP in copy or art beyond the agreed "inspired by" credit.
- Every claim must be verifiable against `dragon-hunter`.
- Content-only switch-on when links go live.

**Scale/Scope**:
- One project entry.
- One case study.
- Three images for the row and band: wide, square and OG fallback. (OG is drawn from text, so no image is needed.)
- Six or seven carousel frames.
- Two small component edits.
- One capture-class addition in the game repo.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | How this plan complies |
|---|---|---|
| I. Read installed Next.js docs first | PASS (action required) | No new Next.js APIs. Before editing `FeaturedProject.tsx` and `Projects.tsx`, read the Image (`getImageProps`) and metadata/OG guides under `node_modules/next/dist/docs/01-app/` (see quickstart step 0). |
| II. No em dashes (non-negotiable) | PASS | Copy drafted without them. Build-output grep, the case-study OG source and the baked-in carousel headlines are all checked (quickstart steps 5 to 7). |
| III. Content lives in `content/` | PASS | All Riftwyrm copy goes in `content/site.ts` and `content/case-studies.ts`. Components gain no project copy. The résumé is unchanged, so no PDF rebuild is needed. |
| IV. Static, server-first, no backend | PASS | Static route via the existing `generateStaticParams`. No new `"use client"` and no new dependencies. |
| V. Accessible and discoverable | PASS | Alt text for every image and slide label. The sitemap and OG card are derived from `caseStudies` automatically. The coming-soon line is real text, so a screen reader reads it. |
| Tech & deployment constraints | PASS | No change to `scripts/deploy.ps1`. `main` must build. |
| Quality gates | PASS | quickstart.md runs all five gates. |

**Post-design re-check (after Phase 1)**: PASS. The design adds no route, dependency, client component or copy outside `content/`. Two decisions narrow the spec rather than widen it, and both are recorded in research.md: R1 (the coming-soon line) and R7 (iOS sync scope).

## Project Structure

### Documentation (this feature)

```text
specs/001-riftwyrm-featured-project/
├── plan.md              # This file
├── research.md          # Phase 0 decisions R1 to R10
├── data-model.md        # Phase 1: the Riftwyrm Project and CaseStudy entries, field by field
├── quickstart.md        # Phase 1: validation run
├── contracts/
│   ├── content-entries.md     # what the portfolio's components require of the two entries
│   └── screenshot-assets.md   # what the game repo must hand over, and how it is made
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
content/
├── site.ts              # + Riftwyrm Project entry (featured, slug "riftwyrm"), image imports;
│                        #   comments that say "two featured apps" updated
└── case-studies.ts      # + caseStudies.riftwyrm, carousel image imports

components/
├── Projects.tsx         # heading "Shipped products" -> "Products" (+ its comment)
└── FeaturedProject.tsx  # all-pending line joins 3+ labels as "A, B & C"

app/products/[slug]/
└── page.tsx             # comment "Both pages" only; no behaviour change

public/projects/
├── riftwyrm.webp            # 1280x720 wide art (row band, case-study fallback)
├── riftwyrm-square.webp     # 1440x1440 square recomposition (row, lg and up)
└── riftwyrm/                # 1920x1080 carousel frames, headline baked in
    ├── desktop-title.webp
    ├── desktop-trial.webp
    ├── desktop-dragons.webp
    ├── desktop-showdown.webp
    ├── desktop-won.webp
    ├── desktop-leaderboard.webp
    └── mobile-showcase.webp     # optional, as for the other two

# Sibling repository (dependency, tracked there under its own Spec Kit spec):
../dragon-hunter/tools/store/classes.gd   # + a non-Apple PORTFOLIO class table at 1920x1080
../dragon-hunter/tools/store/shots.gd     # + leaderboard/achievements moment(s), portfolio captions
../dragon-hunter/data/text.json           # + caption keys for the portfolio headlines
```

**Structure Decision**: a single Next.js project with no backend. The feature is almost entirely content. The two component edits are each a few lines, and the image pipeline lives in the game repository, where the art and the seeded game are.

## Complexity Tracking

No constitution violations to justify.
