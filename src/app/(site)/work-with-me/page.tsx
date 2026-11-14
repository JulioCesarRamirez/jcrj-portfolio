import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { TitledGrid } from "@/components/TitledGrid";
import {
  getEngagement,
  getProfile,
  getVisibleCaseStudies,
} from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { workWithMe } = await getEngagement();
  return {
    title: workWithMe.title,
    description: workWithMe.intro,
    alternates: { canonical: "/work-with-me" },
  };
}

export default async function WorkWithMePage() {
  const [engagement, profile, studies] = await Promise.all([
    getEngagement(),
    getProfile(),
    getVisibleCaseStudies(),
  ]);
  const page = engagement.workWithMe;
  const proof = page.proof
    .map((slug) => studies.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  const mailto = profile.email
    ? `mailto:${profile.email}?subject=${encodeURIComponent(page.ctaSubject)}`
    : null;

  return (
    <Container className="py-16">
      <h1 className="h1 text-text">{page.title}</h1>
      <p className="text-muted mt-4 max-w-2xl text-[17px] leading-[1.7]">
        {page.intro}
      </p>
      {mailto && page.ctaLabel ? (
        <div className="pt-8">
          <ButtonLink href={mailto}>{page.ctaLabel}</ButtonLink>
        </div>
      ) : null}

      {page.build.length > 0 ? (
        <section className="mt-16" aria-labelledby="what-i-build">
          <SectionHeader id="what-i-build" title={page.buildHeading} />
          <TitledGrid items={page.build} columns="four" />
        </section>
      ) : null}

      {page.steps.length > 0 ? (
        <section className="mt-16" aria-labelledby="how-it-works">
          <SectionHeader id="how-it-works" title={page.stepsHeading} />
          <TitledGrid items={page.steps} numbered />
        </section>
      ) : null}

      {proof.length > 0 ? (
        <section className="mt-16" aria-labelledby="relevant-work">
          <SectionHeader id="relevant-work" title={page.proofHeading} />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {proof.map(({ slug, entry }, index) => (
              <li key={slug} className="flex">
                <CaseStudyCard
                  slug={slug}
                  index={index}
                  title={entry.title}
                  summary={entry.summary}
                  draft={!entry.published}
                  category={entry.category}
                  company={entry.company}
                  diagram={entry.diagram}
                  outcomeValue={entry.outcomeValue}
                  outcomeLabel={entry.outcomeLabel}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {mailto && page.ctaLabel ? (
        <div className="border-border bg-surface mt-16 flex flex-wrap items-center justify-between gap-6 rounded-[20px] border p-8 sm:p-12">
          <p className="text-text max-w-[520px] text-[24px] leading-tight font-semibold tracking-[-0.02em]">
            {engagement.teaser.heading}
          </p>
          <ButtonLink href={mailto}>{page.ctaLabel}</ButtonLink>
        </div>
      ) : null}
    </Container>
  );
}
