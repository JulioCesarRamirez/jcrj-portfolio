import robots from "./robots";

const original = { ...process.env };
afterEach(() => {
  process.env = { ...original };
});

it("disallows everything unless the site is public", () => {
  delete process.env["SITE_PUBLIC"];
  const result = robots();
  expect(result.rules).toEqual({ userAgent: "*", disallow: "/" });
  expect(result.sitemap).toBeUndefined();
});

it("allows crawling and points to the sitemap when public", () => {
  process.env["SITE_PUBLIC"] = "true";
  delete process.env["VERCEL_ENV"];
  const result = robots();
  expect(result.rules).toMatchObject({ userAgent: "*", allow: "/" });
  expect(result.sitemap).toMatch(/\/sitemap\.xml$/);
});

it("keeps previews private even when public", () => {
  process.env["SITE_PUBLIC"] = "true";
  process.env["VERCEL_ENV"] = "preview";
  expect(robots().rules).toEqual({ userAgent: "*", disallow: "/" });
});
