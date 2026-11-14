import { expect, test } from "@playwright/test";

const MEXICO = "Mexico City · Open to remote (Mexico / LATAM)";
const CHICAGO = "Chicago, IL · Open to remote (US) and on-site in Chicago";
const MEXICO_LOOKING =
  "Open to senior frontend and mobile roles (React, Next.js, React Native, Angular, Ionic), remote from Mexico / LATAM, and short contracts.";
const CHICAGO_LOOKING =
  "Open to senior frontend and mobile roles (React, Next.js, React Native, Angular, Ionic), remote or on-site in Chicago, and short contracts.";

const country = (code: string) => ({ "x-vercel-ip-country": code });

test.describe("visitor in Mexico", () => {
  test.use({ extraHTTPHeaders: country("MX") });

  test("sees the Mexico location and looking-for line", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(MEXICO, { exact: true })).toBeVisible();
    await expect(page.getByText(MEXICO_LOOKING)).toBeVisible();
    await expect(page.getByText(CHICAGO, { exact: true })).toHaveCount(0);
  });

  test("keeps the public URL, with no variant segment", async ({ page }) => {
    await page.goto("/work");
    await expect(page).toHaveURL(/\/work$/);
    expect(page.url()).not.toContain("/v/");
  });
});

test.describe("visitor in the US", () => {
  test.use({ extraHTTPHeaders: country("US") });

  test("sees Chicago", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(CHICAGO, { exact: true })).toBeVisible();
    await expect(page.getByText(CHICAGO_LOOKING)).toBeVisible();
  });

  test("?loc=mexico overrides the IP and sticks via a cookie", async ({
    page,
  }) => {
    await page.goto("/?loc=mexico");
    await expect(page.getByText(MEXICO, { exact: true })).toBeVisible();
    await page.goto("/");
    await expect(page.getByText(MEXICO, { exact: true })).toBeVisible();
    await page.goto("/?loc=auto");
    await expect(page.getByText(CHICAGO, { exact: true })).toBeVisible();
    await page.goto("/");
    await expect(page.getByText(CHICAGO, { exact: true })).toBeVisible();
  });
});

test("the canonical and Open Graph URL are the same in both variants", async ({
  browser,
}) => {
  const read = async (code: string) => {
    const context = await browser.newContext({
      extraHTTPHeaders: country(code),
    });
    const page = await context.newPage();
    await page.goto("/work");
    const result = {
      canonical: await page
        .locator('link[rel="canonical"]')
        .getAttribute("href"),
      og: await page.locator('meta[property="og:url"]').getAttribute("content"),
    };
    await context.close();
    return result;
  };
  const mexico = await read("MX");
  const chicago = await read("US");
  expect(mexico).toEqual(chicago);
  expect(mexico.canonical).toMatch(/\/work$/);
  expect(mexico.canonical).not.toContain("/v/");
});

test("search and preview bots always get Chicago", async ({ browser }) => {
  for (const userAgent of [
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "LinkedInBot/1.0 (compatible; Mozilla/5.0)",
    "Slackbot-LinkExpanding 1.0",
  ]) {
    const context = await browser.newContext({
      userAgent,
      extraHTTPHeaders: country("MX"),
    });
    const page = await context.newPage();
    await page.goto("/?loc=mexico");
    await expect(page.getByText(CHICAGO, { exact: true })).toBeVisible();
    await context.close();
  }
});

test("the variant segment is not reachable directly", async ({ request }) => {
  const response = await request.get("/v/mexico/work", { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers()["location"]).toMatch(/\/work$/);
});

test("excluded paths skip the proxy", async ({ request }) => {
  for (const path of ["/robots.txt", "/sitemap.xml"]) {
    const response = await request.get(path);
    expect(response.headers()["x-loc-variant"]).toBeUndefined();
  }
});

for (const code of ["MX", "US"]) {
  test.describe(`the longer looking-for line at 375px (${code})`, () => {
    test.use({
      extraHTTPHeaders: country(code),
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true,
    });

    test("does not overflow horizontally", async ({ page }) => {
      for (const path of ["/", "/about"]) {
        await page.goto(path);
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      }
      await page.goto("/");
      const box = await page
        .getByText(/^Open to senior frontend/)
        .boundingBox();
      expect(box).not.toBeNull();
      expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(375);
    });
  });
}
