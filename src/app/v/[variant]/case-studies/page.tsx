import type { Metadata } from "next";
import { pageUrls } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Container } from "@/components/Container";
import { getProfile, getVisibleCaseStudies } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: profile.sections.caseStudiesHeading,
    ...pageUrls("/case-studies"),
  };
}

export default async function CaseStudiesPage() {
  const [profile, caseStudies] = await Promise.all([
    getProfile(),
    getVisibleCaseStudies(),
  ]);
  // Nothing readable to list: in production the section does not exist.
  if (caseStudies.length === 0) notFound();
  return (
    <Container className="py-16">
      <p className="label-mono mb-3">{profile.sections.caseStudiesEyebrow}</p>
      <h1 className="h1 text-text mb-12">
        {profile.sections.caseStudiesHeading}
      </h1>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map(({ slug, entry }, index) => (
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
    </Container>
  );
}
