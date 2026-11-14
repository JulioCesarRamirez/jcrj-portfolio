type Env = Record<string, string | undefined>;

/**
 * Search engines may index the site only when SITE_PUBLIC is "true".
 * Preview deployments are never indexable, whatever SITE_PUBLIC says.
 */
export function isIndexable(env: Env = process.env): boolean {
  if (env["VERCEL_ENV"] === "preview") return false;
  return env["SITE_PUBLIC"] === "true";
}
