import type { Variant } from "./location";

/** Every custom event and the only properties it may carry. No personal data, ever. */
export interface EventMap {
  resume_download: { variant: Variant };
  start_project_click: undefined;
  contact_click: { target: "email" | "linkedin" | "github" };
  case_study_view: { slug: string };
  theme_toggle: { theme: "light" | "dark" };
}

export type EventName = keyof EventMap;

const EVENT_NAMES: readonly EventName[] = [
  "resume_download",
  "start_project_click",
  "contact_click",
  "case_study_view",
  "theme_toggle",
];

export function isEventName(value: unknown): value is EventName {
  return (EVENT_NAMES as readonly unknown[]).includes(value);
}

type Attrs = { "data-track": EventName; "data-track-props"?: string };

/** Data attributes that make a click on an element record `name`. Read by `AnalyticsRoot`. */
export function trackAttrs<N extends EventName>(
  name: N,
  ...props: EventMap[N] extends undefined ? [] : [EventMap[N]]
): Attrs {
  return props[0]
    ? { "data-track": name, "data-track-props": JSON.stringify(props[0]) }
    : { "data-track": name };
}

/** Data attributes that record `name` when the page loads. */
export function viewAttrs<N extends "case_study_view">(
  name: N,
  props: EventMap[N],
) {
  return {
    "data-track-view": name,
    "data-track-props": JSON.stringify(props),
  };
}

/** Parses props from a data attribute, keeping only short string values. */
export function parseProps(raw: string | null | undefined) {
  if (!raw) return undefined;
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null) return undefined;
    const props: Record<string, string> = {};
    for (const [key, item] of Object.entries(value)) {
      if (typeof item === "string" && item.length <= 100) props[key] = item;
    }
    return props;
  } catch {
    return undefined;
  }
}

const OPT_OUT_KEY = "notrack";

/** `/?notrack=1` stops recording this browser, `/?notrack=0` resumes. */
export function applyNotrackParam(search: string, storage: Storage): void {
  const value = new URLSearchParams(search).get("notrack");
  try {
    if (value === "1") storage.setItem(OPT_OUT_KEY, "1");
    else if (value === "0") storage.removeItem(OPT_OUT_KEY);
  } catch {}
}

export function isOptedOut(storage: Storage): boolean {
  try {
    return storage.getItem(OPT_OUT_KEY) === "1";
  } catch {
    return false;
  }
}

/** Drops the query string and hash, so nothing a visitor typed into a URL is recorded. */
export function stripUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return url.split(/[?#]/)[0] ?? url;
  }
}

/** Which contact link was clicked, from its URL. Other links are not tracked. */
export function contactTarget(
  url: string,
): EventMap["contact_click"]["target"] | null {
  if (url.startsWith("mailto:")) return "email";
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === "github.com") return "github";
    if (host === "linkedin.com") return "linkedin";
  } catch {}
  return null;
}

/** Analytics runs only on Vercel production builds. */
export const analyticsEnabled = process.env["VERCEL_ENV"] === "production";
