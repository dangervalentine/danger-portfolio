---
description: "Task list for the Riftwyrm featured project"
---

# Tasks: Riftwyrm Featured Project

**Input**: Design documents from `specs/001-riftwyrm-featured-project/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: this repo has no unit test suite and the spec asks for none. Verification
tasks use the quickstart and the constitution's quality gates. The game repo's test
suite (`tools/test.sh`) covers the changes made there.

**Organization**: grouped by user story. US1 ships on its own; US2 and US3 each add to it.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: US1, US2 or US3 from spec.md

## Path Conventions

- Portfolio paths are relative to this repo root (`danger-portfolio/`).
- Game paths are prefixed `../dragon-hunter/` (the Riftwyrm game, a sibling repo).
- Rules for every task that writes copy or images:
  - **No em dash** (U+2014) anywhere a reader can see. Use a colon, comma,
    parentheses or full stop instead. The middle dot `·` separates short lists, and
    the en dash `–` is used only in date ranges.
  - **IP rule (research R8)**:
    - Never write the publisher's name or the designer's name.
    - Never use the original game's terms: the original dragon names, "Soak",
      "Mage Cards", "Action Set", "Encounter", "Divert", "Key Card".
    - The only allowed mention of the original is one credit phrase in the case
      study: "inspired by solo tabletop card games like Dragons of Etchinstone".
    - This edition's own words ("Triad", "Cindermaw", "Spellbook") are allowed.

---

## Phase 1: Setup

- [X] T001 Read the installed Next.js guides before touching code (constitution I): the Image component and `getImageProps`, and the Metadata and `opengraph-image` file conventions, under `node_modules/next/dist/docs/01-app/`. Note any deprecation that affects `components/FeaturedProject.tsx` or `app/products/[slug]/page.tsx`.
- [X] T002 Create and switch to branch `001-riftwyrm-featured-project` in this repo (`git switch -c 001-riftwyrm-featured-project`). Leave the unrelated `package-lock.json` change out of every commit.
- [X] T003 [P] Create an isolated worktree in the game repo for the art and screenshot work, so its uncommitted spec 037 changes are not disturbed: `git -C ../dragon-hunter worktree add ../dragon-hunter-portfolio -b portfolio-assets main`. Every later `../dragon-hunter/` edit in this file happens in `../dragon-hunter-portfolio/`.
- [X] T004 [P] Capture regression baselines before any change. Run `npm run build && npm run start`, then screenshot the home page "Shipped products" block, `/products/nextquest` and `/products/density-fitness` at 390px, 768px and 1440px widths. Save them in the session scratchpad as `baseline-<page>-<width>.png`.

---

## Phase 2: Foundational (blocks US1)

Purpose: the wide and square art that every row and band needs.

- [X] T005 Add two portfolio compositions to `../dragon-hunter/tools/make_steam_art.gd`.
  - Constants: `PORTFOLIO_WIDE := Vector2i(1280, 720)` and `PORTFOLIO_SQUARE := Vector2i(1440, 1440)`.
  - Builders: `_portfolio_wide(dragon)`, laid out like `_wide_cover` (wordmark left, dragon right, lair at `LAIR_LIGHT`); and `_portfolio_square(dragon)`, laid out like `_cover` (wordmark above, dragon below, centred).
  - Add both to the `shots` dictionary as roles `portfolio-wide` and `portfolio-square`, saved as PNG rather than JPEG so they convert to WebP once.
  - Extend the header comment's file list with both. No caption text, so no new strings.
- [X] T006 Run `godot --path ../dragon-hunter-portfolio -s tools/make_steam_art.gd -- build/portfolio-art` (it draws through a window, so not headless). Check by eye that both PNGs show the wordmark whole, the dragon unclipped, and no third-party art.
- [X] T007 Convert to WebP and place in the portfolio:
  - `cwebp -q 82 <out>/Riftwyrm-portfolio-wide.png -o public/projects/riftwyrm.webp`
  - `cwebp -q 82 <out>/Riftwyrm-portfolio-square.png -o public/projects/riftwyrm-square.webp`
  - Verify the sizes with `sips -g pixelWidth -g pixelHeight`: 1280x720 and 1440x1440.

**Checkpoint**: both art files exist in `public/projects/`.

---

## Phase 3: User Story 1, Riftwyrm as a featured row (Priority: P1) MVP

**Goal**: a third featured row for Riftwyrm, in the same style, with everything shown as coming soon and nothing linking anywhere that is not live.

**Independent Test**: the home page at 390px, 768px and 1440px shows the Riftwyrm row after Density Fitness.
- Its band reads "App Store, Google Play & Web App · coming soon".
- "Private repository" appears where a repository button would be.
- The card is not a link (it has no slug until US2).
- NextQuest and Density look unchanged.

- [X] T008 [US1] In `content/site.ts`:
  - Import the two images: `import riftwyrmImg from "@/public/projects/riftwyrm.webp";` and `import riftwyrmSquareImg from "@/public/projects/riftwyrm-square.webp";`, kept in the alphabetical import block.
  - Add a project entry immediately after the Density Fitness entry in `site.projects` with:
    - `title: "Riftwyrm"`, `featured: true`
    - `description: "A solo fantasy card game for phones, tablets and the browser: build a hand, read the road ahead, and hunt four dragons across a broken land."`
    - `engineering: "seeded rules engine · playtest simulator · platform achievements, leaderboards and sync"`
    - `stack`: `[{ label: "Game", items: ["Godot", "GDScript"] }, { label: "Platform services", items: ["Game Center", "Google Play Games"] }, { label: "Tooling", items: ["Python", "pytest"] }]`
    - `platforms: ["iOS", "Android", "Web"]`, `status: "In development"`
    - `stores: [APP_STORE, GOOGLE_PLAY, { ...WEB_APP_BADGE }]`, none with an `href`
    - `note: "Private repository"`
    - `image: riftwyrmImg`, `imageSquare: riftwyrmSquareImg`
    - `imageAlt`: one sentence describing the art, e.g. "Riftwyrm art: the brass wordmark beside a dragon in its dimmed lair."
    - `imageFocus`: chosen so the 280px band keeps the wordmark, e.g. `"left center"`; confirm by eye in US2.
  - Leave out `liveHref`, `repoHref` and `slug`.
  - Add a one-line comment on `stores` saying that every entry is pending, so the band shows one line, and that going live means adding `liveHref` and removing the pending web entry.
- [X] T009 [P] [US1] In `components/FeaturedProject.tsx`, change the all-pending line's join so three or more labels read "A, B & C" and two still read "A & B". Replace `stores.map((store) => store.label).join(" & ")` with a join of every label but the last on `", "`, followed by `" & "` and the last label. Leave the `&middot; coming soon` suffix and all classes as they are. Update the nearby comment ("The stores, as a line ...") to say the list can include a pending web build.
- [X] T010 [P] [US1] In `components/Projects.tsx`:
  - Change the heading text "Shipped products" to "Products".
  - Update the comment above it: Riftwyrm is not shipped, and "Products" no longer collides with the other block now that it is "Side projects".
  - Update the `#products` comment, which describes "released applications with stores, a live URL and a case study", so it no longer claims every row is released.
