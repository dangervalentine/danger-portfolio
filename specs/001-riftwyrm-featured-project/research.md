# Research: Riftwyrm Featured Project

Evidence paths prefixed `dh/` are in the sibling game repository `../dragon-hunter`.

## R1. How "coming soon" shows on a row with nothing live

- **Decision**: Use the existing all-pending treatment in `components/FeaturedProject.tsx`.
  When every store is unreleased, the band shows one muted line instead of dimmed
  buttons. Riftwyrm lists App Store, Google Play and a pending Web App entry (the
  `WEB_APP_BADGE` shape with no `href`), so the line reads
  "App Store, Google Play & Web App · coming soon". The join changes from
  `" & "` to "A, B & C", which leaves Density's two-item line unchanged.
- **Rationale**: the component deliberately collapses a band of buttons nobody can
  press into one line. Three dimmed buttons would undo that design for one card. The
  line is real text, so FR-003's "announced as coming soon" holds for screen readers.
- **Spec impact**: FR-003's "disabled buttons" wording is satisfied by the line. The
  spec was amended to say so.
- **Alternatives considered**: render three disabled `StoreButton`s, which contradicts
  the component's documented intent. Omit the web build entirely, which hides a
  platform the game targets.

## R2. The block heading "Shipped products"

- **Decision**: Rename it to "Products" and update the comment in `components/Projects.tsx`.
- **Rationale**: Riftwyrm has not shipped, so the heading would become false (FR-014).
  The comment explains the earlier rename: "Products" and "Projects" were a letter
  apart. The second block is now "Side projects", so "Products" no longer collides.
- **Alternatives considered**:
  - Keep "Shipped products", which is false for one row.
  - "Products and works in progress", which is long and front-loads the caveat.
  - A separate "In development" block, which is a whole new section for one card.

## R3. Where the card links

- **Decision**: Set `slug: "riftwyrm"` with no `liveHref` and no `repoHref`. The card's
  stretched link goes to `/products/riftwyrm`, which is live.
- **Rationale**: this satisfies FR-004, since every link resolves. When a public build
  exists, adding `liveHref` lights the web button with no other change (FR-015).

## R4. Provenance note in place of the repository button

- **Decision**: `note: "Private repository"`. The case-study footer link reads
  `{ label: "Source · private repository" }` with no `href`.
- **Rationale**: `dh` is private (`gh repo view`: PRIVATE). The footer type already
  documents that a closed-source repository is described, not called "coming soon".

## R5. Platforms, release stage, years

- **Decision**: platforms `["iOS", "Android", "Web"]`, status `"In development"`,
  years `"2026 – Present"` (first commit 2026-10-13).
- **Rationale**: those three platforms are what the game and its site present. Windows,
  macOS and Linux presets exist (`dh/export_presets.cfg`), but nothing is distributed
  there; the Linux build is a side-loaded Steam Deck copy. Order matches the other two rows.

## R6. Stack groups

- **Decision**:
  - Game: Godot, GDScript
  - Platform services: Game Center, Google Play Games
  - Tooling: Python, pytest
- **Rationale**: these are what the code is made of: GDScript throughout, Python for the
  simulator and generators, the two platform SDK plugins, and `dh/tools/sim/test_report.py`.
  `og.ts` picks chips across groups, so three short groups fit the OG card's limit of ten.
- **Alternatives considered**: listing GodotApplePlugins and godot-play-game-services by
  name. Rejected, because those are dependency inventory, which the case-study rules exclude.

## R7. Scope of the sync claim (FR-007b, FR-008)

- **Superseded 2026-11-02 (clarification)**: write the exhibit and diagram for both
  Game Center and Google Play Games. iOS sync (dragon-hunter specs/038) is implemented
  immediately after this feature is specified, and publishing is gated on it (spec
  FR-007c). The original decision is kept below for the record.
- **Original decision**: the progress-sync exhibit describes the union merge
  (`dh/ui/model/progress_merge.gd`) and offline retry (`dh/ui/model/account_sync.gd`)
  generally, but names Google Play Games as where sync runs today. Achievements and
  leaderboards are claimed for both platforms.
