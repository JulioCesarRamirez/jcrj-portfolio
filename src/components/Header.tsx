import Link from "next/link";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
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

const linkClass =
  "text-muted hover:text-text inline-flex min-h-11 min-w-11 items-center text-sm";

export function Header({ name, nav, contactLabel, resume = null }: Props) {
  return (
    <header className="border-divider bg-header sticky top-0 z-40 border-b backdrop-blur-[8px]">
      <Container className="relative flex items-center justify-between gap-x-4 py-3 sm:py-4">
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
        <div className="flex items-center gap-3 md:gap-x-6">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-x-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
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
              className={`${linkClass} hidden md:inline-flex`}
            >
              {resume.label}
            </a>
          ) : null}
          <Link
            href="/#contact"
            className="border-border-strong text-text hover:border-line2 hover:text-strong hidden min-h-11 items-center rounded-[10px] border px-4 text-sm font-medium md:inline-flex"
          >
            {contactLabel}
          </Link>
          <ThemeToggle />
          <MobileMenu label="Menu">
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={`${linkClass} w-full`}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                {resume ? (
                  <li>
                    <a
                      href={resume.href}
                      download=""
                      className={`${linkClass} w-full`}
                    >
                      {resume.label}
                    </a>
                  </li>
                ) : null}
                <li>
                  <Link href="/#contact" className={`${linkClass} w-full`}>
                    {contactLabel}
                  </Link>
                </li>
              </ul>
            </nav>
          </MobileMenu>
        </div>
      </Container>
    </header>
  );
}
