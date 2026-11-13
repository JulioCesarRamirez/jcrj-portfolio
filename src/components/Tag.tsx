import type { ReactNode } from "react";

export type TagVariant = "outline" | "filled" | "accent";

interface Props {
  children: ReactNode;
  variant?: TagVariant;
}

const variants: Record<TagVariant, string> = {
  outline: "border-border text-soft",
  filled: "border-transparent bg-fill text-muted",
  accent: "border-accent text-accent",
};

export function Tag({ children, variant = "outline" }: Props) {
  return (
    <span
      className={`rounded-tag inline-block border px-2 py-0.5 font-mono text-xs ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
