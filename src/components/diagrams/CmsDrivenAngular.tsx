import type { DiagramProps } from "./types";

const mono = "var(--font-geist-mono), monospace";

export function CmsDrivenAngular({ className }: DiagramProps) {
  return (
    <svg
      role="img"
      aria-label="A content manager defines components, sends them through a component API, and an Angular app renders them dynamically as real components"
      viewBox="0 0 240 100"
      className={className}
      fill="none"
    >
      <rect
        x="1"
        y="26"
        width="62"
        height="48"
        rx="6"
        stroke="var(--border-strong)"
      />
      <text
        x="32"
        y="48"
        textAnchor="middle"
        fontSize="8"
        fontFamily={mono}
        fill="var(--soft)"
      >
        Content
      </text>
      <text
        x="32"
        y="59"
        textAnchor="middle"
        fontSize="8"
        fontFamily={mono}
        fill="var(--soft)"
      >
        manager
      </text>
      <path d="M63 50h14" stroke="var(--line)" />
      <path d="M74 47l4 3-4 3" stroke="var(--line)" />
      <rect
        x="78"
        y="34"
        width="46"
        height="32"
        rx="6"
        stroke="var(--accent)"
      />
      <text
        x="101"
        y="53"
        textAnchor="middle"
        fontSize="8"
        fontFamily={mono}
        fill="var(--soft)"
      >
        Component API
      </text>
      <path d="M124 50h14" stroke="var(--line)" />
      <path d="M135 47l4 3-4 3" stroke="var(--line)" />
      <rect
        x="139"
        y="8"
        width="100"
        height="84"
        rx="6"
        stroke="var(--border-strong)"
      />
      <text
        x="189"
        y="22"
        textAnchor="middle"
        fontSize="8"
        fontFamily={mono}
        fill="var(--subtle)"
      >
        Angular app
      </text>
      <rect x="147" y="30" width="84" height="14" rx="4" fill="var(--fill)" />
      <rect x="147" y="50" width="38" height="14" rx="4" fill="var(--fill)" />
      <rect x="191" y="50" width="40" height="14" rx="4" fill="var(--fill)" />
      <rect x="147" y="70" width="84" height="14" rx="4" fill="var(--fill)" />
    </svg>
  );
}
