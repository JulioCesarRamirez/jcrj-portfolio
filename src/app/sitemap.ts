import type { MetadataRoute } from "next";
import { isIndexable } from "@/lib/indexing";
import { getVisibleCaseStudies } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexable()) return [];
  const studies = await getVisibleCaseStudies();
  const paths = [
    "",
    ...(studies.length > 0 ? ["/case-studies"] : []),
    "/work",
    "/work-with-me",
    "/about",
    "/how-this-site-is-built",
    ...studies.map(({ slug }) => `/case-studies/${slug}`),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
