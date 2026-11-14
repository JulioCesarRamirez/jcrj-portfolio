type Env = Record<string, string | undefined>;

const LOCAL_URL = "http://localhost:3000";

const stripSlash = (url: string) => url.replace(/\/+$/, "");

/** Absolute site URL: explicit setting, then Vercel's production host, then the deployment host, then localhost. */
export function resolveSiteUrl(env: Env): string {
  const explicit = env["NEXT_PUBLIC_SITE_URL"]?.trim();
  if (explicit) return stripSlash(explicit);
  const production = env["VERCEL_PROJECT_PRODUCTION_URL"]?.trim();
  if (production) return stripSlash(`https://${production}`);
  const deployment = env["VERCEL_URL"]?.trim();
  if (deployment) return stripSlash(`https://${deployment}`);
  return LOCAL_URL;
}

/** A production deployment must never publish localhost URLs. */
export function assertSiteUrl(url: string, env: Env): void {
  if (env["VERCEL_ENV"] === "production" && /localhost/i.test(url)) {
    throw new Error(
      `Site URL resolves to ${url} in a production build. Set NEXT_PUBLIC_SITE_URL (for example https://your-domain) in Vercel → Settings → Environment Variables → Production, then redeploy.`,
    );
  }
}

export const siteUrl = resolveSiteUrl(process.env);
assertSiteUrl(siteUrl, process.env);
