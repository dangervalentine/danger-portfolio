import type { TechGroup } from "@/content/site";

/** A span of employment. Rendered identically for every role, which is the
 * point: the previous résumé carried three different date formats across four
 * entries ("February 2017 - Febraury 2021", "2021 -", "July 2021 - Present")
 * because each was typed by hand at a different time. One shape, one
 * renderer, and that cannot recur. */
export type DateRange = {
    start: string;
    /** "Present" for the current role. */
    end: string;
};

/** One employer.
 *
 * There is deliberately no `clients` field, and no `ClientLink` type anywhere
 * in this file. Agency work and regulated health data mean the fact we do not
 * publish is the *join* between a client and the technology it runs — so the
 * type has nowhere to put a client at all. Redaction that depends on
 * remembering is redaction that eventually fails; this is redaction that
 * cannot be undone by a careless edit.
 *
 * Engagements are described by shape instead — "a national appliance
 * retailer, ~20,000 products" — which carries the scale a reader is actually
 * weighing and identifies nobody. The claims survive it: every bullet below
 * asserts something about the engineer, not about a customer. */
export type Engagement = {
    company: string;
    /** The employer's own site, rendered as the bare domain beside the
     * company name — "Creed Interactive – creedinteractive.com" — with the
     * domain as the anchor. A reader checking whether an employer is real
     * should not have to leave the document to find out where they are being
     * sent, and in the PDF this is a real link annotation whose visible text
     * is still an address on paper.
     *
     * Linking the employer is not the join the disclosure policy forbids:
     * that rule is about clients, whose names appear nowhere here. */
    href: string;
    /** "Software Developer I → II" where a promotion happened. The arrow is
     * the whole story and costs four characters. */
    title: string;
    location: string;
    dates: DateRange;
    /** What the role *was*, where the title does not say it. Agency seniority
     * in particular is not self-evident from "Senior Software Developer". */
    summary?: string;
    bullets: string[];
    stack?: TechGroup[];
};

/** An independent product.
 *
 * Kept in its own list, rendered under its own heading, and therefore
 * incapable of interleaving with employment. On the old résumé NextQuest sat
 * between two employers in the same visual treatment and read as a job. */
export type ProductEntry = {
    name: string;
    description: string;
    bullets: string[];
    /** The product's own site, rendered exactly as an employer's is: the
     * bare domain beside the name, as the anchor. It used to sit in
     * `platforms` on the far side of the header, which put the one address a
     * reader might actually type at the end of a run of store links — and
     * made the two lists of links in this document behave differently for no
     * reason a reader could see. A product and an employer are both a claim
     * with an address behind it, so both are written the same way. */
    href?: string;
    /** Where the thing runs, now that the site has its own field: store
     * listings, and platforms with no listing yet.
     *
     * These used to be two separate things: a `context` string reading
     * "iOS · Android · Web" in the header, and a row of links under the
     * bullets. That said the same fact twice and made the reader join them,
     * so the platform *is* the link.
     *
     * An entry with no `href` is a platform the product runs on that has no
     * public listing yet; it renders as plain text rather than a dead link,
     * the same rule `StoreLink` and `ContactLink` follow in `site.ts`. */
    platforms: { label: string; href?: string }[];
    /** Release stage, last in the header row. Kept out of `platforms`
     * because that list is read as places the thing runs, and a release
     * stage is not one of them. */
    status: string;
};

export type Education = {
    institution: string;
    credential: string;
    minors: string[];
    years: string;
};

