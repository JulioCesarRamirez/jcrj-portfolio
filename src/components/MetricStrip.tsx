export interface Metric {
  value: string;
  label: string;
  note?: string;
  highlight?: boolean;
}

// Static class names so Tailwind can see them; the strip fills its row for 1 to 4 items.
const COLUMNS = [
  "",
  "lg:grid-cols-1",
  "sm:grid-cols-2 lg:grid-cols-2",
  "sm:grid-cols-3 lg:grid-cols-3",
  "sm:grid-cols-2 lg:grid-cols-4",
] as const;

interface Props {
  label: string;
  items: readonly Metric[];
}

/** Bordered strip of big mono numbers. One accent value at most. */
export function MetricStrip({ label, items }: Props) {
  if (items.length === 0) return null;
  return (
    <section aria-label={label}>
      <ul
        className={`border-border bg-border grid gap-px overflow-hidden rounded-[16px] border ${COLUMNS[Math.min(items.length, 4)]}`}
      >
        {items.map((item) => (
          <li
            key={`${item.value}-${item.label}`}
            className="bg-surface-alt flex flex-col gap-2 px-6 py-7"
          >
            <span
              className={`font-mono leading-none font-medium tracking-[-0.03em] ${
                item.value.length > 8 ? "text-[30px]" : "text-[40px]"
              } ${item.highlight ? "text-accent" : "text-text"}`}
            >
              {item.value}
            </span>
            <span className="text-muted text-sm">{item.label}</span>
            {item.note ? (
              <span className="text-subtle text-xs">{item.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
