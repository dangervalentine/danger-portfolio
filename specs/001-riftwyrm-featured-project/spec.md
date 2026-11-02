# Feature Specification: Riftwyrm Featured Project

**Feature Branch**: `001-riftwyrm-featured-project`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "I want to add a new project to the list of featured project in the site's header: Riftwyrm. It lives as a sibling repository to this one, along with density-fitness and NextQuest. The latter two are already in this section and this would borrow that same style. This project is far more simple than those, as there is no backend, but we could follow the same template of the other two, with deviations as needed. We will need a screenshot strategy for marketing screenshots. There are not official links to the game yet, so it is listed as coming soon."

## Clarifications

### Session 2026-11-02

- Q: Does "How it's built" cover the game's platform services? → A: Yes. It also covers the Leaderboard and Achievements, which run through each platform's own game services (Apple Game Center on iOS, Google Play Games on Android).
- Q: Should "How it's built" also cover cloud progress sync? → A: Yes, as its own exhibit beside achievements and the Leaderboard: a signed-in player's unlocks, lessons, achievements and records are kept in their platform account and merged across devices so nothing earned on either side is lost.
- Q: Should the copy treat iOS progress sync as implemented, though the game's Game Center backend does not save progress yet? → A: Yes. iOS sync (dragon-hunter specs/038) is built immediately after this, so all copy claims sync on both Game Center and Google Play Games. Publishing is gated on 038 having landed.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Riftwyrm appears as a featured project (Priority: P1)

A hiring manager lands on the home page and scrolls to the projects. Beside NextQuest
and Density Fitness they find a third full-width featured row for Riftwyrm, a solo
fantasy card game for phones, tablets and desktop browsers. The row looks and reads
like its two neighbours: the same art band, a short description, the one-line
engineering summary, the grouped tech stack, the platforms with a release stage, and
the row of store buttons. Because the game has not launched, every store and web
button is shown switched off and marked "coming soon", and nothing on the row links
to a page that does not exist.

**Why this priority**: This is the request itself. A visible featured row is the
smallest change that puts the project in front of a reader, and it is useful even if
nothing else in this spec ships.

**Independent Test**: Load the home page at phone and desktop widths. Confirm a third
featured row for Riftwyrm renders in the same visual style as the other two, that
its store and web buttons are disabled and announced as "coming soon" to a screen
reader, and that no element on the row leads to a broken or placeholder destination.

**Acceptance Scenarios**:

1. **Given** the home page, **When** a visitor reaches the featured projects, **Then**
   Riftwyrm is shown as a featured row, after NextQuest and Density Fitness, with
   its art, description, engineering line, grouped stack, platforms and a release
   stage that says it is not yet released.
2. **Given** the Riftwyrm row, **When** a visitor looks at the store buttons, **Then**
   the App Store, Google Play and web buttons are all visibly disabled and labelled
   "coming soon", both on screen and for assistive technology.
3. **Given** the game's source repository is private, **When** the row renders,
   **Then** no "View repository" button appears; a short note takes its place, as
   it does for other projects without public source.
4. **Given** the existing featured rows, **When** Riftwyrm is added, **Then** NextQuest
   and Density Fitness look and behave exactly as before at every width.

---

### User Story 2 - A "How it's built" case study for Riftwyrm (Priority: P2)

A technical reviewer clicks "How it's built" on the Riftwyrm row and reaches a case
study page laid out like the NextQuest and Density Fitness pages: a header with
platforms and years, a summary, six highlights, an architecture diagram, key
decisions, exhibits, and links. Where those pages describe a backend and
infrastructure, this one instead describes what makes a game with no server of its own a real
engineering effort: the rules engine, determinism and seeded play, the automated
playtest simulator, the test suite, multi-input support (touch, mouse, keyboard,
controller), achievements and the Leaderboard carried through each platform's own game
services (Game Center on iOS, Google Play Games on Android), progress that follows a
signed-in player to another device and merges without losing anything, and shipping
one codebase
to web, Android and iOS.

**Why this priority**: The featured row earns attention; the case study is where the
engineering is argued. It is second because the row stands on its own without it.

**Independent Test**: Follow "How it's built" from the Riftwyrm row. Confirm the page
renders with every section the template defines (or omits a section deliberately and
cleanly), that the diagram reads correctly with no server tier, and that every
footer link is either live or shown dimmed with a reason.

**Acceptance Scenarios**:

1. **Given** the Riftwyrm row, **When** the visitor selects "How it's built", **Then**
   they reach a Riftwyrm case study page in the same layout as the other two.
2. **Given** the case study, **When** the architecture diagram renders, **Then** it
   shows the game's own layers (for example presentation, game rules, content and
   data, platform targets) and the platform game services it talks to (Game Center,
   Google Play Games), and does not invent a server, database or API of the project's
   own.
5. **Given** the case study, **When** a reader looks for how achievements and the
   Leaderboard work, **Then** it explains that both run through the platform's game
   services where the player is signed in, and that the game's own screens work on
   every platform without signing in.
