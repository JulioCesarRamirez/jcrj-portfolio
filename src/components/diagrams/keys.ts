/**
 * Diagram keys live apart from the React components so `keystatic.config.ts`
 * can build its select options without pulling SVG components into the admin bundle.
 */
export const DIAGRAM_KEYS = [
  "host-turbomodules",
  "dual-experience-sync",
  "render-profile",
] as const;

export type DiagramKey = (typeof DIAGRAM_KEYS)[number];

export const DIAGRAM_LABELS: Record<DiagramKey, string> = {
  "host-turbomodules": "Host app composing modules over a typed native layer",
  "dual-experience-sync": "Two experiences kept in sync through shared state",
  "render-profile": "Cold-start commit timeline with no-op and heavy commits",
};

export function isDiagramKey(value: unknown): value is DiagramKey {
  return (DIAGRAM_KEYS as readonly unknown[]).includes(value);
}
