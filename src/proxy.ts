import { NextResponse, type NextRequest } from "next/server";
import mexicoCountries from "@/lib/generated/mexico-countries.json";
import { LOC_COOKIE, LOC_COOKIE_MAX_AGE, resolveVariant } from "@/lib/location";

/**
 * Picks a location variant per request and rewrites to its prerendered page, so the
 * public URL never changes and each variant is a separate static page (no client JS,
 * no flash of the wrong city). The country comes from Vercel's `x-vercel-ip-country`
 * header; locally there is none, so the default variant is served.
 */
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // The variant segment is internal: never reachable, indexable or shareable.
  if (pathname === "/v" || pathname.startsWith("/v/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/v(\/[^/]+)?/, "") || "/";
    url.search = "";
    return NextResponse.redirect(url, 308);
  }

  const { variant, source, cookie } = resolveVariant({
    userAgent: request.headers.get("user-agent"),
    query: searchParams.get("loc"),
    cookie: request.cookies.get(LOC_COOKIE)?.value,
    country: request.headers.get("x-vercel-ip-country"),
    mexicoCountries,
  });

  const target = request.nextUrl.clone();
  target.pathname = `/v/${variant}${pathname === "/" ? "" : pathname}`;
  target.searchParams.delete("loc");

  const response = NextResponse.rewrite(target);
  if (cookie === "clear") response.cookies.delete(LOC_COOKIE);
  else if (cookie)
    response.cookies.set(LOC_COOKIE, cookie.set, {
      maxAge: LOC_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
  // Each variant is its own cache entry; these tell browsers and shared caches why.
  response.headers.set("Vary", "x-vercel-ip-country, Cookie");
  response.headers.set("x-loc-variant", variant);
  response.headers.set("x-loc-source", source);
  return response;
}

export const config = {
  // Not the admin, API, Next internals, crawler files, résumé PDFs or any file with an extension.
  matcher: [
    "/((?!keystatic|api|_next|resume|robots\\.txt|sitemap\\.xml|.*\\..*).*)",
  ],
};
