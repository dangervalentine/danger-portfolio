/** Copy for the "How it's built" pages.
 *
 * Every mechanism named here was checked against the two codebases before it
 * was written down; see
 * \`docs/superpowers/specs/2026-09-20-how-its-built-pages-design.md\` for the
 * per-claim evidence. Edit the prose here, never in a component.
 *
 * These pages argue for the engineer, not the product. Four rules follow from
 * that and they are the reason several obvious things are missing:
 *
 *   - No version numbers and no dependency inventories. "Next.js 16.2" dates
 *     the page and says nothing a reader could not assume.
 *   - Nothing from the maintenance half of a stack audit — unused packages,
 *     version drift between clients, open questions. Those are chores, not
 *     credentials.
 *   - Every claim has to survive someone opening the repository. A claim that
 *     cannot be re-derived was dropped rather than softened.
 *   - Nothing that would help someone attack or clone the products. The prose
 *     names the class of problem and the shape of the answer; thresholds,
 *     retry counts, status-code semantics, gate conditions, health-check
 *     paths and infrastructure sizing stay in the repositories.
 */

import type { StaticImageData } from "next/image";

import densityEditorImg from "@/public/projects/density-fitness/desktop-editor.webp";
import densityExerciseImg from "@/public/projects/density-fitness/desktop-exercise.webp";
import densityLibraryImg from "@/public/projects/density-fitness/desktop-library.webp";
import densityMobileImg from "@/public/projects/density-fitness/mobile-showcase.webp";
import densityProgramsImg from "@/public/projects/density-fitness/desktop-programs.webp";
import densityProgressImg from "@/public/projects/density-fitness/desktop-progress.webp";
import densityRecordsImg from "@/public/projects/density-fitness/desktop-records.webp";
import nextquestDiscoveryImg from "@/public/projects/nextquest/desktop-discovery.webp";
import nextquestGamePageImg from "@/public/projects/nextquest/desktop-game-page.webp";
import nextquestLibraryImg from "@/public/projects/nextquest/desktop-library.webp";
import nextquestMobileImg from "@/public/projects/nextquest/mobile-showcase.webp";
import nextquestNotesImg from "@/public/projects/nextquest/desktop-notes.webp";
import nextquestQuizImg from "@/public/projects/nextquest/mobile-quiz.webp";
import nextquestPlaythroughsImg from "@/public/projects/nextquest/desktop-playthroughs.webp";
import nextquestStatsImg from "@/public/projects/nextquest/desktop-stats.webp";

export type DiagramBox = { name: string; subtitle: string; chips?: string[] };

/** One horizontal row of boxes inside a band. `rail` labels the line drawn
 * above this row — the traffic that reaches it from the row before. An array
 * spaces two labels along the same line, for a row whose boxes are reached by
 * different protocols. The first row of a band has no rail; the band's own
 * rail covers the hop into it. */
export type DiagramRow = { rail?: string | string[]; boxes: DiagramBox[] };

/** One trust boundary. `rail` labels the line between the previous band and
 * this one, so the first band has none. */
export type DiagramBand = { label: string; rail?: string; rows: DiagramRow[] };

/** A choice a reviewer would actually ask about. Only choices that are neither
 * the default for this kind of product nor already told by an exhibit or the
 * diagram belong here; a list padded with either says less than a short one. */
export type Decision = { claim: string; why: string };

/** A resume entry for one piece of the product. \`problem\` is the one line that
 * earns the follow-up question; \`points\` are the answers a reader asks for
 * next, written like resume bullets: verb-led, one mechanism each, three of
 * them. The layout weights the problem line accordingly. */
export type Exhibit = { title: string; problem: string; points: string[] };

/** A footer link. No `href` means there is nowhere to send the reader — an
 * unreleased store, a private repository — and the label renders dimmed
 * instead. The label carries its own explanation rather than the component
 * appending one, because the two cases need different words: a store is
 * "coming soon", a closed-source repository is not. */
export type CaseStudyLink = { label: string; href?: string };

/** One slide in the screenshot carousel. Every slide is a marketing frame
 * with its own headline baked in, so there is no caption field: the alt text
 * carries what the picture says to anyone who cannot see it. All 16:9: the
 * stage is a fixed 16:9 frame and anything else would be letterboxed. */
export type Screenshot = {
    image: StaticImageData;
    /** A name of a word or two, for the thumbnail under the slide and the
     * button that selects it. The alt text is the full description. */
    label: string;
    alt: string;
};

