"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/** Disclosure menu for small screens. Closes on navigation and on Escape. */
export function MobileMenu({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details
      ref={ref}
      className="group md:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape" && ref.current?.open) {
          ref.current.open = false;
          ref.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary className="border-border-strong text-text hover:border-line2 inline-flex h-11 min-w-11 cursor-pointer list-none items-center justify-center gap-2 rounded-[10px] border px-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
        {label}
      </summary>
      <div className="border-divider bg-bg absolute inset-x-0 top-full border-b px-4 pb-4">
        {children}
      </div>
    </details>
  );
}
