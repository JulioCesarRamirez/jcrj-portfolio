import Image from "next/image";
import Link from "next/link";
import { Tag } from "./Tag";

export interface WorkCardData {
  name: string;
  type: "web" | "mobile";
  org: string;
  role: string;
  years: string;
  summary: string;
  stack: readonly string[];
  links: readonly { label: string; url: string }[];
  caseStudy: string | null;
  screenshots: readonly { image: string | null; alt: string }[];
}

interface Props {
  app: WorkCardData;
  readCaseStudyLabel: string;
}

const PLATFORM: Record<WorkCardData["type"], string> = {
  web: "Web",
  mobile: "Mobile",
};

export function WorkCard({ app, readCaseStudyLabel }: Props) {
  const shot = app.screenshots.find((s) => s.image);
  const byline = [app.org, app.role].filter(Boolean).join(" · ");
  return (
    <article className="border-border bg-surface flex w-full flex-col overflow-hidden rounded-[16px] border">
      {shot?.image ? (
        <div className="bg-inset border-divider relative aspect-[16/10] border-b">
          <Image
            src={shot.image}
            alt={shot.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-subtle flex justify-between font-mono text-xs">
          <span>{PLATFORM[app.type]}</span>
          <span>{app.years}</span>
        </p>
        <h3 className="h3 text-text">{app.name}</h3>
        {byline ? <p className="text-muted text-sm">{byline}</p> : null}
        {app.summary ? (
          <p className="text-muted text-sm leading-relaxed">{app.summary}</p>
        ) : null}
        {app.stack.length > 0 ? (
          <ul
            className="flex flex-wrap gap-1.5"
            aria-label={`${app.name} stack`}
          >
            {app.stack.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        ) : null}
        {app.caseStudy || app.links.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-x-5 pt-2">
            {app.caseStudy ? (
              <li>
                <Link
                  href={`/case-studies/${app.caseStudy}`}
                  className="text-accent inline-flex min-h-11 items-center text-sm hover:underline"
                >
                  {readCaseStudyLabel}
                </Link>
              </li>
            ) : null}
            {app.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  rel="noopener noreferrer"
                  className="text-accent inline-flex min-h-11 items-center text-sm hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
