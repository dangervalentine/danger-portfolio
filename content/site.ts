export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
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
      title: "React Space Barrage",
      description:
        "An arcade-style space shooter built with React. Fast-paced, keyboard-driven, and rendered entirely in the browser.",
      tags: ["React", "TypeScript", "Canvas"],
      href: "https://github.com/",
    },
    {
      title: "React Native Scroll Track",
      description:
        "A lightweight scroll indicator component for React Native with smooth tracking and minimal configuration.",
      tags: ["React Native", "TypeScript", "Reanimated"],
      href: "https://github.com/",
    },
    {
      title: "Connect Four",
      description:
        "A two-player Connect Four game with win detection and a clean, responsive board.",
      tags: ["React", "CSS"],
      href: "https://github.com/",
    },
    {
      title: "Wordle Cheater",
      description:
        "A solver that narrows the Wordle word list from your guesses and feedback.",
      tags: ["JavaScript", "Algorithms"],
      href: "https://github.com/",
    },
  ] satisfies Project[],
  contact: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ] satisfies ContactLink[],
};