- [X] T011 [P] [US1] In `content/site.ts`, update the doc comments made false by a third featured project, without changing behaviour: the `featured` field ("Reserved for the two apps ...") and the `slug` field ("Only the two featured applications have one ..."). Do not change `stackLine` or `availability`; Riftwyrm does not make them false.
- [X] T012 [US1] Verify US1:
  - `npm run lint` and `npm run build` pass.
  - Run `npm run start` and walk quickstart.md section 3 at 390px, 768px and 1440px, except the "How it's built" checks.
  - Tab through the row: focus is visible and nothing on it is a link.
  - Compare the NextQuest and Density rows with the T004 baselines.

**Checkpoint**: US1 is shippable on its own.

---

## Phase 4: User Story 2, the "How it's built" case study (Priority: P2)

**Goal**: `/products/riftwyrm` in the same layout as the other two, with a diagram that has no server of its own, plus exhibits on platform achievements and the Leaderboard and on progress sync.

**Independent Test**: from the row, "How it's built" and the card both open `/products/riftwyrm`.
- Every section renders.
- The diagram has three bands and no server or database box.
- The four footer links are dimmed, each with its own reason.
- The page is in `/sitemap.xml`, and its OG card at `/products/riftwyrm/opengraph-image` names Riftwyrm.

- [X] T013 [US2] Build an evidence table in `specs/001-riftwyrm-featured-project/evidence.md`: one row per claim you intend to make in T014 to T017, with the `../dragon-hunter/` file and line that proves it. Start from these sources:
  - seeded engine: `engine/game.gd` (`_rng`, seed in options, RNG saved with the game)
  - engine and UI boundary: `ui/model/view_state.gd`, CLAUDE.md "Layers and their rules"
  - text store: `engine/text.gd`, `data/text.json`
  - simulator: `tools/sim/`, `specs/025-playtest-simulator/spec.md`, `specs/034-dragon-order/`
  - tests: `tests/run.gd`, `tools/test.sh`, `tools/ui_check.gd`
  - layout matrix: `ui/model/layout_solver.gd`
  - input: `specs/026-steam-deck-controller/`, `ui/fx/pad_cursor.gd`
  - platform services: `ui/platform/platform_services.gd`, `play_backend.gd`, `game_center_backend.gd`
  - merge and retry: `ui/model/progress_merge.gd`, `ui/model/account_sync.gd`

  For iOS sync, cite `../dragon-hunter/specs/038-game-center-progress-sync`. Per the 2026-11-02 clarification, treat it as implemented; T034 checks that before publishing. Drop any other claim you cannot prove.
