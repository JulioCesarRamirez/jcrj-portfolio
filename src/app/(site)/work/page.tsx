import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { WorkBrowser } from "@/components/WorkBrowser";
import { getApps, getProfile } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: profile.sections.workHeading,
    alternates: { canonical: "/work" },
  };
}

export default async function WorkPage() {
  const [profile, apps] = await Promise.all([getProfile(), getApps()]);
  return (
    <Container className="py-16">
      <h1 className="h1 text-text">{profile.sections.workHeading}</h1>
      <p className="text-muted mt-4 mb-12 max-w-2xl text-[17px] leading-[1.7]">
        {profile.sections.workIntro}
      </p>
      <WorkBrowser
        apps={apps.map(({ entry }) => entry)}
        readCaseStudyLabel={profile.sections.readCaseStudyLabel}
      />
    </Container>
  );
}
