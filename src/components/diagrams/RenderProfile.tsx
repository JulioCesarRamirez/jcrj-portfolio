import type { DiagramProps } from "./types";

type Commit = "normal" | "noop" | "heavy";

// A cold-start commit timeline: most commits are small, some change nothing, two dominate.
const COMMITS: readonly { kind: Commit; height: number }[] = [
  { kind: "normal", height: 16 },
  { kind: "noop", height: 12 },
  { kind: "normal", height: 22 },
  { kind: "heavy", height: 62 },
  { kind: "noop", height: 12 },
  { kind: "normal", height: 18 },
  { kind: "normal", height: 26 },
  { kind: "noop", height: 12 },
  { kind: "heavy", height: 48 },
  { kind: "normal", height: 20 },
  { kind: "noop", height: 12 },
  { kind: "normal", height: 14 },
];

export function RenderProfile({ className }: DiagramProps) {
  const base = 88;
  return (
    <svg
      role="img"
      aria-label="A commit timeline: most bars are short, several are empty no-op commits shown dashed, and two tall bars in the accent color dominate render time"
      viewBox="0 0 240 100"
      className={className}
      fill="none"
    >
      <path d={`M0 ${base + 0.5}H240`} stroke="var(--border-strong)" />
      {COMMITS.map(({ kind, height }, i) => {
        const x = 4 + i * 19.5;
        const y = base - height;
        if (kind === "noop") {
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="14"
              height={height}
              rx="3"
              stroke="var(--line)"
              strokeDasharray="3 2"
            />
          );
        }
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="14"
            height={height}
            rx="3"
            fill={kind === "heavy" ? "var(--accent)" : "var(--line)"}
          />
        );
      })}
    </svg>
  );
}