export type CaseStudy = {
    slug: string;
    title: string;
    platforms: string[];
    /** When the product has been in development, as a date range written
     * with an en dash: "2024 – Present". Shown beside the platforms. */
    years: string;
    summary: string;
    /** Exactly six short capability phrases. Three columns on desktop and two
     * on a phone, so six fills both grids exactly; a seventh leaves a gap. */
    highlights: string[];
    diagram: DiagramBand[];
    caption: string;
    decisions: Decision[];
    exhibits: Exhibit[];
    links: CaseStudyLink[];
    /** Optional. A study with screenshots gets a carousel under "At a
     * glance"; one without simply skips the section. */
    screenshots?: Screenshot[];
};

/** Keyed by slug: the route reads this map directly, so adding a case study is
 * one entry here plus a `slug` on the matching project in `site.ts`. */
export const caseStudies: Record<string, CaseStudy> = {
    nextquest: {
        slug: "nextquest",
        title: "NextQuest",
        platforms: ["iOS", "Android", "Web"],
        years: "2024 – Present",
        summary:
            "A game tracker for web, iOS and Android. One catalog, one library, one record of everything you have played.",
        highlights: [
            "Multiple deployable artifacts",
            "Diverse API routing",
            "Test-driven development",
            "Nightly data seeding",
            "Offline-first sync",
            "Versioned schema migrations",
        ],
        diagram: [
            {
                label: "External · client-direct",
                rows: [
                    {
                        boxes: [
                            {
                                name: "Firebase Auth",
                                subtitle: "issues the ID token; email sign-in",
                            },
                            {
                                name: "Google Sign-In",
                                subtitle: "native SDK on the phone",
                            },
                            {
                                name: "Apple Sign-In",
                                subtitle: "native SDK on the phone",
                            },
                            { name: "IGDB image CDN", subtitle: "cover art" },
                            {
                                name: "Steam image CDN",
                                subtitle: "capsule and icon art",
                            },
                            { name: "YouTube", subtitle: "trailer playback" },
                            { name: "EAS Update", subtitle: "OTA JS bundles" },
                        ],
                    },
                ],
            },
            {
                label: "Client · untrusted device",
                rail: "HTTPS · tokens, images, OTA bundle",
                rows: [
                    {
                        boxes: [
                            {
                                name: "Web browser",
                                subtitle: "Next.js + React, server-rendered",
                            },
                            {
                                name: "React Native mobile app",
                                subtitle: "Expo; iOS and Android",
                                chips: [
                                    "SQLite · offline truth",
                                    "secure keychain",
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                label: "Edge · Cloudflare",
                rail: "HTTPS · RSC + /api, bearer token",
                rows: [
                    {
                        boxes: [
                            {
                                name: "Cloudflare",
                                subtitle:
                                    "DNS, proxy, Full (Strict) TLS to the origin",
                            },
                        ],
                    },
                ],
            },
            {
                label: "Server · one Hetzner VPS",
                rail: "HTTPS · only the reverse proxy publishes a port",
                rows: [
                    {
                        boxes: [
                            {
                                name: "Caddy",
                                subtitle:
                                    "Let's Encrypt, reverse proxy, the only public ports",
                            },
                        ],
                    },
                    {
                        rail: "proxy",
                        boxes: [
                            {
                                name: "Next.js server",
                                subtitle: "RSC + route handlers",
                            },
                            {
                                name: ".NET API",
                                subtitle:
                                    "ASP.NET Core minimal APIs",
                            },
                            {
                                name: "Background workers",
                                subtitle:
                                    "nightly seed, Steam and RAWG refresh",
                            },
                        ],
                    },
                    {
                        rail: ["SQL · Npgsql", "HTTP · index queries"],
                        boxes: [
                            {
                                name: "PostgreSQL",
                                subtitle:
                                    "one database, user + catalog schemas",
                            },
                            {
                                name: "Elasticsearch",
                                subtitle: "search indices + telemetry",
                            },
                        ],
                    },
                ],
            },
            {
                label: "External · backend-only",
                rail: "HTTPS · every secret lives on this side",
                rows: [
                    {
                        boxes: [
                            {
                                name: "IGDB API",
                                subtitle: "nightly CSV catalog dumps",
                            },
                            {
                                name: "Twitch OAuth",
                                subtitle: "IGDB client credentials",
                            },
                            {
                                name: "RAWG",
                                subtitle: "metadata backfill queue",
                            },
                            {
                                name: "Steam Web + Store API",
                                subtitle: "ownership, playtime, app details",
                            },
                            {
                                name: "Steam OpenID",
                                subtitle: "account linking",
                            },
                            {
                                name: "Cloudflare R2",
                                subtitle: "nightly backup",
                            },
                            {
                                name: "Gmail SMTP",
                                subtitle: "signup + seed reports",
                            },
                            {
                                name: "IGDB MCP",
                                subtitle: "semantic search, from Next.js",
                            },
                        ],
                    },
                ],
            },
        ],
        caption:
            "Both clients reach identity providers, image CDNs and OTA updates directly; every third-party data API and every secret stays behind Cloudflare and Caddy on a single Hetzner VPS.",
        decisions: [
            {
                claim: "Raw SQL over Npgsql, no ORM.",
                why: "The query in the file is the query that runs; a slow one is grepped for, not reverse-engineered.",
            },
            {
                claim: "One TypeScript package is the source of truth.",
                why: "Shared enums and limits are generated into the server; a check mode fails the build on drift.",
            },
            {
                claim: "Deploys build both images before swapping either.",
                why: "The running stack is untouched unless both builds succeed and the new one answers.",
            },
        ],
        exhibits: [
            {
                title: "Logging a session on a plane",
                problem:
                    "Offline edits have to survive a force-quit, sync later, and lose gracefully when another device changed the same row.",
                points: [
                    "Commits each local change and its sync record in one transaction, behind a write lane that serialises every write.",
                    "Drains the pending queue in order on reconnect, with bounded retries.",
                    "Resolves conflicts server-side with a last-writer-wins rule; the losing device is told and re-syncs.",
                ],
            },
            {
                title: "Rebuilding the search index while people are searching",
                problem:
                    "A nightly rebuild of every search index must never leave search empty, even when the cluster is unhealthy.",
                points: [
                    "Builds each index under a fresh name and goes live with a single atomic alias swap.",
                    "Verifies completeness and consistency before the swap; a circuit breaker halts a run that keeps failing.",
                    "Probes the cluster with a write gate first, so yesterday's indices keep serving when it cannot take a new one.",
                ],
            },
            {
                title: "Shipping a fix without waiting on app review",
                problem:
                    "Over-the-air updates need a kill switch for bad bundles that cannot itself block every device on the channel.",
                points: [
                    "Serves the minimum bundle from server configuration that reloads without a redeploy; one value rolled back cuts off a bad bundle.",
                    "Downloads required updates behind a modal with backoff; routine ones apply silently on the next cold start.",
                    "Validates the gate value and ignores one that cannot be right; the runbook is roll back, never fix forward.",
                ],
            },
            {
                title: "Ingesting a third party's whole catalog every night",
                problem:
                    "Roughly a hundred entity and relation types, re-ingested nightly, without locking the live catalog or racing a second run.",
                points: [
                    "Runs on a schedule under a lock; a colliding run queues or steps aside and reports.",
                    "Bulk-copies into a staging schema and merges from there, skipping rows the upstream marks unchanged.",
                    "Tracks every step's duration and outcome; completed-with-errors is distinct from failed, so one skipped phase never discards the night.",
                ],
            },
        ],
        links: [
            { label: "nextquest.dev", href: "https://nextquest.dev/" },
            {
                label: "App Store",
                href: "https://apps.apple.com/us/app/nextquest/id6751153491",
            },
            {
                label: "Google Play",
                href: "https://play.google.com/store/apps/details?id=com.dangervalentine.nextquest",
            },
            {
                label: "Source",
                href: "https://github.com/dangervalentine/NextQuestREADME",
            },
        ],
        screenshots: [
            {
                image: nextquestLibraryImg,
                label: "Library",
                alt: "Library. Every game you own, sorted by status: a grid of cover art beside filters for playing, queued, finished, dropped and backlog.",
            },
            {
                image: nextquestGamePageImg,
                label: "Game pages",
                alt: "Game pages. 400,000+ games, one page each: the page for Clair Obscur: Expedition 33 with its rating, release facts and a media gallery.",
            },
            {
                image: nextquestMobileImg,
                label: "iOS · Android",
                alt: "iOS and Android. The same library, in your pocket: three phones showing a game page for Elden Ring, a stats screen and a year in review.",
            },
            {
                image: nextquestDiscoveryImg,
                label: "Discovery",
                alt: "Discovery. What to play next, curated daily: the web discovery page with a featured game, community lists and a release calendar.",
            },
            {
                image: nextquestPlaythroughsImg,
                label: "Playthroughs",
                alt: "Playthroughs. One game, many runs: two Elden Ring playthroughs, each with its own platform, dates, hours and status.",
            },
            {
                image: nextquestNotesImg,
                label: "Notes",
                alt: "Notes. Plans, checklists and boss logs: Elden Ring notes grouped into a build plan, places to explore and a boss log.",
            },
            {
                image: nextquestStatsImg,
                label: "Stats",
                alt: "Stats. Your play history, as data: hours played, completion rate, average rating and charts of library status and platforms.",
            },
            {
                image: nextquestQuizImg,
                label: "Daily quiz",
                alt: "Daily quiz. A new trivia quiz every day: a phone asking who published Forza Horizon 5, with Xbox Game Studios marked correct.",
            },
        ],
    },

    "density-fitness": {
        slug: "density-fitness",
        title: "Density Fitness",
        platforms: ["iOS", "Android", "Web"],
        years: "2026 – Present",
        summary:
            "A strength-training app for web, iOS and Android. It works out the weight, the sets, the reps and the rest between them for every session.",
        highlights: [
            "Shared cross-platform domain",
            "Diverse API routing",
            "Test-driven development",
            "Real-database integration tests",
            "Versioned schema migrations",
            "Generated exercise catalog",
        ],
        diagram: [
            {
                label: "External · client-direct",
                rows: [
                    {
                        boxes: [
                            {
                                name: "Firebase Authentication",
                                subtitle: "issues the ID token; email sign-in",
                            },
                            {
                                name: "Google Sign-In",
                                subtitle: "native SDK on the phone",
                            },
                            {
                                name: "Apple Sign-In",
                                subtitle: "native SDK on the phone",
                            },
                        ],
                    },
                ],
            },
            {
                label: "Client · untrusted device",
                rail: "HTTPS · sign-in, ID token",
                rows: [
                    {
                        boxes: [
                            {
                                name: "Web browser",
                                subtitle: "Next.js + React, server-rendered",
                            },
                            {
                                name: "React Native mobile app",
                                subtitle: "Expo; iOS and Android",
                                chips: ["MMKV · auth session + preferences"],
                            },
                        ],
                    },
                    {
                        rail: "both clients import the same source, one copy",
                        boxes: [
                            {
                                name: "Workout engine, seven npm workspace packages",
                                subtitle:
                                    "prescription and progression math, the program editor model, analytics and an 873-exercise catalog; raw TypeScript compiled into both builds",
                                chips: [
                                    "engine",
                                    "core",
                                    "analytics",
                                    "builder",
                                    "data",
                                    "glossary",
                                    "shared",
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                label: "Edge · Cloudflare",
                rail: "HTTPS · RSC + /api, bearer token",
                rows: [
                    {
                        boxes: [
                            {
                                name: "Cloudflare",
                                subtitle:
                                    "DNS, proxy, Full (Strict) TLS to the origin",
                            },
                        ],
                    },
                ],
            },
            {
                label: "Server · one Hetzner VPS",
                rail: "HTTPS · only the reverse proxy publishes a port",
                rows: [
                    {
                        boxes: [
                            {
                                name: "Caddy",
                                subtitle:
                                    "Let's Encrypt, reverse proxy, the only public ports",
                            },
                        ],
                    },
                    {
                        rail: "proxy",
                        boxes: [
                            {
                                name: "Next.js server",
                                subtitle:
                                    "RSC + SSR; same-origin /api rewrite to the API",
                            },
                            {
                                name: "ASP.NET Core minimal API",
                                subtitle:
                                    ".NET, Dapper + Npgsql, DbUp migrations",
                            },
                        ],
                    },
                    {
                        rail: "SQL · Dapper over Npgsql",
                        boxes: [
                            {
                                name: "PostgreSQL",
                                subtitle:
                                    "source of truth; the API tests migrate a real Postgres too",
                            },
                        ],
                    },
                ],
            },
            {
                label: "External · backend-only",
                rail: "HTTPS · token verification, provider lookup",
                rows: [
                    {
                        boxes: [
                            {
                                name: "Firebase Admin",
                                subtitle:
                                    "verifies ID tokens and looks up sign-in providers; the only third party the servers call",
                            },
                        ],
                    },
                ],
            },
        ],
        caption:
            "Web and native share the whole workout engine. Seven workspace packages hold the prescription math, program editing and training analytics, compiled into both builds as one copy of raw TypeScript.",
        decisions: [
            {
                claim: "Dapper and raw SQL, no ORM.",
                why: "The repository file holds the query PostgreSQL runs; migrations are versioned SQL applied at startup.",
            },
            {
                claim: "TypeScript is the source of truth for C# enums and CSS tokens.",
                why: "A generator emits both, and its check mode diffs, so drift is a failing command.",
            },
        ],
        exhibits: [
            {
                title: "Knowing what to lift tonight",
                problem:
                    "Progression rules are the product, and two clients must never compute a different number.",
                points: [
                    "Isolates the engine in a package that depends only on the shared vocabulary and exports only what a client may call.",
                    "Routes both the web and native session stores through the same prescription and progression functions.",
                    "Pins the engine's behaviour with its own test suite, independent of either client.",
                ],
            },
            {
                title: "Editing a set from six weeks ago without inventing history",
                problem:
                    "Correcting an old session must re-derive everything built on it without replaying history under rules it never ran under.",
                points: [
                    "Stamps every logged session with the progression rule it ran under and replays each row under its own rule.",
                    "Recomputes through a pure planner that folds, diffs against the cache and emits writes.",
                    "Runs the planner over the corrected history and a pre-edit snapshot, and reports rather than overwrites any lift whose baseline already disagrees.",
                ],
            },
            {
                title: "An editor whose reads wait for its own writes",
                problem:
                    "An optimistic edit followed a millisecond later by a load puts the server's stale tree back on screen.",
                points: [
                    "Keeps staged and debounced write queues in a store shared by both clients.",
                    "Settles before every load: flushes both queues, then awaits every write still in flight.",
                    "Pins the fix with a read-after-write test against a fake server whose delete commits only when the test allows.",
                ],
            },
            {
                title: "A green test run that means something",
                problem:
                    "Every API test class needs a real, migrated PostgreSQL database, fast on a laptop and without leaks from a killed run.",
                points: [
                    "Creates a uniquely named database per class on the local server, falling back to a container only when nothing answers.",
                    "Bypasses the pool for provisioning traffic so no maintenance connection lingers and exhausts the server.",
                    "Sweeps stale databases once per run; cleanup is idempotent, duplicated into the failure path, and forced in a finally.",
                ],
            },
        ],
        links: [
            {
                label: "density.dangervalentine.com",
                href: "https://density.dangervalentine.com",
            },
            { label: "App Store · coming soon" },
            { label: "Google Play · coming soon" },
            {
                label: "Source",
                href: "https://github.com/dangervalentine/DensityREADME",
            },
        ],
        screenshots: [
            {
                image: densityProgramsImg,
                label: "Programs",
                alt: "Programs. Your next workout, planned: the active 5/3/1 Boring But Big program with its four sessions and the next session's lifts, sets and loads.",
            },
            {
                image: densityEditorImg,
                label: "Editor",
                alt: "Program editor. Every lift, yours to edit: sessions and lifts in columns beside the bench press's training max, best set and a chart projecting the next three cycles.",
            },
            {
                image: densityMobileImg,
                label: "iOS · Android",
                alt: "iOS and Android. In the gym, on your phone: three phones showing a bench press set with a rep counter and rest timer, progress stats and the program list.",
            },
            {
                image: densityLibraryImg,
                label: "Library",
                alt: "Program library. Proven programs, explained: the 5/3/1 Boring But Big page with where it comes from, how it works, the muscles it trains and its progression over time.",
            },
            {
                image: densityExerciseImg,
                label: "Exercises",
                alt: "Exercise history. One lift, its whole story: the barbell squat's training max, personal record and estimated max above a chart of every top set and the muscles it works.",
            },
            {
                image: densityProgressImg,
                label: "Progress",
                alt: "Progress. Every rep, added up: over four million pounds of all-time volume beside workouts, total reps, heaviest set and week streak, above a strength trend chart.",
            },
            {
                image: densityRecordsImg,
                label: "Records",
                alt: "Records. Every PR, dated: muscle coverage and volume by muscle group above a timeline of recent personal records and progress toward milestones.",
            },
        ],
    },
};