6. **Given** the case study exhibits, **When** a reader reaches progress sync, **Then**
   a dedicated exhibit explains that a signed-in player's progress is kept in their
   platform account and that a device's copy and the account's copy are combined so
   nothing earned on either is lost, without disclosing details that would help
   tamper with saved progress or scores.
3. **Given** the case study footer, **When** there is no store listing, public site
   or public repository yet, **Then** each such link is shown dimmed with its own
   reason ("coming soon" for a store, "private repository" for source) rather than
   omitted silently or linked to nothing.
4. **Given** the case study, **When** it is shared, **Then** its link preview card
   names Riftwyrm and follows the same card design as the other case studies.

---

### User Story 3 - A repeatable marketing screenshot strategy (Priority: P3)

The developer needs pictures of Riftwyrm for the portfolio: a wide art band and a
square recomposition for the featured row, and a set of 16:9 marketing frames with
a headline baked in for the case study carousel, matching the style of the other two
products. Rather than hand-cropping screen grabs, they produce these the same way
every time from the game's own seeded play and its own artwork, so that when the
game changes the set can be regenerated and every frame shows the same moment again.

**Why this priority**: The row and the case study need images to ship, but a first
pass can use one good piece of art. The repeatable pipeline is what keeps the images
honest and current over time.

**Independent Test**: Run the documented screenshot procedure twice from a clean state
on the same game version and confirm it yields the same set of images, at the sizes
and aspect ratios the portfolio needs, with no image showing a third party's marks or
artwork.

**Acceptance Scenarios**:

1. **Given** the game repository, **When** the developer follows the documented
   procedure, **Then** it produces: one wide art image for the featured row and case
   study band, one square recomposition of it, and between four and eight 16:9
   carousel frames, each with a short headline baked in.
2. **Given** the same game version and seed, **When** the procedure runs twice,
   **Then** each carousel frame shows the same game moment both times.
3. **Given** a produced frame, **When** it is checked, **Then** it uses only artwork,
   type and colour that ship in the game, and contains no publisher logo, original
   card scan or other third-party art.
4. **Given** the frames are added to the portfolio, **When** a visitor views the
   carousel, **Then** every slide has a short label and alt text describing what the
   picture shows, and none contains an em dash in its baked-in headline.

---

### Edge Cases

- What happens when the featured section holds three rows instead of two? Layout
  spacing, image loading priority and any copy that says "both" or "two" featured
  apps (page metadata, the hero, link preview cards) must stay correct.
- What happens when a store listing or the public site goes live later? Adding the
  link must be a content-only change that switches the matching button on, with no
  layout change.
- What happens if the game's name or tagline changes before launch? The portfolio
  copy must be editable in one place and must agree with the game's own site.
- What happens on a narrow phone, where a featured row with no live buttons could
  collapse oddly? The row must keep the same rhythm as a row with live buttons.
- What happens if iOS sync (dragon-hunter specs/038) slips? The case study is held back
  from the deploy branch until it lands. US1, the row, may ship on its own, since it
  only says "sync" in its engineering line. Trim that word as well if US1 ships first.
