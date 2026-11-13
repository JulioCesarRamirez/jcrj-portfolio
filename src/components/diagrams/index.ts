import type { ComponentType } from "react";
import { DualExperienceSync } from "./DualExperienceSync";
import { HostTurboModules } from "./HostTurboModules";
import { RenderProfile } from "./RenderProfile";
import type { DiagramKey } from "./keys";
import type { DiagramProps } from "./types";

export { DIAGRAM_KEYS, DIAGRAM_LABELS, isDiagramKey } from "./keys";
export type { DiagramKey } from "./keys";

/** Registry of hand-authored diagrams. A case study picks one by key. */
export const diagrams: Record<DiagramKey, ComponentType<DiagramProps>> = {
  "host-turbomodules": HostTurboModules,
  "dual-experience-sync": DualExperienceSync,
  "render-profile": RenderProfile,
};