- [X] T014 [US2] In `content/case-studies.ts`, add `riftwyrm` to `caseStudies`, after `density-fitness`, with these fields:
  - `slug: "riftwyrm"`, `title: "Riftwyrm"`, `platforms: ["iOS", "Android", "Web"]`
  - `years: "2026 – Present"`, using an en dash
  - `summary`: one or two sentences. It is also the meta description and OG text, so keep it under about 200 characters. It may carry the single R8 credit phrase.
  - `highlights`: exactly six, e.g. "Seeded, deterministic rules engine", "Headless playtest simulator", "Platform achievements and leaderboards", "Progress sync with lossless merge", "Touch, mouse, keyboard and controller", "One UI across twelve screen shapes"
  - `links`: `[{ label: "App Store · coming soon" }, { label: "Google Play · coming soon" }, { label: "Web · coming soon" }, { label: "Source · private repository" }]`
  - Leave `screenshots` out for now; the page falls back to the art band.
- [X] T015 [US2] In the same `caseStudies.riftwyrm` entry in `content/case-studies.ts`, add the `diagram` and `caption` using the existing `DiagramBand` shape:
  - Band 1: `label: "External · platform game services"`, with boxes "Game Center" (subtitle: iOS sign-in, achievements, leaderboards, saved progress) and "Google Play Games" (Android sign-in, achievements, leaderboards, saved progress).
  - Band 2: `label: "Client · one Godot project"`, with `rail: "platform SDK · only when signed in"`. Its rows, top to bottom:
    1. The builds: "Web", "Android", "iOS".
    2. Rail "view state", then a "UI" box (screens, sequencer, animator).
    3. Rail "engine calls", then "Rules engine" (seeded state machine, move advisor) and "Content" (card data, text store).
  - Band 3: `label: "Build time · never shipped"`, with boxes "Playtest simulator", "Test runner" and "Screenshot pipeline".
  - `caption`: one sentence saying the game runs entirely on the device and talks only to the platform's own game services when the player signs in.
  - No server, database or API of the project's own (FR-007).
- [X] T016 [US2] In the same entry in `content/case-studies.ts`, add `decisions` and `exhibits`.
  - **Decisions**: exactly three `{ claim, why }`, chosen from T013's evidence: the engine never imports the UI; every shown word comes from one text store; progress merges as a union, so order never matters.
  - **Exhibits**: four `{ title, problem, points }`, each with three verb-led points:
    1. Achievements and the Leaderboard on each platform's game services, with optional sign-in and the game complete without it.
    2. Progress that follows a signed-in player across devices, merged so nothing is lost, on both Game Center and Google Play Games.
    3. Balancing four dragons with the headless simulator.
    4. One UI across twelve screen shapes and four input methods.
  - Name the class of problem and the shape of the answer only: no platform ids, leaderboard ids, score-tag encoding or merge internals.
