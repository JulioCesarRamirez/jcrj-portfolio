import type { Metadata } from "next";
import { viewAttrs } from "@/lib/analytics";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";
import { MetricStrip } from "@/components/MetricStrip";
import { OnThisPage } from "@/components/OnThisPage";
import { Diagram } from "@/components/diagrams/Diagram";
import { getCaseStudy, getProfile, getVisibleCaseStudies } from "@/lib/content";
import { renderMarkdoc } from "@/lib/markdoc";

/** Only published slugs are generated; anything else is a 404. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const studies = await getVisibleCaseStudies();
  return studies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/v/[variant]/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.entry.title,
    description: study.entry.summary,
    alternates: { canonical: `/case-studies/${slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/v/[variant]/case-studies/[slug]">) {
  const { slug } = await params;
  const [study, profile, all] = await Promise.all([
    getCaseStudy(slug),
    getProfile(),
    getVisibleCaseStudies(),
  ]);
  if (!study) notFound();

  const { entry } = study;
  const { node } = await entry.body();
  const { content, headings } = renderMarkdoc(node);
  const position = all.findIndex((c) => c.slug === slug);
  const next = position >= 0 ? all[position + 1] : undefined;
  const number = String(position + 1).padStart(2, "0");
  const { sections } = profile;

  return (
    <>
      <Container className="flex flex-col gap-6 pt-16 pb-12">
        <Link
          href="/case-studies"
          className="text-muted hover:text-text inline-flex min-h-11 items-center text-sm"
        >
          {sections.backLabel}
        </Link>
        <p className="label-mono flex items-center gap-3">
          <span>
            {sections.caseLabel} {number}
            {entry.category ? ` · ${entry.category}` : ""}
          </span>
          {entry.published ? null : <Tag variant="accent">Draft</Tag>}
        </p>
        <h1 className="h1 text-text max-w-4xl">{entry.title}</h1>
        <p className="text-muted max-w-3xl text-[19px] leading-[1.6]">
          {entry.lede || entry.summary}
        </p>
        {entry.facts.length > 0 ? (
          <dl className="border-divider grid gap-x-8 gap-y-4 border-y py-6 sm:grid-cols-2 lg:grid-cols-4">
            {entry.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1">
                <dt className="label-mono">{fact.label}</dt>
                <dd className="text-text text-[15px]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>

      {entry.metrics.length > 0 ? (
        <Container className="pb-16">
          <MetricStrip label={sections.keyResultsLabel} items={entry.metrics} />
        </Container>
      ) : null}

      <Container className="pb-24">
        <div className="flex flex-wrap gap-12 lg:flex-nowrap">
          <div className="w-full empty:hidden lg:w-[220px] lg:shrink-0">
            <OnThisPage label={sections.onThisPageLabel} headings={headings} />
          </div>
          <div className="max-w-[760px] min-w-0 flex-1">
            <figure className="mb-14">
              <div
                role="region"
                aria-label="Diagram"
                tabIndex={0}
                className="bg-inset border-border overflow-x-auto rounded-[16px] border p-6"
              >
                <Diagram
                  diagramKey={entry.diagram}
                  className="mx-auto aspect-[12/5] w-full max-w-md min-w-[360px]"
                />
              </div>
              <figcaption className="text-subtle pt-2 text-xs sm:hidden">
                Scroll sideways to see the full diagram.
              </figcaption>
            </figure>
            <article
              className="case-body"
              {...viewAttrs("case_study_view", { slug })}
            >
              {content}
            </article>
            <nav
              aria-label="Case study navigation"
              className="border-divider mt-16 flex flex-wrap justify-between gap-4 border-t pt-6"
            >
              <Link
                href="/case-studies"
                className="text-muted hover:text-text inline-flex min-h-11 items-center text-sm"
              >
                {sections.backLabel}
              </Link>
              {next ? (
                <Link
                  href={`/case-studies/${next.slug}`}
                  className="text-accent inline-flex min-h-11 items-center text-sm hover:underline"
                >
                  {sections.nextLabel} {next.entry.title} →
                </Link>
              ) : null}
            </nav>
          </div>
        </div>
      </Container>
    </>
  );
}
