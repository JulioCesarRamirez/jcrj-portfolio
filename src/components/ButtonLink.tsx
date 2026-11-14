import Link from "next/link";
import type { ReactNode } from "react";
import type { trackAttrs } from "@/lib/analytics";
import { RESUME_ARIA_LABEL, RESUME_FILENAME } from "@/lib/resume";

export type ButtonVariant = "primary" | "secondary";

interface Props {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  /** Marks the résumé file link so the browser saves it instead of navigating. */
  download?: boolean;
  /** Records a custom event on click; see `trackAttrs`. */
  track?: ReturnType<typeof trackAttrs>;
}

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] border px-[22px] text-[15px]";
const variants: Record<ButtonVariant, string> = {
  primary:
    "border-text bg-text text-bg font-semibold hover:bg-strong hover:border-strong",
  secondary:
    "border-border-strong text-text font-medium hover:border-line2 hover:text-strong",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  download,
  track,
}: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (href.startsWith("/") && !download) {
    return (
      <Link href={href} className={classes} {...track}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={classes}
      {...track}
      download={download ? RESUME_FILENAME : undefined}
      aria-label={download ? RESUME_ARIA_LABEL : undefined}
    >
      {children}
    </a>
  );
}
