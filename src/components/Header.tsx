import Link from "next/link";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

interface Props {
  name: string;
  nav: readonly { label: string; href: string }[];
  contactLabel: string;
  resume?: { label: string; href: string } | null;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function Header({ name, nav, contactLabel, resume = null }: Props) {
  return (
    <header className="border-divider bg-header sticky top-0 z-40 border-b backdrop-blur-[8px]">
      <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 sm:py-4">
        <Link href="/" className="text-text flex min-h-11 items-center gap-3">
          <span
            aria-hidden="true"
            className="border-border-strong flex h-8 w-8 items-center justify-center rounded-[8px] border font-mono text-[13px] font-medium"
          >
            {initials(name)}
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.01em]">
            {name}
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-x-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-text inline-flex min-h-11 items-center text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {resume ? (
            <a
              href={resume.href}
              download=""
              className="text-muted hover:text-text inline-flex min-h-11 items-center text-sm"
            >
              {resume.label}
            </a>
          ) : null}
          <Link
            href="/#contact"
            className="border-border-strong text-text hover:border-line2 hover:text-strong inline-flex min-h-11 items-center rounded-[10px] border px-4 text-sm font-medium"
          >
            {contactLabel}
          </Link>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