- **Rationale**: `dh/ui/platform/game_center_backend.gd` states that the saved progress
  copy "is not here yet" on iOS. The rule that every claim must survive someone opening
  the repo forbids claiming iOS sync.
- **Follow-up**: `dragon-hunter/specs/038-game-center-progress-sync` (spec and plan)
  implements Game Center saved games. When its device test passes, the exhibit names
  both platforms. If it lands before this feature ships, write the exhibit for both
  from the start.

## R8. Attribution wording (FR-009)

- **Decision**: at most one credit phrase, "inspired by solo tabletop card games like
  Dragons of Etchinstone", in the case-study summary or one decision, not on the row.
  Never name the publisher or designer, or use the original's terms (e.g. the original
  dragon names, "Soak", "Mage Cards", "Action Set", "Encounter", "Divert", "Key Card").
  This edition's own words are allowed ("Triad", "Cindermaw", "Spellbook").
- **Rationale**: this follows the Paladin's Oath precedent the user chose, and matches
  the game's own about text (`dh/data/text.json`, `game.about`: "inspired by ...").
  Keeping it off the row keeps the home page as generic as `riftwyrm-site`.
- **Alternatives considered**: no credit at all, as `riftwyrm-site` does. That was set
  aside by the user's decision, but it remains the fallback if the user prefers it on review.

## R9. Screenshot strategy (FR-011, FR-012)

- **Decision**: extend the game's seeded store pipeline (`dh/tools/store_shots.gd`) with
  a separate, non-Apple class table holding one `portfolio` class at 1920 × 1080, no
  insets. That is the size of the existing carousel frames (`nextquest/desktop-*.webp`
  are 1920 × 1080).
  - Run it in `--panels` mode so every frame has a baked-in caption over the dimmed
    dragon lair.
  - Captions are text-store keys in their official wording, held to the no-em-dash rule.
  - Add one moment for the Leaderboard screen and, if it reads well, one for
    Achievements, so the platform-services exhibit has pictures.
  - Wide (1280 × 720) and square (1440 × 1440) hero art is composed the way
    `dh/tools/make_steam_art.gd` already builds its wide cover: a dragon over its lair
    with the brass wordmark. It is added there as two more outputs.
  - PNGs are converted to WebP on the portfolio side (`cwebp -q 82`, or the `sharp`
    that ships with Next.js if `cwebp` is absent) and committed under `public/projects/`.
- **Rationale**:
  - The pipeline already replays a game the bot really wins on seed 1, and refuses to
    run if that stops being true. That gives determinism (SC-004) for free.
  - The pipeline uses only shipped art, fonts and text (FR-013).
  - The game's `Solver.view_for_window` lays out any aspect correctly.
  - A separate table avoids breaking `dh/tests/test_store_assets.gd`, which pins exactly
    three Apple slots.
- **Alternatives considered**:
  - Hand-cropped captures, which are not repeatable.
  - Letterboxed iPad or iPhone shots, which are the wrong aspect and get cropped.
  - Adding the class to the Apple table, which breaks that test and the manifest's
    "Apple accepted" semantics.
- **Dependency**: this work happens in `dragon-hunter`, ideally as its own Spec Kit
  feature there (its specs run to 035). Until it lands, the portfolio can ship US1
  with the lair-and-wordmark art alone. The case-study page already falls back to
  the art band when a study has no `screenshots`.

## R10. Case-study shape for a game with no server

- **Decision**: keep every section the template has. Diagram bands:
  1. "External · platform game services": Game Center and Google Play Games.
  2. "Client · one Godot project": the platform builds, the UI and view state, then
     the rules engine and content.
  3. "Build time · never shipped": the playtest simulator, the test runner and the
     screenshot pipeline.

  Exhibits:
  - achievements and the Leaderboard on platform services
  - progress sync
  - balancing with the simulator
  - one UI across twelve screen shapes and four input methods
- **Rationale**: `ArchitectureDiagram` takes any bands, so there is no component change.
  Showing build-time tooling is honest about where the engineering went, and it fills
  the space a backend fills in the other studies.
- **Security**: following the case-study header rule, exhibits name the class of
  problem and the shape of the answer. No platform ids, leaderboard ids, score-tag
  encoding or merge internals that would help forge progress or scores.
