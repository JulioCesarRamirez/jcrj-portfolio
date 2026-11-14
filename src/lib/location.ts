export const VARIANTS = ["chicago", "mexico"] as const;
export type Variant = (typeof VARIANTS)[number];
export const DEFAULT_VARIANT: Variant = "chicago";

export function isVariant(value: unknown): value is Variant {
  return (VARIANTS as readonly unknown[]).includes(value);
}

export const LOC_COOKIE = "loc";
export const LOC_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

/** Crawlers and link-preview bots always get the default variant, so what is indexed is consistent. */
const BOT_PATTERN =
  /googlebot|bingbot|duckduckbot|baiduspider|yandex|applebot|linkedinbot|slackbot|twitterbot|facebookexternalhit|whatsapp|telegrambot|discordbot|embedly|pinterest|redditbot|petalbot|ahrefsbot|semrushbot/i;

export function isBot(userAgent: string | null | undefined): boolean {
  return !!userAgent && BOT_PATTERN.test(userAgent);
}

export function variantForCountry(
  country: string | null | undefined,
  mexicoCountries: readonly string[],
): Variant {
  const code = country?.trim().toUpperCase();
  return code && mexicoCountries.includes(code) ? "mexico" : DEFAULT_VARIANT;
}

export type VariantSource = "bot" | "query" | "cookie" | "ip" | "default";

interface Input {
  userAgent?: string | null;
  /** Value of `?loc=`: a variant, `auto` (clear the override) or anything else (ignored). */
  query?: string | null;
  /** Value of the `loc` cookie. */
  cookie?: string | null;
  /** Value of `x-vercel-ip-country`. */
  country?: string | null;
  mexicoCountries: readonly string[];
}

export interface Resolution {
  variant: Variant;
  source: VariantSource;
  /** What the response should do with the `loc` cookie. */
  cookie: { set: Variant } | "clear" | null;
}

/** Bots first, then `?loc=`, then the cookie, then the visitor's country, then the default. */
export function resolveVariant(input: Input): Resolution {
  if (isBot(input.userAgent))
    return { variant: DEFAULT_VARIANT, source: "bot", cookie: null };
  const fromIp = (): Resolution =>
    input.country
      ? {
          variant: variantForCountry(input.country, input.mexicoCountries),
          source: "ip",
          cookie: null,
        }
      : { variant: DEFAULT_VARIANT, source: "default", cookie: null };

  if (isVariant(input.query))
    return {
      variant: input.query,
      source: "query",
      cookie: { set: input.query },
    };
  if (input.query === "auto") return { ...fromIp(), cookie: "clear" };
  if (isVariant(input.cookie))
    return { variant: input.cookie, source: "cookie", cookie: null };
  return fromIp();
}
