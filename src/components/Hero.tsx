import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { CurrentlyCard } from "./CurrentlyCard";
import { ArrowRightIcon, DownloadIcon } from "./Icons";

interface Props {
  eyebrow: string;
  headline: string;
  valueStatement: string;
  primaryCta: { label: string; href: string } | null;
  resume: { label: string; href: string } | null;
  locationLine: string;
  currently: React.ComponentProps<typeof CurrentlyCard>;
}

export function Hero({
  eyebrow,
  headline,
  valueStatement,
  primaryCta,
  resume,
  locationLine,
  currently,
}: Props) {
  return (
    <section className="pt-16 pb-12 sm:pt-28 sm:pb-[72px]">
      <Container className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
        <div className="flex flex-col gap-7">
          {eyebrow ? (
            <p className="text-muted flex items-center gap-2.5 font-mono text-xs tracking-[0.08em] uppercase">
              <span
                aria-hidden="true"
                className="bg-accent h-2 w-2 rounded-full"
              />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="display text-text max-w-[820px]">{headline}</h1>
          <p className="text-muted max-w-[640px] text-[19px] leading-[1.6]">
            {valueStatement}
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            {primaryCta ? (
              <ButtonLink href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRightIcon />
              </ButtonLink>
            ) : null}
            {resume ? (
              <ButtonLink href={resume.href} variant="secondary" download>
                <DownloadIcon />
                {resume.label}
              </ButtonLink>
            ) : null}
          </div>
          {locationLine ? (
            <p className="text-subtle font-mono text-[13px]">{locationLine}</p>
          ) : null}
        </div>
        <CurrentlyCard {...currently} />
      </Container>
    </section>
  );
}