- [X] T017 [US2] In `content/site.ts`, add `slug: "riftwyrm"` to the Riftwyrm entry. The card and "How it's built" now open the case study (research R3).
- [X] T017a [US2] In `content/site.ts`, add `{ label: "Riftwyrm", href: "/products/riftwyrm" }` to `caseStudyLinks` after Density, and update its doc comment ("The two case studies ..."). Check that the nav still fits at `sm` and `lg` widths and in the `MobileNav` drawer. (Found during implementation: the nav lists the case studies by hand.) Done, with the nav row moved from `sm` to `md` (drawer below 768px, its auto-close query moved to `48rem`): at `sm` the name clipped to "Victor Danger…" between 640 and 700px with five links.
- [X] T018 [P] [US2] In `app/products/[slug]/page.tsx`, change the comment "Both pages are known at build time" to "Every page ..." (comment only).
- [X] T019 [US2] Verify US2:
  - `npm run build` lists `/products/riftwyrm` among the static routes.
  - Walk quickstart.md section 4.
  - Open `/products/riftwyrm/opengraph-image`: Riftwyrm, its platforms and the summary, with no em dash.
  - `/sitemap.xml` includes `/products/riftwyrm`.
  - Adjust `imageFocus` in `content/site.ts` if the 280px band cuts the wordmark.

**Checkpoint**: US1 and US2 work together. The case study shows the art band where the carousel will go.

---

## Phase 5: User Story 3, repeatable marketing screenshots (Priority: P3)

**Goal**: 16:9 carousel frames with baked-in headlines, made by the game's seeded pipeline so a rerun gives the same frames.

**Independent Test**: running the portfolio capture twice in `../dragon-hunter-portfolio` on the same commit gives byte-identical PNGs (or, failing that, the same moments by eye). Every frame is 1920x1080 with a caption and no em dash, and the case-study carousel shows them with labels.

- [X] T020 [US3] In `../dragon-hunter/tools/store/classes.gd`, add a separate table `PORTFOLIO_CLASSES` beside `CLASSES`, holding one entry: `{"id": "portfolio", "size": Vector2i(1920, 1080), "insets": [0, 0, 0, 0], "points_per_pixel": <the desktop value the layout matrix uses for a 1920x1080 window>}`.
  - Add a lookup that finds a class by id in either table.
  - Do not add it to `CLASSES` or `APPLE_ACCEPTED`, and leave `../dragon-hunter/tests/test_store_assets.gd`'s three-Apple-slot assertion unchanged (research R9).
- [X] T021 [US3] In `../dragon-hunter/tools/store_shots.gd`:
  - Accept `portfolio` as a class argument, resolved through the new lookup.
  - Write its output under `build/portfolio/<version>/portfolio/`, not the App Store folder.
  - Leave it out of the default class set, so `scripts/dev store --both` produces exactly what it does today.
  - Record the seed and version in the manifest for this output too.
- [X] T022 [US3] In `../dragon-hunter/tools/store/shots.gd` (and `store_shots.gd` for a new stage):
  - Add a `leaderboard` shot with `"classes": ["portfolio"]`, which opens the Leaderboard in the records screen (`ui/screens/records_screen.gd`) after the seeded win, so the won game is on it.
  - Optionally add an `achievements` shot the same way (`ui/screens/achievements_screen.gd`) if it reads at 1920x1080.
  - Write each caption in the style of the existing ones (a short sentence, `{t:...}` marks for game terms) with no em dash, e.g. "Every win on the board".
- [X] T023 [US3] In `../dragon-hunter/tests/test_store_assets.gd`, add a test that the `portfolio` class exists, is 16:9 (1920x1080), and is not Apple-accepted. Run `../dragon-hunter-portfolio/tools/test.sh` and confirm everything passes.
- [X] T024 [US3] Run the capture twice: `godot --path ../dragon-hunter-portfolio -s tools/store_shots.gd -- build/portfolio-run-1 --panels portfolio`, then again into `build/portfolio-run-2`. Compare with `shasum` on each pair. If they differ, confirm by eye that each pair shows the same moment, and note the cause in the commit message. Result: won, leaderboard and achievements byte-identical; title and dragons differ by at most 20/255 on a few hundred pixels inside the animated dragon, same moments by eye; trial and showdown differ by 1 to 2 levels (rounding).
- [X] T025 [US3] Convert each panel to WebP and place it at `public/projects/riftwyrm/desktop-<moment>.webp` with `cwebp -q 82`: title, trial, dragons, showdown, won, leaderboard, plus achievements if made. That is between 4 and 8 frames (FR-011). Check that every file is 1920x1080.
- [X] T026 [US3] In `content/case-studies.ts`:
  - Import each frame (e.g. `riftwyrmTitleImg from "@/public/projects/riftwyrm/desktop-title.webp"`), kept with the other screenshot imports.
  - Add `screenshots` to `caseStudies.riftwyrm`, in play order. Each slide gets a one or two word `label` ("Title", "A trial", "Dragons", "Showdown", "Victory", "Leaderboard") and an `alt` that says what the frame shows beyond its caption, in the style of the NextQuest alts.
