import { Container } from "./Container";

interface Props {
  name: string;
  email: string;
  links: readonly { label: string; url: string }[];
  year?: number;
}

export function Footer({
  name,
  email,
  links,
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
                  className="text-muted hover:text-text inline-flex min-h-11 min-w-11 items-center"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </footer>
  );
}
