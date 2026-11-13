import { TextLink } from "./TextLink";

interface Props {
  id: string;
  eyebrow?: string;
  title: string;
  linkLabel?: string;
  linkHref?: string;
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  linkLabel,
  linkHref,
}: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 pb-8">
      <div className="flex flex-col gap-2.5">
        {eyebrow ? <p className="label-mono">{eyebrow}</p> : null}
        <h2 id={id} className="h2 text-text">
          {title}
        </h2>
      </div>
      {linkLabel && linkHref ? (
        <TextLink href={linkHref}>{linkLabel}</TextLink>
      ) : null}
    </div>
  );
}
