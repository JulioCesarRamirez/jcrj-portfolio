import { Arrow, Box } from "./primitives";
import type { DiagramProps } from "./types";

export function DellPrefetch({ className }: DiagramProps) {
  return (
    <svg
      role="img"
      aria-label="User navigation predicts the next page, which is prefetched with lean GraphQL queries into a client cache and rendered by memoized components"
      viewBox="0 0 240 100"
      className={className}
      fill="none"
    >
      <Box x={1} y={8} w={66} h={32} lines={["User", "navigation"]} />
      <Arrow x1={67} y1={24} x2={85} y2={24} />
      <Box x={85} y={8} w={66} h={32} lines={["Predicted", "next page"]} />
      <Arrow x1={151} y1={24} x2={169} y2={24} />
      <Box
        x={169}
        y={8}
        w={70}
        h={32}
        lines={["Lean GraphQL", "prefetch"]}
        stroke="var(--accent)"
      />
      <Arrow x1={204} y1={40} x2={204} y2={60} />
      <Box x={169} y={60} w={70} h={32} lines={["Client", "cache"]} />
      <Arrow x1={169} y1={76} x2={151} y2={76} />
      <Box x={85} y={60} w={66} h={32} lines={["Memoized", "components"]} />
    </svg>
  );
}
