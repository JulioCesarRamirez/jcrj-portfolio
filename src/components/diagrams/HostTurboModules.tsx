import type { DiagramProps } from "./types";

const mono = "var(--font-geist-mono), monospace";

export function HostTurboModules({ className }: DiagramProps) {
  return (
    <svg
      role="img"
      aria-label="A host app on top, four team-owned feature modules beneath it, and one shared typed TurboModule layer over JSI at the bottom that all modules call"
      viewBox="0 0 240 100"
      className={className}
      fill="none"
    >
      <rect x="1" y="2" width="238" height="22" rx="6" stroke="var(--accent)" />
      <text
        x="120"
        y="17"
        textAnchor="middle"
        fontSize="10"
        fontFamily={mono}
        fill="var(--soft)"
      >
        Host app
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={1 + i * 60.5}
            y="32"
            width="56.5"
            height="24"
            rx="6"
            stroke="var(--border-strong)"
          />
          <text
            x={1 + i * 60.5 + 28.25}
            y="48"
            textAnchor="middle"
            fontSize="8"
            fontFamily={mono}
            fill="var(--subtle)"
          >
            Team module
          </text>
          <path d={`M${1 + i * 60.5 + 28.25} 56V68`} stroke="var(--line)" />
        </g>
      ))}
      <rect x="1" y="68" width="238" height="28" rx="6" fill="var(--fill)" />
      <text
        x="120"
        y="86"
        textAnchor="middle"
        fontSize="10"
        fontFamily={mono}
        fill="var(--subtle)"
      >
        Shared typed TurboModule layer · JSI
      </text>
    </svg>
  );
}
