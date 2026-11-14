import { contactTarget, trackAttrs } from "@/lib/analytics";
import { Container } from "./Container";

function footerTrack(url: string) {
  const target = contactTarget(url);
  return target ? trackAttrs("contact_click", { target }) : {};
}

interface Props {
  name: string;
  email: string;
  links: readonly { label: string; url: string }[];
  privacyNote?: string;
  year?: number;
}

export function Footer({
  name,
  email,
  links,
  privacyNote = "",
  year = new Date().getFullYear(),
}: Props) {
  const all = email
    ? [...links, { label: "Email", url: `mailto:${email}` }]
    : links;
  return (
    <footer className="border-divider border-t">
      <Container className="text-subtle flex flex-wrap justify-between gap-4 py-7 text-[13px]">
        <p className="py-3">
          © {year} {name}
        </p>
        {all.length > 0 ? (
          <ul className="flex flex-wrap gap-x-6">
            {all.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  {...footerTrack(link.url)}
                  className="text-muted hover:text-text inline-flex min-h-11 min-w-11 items-center"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
      {privacyNote ? (
        <Container className="pb-7">
          <p className="text-subtle max-w-[640px] text-[13px] leading-relaxed">
            {privacyNote}
          </p>
        </Container>
      ) : null}
    </footer>
  );
}
