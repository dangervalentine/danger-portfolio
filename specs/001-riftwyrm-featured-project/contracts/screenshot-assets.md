# Contract: Riftwyrm marketing assets (from `dragon-hunter` to this repo)

## Produced in the game repository

| Output | Size | Made by | Notes |
|---|---|---|---|
| Carousel frames (panels) | 1920 × 1080 PNG, opaque | `tools/store_shots.gd` with a new non-Apple `portfolio` class, `--panels` | Seeded winning game. Each has a caption from `data/text.json`. Moments: title, trial, dragons, showdown, won, plus leaderboard (and achievements if legible). |
| Wide art | 1280 × 720 PNG | added output of `tools/make_steam_art.gd` (dragon over lair, brass wordmark) | Keep the wordmark clear of the 280px centre band's crop, or record the focus. |
| Square art | 1440 × 1440 PNG | same tool | Recomposition, not a crop of the wide art |
| Manifest | text | the run | Records the seed, game version and caption key for each frame |

Requirements:
- Same seed and version give the same frames (SC-004).
- Only shipped art, type and colour.
- No publisher marks or original card scans (FR-013).
- No em dash in any caption.
- The Apple class table and `tests/test_store_assets.gd` stay unchanged.

## Consumed here

1. Convert each PNG to WebP (quality about 82) and place it under `public/projects/riftwyrm.webp`,
   `riftwyrm-square.webp` and `riftwyrm/<moment>.webp`. Name frames `desktop-<moment>`, as in the
   other studies.
2. Import them statically in `content/site.ts` and `content/case-studies.ts`.
3. Write `label` and `alt` for each frame from what it shows, not from the caption alone.
