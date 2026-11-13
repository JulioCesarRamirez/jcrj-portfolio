import type { DiagramProps } from "./types";

const mono = "var(--font-geist-mono), monospace";

export function SparknightAggregation({ className }: DiagramProps) {
  const providers = ["Maps", "Foursquare", "Ticketmaster"];
  return (
    <svg
      role="img"
      aria-label="A Next.js app calls a GraphQL API, which reads a location-keyed cache (Redis, with PostgreSQL behind it). The cache is refreshed weekly from three data providers: Maps, Foursquare and Ticketmaster."
      viewBox="0 0 240 100"
      className={className}
      fill="none"
    >
      <rect
        x="1"
        y="34"
        width="44"
        height="32"
        rx="6"
        stroke="var(--border-strong)"
      />
      <text
        x="23"
        y="54"
        textAnchor="middle"
        fontSize="8"
        fontFamily={mono}
        fill="var(--soft)"
      >
        Next.js
      </text>
      <path d="M45 50h8" stroke="var(--line)" />
      <rect
        x="53"
        y="34"
        width="44"
        height="32"
        rx="6"
        stroke="var(--border-strong)"
      />
      <text
        x="75"
        y="48"
        textAnchor="middle"
        fontSize="8"
        fontFamily={mono}
        fill="var(--soft)"
      >
        GraphQL
      </text>
      <text
        x="75"
        y="58"
        textAnchor="middle"
        fontSize="8"
        fontFamily={mono}
        fill="var(--subtle)"
      >
        Node API
      </text>
      <path d="M97 50h8" stroke="var(--line)" />
      <rect
        x="105"
        y="14"
        width="52"
        height="72"
        rx="6"
        stroke="var(--accent)"
      />
      <text
        x="131"
        y="28"
        textAnchor="middle"
        fontSize="7"
        fontFamily={mono}
        fill="var(--subtle)"
      >
        by location
      </text>
      <rect x="111" y="34" width="40" height="18" rx="4" fill="var(--fill)" />
      <text
        x="131"
        y="46"
        textAnchor="middle"
        fontSize="8"
        fontFamily={mono}
        fill="var(--soft)"
      >
        Redis
      </text>
      <rect x="111" y="58" width="40" height="22" rx="4" fill="var(--fill)" />
      <text
        x="131"
        y="72"
        textAnchor="middle"
        fontSize="7"
        fontFamily={mono}
        fill="var(--soft)"
      >
        Postgres
      </text>
      <path d="M157 50h18" stroke="var(--line)" strokeDasharray="3 2" />
      <path d="M172 47l4 3-4 3" stroke="var(--line)" />
      <text
        x="166"
        y="42"
        textAnchor="middle"
        fontSize="7"
        fontFamily={mono}
        fill="var(--subtle)"
      >
        weekly
      </text>
      {providers.map((name, i) => (
        <g key={name}>
          <rect
            x="178"
            y={12 + i * 26}
            width="61"
            height="22"
            rx="5"
            stroke="var(--border-strong)"
          />
          <text
            x="208.5"
            y={26 + i * 26}
            textAnchor="middle"
            fontSize="8"
            fontFamily={mono}
            fill="var(--soft)"
          >
            {name}
          </text>
        </g>
      ))}
    </svg>
  );
}