- What happens to the tech stack line in the site header (the hero's technology list)
  if Riftwyrm's stack differs from the other two? It is not changed by this feature
  unless the copy would otherwise become false.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The home page MUST show Riftwyrm as a featured project row in the same
  visual style as the existing featured rows, ordered after them.
- **FR-002**: The Riftwyrm row MUST include a title, a one-paragraph description, a
  one-line engineering summary, a stack grouped by layer, the platforms it targets
  (Web, Android, iOS), and a release stage indicating it is not yet released.
- **FR-003**: The Riftwyrm row MUST state that App Store, Google Play and the web
  build are coming soon, in the existing all-pending treatment (one muted line naming
  all three rather than a band of dimmed buttons), readable by assistive technology.
- **FR-004**: The Riftwyrm row MUST NOT link to any destination that is not live; in
  particular it MUST NOT make the card itself a link while no live build exists.
- **FR-005**: The Riftwyrm row MUST show a note in place of a repository button,
  because the source repository is private.
- **FR-006**: The site MUST provide a Riftwyrm "How it's built" case study page,
  reached from the row, using the same section structure as the existing case
  studies, with deviations limited to content that does not apply to a game
  with no server of its own.
- **FR-007**: The case study's architecture diagram MUST describe only components the
  game actually has, and MUST show the platform game services it uses (Apple Game
  Center, Google Play Games) as external services; it MUST NOT depict a server,
  database or API owned by the project.
- **FR-007a**: The case study MUST cover achievements and the Leaderboard as delivered
  through each platform's game services, including that signing in is optional and
  the game works fully without it.
- **FR-007b**: The case study MUST include a dedicated exhibit on cloud progress sync:
  progress kept in the player's platform account and merged across devices so that no
  unlock, finished lesson, achievement or play record from either side is lost. It
  names both platforms, Game Center and Google Play Games.
- **FR-007c**: The Riftwyrm case study MUST NOT be published (merged to the deploy branch)
  until dragon-hunter specs/038 (Game Center progress sync) has landed, so that the
  iOS sync claim satisfies FR-008 at the moment it goes live.
- **FR-008**: Every claim in the Riftwyrm copy MUST be verifiable against the game's
  repository at the time of writing, following the existing case-study rule that a
  claim which cannot be re-derived is dropped.
- **FR-009**: The Riftwyrm copy MUST describe the game in its own terms (a solo
  fantasy card game, as on its own site) and MAY credit its tabletop roots only as
  inspiration, in the style Paladin's Oath uses on its store page ("inspired by board
  games like Mage Knight or Gloomhaven"): for example "inspired by solo tabletop card
  games like Dragons of Etchinstone". The copy MUST NOT use the publisher's name or
  logo, MUST NOT claim or imply endorsement, and MUST NOT reproduce the original's
  rules text, card names or proprietary in-game terms.
- **FR-010**: The case study page MUST be included in the sitemap and MUST have page
  metadata and a link preview card consistent with the other case studies.
- **FR-011**: The portfolio MUST include, for Riftwyrm: one wide art image, one square
  recomposition, and four to eight 16:9 carousel frames with baked-in headlines,
  each with a short label and descriptive alt text.
- **FR-012**: The marketing screenshots MUST be produced by a documented, repeatable
  procedure driven from the game's own seeded play and shipped artwork, so the same
  game version and seed yield the same frames.
- **FR-013**: No Riftwyrm image or copy MUST contain an em dash, publisher logo,
  original card scan or other third-party artwork.
- **FR-014**: Site-wide copy that counts or characterises the featured projects (for
  example "the two featured apps") MUST be reviewed and corrected wherever adding a
  third would make it false.
- **FR-015**: Making a store listing, the public site or the repository live later
  MUST require only a content change to switch the matching button or link on.

### Key Entities

- **Featured project entry**: Riftwyrm's row on the home page. Title, description,
  engineering line, grouped stack, platforms, release stage, store buttons (all off),
  private-source note, wide image, square image, image focus, case-study slug.
- **Case study**: Riftwyrm's "How it's built" page. Platforms, years in development,
  summary, six highlights, architecture layers (including the external platform game
  services), decisions, exhibits (including one each for platform achievements and
  the Leaderboard, and for progress sync), footer links, carousel frames.
- **Marketing frame**: One 16:9 image with a baked-in headline, a short label and alt
  text, produced by the repeatable screenshot procedure.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can identify Riftwyrm as a featured project, what kind of thing
  it is, and that it is not yet released, within 10 seconds of reaching the featured
  section.
- **SC-002**: 0 links on the Riftwyrm row or case study lead to a missing, placeholder
  or private destination.
- **SC-003**: The existing two featured rows and their case studies show no visual or
  behavioural change at phone, tablet and desktop widths.
- **SC-004**: Running the screenshot procedure twice on the same game version yields
  the same set of frames, with every frame at the required aspect ratio, on the first
  attempt.
- **SC-005**: The rendered site, the link preview cards and the baked-in headlines
  contain 0 em dashes.
- **SC-006**: Every interactive element on the new row and page is reachable and
  operable by keyboard alone, and every image has descriptive alt text.
- **SC-007**: Switching a store or the web button to live after launch takes a single
  content edit, with no change outside the content files.

## Assumptions

- "Featured project in the site's header" refers to the home page's featured projects
  section, where NextQuest and Density Fitness sit as full-width rows, not the
  navigation bar.
- The game repository is the private `dragon-hunter` repository (the game is titled
  Riftwyrm); its marketing site is the sibling `riftwyrm-site` repository, intended
  for riftwyrm.dangervalentine.com but not yet treated as an official link.
- Riftwyrm is featured despite being simpler than the other two because it is a
  substantial effort in its own right (a full rules engine, a playtest simulator,
  a test suite, multi-input support, and three platform targets); the existing note
  that featured rows are "reserved for the two apps" is updated accordingly.
- Riftwyrm is placed after NextQuest and Density Fitness, since those are live and
  it is not.
- Platforms shown are Web, Android and iOS; the release stage reads along the lines of
  "In development". Years read "2026 – Present".
- The screenshot procedure builds on the game repository's existing seeded store
  screenshot tooling and artwork rather than a new capture method, adding a 16:9
  output suited to the portfolio. Any work in the game repository is a dependency of
  this feature, tracked there.
- The hero's technology line and the site's overall page metadata are not changed
  unless adding Riftwyrm would make them false.
- No new runtime dependencies are needed on the portfolio side.
- Attribution precedent: Paladin's Oath (Fire Biscuit Games), a digital game in a
  similar position that has sold for years, describes itself on Steam as "inspired by
  board games like Mage Knight or Gloomhaven" and carries no further disclaimer. The
  portfolio follows that language rather than the game repository's fuller
  not-affiliated notice.
