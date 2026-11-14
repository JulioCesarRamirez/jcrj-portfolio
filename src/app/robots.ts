import type { MetadataRoute } from "next";
import { isIndexable } from "@/lib/indexing";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/keystatic", "/api/keystatic"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
