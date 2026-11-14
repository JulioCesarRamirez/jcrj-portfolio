const mono = "var(--font-geist-mono), monospace";

interface BoxProps {
  x: number;
  y: number;
  w: number;
  h: number;
  lines: readonly string[];
  stroke?: string;
  tone?: "soft" | "subtle";
}

/** Rounded box with centered mono label lines. */
export function Box({
  x,
  y,
  w,
  h,
  lines,
  stroke = "var(--border-strong)",
  tone = "soft",
}: BoxProps) {
  const first = y + h / 2 - ((lines.length - 1) * 11) / 2 + 3;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" stroke={stroke} />
      {lines.map((line, i) => (
        <text
          key={line}
          x={x + w / 2}
          y={first + i * 11}
          textAnchor="middle"
          fontSize="8"
          fontFamily={mono}
          fill={`var(--${tone})`}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** Small label text. */
export function Label({
  x,
  y,
  children,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize="8"
      fontFamily={mono}
      fill="var(--subtle)"
    >
      {children}
    </text>
  );
}

/** Straight arrow; the head follows the line direction. */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  const dx = Math.sign(x2 - x1);
  const dy = Math.sign(y2 - y1);
  const head =
    dx !== 0
      ? `M${x2 - 4 * dx} ${y2 - 3}l${4 * dx} 3-${4 * dx} 3`
      : `M${x2 - 3} ${y2 - 4 * dy}l3 ${4 * dy} 3-${4 * dy}`;
  return (
    <g stroke="var(--line)">
      <path d={`M${x1} ${y1}L${x2} ${y2}`} />
      <path d={head} />
    </g>
  );
}
