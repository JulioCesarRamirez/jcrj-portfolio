import type { DiagramProps } from "./types";

const mono = "var(--font-geist-mono), monospace";

export function BeekNativePlayer({ className }: DiagramProps) {
  return (
    <svg
      role="img"
      aria-label="Separate iOS and Android host apps load shared React Native feature modules, which call a TurboModule interface over native audio players: Swift on iOS and Kotlin on Android"
      viewBox="0 0 240 100"
      className={className}
      fill="none"
    >
      {["iOS host", "Android host"].map((label, i) => (
        <g key={label}>
          <rect
            x={1 + i * 121}
            y="2"
            width="118"
            height="16"
            rx="5"
            stroke="var(--border-strong)"
          />
          <text
            x={60 + i * 121}
            y="13"
            textAnchor="middle"
            fontSize="8"
            fontFamily={mono}
            fill="var(--soft)"
          >
            {label}
          </text>
        </g>
      ))}
      <rect
        x="1"
        y="24"
        width="238"
        height="16"
        rx="5"
        stroke="var(--border-strong)"
      />
      <text
        x="120"
        y="35"
        textAnchor="middle"
        fontSize="8"
        fontFamily={mono}
        fill="var(--soft)"
      >
        Shared React Native feature modules
      </text>
      <rect
        x="1"
        y="46"
        width="238"
        height="16"
        rx="5"
        stroke="var(--accent)"
      />
      <text
        x="120"
        y="57"
        textAnchor="middle"
        fontSize="8"
        fontFamily={mono}
        fill="var(--soft)"
      >
        TurboModule interface
      </text>
      {[
        ["Swift · iOS player", 1],
        ["Kotlin · Android player", 122],
      ].map(([label, x]) => (
        <g key={label as string}>
          <rect
            x={x as number}
            y="68"
            width="117"
            height="28"
            rx="5"
            fill="var(--fill)"
          />
          <text
            x={(x as number) + 58.5}
            y="79"
            textAnchor="middle"
            fontSize="8"
            fontFamily={mono}
            fill="var(--soft)"
          >
            {label as string}
          </text>
          <text
            x={(x as number) + 58.5}
            y="90"
            textAnchor="middle"
            fontSize="6.5"
            fontFamily={mono}
            fill="var(--subtle)"
          >
            play · seek · lock screen
          </text>
        </g>
      ))}
    </svg>
  );
}
