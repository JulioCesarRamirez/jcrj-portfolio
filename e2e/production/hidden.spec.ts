import { expect, test } from "@playwright/test";

const PUBLISHED = ["turbomodules-new-architecture", "ai-search-ui"];
const UNPUBLISHED = "rn-cart-cold-start";
const PUBLIC_PATHS = [
  "/",
  "/work",
  "/about",
  "/how-this-site-is-built",
  "/case-studies",
  ...PUBLISHED.map((slug) => `/case-studies/${slug}`),
];

test.describe("production shows only finished content", () => {
  for (const path of PUBLIC_PATHS) {
    test(`${path} has no TODO(julio) and no draft banner`, async ({ page }) => {
      await page.goto(path);
      expect(await page.content()).not.toContain("TODO(julio)");
      await expect(page.getByText("Draft preview")).toHaveCount(0);
    });
  }

  test("an unpublished case study 404s and stays out of the sitemap", async ({
    request,
    page,
  }) => {
    expect((await request.get(`/case-studies/${UNPUBLISHED}`)).status()).toBe(
      404,
    );

    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).not.toContain("TODO(julio)");
    expect(sitemap).not.toContain(UNPUBLISHED);
    for (const slug of PUBLISHED) expect(sitemap).toContain(slug);

    await page.goto("/case-studies");
    await expect(page.getByRole("article")).toHaveCount(PUBLISHED.length);
    await expect(page.getByText("Draft", { exact: true })).toHaveCount(0);
  });

  test("home links to the published case studies only", async ({ page }) => {
    await page.goto("/");
    await expect(
      page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: "Case studies" }),
    ).toBeVisible();
    await expect(page.locator("#featured-case-studies")).toBeVisible();
    await expect(
      page.locator(`a[href="/case-studies/${UNPUBLISHED}"]`),
    ).toHaveCount(0);
  });

  test("robots disallow the admin", async ({ request }) => {
    expect(await (await request.get("/robots.txt")).text()).toContain(
      "Disallow: /keystatic",
    );
  });

  test("a published case study renders with its anchor nav", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`/case-studies/${PUBLISHED[0]}`);
    await expect(
      page.getByRole("heading", { level: 2, name: "Context" }),
    ).toBeVisible();
    const nav = page.getByRole("navigation", { name: "On this page" });
    await nav.getByRole("link", { name: "Decision" }).click();
    await expect(page).toHaveURL(/#decision$/);
  });
});
