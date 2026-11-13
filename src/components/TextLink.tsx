import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
}

const base =
  "text-accent inline-flex min-h-11 items-center text-sm hover:underline underline-offset-4";

export function TextLink({ href, children, className = "" }: Props) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={`${base} ${className}`} rel="noopener noreferrer">
      {children}
    </a>
  );
}
