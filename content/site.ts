import type { StaticImageData } from "next/image";

import brickBlitzImg from "@/public/projects/brick-blitz.webp";
import cometBlasterImg from "@/public/projects/comet-blaster.webp";
import connectFourImg from "@/public/projects/connect-four.webp";
import densityFitnessImg from "@/public/projects/density-fitness.webp";
import densityFitnessSquareImg from "@/public/projects/density-fitness-square.webp";
import lumaImg from "@/public/projects/luma.webp";
import nextquestImg from "@/public/projects/nextquest.webp";
import nextquestSquareImg from "@/public/projects/nextquest-square.webp";
import paletteProviderImg from "@/public/projects/palette-provider.webp";
import pixelateToolImg from "@/public/projects/pixelate-tool.webp";
import scrollTrackImg from "@/public/projects/scroll-track.webp";
import simonSaysImg from "@/public/projects/simon-says.webp";
import snakeImg from "@/public/projects/snake.webp";
import spaceBarrageImg from "@/public/projects/space-barrage.webp";
import ticTacToeImg from "@/public/projects/tic-tac-toe.webp";
import wordleCheaterImg from "@/public/projects/wordle-cheater.webp";
import wordsWithJsImg from "@/public/projects/words-with-js.webp";


/** One store button. A link with no `href` has no listing yet and renders
 * disabled, so a store can never be live and "coming soon" at the same time.
 *
 * These were the vendors' official badge images. They are HTML controls now:
 * `eyebrow` is the small line the badge art carried above the name, `label`
 * is the name itself — and, as with the contact links, the key the button's
 * mark is looked up by in STORE_ICONS. The two together ("Download on the App
 * Store") are still what a screen reader announces. */
export type StoreLink = {
    label: string;
    eyebrow: string;
    href?: string;
};

/** The two app stores, shared by every project that ships to one. Spread
 * these and add `href` once a listing is live. */
const APP_STORE: StoreLink = {
    label: "App Store",
    eyebrow: "Download on the",
};

const GOOGLE_PLAY: StoreLink = {
    label: "Google Play",
    eyebrow: "Get it on",
};

/** The web build, sitting in the same row as the two stores because to a
 * reader it is the same offer — a place the thing runs. Its href comes from
 * the project's `liveHref`, so it carries none of its own. */
export const WEB_APP_BADGE: StoreLink = {
    label: "Web App",
    eyebrow: "Available as a",
};

/** One labelled row of a featured card's tech stack: a layer of the system and
 * the technologies that build it. The grouping is the point — fifteen chips in
 * a single row read as noise, the same fifteen under four labels read as a
 * system with a front end, a back end and somewhere to run. */
export type TechGroup = {
    label: string;
    items: string[];
};

/** What the thing *is*, as opposed to what it is built with. Grid cards carry
 * one of these over the thumbnail so a reader can sort a dozen cards at a
 * glance without reading a dozen descriptions. Featured rows don't need it —
 * they have the room to say so themselves. Add a value here when a project
 * genuinely isn't one of these; the chip renders whatever it is given. */
export type ProjectKind = "Game" | "Tool" | "Package";

