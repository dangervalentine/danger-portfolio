import { site } from "@/content/site";

/** Schema.org JSON-LD.
 *
 * This is the machine-readable half of the page, and on a portfolio it earns
 * its keep twice: Google uses `Person` + `sameAs` to tie the site to the
 * GitHub and LinkedIn profiles as one entity, so a search for the name
 * resolves to a person rather than three unrelated pages; and the LLM
 * crawlers that increasingly do the first pass of a candidate search read
 * `knowsAbout` in preference to guessing a skill list out of the prose.
 *
 * `knowsAbout` is deliberately a superset of the chips rendered on the cards —
 * the cards are edited for a human reading two projects, this list is the
 * whole surface across all of them. Keep it honest: everything here appears
 * in one of the two shipped applications. */
const KNOWS_ABOUT = [
  ".NET",
  "C#",
  "ASP.NET Core",
  "REST API design",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "React Native",
  "Expo",
  "PostgreSQL",
  "Elasticsearch",
  "SQLite",
  "SQL",
  "Docker",
  "Linux",
  "Cloudflare",
  "Firebase Authentication",
  "Offline-first architecture",
  "Mobile application development",
  "iOS",
  "Android",
  "HTML5 Canvas",
  "Accessibility",
];

/** The two projects that are real applications with their own URLs. The grid
 * below them is small pieces and demos — marking those up as SoftwareApplication
 * would dilute the signal rather than add to it. */
const APPLICATIONS = [
  {
    name: "NextQuest",
    url: "https://nextquest.dev/",
    description:
      "A video game tracker for web, iOS and Android. Track playthroughs " +
      "per platform, search a catalogue of over 400,000 titles, build and " +
      "share lists and tier lists, and keep a lifetime record of everything " +
      "you have played.",
    appStore: "https://apps.apple.com/us/app/nextquest/id6751153491",
    playStore:
      "https://play.google.com/store/apps/details?id=com.dangervalentine.nextquest",
  },
  {
    name: "Density Fitness",
    url: "https://density.dangervalentine.com",
    description:
      "A strength training app that prescribes the weight, sets, reps and " +
      "rest of every session from programs including 5/3/1, StrongLifts, " +
      "hypertrophy blocks and auto-regulated templates, with a library of " +
      "873 exercises, interval and rest timers, and a plate calculator.",
  },
];

export function StructuredData() {
  const graph = [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      jobTitle: site.tagline,
      url: site.url,
      email: `mailto:${site.email}`,
      knowsAbout: KNOWS_ABOUT,
      sameAs: site.contact.map((link) => link.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} · ${site.tagline}`,
      inLanguage: "en-US",
      author: { "@id": `${site.url}/#person` },
    },
    ...APPLICATIONS.map((app) => ({
      "@type": "SoftwareApplication",
      name: app.name,
      url: app.url,
      description: app.description,
      applicationCategory: "MobileApplication",
      operatingSystem: "iOS, Android, Web",
      author: { "@id": `${site.url}/#person` },
      // Both are free and adless; stating it is what makes the offer valid
      // structured data rather than an empty node.
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      ...(app.appStore || app.playStore
        ? { sameAs: [app.appStore, app.playStore].filter(Boolean) }
        : {}),
    })),
  ];

  return (
    <script
      type="application/ld+json"
      // The payload is built from local constants, never from user input, so
      // there is nothing here to escape beyond the closing-tag guard below.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
          .replace(/</g, "\\u003c"),
      }}
    />
  );
}
