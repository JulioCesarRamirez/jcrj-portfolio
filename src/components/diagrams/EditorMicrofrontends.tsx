import { Arrow, Box, Label } from "./primitives";
import type { DiagramProps } from "./types";

export function EditorMicrofrontends({ className }: DiagramProps) {
  return (
    <svg
      role="img"
      aria-label="A host editor sends content through a reconciliation layer to server-side-rendered micro-frontends. The legacy editor moved from Module Federation to micro-frontends"
      viewBox="0 0 240 100"
      className={className}
      fill="none"
    >
      <Box x={1} y={14} w={56} h={52} lines={["Host", "editor"]} />
      <Arrow x1={57} y1={40} x2={76} y2={40} />
      <Box
        x={76}
        y={14}
        w={62}
        h={52}
        lines={["Reconciliation", "layer"]}
        stroke="var(--accent)"
      />
      <Arrow x1={138} y1={40} x2={156} y2={40} />
      <rect
        x="156"
        y="4"
        width="83"
        height="72"
        rx="6"
        stroke="var(--border-strong)"
      />
      <Label x={197} y={17} anchor="middle">
        SSR micro-
      </Label>
      <Label x={197} y={27} anchor="middle">
        frontends
      </Label>
      <rect x="164" y="35" width="67" height="10" rx="3" fill="var(--fill)" />
      <rect x="164" y="49" width="67" height="10" rx="3" fill="var(--fill)" />
      <rect x="164" y="63" width="67" height="8" rx="3" fill="var(--fill)" />
      <path d="M1 82h238" stroke="var(--divider)" />
      <Label x={1} y={95}>
        Legacy: Module Federation → micro-frontends
      </Label>
    </svg>
  );
}
