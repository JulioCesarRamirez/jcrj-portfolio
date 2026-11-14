import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isVariant } from "@/lib/location";
import { pageUrls } from "@/lib/metadata";
import { AppTile } from "@/components/AppTile";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactBand } from "@/components/ContactBand";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { MetricStrip } from "@/components/MetricStrip";
import { SectionHeader } from "@/components/SectionHeader";
import { TextLink } from "@/components/TextLink";
import { TitledGrid } from "@/components/TitledGrid";
import { ShippedAt } from "@/components/ShippedAt";
import {
  getEngagement,
  getLocation,
  getFeaturedApps,
  getProfile,
  getVisibleCaseStudies,
  getResume,
} from "@/lib/content";

export const metadata: Metadata = { ...pageUrls("/") };

const FEATURED_CASE_STUDIES = 3;

export default async function HomePage({ params }: PageProps<"/v/[variant]">) {
  const { variant } = await params;
  if (!isVariant(variant)) notFound();
  const [profile, engagement, location, caseStudies, apps] = await Promise.all([
    getProfile(),
    getEngagement(),
    getLocation(variant),
    getVisibleCaseStudies(),
    getFeaturedApps(),
  ]);
  const featured = caseStudies.slice(0, FEATURED_CASE_STUDIES);
  const resume = getResume(location.resume, profile.sections.resumeLabel);
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
        locationLine={location.locationLine}
        lookingFor={
          engagement.lookingFor.show
            ? location.lookingFor || engagement.lookingFor.text
            : ""
        }
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

      {engagement.howIWork.items.length > 0 ? (
        <section
          className="border-divider border-t py-16"
          aria-labelledby="how-i-work"
        >
          <Container>
            <SectionHeader
              id="how-i-work"
              title={engagement.howIWork.heading}
            />
            <TitledGrid items={engagement.howIWork.items} />
          </Container>
        </section>
      ) : null}

      {engagement.teaser.heading ? (
        <section
          className="border-divider border-t py-16"
          aria-labelledby="work-with-me-teaser"
        >
          <Container className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[620px] flex-col gap-2.5">
              <h2 id="work-with-me-teaser" className="h2 text-text">
                {engagement.teaser.heading}
              </h2>
              <p className="text-muted text-base leading-[1.6]">
                {engagement.teaser.text}
              </p>
            </div>
            <TextLink href="/work-with-me">
              {engagement.teaser.linkLabel}
            </TextLink>
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