export const resume = {
    /** Not duplicated from `site.ts` — imported there is not possible without
     * a cycle, so the name is repeated and the email is not: see `contact`
     * below, which reads `site.email`. */
    name: "Victor Danger Valentine",
    title: "Senior Software Developer",

    /** The opening paragraph. Written to do what the old résumé's MISSION
     * STATEMENT could not: state the shape of the career in the nouns a
     * reader is scanning for, in one breath.
     *
     * "Nine years" is load-bearing. The old document started at February 2017
     * with no earlier entry and left the reader to do the arithmetic. */
    summary:
        "Senior full-stack and mobile engineer with nine years building " +
        "production systems end to end: .NET and Node.js backends across " +
        "four SQL engines, React, Angular and Next.js web clients, and " +
        "React Native and .NET MAUI applications shipped to the App Store " +
        "and Google Play. Equally at home owning a client engagement from " +
        "requirements through deployment and architecting a system from the " +
        "first commit.",

    /* No phone field. The number reaches one document only — the private
     * PDF the build script writes outside public/ — and it arrives there
     * from RESUME_PHONE in an uncommitted .env.local, never from here. A
     * value in this file is as public as the repository whatever the
     * renderer does with it, which is the whole reason it is not here. See
     * .env.example and scripts/build-resume.mjs. */
    location: "Minneapolis, MN",

    engagements: [
        {
            company: "Creed Interactive",
            href: "https://www.creedinteractive.com/",
            title: "Senior Software Developer",
            location: "Minneapolis, MN",
            dates: { start: "July 2021", end: "Present" },
            summary:
                "One of two senior developers on the team, owning client " +
                "engagements end to end in a digital agency while remaining " +
                "roughly 90% hands-on.",
            bullets: [
                "Own engagements from first client conversation through deployment: requirements gathering, solution design, effort estimation, and translation of an hour budget into a deliverable schedule up to a year ahead.",
                "Shipped iOS applications to the App Store for agency clients, owned the process from development through the store publication process, across .NET MAUI and Expo / React Native.",
                "Designed a daily ETL pipeline linking multi-file XML exports into a relational model of roughly 20,000 products and 4.4M+ related records covering imagery, video, specifications and pricing, with checksum-based change detection so unchanged entities are never rewritten.",
                "Cut catalog refresh downtime to under one second using SQL Server partition switching across production, staging and backup table triples, re-validating constraints after each swap and rolling back automatically when referential integrity fails.",
                "Replaced a 2012-era jQuery storefront with a headless WordPress content layer injected into .NET MVC Razor views through a custom shortcode rendering engine, letting non-technical stakeholders manage pages, events, promotions and store updates without developer time.",
                "Built and maintained internal dashboards, AWS deployments and traffic-monitoring tooling for an enterprise client across several years on a Node.js and Nest.js stack, with Sequelize and TypeORM over Oracle.",
                "Accountable for the output of junior developers; originated pull-request review policy, built and maintained CI/CD, and presented company-wide on emerging practice.",
            ],
            stack: [
                {
                    label: "Mobile",
                    items: ["React Native", "Expo", ".NET MAUI"],
                },
                {
                    label: "Web",
                    items: [
                        "React",
                        "Angular",
                        "TypeScript",
                        ".NET MVC",
                        "Razor",
                        "WordPress",
                        "Drupal",
                    ],
                },
                // Two backend ecosystems, not one. The résumé read as .NET-only
                // for ten years; agency work is whatever the client already
                // runs, and a senior who moves between a C# stack and a Node
                // one is describing a different — larger — capability than a
                // specialist in either.
                {
                    label: "Backend",
                    items: [
                        ".NET Core",
                        "C#",
                        "Entity Framework Core",
                        "Nest.js",
                        "Node.js",
                        "PHP",
                        "Sequelize",
                        "TypeORM",
                    ],
                },
                // Four engines on their own row rather than buried in the
                // backend list. Oracle and MySQL beside SQL Server and
                // PostgreSQL is the row a reader scans for when the job
                // description names one of them, and a four-database range is
                // worth its own line to be found in.
                {
                    label: "Data",
                    items: ["Oracle", "SQL Server", "PostgreSQL", "MySQL"],
                },
                { label: "Platform", items: ["Azure", "AWS", "CI/CD"] },
            ],
        },
        {
            company: "Intertech",
            href: "https://www.intertech.com/",
            title: "Senior Software Developer",
            location: "Eagan, MN",
            /** Overlaps the start of the Creed role by three months, which is
             * real and deliberate — a consulting engagement running out while
             * the next position began. The `summary` below says so rather than
             * leaving a reader to notice two concurrent dates and wonder which
             * one is a typo. */
            dates: { start: "February 2021", end: "October 2021" },
            summary:
                "Consulting engagement, concluding concurrently with the " +
                "start of the Creed Interactive role.",
            bullets: [
                "Delivered search functionality and database support in a multi-tenant environment.",
            ],
        },
        {
            company: "ImageTrend",
            href: "https://www.imagetrend.com/",
            title: "Software Developer I → II",
            location: "Lakeville, MN",
            dates: { start: "February 2017", end: "February 2021" },
            summary:
                "Clinical and billing software for emergency medical " +
                "services, in a regulated data environment, across a product " +
                "line whose front ends spanned the whole evolution from " +
                "vanilla JavaScript to modern Angular.",
            bullets: [
                // The 100k figure belongs inside this bullet rather than in
                // one of its own. It is a per-device number — each iPad holds
                // its own full copy — so on its own it read as an import
                // statistic about a server, which is both less impressive and
                // not what happened.
                "Built the offline-first sync layer for a field application used by EMS providers on thousands of iPads, each holding 100,000+ records locally: patient data, procedure tracking and SNOMED / ICD-9 reference sets persisted in IndexedDB and reconciled on reconnect, so crews kept working through the long stretches without connectivity that the job actually involves.",
                "Built a merge-field document editor on contenteditable: a WYSIWYG authoring surface over hundreds of bindable fields spanning patient data, procedures, treatments and diagnoses, resolved at render time. Used daily by medical billers for invoices, EOB documents and PDF generation, and built before the libraries that would now make any part of it routine.",
            ],
            stack: [
                // "SQL Server", not "SQL": it was the engine behind every
                // product in the line, and the generic word gives a reader
                // scanning for the specific one nothing to catch on.
                {
                    label: "Backend",
                    items: [".NET", "C#", "SQL Server", "SOAP/XML"],
                },
                // Four years across a product line, not one application, so
                // this is a genuine span rather than a list of things touched
                // once: it runs the entire arc of front-end practice from
                // hand-written JavaScript to modern Angular. Listed in that
                // order for exactly that reason.
                {
                    label: "Frontend",
                    items: [
                        "JavaScript",
                        "jQuery",
                        "Knockout.js",
                        "AngularJS",
                        "Angular",
                        "React",
                        "TypeScript",
                        "IndexedDB",
                    ],
                },
                { label: "Platform", items: ["Azure", "TeamCity"] },
            ],
        },
    ] satisfies Engagement[],

    products: [
        {
            name: "NextQuest",
            href: "https://nextquest.dev/",
            description:
                "A game tracker for web and mobile: every replay, every platform, every verdict.",
            bullets: [
                "Nightly ETL ingesting a third-party catalog of roughly 120 entity types via binary COPY into a staging schema, with zero-downtime Elasticsearch reindexing by verified alias swap.",
                "Offline-first mobile architecture on SQLite with timestamp-cursor delta sync and deletion reconciliation, so the app works fully offline and converges on reconnect.",
                "Typeahead search across 400,000+ titles as a graduated relevance ladder over eight facet dimensions.",
            ],
            platforms: [
                {
                    label: "iOS",
                    href: "https://apps.apple.com/us/app/nextquest/id6751153491",
                },
                {
                    label: "Android",
                    href: "https://play.google.com/store/apps/details?id=com.dangervalentine.nextquest",
                },
            ],
            status: "In production",
        },
        {
            name: "Density Fitness",
            href: "https://density.dangervalentine.com",
            description:
                "Strength-training software that prescribes every session: weight, sets, reps and rest.",
            bullets: [
                "Seven-package TypeScript monorepo in which web and React Native clients share the entire domain layer (progression engine, analytics, editor store) rather than merely utilities, with platform dependencies entering through a single injected seam.",
                "Pure-functional progression engine implementing 5/3/1, StrongLifts, linear, percentage-based and auto-regulated schemes, with a fold-on-write model that deterministically replays derived history when an earlier session is edited.",
            ],
            platforms: [
                // No href: the mobile builds are not on a store yet, and a
                // platform with no listing is named without being linked.
                { label: "iOS" },
                { label: "Android" },
            ],
            status: "In production",
        },
    ] satisfies ProductEntry[],

    /** The toolkit, merged across professional and independent work — which is
     * the entire reason this block exists. The old résumé's donut chart
     * offered four labels (JAVASCRIPT, DESIGN, DATABASE, C#) around a ring
     * with a percent sign and no numbers: four items that are not peers,
     * conveying nothing, as the largest graphic on the page. */
    skills: [
        {
            label: "Languages",
            items: [
                "C#",
                "TypeScript",
                "JavaScript",
                "SQL",
                "Python",
                "PHP",
                "HTML",
                "CSS",
            ],
        },
        {
            label: "Backend",
            items: [
                ".NET",
                "ASP.NET Core",
                // No ".NET MVC" or "Razor" here, though both are in the Creed
                // stack below and in the storefront bullet. They are standard
                // and unremarkable — nobody searches for them, and a skills
                // block is read as a claim about range. The role that used
                // them says so; this row does not have to repeat it. Same
                // reasoning that keeps jQuery and Knockout.js down in the
                // ImageTrend stack.
                "Entity Framework Core",
                "Dapper",
                "Node.js",
                "Nest.js",
                "Sequelize",
                "TypeORM",
                "REST API design",
                "SOAP/XML",
                "Background services",
            ],
        },
        {
            label: "Data",
            items: [
                "PostgreSQL",
                "SQL Server",
                "Oracle",
                "MySQL",
                "SQLite",
                "Elasticsearch",
                // Kept here, while jQuery, Knockout.js and AngularJS stay
                // down in the ImageTrend stack where their dates explain
                // them. A headline skills block is read as "what I reach for
                // now"; a 2017–2021 role is read as history, and the same
                // word means different things in the two places.
                "IndexedDB",
                "ETL pipelines",
                "Schema migrations",
                "Query optimization",
            ],
        },
        {
            label: "Web",
            items: [
                "React",
                "Next.js",
                "Angular",
                "WordPress (headless)",
                "Drupal",
                "Tailwind CSS",
                "HTML5 Canvas",
                "Accessibility (WCAG)",
            ],
        },
        {
            label: "Mobile",
            items: [
                "React Native",
                "Expo",
                ".NET MAUI",
                "App Store release",
                "Google Play release",
                "Offline-first sync",
            ],
        },
        {
            label: "Platform",
            items: [
                "Azure",
                "AWS",
                "Docker",
                "Linux",
                "Caddy",
                "Cloudflare",
                "TeamCity",
                "CI/CD",
            ],
        },
        {
            label: "Practice",
            items: [
                "Requirements gathering",
                "Effort estimation",
                "Code review policy",
                "Mentorship",
                "Test-driven development",
                "Technical presentation",
            ],
        },
    ] satisfies TechGroup[],

    education: {
        institution: "Saint Cloud State University",
        credential: "B.A. in Communication Studies",
        minors: ["Conflict Resolution", "Psychology"],
        years: "2009 – 2014",
    } satisfies Education,

    /** How the career started, stated rather than left as a nine-year gap
     * under a non-technical degree. Two years of self-teaching good enough to
     * be hired on, followed by an employer funding six months of full-stack
     * training, is a stronger story than a bootcamp certificate — and an
     * unexplained gap reads as something hidden.
     *
     * What is deliberately absent: why that first tenure ended. It ended
     * because he was asked to do something unethical and declined, which
     * reflects well on him and cannot be verified by a reader. A résumé
     * mentioning a former employer's misconduct is scored as a risk signal
     * regardless of who was right. It is an interview answer, not a document
     * line. */
    entry:
        "Self-taught for two years, then hired into six months of " +
        "employer-funded full-stack training before entering the field.",
};
