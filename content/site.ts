/** One app-store badge. A link with no `href` has no listing yet and renders
 * disabled, so a store can never be live and "coming soon" at the same time.
 * `width`/`height` are the badge art's intrinsic size; the buttons normalise
 * to a common height, so the two vendors' different ratios still line up. */
export type StoreLink = {
    label: string;
    badge: string;
    width: number;
    height: number;
    href?: string;
};

/** Apple's and Google's official badge art, shared by every project that
 * ships to a store. Spread these and add `href` once a listing is live. */
const APP_STORE: StoreLink = {
    label: "Download on the App Store",
    badge: "/badges/app-store.png",
    width: 120,
    height: 40,
};

const GOOGLE_PLAY: StoreLink = {
    label: "Get it on Google Play",
    badge: "/badges/google-play.png",
    width: 180,
    height: 53,
};

/** Our own badge for the web build, drawn to match Apple's proportions so the
 * three sit together as a set. Baked from `public/badges/web-app.svg` rather
 * than shipped as SVG, so its text renders identically everywhere instead of
 * picking up whatever font the viewer happens to have. Its href comes from the
 * project's `liveHref`, so it carries no href of its own. */
export const WEB_APP_BADGE: StoreLink = {
    label: "Available as a Web App",
    badge: "/badges/web-app.png",
    width: 118,
    height: 40,
};

/** One labelled row of a featured card's tech stack: a layer of the system and
 * the technologies that build it. The grouping is the point — fifteen chips in
 * a single row read as noise, the same fifteen under four labels read as a
 * system with a front end, a back end and somewhere to run. */
export type TechGroup = {
    label: string;
    items: string[];
};

export type Project = {
    title: string;
    description: string;
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
    /** Store buttons, featured rows only. */
    stores?: StoreLink[];
    /** Image shown in the card's band, relative to /public. Every project has
     * one, so the card renders it unconditionally. */
    image: string;
    /** Describes the image when it is not a plain screenshot — several cards
     * now use the project's own promotional art. */
    imageAlt?: string;
    /** The published/live version. The whole card links here. */
    liveHref?: string;
    /** Source repository, shown as a small secondary link. */
    repoHref?: string;
    /** Shown in place of the repo link when there is no public source. */
    note?: string;
};

export type ContactLink = {
    label: string;
    href: string;
};

