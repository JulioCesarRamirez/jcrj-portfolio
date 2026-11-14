import type { Metadata } from "next";

/** Canonical and Open Graph URL for a page path, resolved against `metadataBase`. */
export function pageUrls(
  path: string,
): Pick<Metadata, "alternates" | "openGraph"> {
  return {
    alternates: { canonical: path },
    openGraph: { type: "website", url: path },
  };
}
