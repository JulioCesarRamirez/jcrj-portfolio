import type { ComponentType } from "react";
import { BeekNativePlayer } from "./BeekNativePlayer";
import { CmsDrivenAngular } from "./CmsDrivenAngular";
import { DualExperienceSync } from "./DualExperienceSync";
import { HostTurboModules } from "./HostTurboModules";
import { RenderProfile } from "./RenderProfile";
import { SparknightAggregation } from "./SparknightAggregation";
import type { DiagramKey } from "./keys";
import type { DiagramProps } from "./types";

export { DIAGRAM_KEYS, DIAGRAM_LABELS, isDiagramKey } from "./keys";
export type { DiagramKey } from "./keys";

/** Registry of hand-authored diagrams. A case study picks one by key. */
export const diagrams: Record<DiagramKey, ComponentType<DiagramProps>> = {
  "host-turbomodules": HostTurboModules,
  "dual-experience-sync": DualExperienceSync,
  "render-profile": RenderProfile,
  "sparknight-aggregation": SparknightAggregation,
  "beek-native-player": BeekNativePlayer,
  "cms-driven-angular": CmsDrivenAngular,
};
