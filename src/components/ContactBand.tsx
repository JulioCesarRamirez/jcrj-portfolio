import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { DownloadIcon } from "./Icons";

interface Props {
  heading: string;
  text: string;
  email: string;
  resume: { label: string; href: string } | null;
}

export function ContactBand({ heading, text, email, resume }: Props) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-8 pb-24"
    >
      <Container>
        <div className="border-border bg-surface flex flex-wrap items-center justify-between gap-6 rounded-[20px] border p-8 sm:p-12">
          <div className="flex max-w-[620px] flex-col gap-2.5">
            <h2
              id="contact-heading"
              className="text-text text-[32px] leading-tight font-semibold tracking-[-0.025em]"
            >
              {heading}
            </h2>
            <p className="text-muted text-base leading-[1.6]">{text}</p>
            <div className="flex flex-wrap gap-3 pt-4">
              {email ? (
                <ButtonLink href={`mailto:${email}`}>{email}</ButtonLink>
              ) : null}
              {resume ? (
                <ButtonLink href={resume.href} variant="secondary" download>
                  <DownloadIcon />
                  {resume.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
