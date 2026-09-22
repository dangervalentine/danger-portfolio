import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CaseStudyFooter } from "@/components/CaseStudyFooter";
import { CaseStudyHeader } from "@/components/CaseStudyHeader";
import { Decisions } from "@/components/Decisions";
import { Exhibits } from "@/components/Exhibits";
import { Highlights } from "@/components/Highlights";
import { Nav } from "@/components/Nav";
import { TechStack } from "@/components/TechStack";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";

/** Both pages are known at build time. `dynamicParams = false` below turns any
 * other slug into a 404 rather than an attempt to render one. */
export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) return {};

  const title = `How ${study.title} is built`;
  const path = `/products/${study.slug}`;

  // Relative URLs throughout: `metadataBase` is set once in the root layout and
  // resolves them, so the host is not spelled out a second time here.
  return {
    title,
    description: study.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: site.name,
      title,
      description: study.summary,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.summary,
    },
  };
}

export default async function ProjectCaseStudy({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) notFound();

  // The stack panel is the one block this page shares with the card that links
  // to it, so it is read from the project rather than copied into the case
  // study — there is only ever one list of what a project is built with.
  const project = site.projects.find((candidate) => candidate.slug === slug);

  return (
    <>
      <Nav activeHref={`/products/${slug}`} />
      <main className="flex-1">
        <CaseStudyHeader
          title={study.title}
          platforms={study.platforms}
          years={study.years}
          summary={study.summary}
        />
        {/* The product's own art, once, between the summary and the numbers.
            This page opened on two paragraphs and a table of phrases: the
            reader arrives from a card that was three-quarters picture and
            lands somewhere with nothing to look at, and the thing the whole
            page is about goes unshown.

            A band rather than the card's 16:9 frame — this is a beat between
            two blocks of text, not a second hero, and 280px is enough to show
            the composition without pushing "At a glance" under the fold on a
            laptop. `object-cover` with a per-project focus point, because
            these are designed pieces with a wordmark in them and the crop has
            to miss it; see `imageFocus` in content/site.ts. */}
        {project ? (
          <div className="mx-auto mb-9 w-full max-w-6xl px-6">
            <div className="overflow-hidden rounded-[10px] border border-edge bg-surface">
              <Image
                src={project.image}
                alt={project.imageAlt ?? project.title}
                // The content column, less its gutters, up to the 1152px cap.
                sizes="(min-width: 1200px) 1104px, 100vw"
                // Directly under the header on a page with no other art above
                // it — this is the LCP here, the way the first featured card
                // is on the homepage.
                loading="eager"
                fetchPriority="high"
                style={{ objectPosition: project.imageFocus }}
                className="h-[280px] w-full object-cover"
              />
            </div>
          </div>
        ) : null}
        <Highlights items={study.highlights} />
        <ArchitectureDiagram bands={study.diagram} caption={study.caption} />
        <Decisions decisions={study.decisions} />
        <Exhibits exhibits={study.exhibits} />
        {/* No heading here: TechStack renders its own — as an `h2` on this
            page, where it is a section like the four above it rather than a
            panel inside a card. */}
        {project?.stack?.length ? (
          <section className="mx-auto w-full max-w-6xl px-6 pt-10 lg:pt-14">
            <TechStack groups={project.stack} headingLevel="h2" />
          </section>
        ) : null}
      </main>
      <CaseStudyFooter links={study.links} />
    </>
  );
}
