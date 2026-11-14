import type { Metadata } from "next";
import { pageUrls } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { OnThisPage } from "@/components/OnThisPage";
import { getProfile, getSiteInfo } from "@/lib/content";
import { renderMarkdoc } from "@/lib/markdoc";

export async function generateMetadata(): Promise<Metadata> {
  const info = await getSiteInfo();
  return {
    title: info?.title,
    description: info?.intro || undefined,
    ...pageUrls("/how-this-site-is-built"),
  };
}

export default async function HowThisSiteIsBuiltPage() {
  const [info, profile] = await Promise.all([getSiteInfo(), getProfile()]);
  if (!info) notFound();

  const { node } = await info.body();
  const { content, headings } = renderMarkdoc(node);

  return (
    <Container className="py-16">
      <header className="mb-14 flex max-w-3xl flex-col gap-4">
        <h1 className="h1 text-text">{info.title}</h1>
        {info.intro ? (
          <p className="text-muted text-[19px] leading-[1.6]">{info.intro}</p>
        ) : null}
      </header>
      <div className="flex flex-wrap gap-12 lg:flex-nowrap">
        <div className="w-full lg:w-[220px] lg:shrink-0">
          <OnThisPage
            label={profile.sections.onThisPageLabel}
            headings={headings}
          />
        </div>
        <article className="case-body max-w-[760px] min-w-0 flex-1">
          {content}
        </article>
      </div>
    </Container>
  );
}