export const site = {
    name: "Victor Danger Valentine",
    tagline: "Senior Software Developer",
    email: "victordvalentine@gmail.com",
    projects: [

        {
            title: "NextQuest",
            featured: true,
            description:
                "A game tracker for web and mobile. Track your progress, discover new titles, and keep a record of every game you have ever played — every replay, every platform, every verdict.",
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
            image: "/projects/nextquest.webp",
            imageAlt:
                "NextQuest promotional art: the wordmark beside the line “Every game, one place.” over a grid of game cover art.",
            liveHref: "https://nextquest.dev/",
            repoHref: "https://github.com/dangervalentine/NextQuestREADME",
        },
        {
            title: "Density Fitness",
            featured: true,
            description:
                "Density does the arithmetic of strength training so you can get on with the training. Pick a program or build your own, and it prescribes every session — the weight, the sets, the reps, and the rest between them.",
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
            // The web app is live; only the mobile builds are unreleased, so
            // both store badges render disabled while "Web app" stays active.
            stores: [APP_STORE, GOOGLE_PLAY],
            image: "/projects/density-fitness.webp",
            imageAlt:
                "Density Fitness promotional art: the wordmark above the line “Everything and nothing else”, beside a scatter of app cards showing a 5/3/1 session, a plate calculator, a rest timer and a glossary entry.",
            liveHref: "https://density.dangervalentine.com",
            note: "Private repository",
        },
        {
            title: "Brick Blitz",
            description:
                "Smash bricks, chain combos and chase the high score — a canvas breakout with an online leaderboard, built into the NextQuest arcade.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: "/projects/brick-blitz.webp",
            imageAlt:
                "Brick Blitz title art: the logo above a breakout playfield of coloured bricks and a paddle.",
            liveHref: "https://nextquest.dev/arcade/brick-blitz",
            note: "Part of NextQuest",
        },
        {
            title: "Luma",
            description:
                "A Lumines-rules block puzzle: build 2×2 squares from falling two-color quads and let the sweeping timeline clear them away.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: "/projects/luma.webp",
            imageAlt:
                "Luma title art: the logo above a grid of falling two-colour blocks.",
            liveHref: "https://nextquest.dev/arcade/luma",
            note: "Part of NextQuest",
        },
        {
            title: "Snake",
            description:
                "The grid-based classic — eat the pellet, grow the tail, and don't bite yourself.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: "/projects/snake.webp",
            imageAlt:
                "Snake title art: the logo above a pixel snake coiled on its grid.",
            liveHref: "https://nextquest.dev/arcade/snake",
            note: "Part of NextQuest",
        },
        {
            title: "Comet Blaster",
            description:
                "A vector-graphics asteroids clone with hyperspace jumps, limited lives and UFOs that hunt you down.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: "/projects/comet-blaster.webp",
            imageAlt:
                "Comet Blaster title art: the logo above a vector ship and the outline of a drifting asteroid.",
            liveHref: "https://nextquest.dev/arcade/comet-blaster",
            note: "Part of NextQuest",
        },
        {
            title: "Space Barrage",
            description:
                "A vertical-scrolling shoot-em-up with stalkers and shield bombs — the arcade build, with an online leaderboard.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: "/projects/space-barrage.webp",
            imageAlt:
                "Space Barrage title art: the logo above a player ship and a row of descending enemy sprites.",
            liveHref: "https://nextquest.dev/arcade/space-barrage",
            note: "Part of NextQuest",
        },
        {
            title: "Connect Four",
            description:
                "Classic four-in-a-row against a bitboard negamax AI, rendered entirely on HTML5 canvas — down to the self-playing welcome screen.",
            tags: ["React", "TypeScript", "Canvas", "Negamax"],
            image: "/projects/connect-four.webp",
            imageAlt:
                "A Connect Four board mid-game, discs stacked in its columns.",
            liveHref: "https://dangervalentine.github.io/react-connect4/",
            repoHref: "https://github.com/dangervalentine/react-connect4",
        },
        {
            title: "Palette Provider",
            description:
                "Extracts color palettes from an image using hybrid median-cut and k-means clustering in OKLAB perceptual space, then sorts the result into dominant, supporting and accent tiers.",
            tags: ["React", "Vite", "Canvas", "OKLAB"],
            image: "/projects/palette-provider.webp",
            imageAlt:
                "Palette Provider: a portrait photograph beside the grid of colours extracted from it.",
            liveHref: "https://dangervalentine.github.io/palette-provider/",
            repoHref: "https://github.com/dangervalentine/palette-provider",
        },
        {
            title: "Pixelate Tool",
            description:
                "Pixelate any region of an image with adjustable intensity, entirely in the browser. Drag to select, tune the pixel size live, export a PNG — nothing is ever uploaded.",
            tags: ["React", "Vite", "Canvas"],
            image: "/projects/pixelate-tool.webp",
            imageAlt:
                "Pixelate Tool: the same portrait photograph with the face pixelated by a dragged selection.",
            liveHref: "https://dangervalentine.github.io/pixelate-tool/",
            repoHref: "https://github.com/dangervalentine/pixelate-tool",
        },
        {
            title: "Wordle Cheater",
            description:
                "An entropy-ranked Wordle solver that narrows the answer list in real time, ranking each remaining word by how much information the guess would reveal.",
            tags: ["React", "TypeScript", "Information theory"],
            image: "/projects/wordle-cheater.webp",
            imageAlt:
                "Wordle Cheater: solved Wordle grids beside a panel confirming the answer was found.",
            liveHref: "https://dangervalentine.github.io/WordleCheater/",
            repoHref: "https://github.com/dangervalentine/WordleCheater",
        },
        {
            title: "Scroll Track",
            description:
                "A customizable, interactive scroll indicator for React Native. Tap or drag the track to jump, with an animated thumb and auto-hide behavior. Published on npm.",
            tags: ["React Native", "TypeScript", "npm"],
            image: "/projects/scroll-track.webp",
            imageAlt:
                "Three phone screenshots of a scrollable list with the Scroll Track indicator down the right edge.",
            liveHref: "https://www.npmjs.com/package/react-native-scroll-track",
            repoHref: "https://github.com/dangervalentine/react-native-scroll-track",
        },
        {
            title: "Words with JavaScript",
            description:
                "A Words With Friends helper built for my dad — type your letters and get every playable word back, grouped by length.",
            tags: ["JavaScript", "HTML", "CSS"],
            image: "/projects/words-with-js.webp",
            imageAlt:
                "Words With Javascript: a letter input above playable words grouped by length.",
            liveHref:
                "https://dangervalentine.github.io/javascript-words-with-javascript/",
            repoHref:
                "https://github.com/dangervalentine/javascript-words-with-javascript",
        },
        {
            title: "Tic-Tac-Toe — Minimax",
            description:
                "Tic-tac-toe against an opponent that cannot lose, driven by a minimax search over the whole game tree.",
            tags: ["JavaScript", "React", "Minimax"],
            image: "/projects/tic-tac-toe.webp",
            imageAlt:
                "A tic-tac-toe grid part-way through a game against the minimax opponent.",
            liveHref:
                "https://dangervalentine.github.io/javascript-minimax-tic-tac-toe/",
            repoHref:
                "https://github.com/dangervalentine/javascript-minimax-tic-tac-toe",
        },
    ] satisfies Project[],
    contact: [
        { label: "GitHub", href: "https://github.com/dangervalentine" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/dangervalentine/" },
    ] satisfies ContactLink[],
};