- [X] T027 [US3] Verify US3:
  - `npm run build`.
  - The `/products/riftwyrm` carousel shows every frame; arrow keys and thumbnails work.
  - Read each baked-in headline for em dashes and third-party terms.

**Checkpoint**: all three stories are complete.

---

## Phase 6: Polish and cross-cutting

- [X] T028 Em dash gate (constitution II): `npm run build`, then `grep -rl $'\u2014' .next/server/app --include=*.html` must print nothing. Also check the Riftwyrm entries in `content/site.ts` and `content/case-studies.ts`, and the captions added in `../dragon-hunter/tools/store/shots.gd`.
- [X] T029 [P] IP gate (R8): search `content/site.ts`, `content/case-studies.ts` and `../dragon-hunter/tools/store/shots.gd` for the publisher's name, the designer's name and each original term listed in the Path Conventions. The only allowed hit is the single "inspired by ... Dragons of Etchinstone" credit.
- [X] T030 [P] Regression gate: retake the T004 screenshots and compare. The NextQuest and Density rows and case studies are identical apart from the heading rename.
- [X] T031 [P] Accessibility pass on the home page and `/products/riftwyrm`: keyboard only, visible focus on every control, alt text on every image, and the coming-soon line read by VoiceOver.
- [X] T032 Commit the game repo work on `portfolio-assets` in `../dragon-hunter-portfolio`, as its own commit, for the developer to merge there. Then remove the worktree with `git -C ../dragon-hunter worktree remove ../dragon-hunter-portfolio`.
- [X] T033 Commit the portfolio work on `001-riftwyrm-featured-project`: content, the two component edits, the images, and `specs/001-riftwyrm-featured-project/`. Exclude `package-lock.json`.
- [ ] T034 Publish gate (FR-007c): before merging to `main`, confirm `../dragon-hunter/specs/038-game-center-progress-sync` has landed. Check that `../dragon-hunter/ui/platform/game_center_backend.gd` implements `load_progress` and `save_progress`, and that 038's device test is ticked. If it has not landed, hold US2 and US3 back from `main`. If US1 ships alone, remove "and sync" from the row's `engineering` line in `content/site.ts` until it does.

---

## Dependencies and execution order

- **Setup (T001 to T004)**: no dependencies. T003 and T004 run in parallel.
- **Foundational (T005 to T007)**: needs T003. Blocks US1, which needs the art.
- **US1 (T008 to T012)**: needs T007. T009, T010 and T011 run in parallel once T008 exists (T011 touches different lines of the same file as T008, so do it after T008).
- **US2 (T013 to T019)**: needs US1. T013 comes first. T014 to T016 run in order (same file). T017 needs T014, since the slug must exist in both files. T018 can run any time.
- **US3 (T020 to T027)**: the game-repo half (T020 to T024) needs only T003 and can run alongside US1 and US2. T025 and T026 need US2's case study entry.
- **Polish (T028 to T033)**: after the stories you intend to ship. T034 must pass before any push to `main` that includes US2.

### Parallel examples

- **US1**: once T008 is in, T009 (`FeaturedProject.tsx`) and T010 (`Projects.tsx`) run together.
- **Across stories**: while US2's copy is being written (T013 to T016 in this repo), T020 to T023 can run in the game worktree.
- **Polish**: T029, T030 and T031 run together.

## Implementation strategy

1. **MVP**: Setup, Foundational and US1. The row ships on its own, with no link and an honest coming-soon line.
2. **Next**: add US2. The card starts linking to a complete case study, which uses the art band until the screenshots exist.
3. **Then**: add US3. The carousel replaces the band.
4. Run the Polish gates before each push to `main`. `main` deploys, so it must always build.