export type Project = {
    title: string;
    description: string;
    /** Grid cards only. */
    kind?: ProjectKind;
    /** The short chip row grid cards carry. Featured rows pass `stack`
     * instead, which says the same thing with the layers kept apart. */
    tags?: string[];
    /** Promotes the project out of the grid into a full-width row with room for
     * the longer copy below. Reserved for the two apps that are real efforts
     * rather than weekend builds. */
    featured?: boolean;
    /** The full stack, grouped by layer. Featured rows only, where it stands in
     * for both the flat tag row and the second paragraph that used to sit here
     * — a list of what the thing is actually made of does more for a reader
     * than a second round of prose about what it does. */
    stack?: TechGroup[];
    /** Where the app actually runs. Kept apart from `tags`, which describe how
     * it is built, not where it ships. */
    platforms?: string[];
    /** Appended to the platform line on a featured row — "iOS · Android · Web
     * · In production". Kept out of `platforms` itself because that list is
     * read as places the thing runs, and a release stage is not one of them;
     * it is here so the claim stays in the content file with the rest of the
     * prose. */
    status?: string;
    /** One mono line under a featured row's description: what building the
     * thing actually demanded, in the nouns a reader is scanning for. The
     * description says what the product does; this says what the work was. */
    engineering?: string;
    /** Store buttons, featured rows only. */
    stores?: StoreLink[];
    /** Present when the project has a "How it's built" case study at
     * `/products/<slug>`. Only the two featured applications have one — the
     * grid cards are weekend builds with nothing to say at that length. */
    slug?: string;
    /** Image shown in the card's band, relative to /public. Every project has
     * one, so the card renders it unconditionally. */
    image: StaticImageData;
    /** Describes the image when it is not a plain screenshot — several cards
     * now use the project's own promotional art. */
    imageAlt?: string;
    /** `object-position` for the case-study art band, which crops `image` to a
     * fixed 280px strip. These are designed pieces with a wordmark in them, and
     * a centre crop cuts it in half on both of them — the focus is per-project
     * data, so it lives here rather than as a class in the component. */
    imageFocus?: string;
    /** A square recomposition of `image`, used by featured rows from lg up.
     * There the art fills a column whose height is set by the text beside it,
     * which ranges from slightly taller than square at 1024px to half again as
     * wide at 1440px — a 16:9 frame either leaves the column half empty or
     * loses half its width to the crop. Only fetched at those widths, so a
     * phone still downloads `image` alone. */
    imageSquare?: StaticImageData;
    /** The published/live version. The whole card links here. */
    liveHref?: string;
    /** Source repository. Both card types render it as a "View repository"
     * button; where that button sits differs by card. */
    repoHref?: string;
    /** Shown in place of the repository button when there is no public
     * source — "Part of NextQuest". */
    note?: string;
};

/** One way to reach me, or one document to take away.
 *
 * A link with no `href` has no destination yet and renders as a switched-off
 * plate rather than as a link that 404s — the same rule `StoreLink` follows
 * above, and for the same reason: the presence of the URL *is* the live
 * state, so a control can never be pressable and unfinished at once. Adding
 * the `href` is the whole of turning one on. */
export type ContactLink = {
    label: string;
    href?: string;
};

/** A destination in the nav bar. Deliberately not a `ContactLink`: these are
 * pages of this site that certainly exist, so the href is required, and
 * nothing here is ever rendered in the switched-off state above. */
export type NavLink = {
    label: string;
    href: string;
};

