import Link from "next/link";
import { Tag } from "./Tag";
import { Diagram } from "./diagrams/Diagram";

interface Props {
  slug: string;
  index: number;
  title: string;
  summary: string;
  category: string;
  /** Shown in `next dev` for unpublished entries. */
  draft?: boolean;
  company: string;
  diagram: string | null;
  outcomeValue: string;
  outcomeLabel: string;
}

export function CaseStudyCard({
  slug,
  index,
  title,
  summary,
  category,
  draft = false,
  company,
  diagram,
  outcomeValue,
  outcomeLabel,
}: Props) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <article className="border-border bg-surface hover:border-line hover:bg-hover focus-within:border-line relative flex w-full flex-col gap-4 rounded-[16px] border p-6">
      <p className="text-subtle flex justify-between font-mono text-xs">
        <span>{category ? `${number} · ${category}` : number}</span>
        <span className="flex items-center gap-2">
          {draft ? <Tag variant="accent">Draft</Tag> : null}
          {company}
        </span>
      </p>
      <div className="border-divider bg-inset flex h-[132px] items-center justify-center rounded-[10px] border p-4">
        <Diagram diagramKey={diagram} className="h-full w-full" />
      </div>
      <h3 className="h3 text-text">
        <Link
          href={`/case-studies/${slug}`}
          className="after:absolute after:inset-0 after:rounded-[16px] after:content-['']"
        >
          {title}
        </Link>
      </h3>
      <p className="text-muted text-sm leading-relaxed">{summary}</p>
      {outcomeValue ? (
        <p className="border-divider mt-auto flex items-baseline gap-2 border-t pt-2">
          <span className="text-accent shrink-0 font-mono text-[22px] whitespace-nowrap">
            {outcomeValue}
          </span>
          <span className="text-muted text-[13px]">{outcomeLabel}</span>
        </p>
      ) : null}
    </article>
  );
}
