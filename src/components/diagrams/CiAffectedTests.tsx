import { Arrow, Box, Label } from "./primitives";
import type { DiagramProps } from "./types";

export function CiAffectedTests({ className }: DiagramProps) {
  return (
    <svg
      role="img"
      aria-label="Before: barrel-alias imports make every test load whole folders, so the full suite runs for hours. After: direct imports, a dependency lookup on changed files, and only the affected tests run, in minutes"
      viewBox="0 0 240 100"
      className={className}
      fill="none"
    >
      <Label x={1} y={9}>
        Before
      </Label>
      <Box x={1} y={13} w={70} h={30} lines={["Barrel alias", "imports"]} />
      <Arrow x1={71} y1={28} x2={85} y2={28} />
      <Box x={85} y={13} w={70} h={30} lines={["Whole folder", "per test"]} />
      <Arrow x1={155} y1={28} x2={169} y2={28} />
      <Box x={169} y={13} w={70} h={30} lines={["Full suite", "3–4 h"]} />
      <Label x={1} y={57}>
        After
      </Label>
      <Box x={1} y={61} w={70} h={30} lines={["Changed", "files"]} />
      <Arrow x1={71} y1={76} x2={85} y2={76} />
      <Box x={85} y={61} w={70} h={30} lines={["Dependency", "lookup"]} />
      <Arrow x1={155} y1={76} x2={169} y2={76} />
      <Box
        x={169}
        y={61}
        w={70}
        h={30}
        lines={["Affected tests", "5–30 min"]}
        stroke="var(--accent)"
      />
    </svg>
  );
}
