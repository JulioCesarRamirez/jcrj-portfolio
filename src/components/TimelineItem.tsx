import Link from "next/link";

export interface Highlight {
  text: string;
  /** Slug of a readable case study, or null. */
  caseStudy: string | null;
}

interface Props {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlights: readonly Highlight[];
  stack: readonly string[];
  /** Link text for a highlight that has a case study. */
  readLabel?: string;
}

export function TimelineItem({
  company,
  title,
  location,
  start,
  end,
  summary,
  highlights,
  stack,
  readLabel = "Read the case study →",
}: Props) {
  return (
    <li className="border-divider grid gap-4 border-t py-8 md:grid-cols-[200px_1fr]">
      <div className="flex flex-col gap-1 pt-1">
        <p className="label-mono">
          {start} – {end || "Present"}
        </p>
        {location ? <p className="text-subtle text-xs">{location}</p> : null}
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="h3 text-text">
          {title} <span className="text-subtle font-normal">· {company}</span>
        </h3>
        {summary ? <p className="text-muted">{summary}</p> : null}
        {highlights.length > 0 ? (
          <ul className="text-soft list-disc space-y-2 pl-5 text-[15px]">
            {highlights.map((h) => (
              <li key={h.text}>
                {h.text}
                {h.caseStudy ? (
                  <>
                    {" "}
                    <Link
                      href={`/case-studies/${h.caseStudy}`}
                      className="text-accent whitespace-nowrap underline underline-offset-4"
                    >
                      {readLabel}
                    </Link>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
        {stack.length > 0 ? (
          <p className="text-subtle font-mono text-xs">{stack.join(" · ")}</p>
        ) : null}
      </div>
    </li>
  );
}
