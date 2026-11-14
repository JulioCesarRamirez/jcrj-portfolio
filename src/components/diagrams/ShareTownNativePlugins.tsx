import { Arrow, Box } from "./primitives";
import type { DiagramProps } from "./types";

export function ShareTownNativePlugins({ className }: DiagramProps) {
  return (
    <svg
      role="img"
      aria-label="An Ionic and Angular app calls a custom plugin bridge, which reaches native Android code in Java for GPS tracking and native iOS code in Swift, with barcode and camera plugins on both"
      viewBox="0 0 240 100"
      className={className}
      fill="none"
    >
      <Box x={1} y={30} w={58} h={40} lines={["Ionic /", "Angular", "app"]} />
      <Arrow x1={59} y1={50} x2={80} y2={50} />
      <Box
        x={80}
        y={30}
        w={52}
        h={40}
        lines={["Custom", "plugin", "bridge"]}
        stroke="var(--accent)"
      />
      <Arrow x1={132} y1={50} x2={150} y2={26} />
      <Arrow x1={132} y1={50} x2={150} y2={74} />
      <Box
        x={150}
        y={8}
        w={89}
        h={36}
        lines={["Android · Java", "GPS · barcode"]}
      />
      <Box
        x={150}
        y={56}
        w={89}
        h={36}
        lines={["iOS · Swift", "camera · barcode"]}
      />
    </svg>
  );
}
