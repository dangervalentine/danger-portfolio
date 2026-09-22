import { resume } from "@/content/resume";
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
 * `knowsAbout` is the whole technical surface, and it is derived below rather
 * than typed out here. */

/** What the two shipped applications evidence and the résumé's skills matrix
 * has no row for. These are product-level facts rather than lines on a
 * toolkit, which is why they are not in `resume.skills` and are here. */
const APP_KNOWS_ABOUT = [
  "Firebase Authentication",
  "Offline-first architecture",
  "Mobile application development",
  "iOS",
  "Android",
];

/** The `Person`'s `knowsAbout`, derived from the résumé.
 *
 * This was a hand-written list under the rule "everything here appears in one
 * of the two shipped applications", which was the honest bound while those
 * two applications were the only thing the site could evidence. `/resume` now
 * ships on this domain carrying nine years of employment, so the bound is the
 * résumé's own skills matrix, and deriving it is what stops the two drifting
 * apart the next time a row there changes. It goes from 24 terms to every
 * technology of a nine-year career, which is the point: this is the field an
 * LLM crawler reads in preference to guessing a skill list out of the prose,
 * and it was claiming a fraction of the truth.
 *
 * Trailing parentheticals are stripped: "Accessibility (WCAG)" is written
 * for a person, "Accessibility" is what a machine matches on. */
const KNOWS_ABOUT = [
  ...new Set([
    ...resume.skills.flatMap((group) =>
      group.items.map((item) => item.replace(/\s*\(.*\)$/, "")),
    ),
    ...APP_KNOWS_ABOUT,
  ]),
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
  // Found by its own end date rather than by position in the list. The list
  // happens to be ordered by recency, and nothing enforces that.
  const currentRole = resume.engagements.find(
    (role) => role.dates.end === "Present",
  );
  // `resume.location` is "City, ST". A shape it stops having leaves `region`
  // undefined, which JSON.stringify drops from the node rather than emitting
  // as a wrong answer.
  const [locality, region] = resume.location.split(", ");

  const graph = [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      jobTitle: site.tagline,
      // The résumé's opening paragraph, which is the one sentence written to
      // state the shape of the whole career. Nothing else on this node said
      // how long any of it had been going on.
      description: resume.summary,
      url: site.url,
      email: `mailto:${site.email}`,
      // Recruiter search is substantially geographic, and the city was
      // machine-readable nowhere, only as prose inside the availability line.
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        addressRegion: region,
        addressCountry: "US",
      },
      ...(currentRole
        ? {
            worksFor: {
              "@type": "Organization",
              name: currentRole.company,
              url: currentRole.href,
            },
          }
        : {}),
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: resume.education.institution,
      },
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
