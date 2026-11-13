import { AppTile } from "@/components/AppTile";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactBand } from "@/components/ContactBand";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { MetricStrip } from "@/components/MetricStrip";
import { SectionHeader } from "@/components/SectionHeader";
import { ShippedAt } from "@/components/ShippedAt";
import {
  getFeaturedApps,
  getProfile,
  getVisibleCaseStudies,
  getResume,
} from "@/lib/content";

const FEATURED_CASE_STUDIES = 3;

export default async function HomePage() {
  const [profile, caseStudies, apps] = await Promise.all([
    getProfile(),
    getVisibleCaseStudies(),
    getFeaturedApps(),
  ]);
  const featured = caseStudies.slice(0, FEATURED_CASE_STUDIES);
  const resume = getResume(profile, profile.sections.resumeLabel);
  // Without readable case studies the CTA would lead to a 404.
  const primaryCta =
    caseStudies.length === 0 &&
    profile.primaryCta.href.startsWith("/case-studies")
      ? null
      : profile.primaryCta;

  return (
    <>
      <Hero
        eyebrow={profile.eyebrow}
        headline={profile.headline}
        valueStatement={profile.valueStatement}
        primaryCta={primaryCta}
        resume={resume}
        locationLine={profile.locationLine}
        currently={profile.currently}
      />

      <Container className="pb-16">
        <MetricStrip label="Proof" items={profile.proofPoints} />
        <ShippedAt label={profile.shippedAtLabel} names={profile.shippedAt} />
      </Container>

      {featured.length > 0 ? (
        <section
          className="border-divider border-t py-16"
          aria-labelledby="featured-case-studies"
        >
          <Container>
            <SectionHeader
              id="featured-case-studies"
              eyebrow={profile.sections.caseStudiesEyebrow}
              title={profile.sections.caseStudiesHeading}
              linkLabel={profile.sections.caseStudiesLink}
              linkHref="/case-studies"
            />
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featured.map(({ slug, entry }, index) => (
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
        </section>
      ) : null}

      {apps.length > 0 ? (
        <section
          className="border-divider border-t py-16"
          aria-labelledby="featured-apps"
        >
          <Container>
            <SectionHeader
              id="featured-apps"
              eyebrow={profile.sections.appsEyebrow}
              title={profile.sections.appsHeading}
              linkLabel={profile.sections.appsLink}
              linkHref="/work"
            />
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {apps.map(({ slug, entry }) => (
                <li key={slug}>
                  <AppTile
                    name={entry.name}
                    detail={[
                      entry.type === "mobile" ? "Mobile" : "Web",
                      entry.org,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <ContactBand
        heading={profile.sections.contactHeading}
        text={profile.sections.contactText}
        email={profile.email}
        resume={resume}
      />
    </>
  );
}
