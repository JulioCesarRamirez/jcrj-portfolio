import type { MetadataRoute } from "next";
import { getVisibleCaseStudies } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const studies = await getVisibleCaseStudies();
  const paths = [
    "",
    ...(studies.length > 0 ? ["/case-studies"] : []),
    "/work",
    "/about",
    "/how-this-site-is-built",
    ...studies.map(({ slug }) => `/case-studies/${slug}`),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
