import type { DiagramProps } from "./types";

const mono = "var(--font-geist-mono), monospace";

export function DualExperienceSync({ className }: DiagramProps) {
  return (
    <svg
      role="img"
      aria-label="Classic search and AI search side by side, both reading and writing one shared state: URL, query ID, prompts and product grid"
      viewBox="0 0 240 100"
      className={className}
      fill="none"
    >
      <rect
        x="1"
        y="4"
        width="92"
        height="30"
        rx="8"
        stroke="var(--border-strong)"
      />
      <text
        x="47"
        y="23"
        textAnchor="middle"
        fontSize="10"
        fontFamily={mono}
        fill="var(--soft)"
      >
        Classic
      </text>
      <rect
        x="147"
        y="4"
        width="92"
        height="30"
        rx="8"
        stroke="var(--border-strong)"
      />
      <text
        x="193"
        y="23"
        textAnchor="middle"
        fontSize="10"
        fontFamily={mono}
        fill="var(--soft)"
      >
        AI search
      </text>
      <path d="M93 19h54" stroke="var(--line)" strokeDasharray="3 3" />
      <path d="M47 34v30M193 34v30" stroke="var(--line)" />
      <rect
        x="1"
        y="64"
        width="238"
        height="32"
        rx="8"
        stroke="var(--accent)"
      />
      <text
        x="120"
        y="84"
        textAnchor="middle"
        fontSize="10"
        fontFamily={mono}
        fill="var(--soft)"
      >
        URL · query ID · prompts · grid
      </text>
    </svg>
  );
}
