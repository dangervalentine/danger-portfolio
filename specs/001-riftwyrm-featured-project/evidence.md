# Evidence: Riftwyrm case-study claims

Every claim in `content/case-studies.ts` (`caseStudies.riftwyrm`) and in the Riftwyrm row in
`content/site.ts`, with where to find it. Paths are in `../dragon-hunter` at `main`
(b7e4df8, 2026-11-02).

| Claim | Evidence |
|---|---|
| Seeded rules engine; a game replays exactly from its seed | `engine/game.gd:61` private `RandomNumberGenerator`; `:81` seeded from the options; `:448`/`:459` RNG state saved and restored with the game; every shuffle draws from it (`:912`) |
| The engine never imports the UI | `CLAUDE.md:121-128` "Layers and their rules" ("must never preload anything from `ui/`"); `grep res://ui engine/` finds nothing |
| One UI file reads the engine's internals | `ui/model/view_state.gd:4` |
| Every shown game term comes from one text store | `engine/text.gd:2-7`; `CLAUDE.md:253`, `:286` (shown text goes through `Text.of` / `Text.expand`) |
| Headless playtest simulator, reproducible by seed, win rates per difficulty and dragon | `specs/025-playtest-simulator/spec.md` (Background, scope); `tools/sim/` (bots, oracle, record, dashboard) |
| Dragon order set from simulated difficulty, easiest to hardest | `specs/034-dragon-order/spec.md:17`; README "Status" (dragon unlock order "by the playtest simulator") |
| The advisor's move values are fitted from simulated play | `tools/sim/fit_value.py`, `data/advisor_value.json` |
| Twelve screen shapes in the layout matrix | `ui/model/layout_solver.gd` (phone-16x9, phone-tall, phone-tall-flipped, phone-small, tablet, desktop, desktop-ultrawide, upright-browser, three Pixel 9 Pro scales, steam-deck) |
| A UI check walks the real screens and enforces tap targets | `tools/ui_check.gd` (e.g. `:3205`, 44px boxes); `tools/test.sh full` runs it at every matrix size |
| Touch, mouse, keyboard and controller | `specs/026-steam-deck-controller/spec.md`, `ui/fx/pad_cursor.gd`; `CLAUDE.md` "Keyboard in the Hand" |
| About 780 automated tests in 74 files, headless | `tests/test_*.gd` (74 files, 786 `func test_`), `tests/run.gd`, `tools/test.sh` |
| Platform seam: sign-in, achievements, leaderboards, saved progress; desktop and web get a "none" backend | `ui/platform/platform_services.gd:1-7` |
| Google Play Games: sign-in, achievements, scores, saved game | `ui/platform/play_backend.gd` (`load_progress` :171, `save_progress` :178) |
| Game Center: sign-in, achievements, leaderboards | `ui/platform/game_center_backend.gd` |
| Game Center: saved progress | `specs/038-game-center-progress-sync` (treated as implemented per the 2026-11-02 clarification; publish gate T034); README:150 already describes the Game Center saved game kept in iCloud |
| Leaderboard shows everyone's and friends' scores | `ui/platform/platform_services.gd` (`scores_loaded`, collections "public"/"friends") |
| Progress merges as a union, in any order, nothing lost | `ui/model/progress_merge.gd:2-5`; `tests/test_progress_merge.gd` |
| Failed sync work stays marked to do and retries | `ui/model/account_sync.gd:6`, `:31`, `:150`; `_reconcile_achievements` `:239` |
| The game is complete without signing in | `ui/platform/platform_services.gd:4-7` (failure is a warning, never stops play); specs/033 US1 scenario 4 |

Claims considered and dropped:
- Exact test counts in the copy. They date the page, so the copy says "hundreds".
- Merge internals and the score-tag encoding. The security rule in the case-study header excludes them.
