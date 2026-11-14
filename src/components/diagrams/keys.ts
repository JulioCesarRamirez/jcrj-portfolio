/**
 * Diagram keys live apart from the React components so `keystatic.config.ts`
 * can build its select options without pulling SVG components into the admin bundle.
 */
export const DIAGRAM_KEYS = [
  "host-turbomodules",
  "dual-experience-sync",
  "render-profile",
  "sparknight-aggregation",
  "beek-native-player",
  "cms-driven-angular",
  "sharetown-native-plugins",
  "dell-prefetch",
  "editor-microfrontends",
  "ci-affected-tests",
] as const;

export type DiagramKey = (typeof DIAGRAM_KEYS)[number];

export const DIAGRAM_LABELS: Record<DiagramKey, string> = {
  "host-turbomodules": "Host app composing modules over a typed native layer",
  "dual-experience-sync": "Two experiences kept in sync through shared state",
  "render-profile": "Cold-start commit timeline with no-op and heavy commits",
  "sparknight-aggregation":
    "App, GraphQL API, location-keyed cache and data providers",
  "beek-native-player": "Shared React Native modules over native audio players",
  "cms-driven-angular":
    "Content manager driving an Angular app through a component API",
  "sharetown-native-plugins":
    "Hybrid app calling custom native plugins on Android and iOS",
  "dell-prefetch":
    "Predicted navigation, lean GraphQL prefetch, cache and memoized components",
  "editor-microfrontends":
    "Host editor and reconciliation layer over server-side-rendered micro-frontends",
  "ci-affected-tests":
    "CI before and after: barrel imports versus affected tests only",
};

export function isDiagramKey(value: unknown): value is DiagramKey {
  return (DIAGRAM_KEYS as readonly unknown[]).includes(value);
}
