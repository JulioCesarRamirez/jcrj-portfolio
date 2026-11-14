import { assertSiteUrl, resolveSiteUrl } from "./site-url";

describe("resolveSiteUrl", () => {
  it("prefers NEXT_PUBLIC_SITE_URL and strips trailing slashes", () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: "https://example.com//",
        VERCEL_PROJECT_PRODUCTION_URL: "prod.vercel.app",
        VERCEL_URL: "preview.vercel.app",
      }),
    ).toBe("https://example.com");
  });

  it("falls back to the Vercel production host", () => {
    expect(
      resolveSiteUrl({
        VERCEL_PROJECT_PRODUCTION_URL: "prod.vercel.app",
        VERCEL_URL: "preview.vercel.app",
      }),
    ).toBe("https://prod.vercel.app");
  });

  it("then to the deployment host", () => {
    expect(resolveSiteUrl({ VERCEL_URL: "preview.vercel.app" })).toBe(
      "https://preview.vercel.app",
    );
  });

  it("then to localhost", () => {
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: " " })).toBe(
      "http://localhost:3000",
    );
  });
});

describe("assertSiteUrl", () => {
  it("fails a production build that resolves to localhost", () => {
    expect(() =>
      assertSiteUrl("http://localhost:3000", { VERCEL_ENV: "production" }),
    ).toThrow(/NEXT_PUBLIC_SITE_URL/);
  });

  it("allows localhost elsewhere and real URLs in production", () => {
    expect(() => assertSiteUrl("http://localhost:3000", {})).not.toThrow();
    expect(() =>
      assertSiteUrl("https://example.com", { VERCEL_ENV: "production" }),
    ).not.toThrow();
  });
});
