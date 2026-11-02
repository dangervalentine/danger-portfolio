# Data Model: Riftwyrm Featured Project

Both entities already have TypeScript types in this repo: `Project` in `content/site.ts`
and `CaseStudy` in `content/case-studies.ts`. This feature adds one instance of each and
no new fields. Every copy value below is a draft. It must be checked against
`dragon-hunter` (FR-008) and the em dash rule before it is committed.

## Project entry (`site.projects`, after Density Fitness)

| Field | Value | Rule |
|---|---|---|
| `title` | `"Riftwyrm"` | |
| `featured` | `true` | puts it in the "Products" block |
| `slug` | `"riftwyrm"` | must equal the `caseStudies` key |
| `description` | A solo fantasy card game for phones, tablets and the browser: build a hand, read the road ahead, and hunt four dragons across a broken land. | Generic wording only (R8). No original-game terms. |
| `engineering` | `seeded rules engine · playtest simulator · platform achievements, leaderboards and sync` | One mono line. Middle dots, not dashes. |
| `stack` | Game: Godot, GDScript · Platform services: Game Center, Google Play Games · Tooling: Python, pytest | R6 |
| `platforms` | `["iOS", "Android", "Web"]` | R5 |
| `status` | `"In development"` | |
| `stores` | `[APP_STORE, GOOGLE_PLAY, { ...WEB_APP_BADGE }]`, none with `href` | R1. Every entry pending means the band shows the one coming-soon line. |
| `liveHref` | absent | Add it when a public build exists; the card keeps linking to the case study. |
| `repoHref` | absent | the repository is private |
| `note` | `"Private repository"` | R4 |
| `image` | `riftwyrm.webp`, 1280 × 720 | |
| `imageSquare` | `riftwyrm-square.webp`, 1440 × 1440 | |
| `imageFocus` | set once the art exists, so the 280px band keeps the wordmark | |
| `imageAlt` | describes the composition, e.g. "Riftwyrm art: the brass wordmark over a dragon in its lair." | |

**State transitions** (content-only, FR-015):

- Web goes live: add `liveHref` and remove the pending web entry from `stores`.
- A store goes live: add `href` to that store. The band switches from the line to buttons
  because not every store is pending any more.

## CaseStudy entry (`caseStudies.riftwyrm`)

| Field | Value / constraint |
|---|---|
| `slug`, `title` | `"riftwyrm"`, `"Riftwyrm"` |
| `platforms`, `years` | `["iOS", "Android", "Web"]`, `"2026 – Present"` (en dash) |
| `summary` | One or two sentences. It may carry the single "inspired by" credit (R8). It is also the meta description and the OG card text. |
| `highlights` | Exactly six. Draft: "Seeded, deterministic rules engine" · "Headless playtest simulator" · "Platform achievements and leaderboards" · "Progress sync with lossless merge" · "Touch, mouse, keyboard and controller" · "One UI across twelve screen shapes" |
| `diagram` | Three bands, per R10. No server, database or API of the project's own (FR-007). |
| `caption` | One sentence: the game runs entirely on the device, and talks only to the platform's own game services when the player signs in. |
| `decisions` | Three. Candidates: the engine never imports the UI; every shown word comes from one text store; progress merges as a union so the order does not matter. |
| `exhibits` | Four (R10). Each has a one-line `problem` and three verb-led `points`, with no ids or internals (security rule). |
| Sync claims | Exhibits and diagram name both Game Center and Google Play Games for saved progress. They may publish only once dragon-hunter specs/038 has landed (FR-007c). |
| `links` | `{ label: "App Store · coming soon" }`, `{ label: "Google Play · coming soon" }`, `{ label: "Web · coming soon" }`, `{ label: "Source · private repository" }` |
| `screenshots` | 4 to 8 frames at 1920 × 1080 (contract: screenshot-assets.md). Each has a 1 to 2 word `label` and an `alt` that says what the frame shows. |

## Marketing frame

| Attribute | Rule |
|---|---|
| Size / aspect | 1920 × 1080, 16:9; the stage is a fixed 16:9 frame |
| Format | WebP in `public/projects/riftwyrm/`, imported statically |
| Headline | Baked in. Taken from the game's text store. No em dash. |
| Provenance | Produced by the seeded pipeline (seed and game version recorded in the game repo's manifest) |
