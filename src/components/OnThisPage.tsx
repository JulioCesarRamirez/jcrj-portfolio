import type { Heading } from "@/lib/markdoc";

interface Props {
  label: string;
  headings: readonly Heading[];
}

export function OnThisPage({ label, headings }: Props) {
  if (headings.length === 0) return null;
  return (
    <>
      <nav aria-label={label} className="sticky top-24 hidden lg:block">
        <p className="label-mono mb-4">{label}</p>
        <ul className="border-divider space-y-1 border-l">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className="text-muted hover:text-text hover:border-line -ml-px block border-l border-transparent py-1 pl-4 text-sm"
              >
                {h.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <details className="border-border bg-surface rounded-[12px] border lg:hidden">
        <summary className="text-text flex min-h-11 cursor-pointer items-center px-4 text-sm font-medium">
          {label}
        </summary>
        <nav aria-label={`${label} (menu)`} className="px-4 pb-2">
          <ul>
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className="text-muted hover:text-text flex min-h-11 items-center text-sm"
                >
                  {h.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </>
  );
}
