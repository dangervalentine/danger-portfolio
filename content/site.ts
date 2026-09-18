export type Project = {
    title: string;
    description: string;
    tags: string[];
    /** Screenshot shown in the card's image band, relative to /public. */
    image?: string;
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
            description:
                "A game tracker for web and mobile. Track your progress, discover new titles, and curate a personal collection behind a dark interface inspired by the Night Owl theme.",
            tags: ["Next.js", "React Native", "Expo", "TypeScript"],
            image: "/projects/nextquest.webp",
            liveHref: "https://nextquest.dev/",
            repoHref: "https://github.com/dangervalentine/NextQuestREADME",
        },
        {
            title: "Density Fitness",
            description:
                "Programs, progressions, plate math, timers and warmups in one focused lifting app — tracking working sets, rest and PRs as you train.",
            tags: ["Next.js", "React Native", "TypeScript"],
            image: "/projects/density-fitness.webp",
            liveHref: "https://density.dangervalentine.com",
            note: "Private repository",
        },
        {
            title: "Brick Blitz",
            description:
                "Smash bricks, chain combos and chase the high score — a canvas breakout with an online leaderboard, built into the NextQuest arcade.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: "/projects/brick-blitz.webp",
            liveHref: "https://nextquest.dev/arcade/brick-blitz",
            note: "Part of NextQuest",
        },
        {
            title: "Luma",
            description:
                "A Lumines-rules block puzzle: build 2×2 squares from falling two-color quads and let the sweeping timeline clear them away.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: "/projects/luma.webp",
            liveHref: "https://nextquest.dev/arcade/luma",
            note: "Part of NextQuest",
        },
        {
            title: "Snake",
            description:
                "The grid-based classic — eat the pellet, grow the tail, and don't bite yourself.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: "/projects/snake.webp",
            liveHref: "https://nextquest.dev/arcade/snake",
            note: "Part of NextQuest",
        },
        {
            title: "Comet Blaster",
            description:
                "A vector-graphics asteroids clone with hyperspace jumps, limited lives and UFOs that hunt you down.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: "/projects/comet-blaster.webp",
            liveHref: "https://nextquest.dev/arcade/comet-blaster",
            note: "Part of NextQuest",
        },
        {
            title: "Space Barrage",
            description:
                "A vertical-scrolling shoot-em-up with stalkers and shield bombs — the arcade build, with an online leaderboard.",
            tags: ["Next.js", "Canvas", "TypeScript"],
            image: "/projects/space-barrage.webp",
            liveHref: "https://nextquest.dev/arcade/space-barrage",
            note: "Part of NextQuest",
        },
        {
            title: "Connect Four",
            description:
                "Classic four-in-a-row against a bitboard negamax AI, rendered entirely on HTML5 canvas — down to the self-playing welcome screen.",
            tags: ["React", "TypeScript", "Canvas", "Negamax"],
            image: "/projects/connect-four.webp",
            liveHref: "https://dangervalentine.github.io/react-connect4/",
            repoHref: "https://github.com/dangervalentine/react-connect4",
        },
        {
            title: "Palette Provider",
            description:
                "Extracts color palettes from an image using hybrid median-cut and k-means clustering in OKLAB perceptual space, then sorts the result into dominant, supporting and accent tiers.",
            tags: ["React", "Vite", "Canvas", "OKLAB"],
            image: "/projects/palette-provider.webp",
            liveHref: "https://dangervalentine.github.io/palette-provider/",
            repoHref: "https://github.com/dangervalentine/palette-provider",
        },
        {
            title: "Pixelate Tool",
            description:
                "Pixelate any region of an image with adjustable intensity, entirely in the browser. Drag to select, tune the pixel size live, export a PNG — nothing is ever uploaded.",
            tags: ["React", "Vite", "Canvas"],
            image: "/projects/pixelate-tool.webp",
            liveHref: "https://dangervalentine.github.io/pixelate-tool/",
            repoHref: "https://github.com/dangervalentine/pixelate-tool",
        },
        {
            title: "Wordle Cheater",
            description:
                "An entropy-ranked Wordle solver that narrows the answer list in real time, ranking each remaining word by how much information the guess would reveal.",
            tags: ["React", "TypeScript", "Information theory"],
            image: "/projects/wordle-cheater.webp",
            liveHref: "https://dangervalentine.github.io/WordleCheater/",
            repoHref: "https://github.com/dangervalentine/WordleCheater",
        },
        {
            title: "Scroll Track",
            description:
                "A customizable, interactive scroll indicator for React Native. Tap or drag the track to jump, with an animated thumb and auto-hide behavior. Published on npm.",
            tags: ["React Native", "TypeScript", "npm"],
            image: "/projects/scroll-track.webp",
            liveHref: "https://www.npmjs.com/package/react-native-scroll-track",
            repoHref: "https://github.com/dangervalentine/react-native-scroll-track",
        },
        {
            title: "Words with JavaScript",
            description:
                "A Words With Friends helper built for my dad — type your letters and get every playable word back, grouped by length.",
            tags: ["JavaScript", "HTML", "CSS"],
            image: "/projects/words-with-js.webp",
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
