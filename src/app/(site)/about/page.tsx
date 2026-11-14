import type { Metadata } from "next";
import { pageUrls } from "@/lib/metadata";
import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";
import { TimelineItem } from "@/components/TimelineItem";
import { RESUME_ARIA_LABEL, RESUME_FILENAME } from "@/lib/resume";
import { getExperience, getProfile, getSkills } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  ...pageUrls("/about"),
};

export default async function AboutPage() {
  const [profile, experience, skills] = await Promise.all([
    getProfile(),
    getExperience(),
    getSkills(),
  ]);
  return (
    <Container className="py-16">
      <h1 className="h1 text-text">{profile.name}</h1>
      <p className="text-muted mt-4 max-w-2xl text-[17px] leading-[1.7]">
        {profile.valueStatement}
      </p>
      {profile.resume ? (
        <p className="mt-6">
          <a
            href={profile.resume}
            download={RESUME_FILENAME}
            aria-label={RESUME_ARIA_LABEL}
            className="text-accent inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline"
          >
            {profile.sections.resumeLabel}
          </a>
        </p>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-16" aria-labelledby="experience">
          <h2 id="experience" className="h2 text-text mb-6">
            {profile.sections.experienceHeading}
          </h2>
          <ol>
            {experience.map(({ slug, entry }) => (
              <TimelineItem
                key={slug}
                company={entry.company}
                location={entry.location}
                stack={entry.stack}
                title={entry.title}
                start={entry.start}
                end={entry.end}
                summary={entry.summary}
                highlights={entry.highlights}
              />
            ))}
          </ol>
        </section>
      ) : null}

      {skills.length > 0 ? (
        <section className="mt-16" aria-labelledby="skills">
          <h2 id="skills" className="h2 text-text mb-6">
            {profile.sections.skillsHeading}
          </h2>
          <dl className="border-divider divide-divider divide-y border-y">
            {skills.map(({ slug, entry }) => (
              <div
                key={slug}
                className="grid gap-3 py-5 md:grid-cols-[200px_1fr]"
              >
                <dt className="label-mono pt-1">{entry.group}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {entry.items.map((item) => (
                      <li key={item}>
                        <Tag variant="filled">{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </Container>
  );
}
