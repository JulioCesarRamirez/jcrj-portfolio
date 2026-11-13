const common = {
  "aria-hidden": true,
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ArrowRightIcon() {
  return (
    <svg {...common}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg {...common}>
      <path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
    </svg>
  );
}
