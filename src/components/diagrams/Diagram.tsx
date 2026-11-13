import { diagrams, isDiagramKey } from "./index";
import type { DiagramProps } from "./types";

interface Props extends DiagramProps {
  diagramKey: string | null | undefined;
}

export function Diagram({ diagramKey, className }: Props) {
  if (!isDiagramKey(diagramKey)) return null;
  const Component = diagrams[diagramKey];
  return <Component className={className} />;
}
