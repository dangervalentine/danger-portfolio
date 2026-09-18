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
      title: "Connect Four",
      description:
        "Classic four-in-a-row against a bitboard negamax AI, rendered entirely on HTML5 canvas — down to the self-playing welcome screen.",
      tags: ["React", "TypeScript", "Canvas", "Negamax"],
      image: "/projects/connect-four.webp",
      liveHref: "https://dangervalentine.github.io/react-connect4/",
      repoHref: "https://github.com/dangervalentine/react-connect4",
    },
    {
      title: "Space Barrage",
      description:
        "A pixel-art space shooter with escalating waves, squid stalkers and shield pickups, wrapped in a retro arcade cabinet. Canvas-rendered with particle effects and full touch and keyboard support.",
      tags: ["React", "TypeScript", "Canvas", "Vite"],
      image: "/projects/space-barrage.webp",
      liveHref: "https://dangervalentine.github.io/react-space-barrage/",
      repoHref: "https://github.com/dangervalentine/react-space-barrage",
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
