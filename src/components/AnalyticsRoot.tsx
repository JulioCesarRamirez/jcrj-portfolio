"use client";

import { Analytics } from "@vercel/analytics/next";
import { track } from "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  applyNotrackParam,
  isEventName,
  isOptedOut,
  parseProps,
  stripUrl,
} from "@/lib/analytics";

function send(name: string, raw: string | null | undefined) {
  if (!isEventName(name) || isOptedOut(localStorage)) return;
  track(name, parseProps(raw));
}

/**
 * Cookieless Vercel Web Analytics and Speed Insights, mounted on production only.
 * Custom events come from `data-track` attributes (see `trackAttrs`), so components
 * never call the analytics library themselves.
 */
export function AnalyticsRoot() {
  const pathname = usePathname();

  useEffect(() => {
    applyNotrackParam(location.search, localStorage);
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("[data-track]");
      if (element)
        send(element.dataset["track"] ?? "", element.dataset["trackProps"]);
      if (target.closest("[data-theme-toggle]")) {
        // The inline theme script flips data-theme during this click; read it after.
        setTimeout(() => {
          const theme = document.documentElement.dataset["theme"];
          if (theme === "light" || theme === "dark")
            send("theme_toggle", JSON.stringify({ theme }));
        }, 0);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const view = document.querySelector<HTMLElement>("[data-track-view]");
    if (view) send(view.dataset["trackView"] ?? "", view.dataset["trackProps"]);
  }, [pathname]);

  return (
    <>
      <Analytics
        beforeSend={(event) =>
          isOptedOut(localStorage)
            ? null
            : { ...event, url: stripUrl(event.url) }
        }
      />
      <SpeedInsights
        beforeSend={(event) =>
          isOptedOut(localStorage)
            ? null
            : { ...event, url: stripUrl(event.url) }
        }
      />
    </>
  );
}