export const site = {
    /** The apex, not www — `scripts/deploy.ps1` checks the cloudflared ingress
     * for `hostname: dangervalentine.com`, so that is the host that actually
     * serves. Every absolute URL on the site resolves from this one constant:
     * the metadata base, the sitemap, robots.txt and the JSON-LD graph. */
    url: "https://dangervalentine.com",
    name: "Victor Danger Valentine",
    tagline: "Senior Software Developer",
    /** The hero's third line, under the tagline. "Senior Software Developer"
     * says the level and nothing about the stack; a reader scanning for .NET
     * or React Native had to get as far as the first featured card to find
     * either. Two halves rather than one string because the dash between them
     * is the accent, and the split is where the sentence turns from what I
     * build with to what came of it. */
    stackLine: {
        technologies: ".NET · PostgreSQL · Next.js · React Native",
        outcome: "shipped to the App Store and Google Play",
    },
    /** The line under the Contact heading: what I am looking for, where I am,
     * and whether where I am is a constraint.
     *
     * Two roles rather than the five I would take. Desktop and embedded are
     * real professional experience but nothing on this site evidences them,
     * and a claim the page cannot back up costs the two it can — those belong
     * on the résumé, where the employment history carries them. Mobile earns
     * its place beside "full-stack" because it is a separate search: the two
     * featured apps are React Native, shipped to both stores, and nobody
     * hiring for that types "full-stack".
     *
     * "Central Time", never "CST" — CST is only true from November to March,
     * and this line does not know what month it is.
     *
     * The remote clause is the one that decides whether someone in another
     * state keeps reading. Without it a city name reads as a filter. */
    availability:
        "[ Open to senior full-stack and mobile roles · Minneapolis, MN · Central Time · remote or hybrid ]",
    /** The domain address, not the Gmail one it forwards through. It is the
     * stronger signal on a résumé for someone who owns the domain and hosts
     * this site on it, and it is what the résumé PDF has always carried — the
     * two documents disagreed until now. Google handles the SMTP behind it. */
    email: "victor@dangervalentine.com",
    projects: [

        {
            title: "NextQuest",
            featured: true,
            slug: "nextquest",
            description:
                "A game tracker for web and mobile. Track your progress, discover new titles, and keep a record of every game you have ever played: every replay, every platform, every verdict.",
            engineering:
                "offline-first sync · nightly catalog ingest · versioned schema migrations",
            stack: [
                {
                    label: "Mobile",
                    items: ["React Native", "Expo", "Reanimated", "Skia", "SQLite"],
                },
                { label: "Web", items: ["Next.js", "React", "TypeScript"] },
                {
                    label: "Backend",
                    items: [
                        ".NET",
                        "ASP.NET Core",
                        "PostgreSQL",
                        "Elasticsearch",
                        "Firebase Auth",
                    ],
                },
                {
                    label: "Infrastructure",
                    items: ["Docker", "Caddy", "Cloudflare R2"],
                },
            ],
            platforms: ["iOS", "Android", "Web"],
            status: "In production",
            stores: [
                {
                    ...APP_STORE,
                    href: "https://apps.apple.com/us/app/nextquest/id6751153491",
                },
                {
                    ...GOOGLE_PLAY,
                    href: "https://play.google.com/store/apps/details?id=com.dangervalentine.nextquest",
                },
            ],
            image: nextquestImg,
            imageSquare: nextquestSquareImg,
            // The wordmark sits above centre in this composition; a plain
            // centre crop of the 280px band cuts through it.
            imageFocus: "center 38%",
            imageAlt:
                "NextQuest promotional art: the wordmark beside the line “Every game, one place.” over a grid of game cover art.",
            liveHref: "https://nextquest.dev/",
            repoHref: "https://github.com/dangervalentine/NextQuestREADME",
        },
        {
            title: "Density Fitness",
            featured: true,
            slug: "density-fitness",
            description:
                "Density does the arithmetic of strength training so you can get on with the training. Pick a program or build your own, and it prescribes every session: the weight, the sets, the reps, and the rest between them.",
            engineering:
                "shared cross-platform domain · real-database integration tests · versioned migrations",
            stack: [
                {
                    label: "Mobile",
                    items: ["React Native", "Expo Router", "Skia", "MMKV"],
                },
                { label: "Web", items: ["Next.js", "React", "Recharts"] },
                {
                    // Density's headline: web and native share the whole domain
                    // layer — progression engine, analytics, editor store — not
                    // just a utils folder.
                    label: "Shared core",
                    items: ["TypeScript", "npm workspaces", "Zustand", "Vitest"],
                },
                {
                    label: "Backend",
                    items: [".NET", "ASP.NET Core", "PostgreSQL", "Dapper"],
                },
            ],
            platforms: ["iOS", "Android", "Web"],
            status: "In production",
            // The web app is live; only the mobile builds are unreleased, so
            // neither store badge renders and the band says so in one line
            // under the web button — see FeaturedProject.
            stores: [APP_STORE, GOOGLE_PLAY],
            image: densityFitnessImg,
            imageSquare: densityFitnessSquareImg,
            // Higher again than NextQuest's: the wordmark is the top third of
            // this one, with the app cards scattered below it.
            imageFocus: "center 30%",
            imageAlt:
                "Density Fitness promotional art: the wordmark above the line “Everything and nothing else”, beside a scatter of app cards showing a 5/3/1 session, a plate calculator, a rest timer and a glossary entry.",
            liveHref: "https://density.dangervalentine.com",
            // The application itself is private; this is the public README
            // repository that documents it.
            repoHref: "https://github.com/dangervalentine/DensityREADME",
        },
        {
            title: "Scroll Track",
            kind: "Package",
            description:
                "A customizable, interactive scroll indicator for React Native. Tap or drag the track to jump, with an animated thumb and auto-hide behavior. Published on npm.",
            tags: ["React Native", "TypeScript", "npm"],
            image: scrollTrackImg,
            imageAlt:
                "react-native-scroll-track title art: the wordmark above a list tile with a mint scroll thumb on its track, a tap ripple further down the track with a dashed line showing the jump, and a faint compressed column beside it bracketing where the visible rows sit in the whole list.",
            liveHref: "https://www.npmjs.com/package/react-native-scroll-track",
            repoHref: "https://github.com/dangervalentine/react-native-scroll-track",
        },
        {
            title: "Palette Provider",
            kind: "Tool",
            description:
                "Extracts color palettes from an image using hybrid median-cut and k-means clustering in OKLAB perceptual space, then sorts the result into dominant, supporting and accent tiers.",
            tags: ["React", "Vite", "Canvas", "OKLAB"],
            image: paletteProviderImg,
            imageAlt:
                "Palette Provider: a portrait photograph beside the grid of colours extracted from it.",
            liveHref: "https://dangervalentine.github.io/palette-provider/",
            repoHref: "https://github.com/dangervalentine/palette-provider",
        },
        {
            title: "Wordle Helper",
            kind: "Tool",
            description:
                "An entropy-ranked Wordle solver that narrows the answer list in real time, ranking each remaining word by how much information the guess would reveal.",
            tags: ["React", "TypeScript", "Information theory"],
            image: wordleCheaterImg,
            imageAlt:
                "Wordle Cheater: solved Wordle grids beside a panel confirming the answer was found.",
            liveHref: "https://dangervalentine.github.io/WordleCheater/",
            repoHref: "https://github.com/dangervalentine/WordleCheater",
        },
        {
            title: "Words with JavaScript",
            kind: "Tool",
            description:
                "A Words With Friends helper built for my dad. Type your letters and get every playable word back, grouped by length.",
            tags: ["JavaScript", "HTML", "CSS"],
            image: wordsWithJsImg,
            imageAlt:
                "Words with JavaScript title art: the wordmark above a rack of mint letter tiles spelling REALLY, with three panels listing the six-, five- and four-letter words those tiles can play.",
            liveHref:
                "https://dangervalentine.github.io/javascript-words-with-javascript/",
            repoHref:
                "https://github.com/dangervalentine/javascript-words-with-javascript",
        },
        {
            title: "Pixelate Tool",
            kind: "Tool",
            description:
                "Pixelate any region of an image with adjustable intensity, entirely in the browser. Drag to select, tune the pixel size live, export a PNG. Nothing is ever uploaded.",
            tags: ["React", "Vite", "Canvas"],
            image: pixelateToolImg,
            imageAlt:
                "Pixelate Tool: the same portrait photograph with the face pixelated by a dragged selection.",
            liveHref: "https://dangervalentine.github.io/pixelate-tool/",
            repoHref: "https://github.com/dangervalentine/pixelate-tool",
        },
        {
            title: "Luma",
            kind: "Game",
            description:
                "A Lumines-rules block puzzle: build 2×2 squares from falling two-color quads and let the sweeping timeline clear them away.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: lumaImg,
            imageAlt:
                "Luma title art: the logo above a grid of falling two-colour blocks.",
            liveHref: "https://nextquest.dev/arcade/luma",
            note: "Part of NextQuest",
        },
        {
            title: "Snake",
            kind: "Game",
            description:
                "The grid-based classic: eat the pellet, grow the tail, and don't bite yourself.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: snakeImg,
            imageAlt:
                "Snake title art: the logo above a pixel snake coiled on its grid.",
            liveHref: "https://nextquest.dev/arcade/snake",
            note: "Part of NextQuest",
        },
        {
            title: "Comet Blaster",
            kind: "Game",
            description:
                "A vector-graphics asteroids clone with hyperspace jumps, limited lives and UFOs that hunt you down.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: cometBlasterImg,
            imageAlt:
                "Comet Blaster title art: the logo above a vector ship and the outline of a drifting asteroid.",
            liveHref: "https://nextquest.dev/arcade/comet-blaster",
            note: "Part of NextQuest",
        },
        {
            title: "Connect Four",
            kind: "Game",
            description:
                "Classic four-in-a-row against a bitboard negamax AI, rendered entirely on HTML5 canvas, down to the self-playing welcome screen.",
            tags: ["React", "TypeScript", "Canvas", "Negamax"],
            image: connectFourImg,
            imageAlt:
                "Connect Four title art: the wordmark CONNECT 4 in white above a mint rule and the line \"Minimax AI · React 19\", beside a dark slate board on its splayed stand holding a mid-game pyramid of glossy coral and mint discs, with CONNECT4 moulded in gold across its base.",
            liveHref: "https://dangervalentine.github.io/react-connect4/",
            repoHref: "https://github.com/dangervalentine/react-connect4",
        },
        {
            title: "Space Barrage",
            kind: "Game",
            description:
                "A vertical-scrolling shoot-em-up with stalkers and shield bombs: the arcade build, with an online leaderboard.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: spaceBarrageImg,
            imageAlt:
                "Space Barrage title art: the logo above a player ship and a row of descending enemy sprites.",
            liveHref: "https://nextquest.dev/arcade/space-barrage",
            note: "Part of NextQuest",
        },
        {
            title: "Minimax Tic-Tac-Toe",
            kind: "Game",
            description:
                "Tic-tac-toe against an opponent that cannot lose, driven by a minimax search over the whole game tree.",
            tags: ["JavaScript", "React", "Minimax"],
            image: ticTacToeImg,
            imageAlt:
                "Minimax Tic-Tac-Toe title art: the wordmark TIC TAC TOE above a raised board panel holding a finished drawn game of five mint X marks and four coral O marks, each casting a soft shadow, with a faint search tree of miniature boards branching to scored leaves on either side and the line \"You cannot win · you can only draw\" beneath.",
            liveHref:
                "https://dangervalentine.github.io/javascript-minimax-tic-tac-toe/",
            repoHref:
                "https://github.com/dangervalentine/javascript-minimax-tic-tac-toe",
        },
        {
            title: "Brick Blitz",
            kind: "Game",
            description:
                "Smash bricks, chain combos and chase the high score: a canvas breakout with an online leaderboard, built into the NextQuest arcade.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: brickBlitzImg,
            imageAlt:
                "Brick Blitz title art: the logo above a breakout playfield of coloured bricks and a paddle.",
            liveHref: "https://nextquest.dev/arcade/brick-blitz",
            note: "Part of NextQuest",
        },
        {
            title: "Simon Says",
            kind: "Game",
            description:
                "The memory classic: watch the console play a sequence, then repeat it back as it grows a step longer each round. Three pad colour schemes hidden behind the wordmark.",
            tags: ["React", "Redux", "CSS"],
            image: simonSaysImg,
            imageAlt:
                "Simon Says title art: the wordmark SIMON above SAYS in mint, beside a dark circular console with four coral, amber, mint and violet quadrant pads around a centre dial showing a lit score readout and a start switch.",
            liveHref:
                "https://dangervalentine.github.io/react-redux-simon-says/",
            repoHref:
                "https://github.com/dangervalentine/react-redux-simon-says",
        },
    ] satisfies Project[],
    contact: [
        { label: "GitHub", href: "https://github.com/dangervalentine" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/dangervalentine/" },
    ] satisfies ContactLink[],
};

/** Every way to reach me, in the order both the hero and the contact section
 * render them. Email leads because it is the one that expects a reply; the
 * profiles are there to be browsed.
 *
 * Kept apart from `site.contact`, which is only the profiles: that list also
 * feeds the JSON-LD `sameAs`, where a mailto is not a profile of the person
 * and does not belong. */
export const contactLinks: ContactLink[] = [
    { label: "Email", href: `mailto:${site.email}` },
    ...site.contact,
    // Last in the row and last on purpose: the three above it are places to
    // start a conversation, this is the document someone asks for once they
    // have decided to.
    //
    // It points at the page rather than at `/resume.pdf`. The page is
    // linkable, indexable and always current, and it offers the file; a web
    // link that drops the reader into a PDF viewer spends their click on the
    // wrong medium. The PDF is for attaching to an application, which is a
    // different act by a different person.
    { label: "Résumé", href: "/resume" },
];

/** The two case studies, as the nav renders them between Projects and the
 * résumé.
 *
 * Short labels rather than the projects' own titles: the bar is the tightest
 * row on the site, and "Density Fitness" is half again the width of the two
 * links beside it for no information a reader needs up there. */
export const caseStudyLinks: NavLink[] = [
    { label: "NextQuest", href: "/products/nextquest" },
    { label: "Density", href: "/products/density-fitness" },
];

/** Every destination in the nav bar, in order — one list, rendered twice: as
 * the row on a desktop and as the drawer behind the hamburger on a phone. The
 * two used to disagree by construction, the bar dropping the case studies
 * below `sm` because they did not fit.
 *
 * It ends on the résumé, where it used to end on Contact. Contact was an
 * anchor to a section of the home page, and everything in that section — the
 * email, the profiles, the résumé itself — is already in the hero, two lines
 * under the bar and above the fold. What the nav is for is the pages that are
 * a navigation away, and the résumé is now one of those. Contact keeps its
 * section, its anchor and its place in the footer; it just no longer spends a
 * slot up here pointing down the page it is already on. */
export const navLinks: NavLink[] = [
    { label: "Projects", href: "/#projects" },
    ...caseStudyLinks,
    { label: "Résumé", href: "/resume" },
];
