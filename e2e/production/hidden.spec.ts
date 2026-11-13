import { expect, test } from "@playwright/test";

const PUBLIC_PATHS = ["/", "/work", "/about", "/how-this-site-is-built"];
const DRAFT_SLUGS = [
  "turbomodules-new-architecture",
  "ai-search-ui",
  "rn-cart-cold-start",
];

test.describe("production hides unfinished content", () => {
  for (const path of PUBLIC_PATHS) {
    test(`${path} has no TODO(julio) and no draft banner`, async ({ page }) => {
      await page.goto(path);
      const html = await page.content();
      expect(html).not.toContain("TODO(julio)");
      await expect(page.getByText("Draft preview")).toHaveCount(0);
    });
  }

  test("sitemap and robots have no TODO and no case studies", async ({
    request,
  }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).not.toContain("TODO(julio)");
    expect(sitemap).not.toContain("case-studies");
    expect(sitemap).toContain("/how-this-site-is-built");
    const robots = await request.get("/robots.txt");
    expect(await robots.text()).toContain("Disallow: /keystatic");
  });

  test("unpublished case studies 404, and so does the empty list", async ({
    request,
  }) => {
    expect((await request.get("/case-studies")).status()).toBe(404);
    for (const slug of DRAFT_SLUGS) {
      expect((await request.get(`/case-studies/${slug}`)).status()).toBe(404);
    }
  });

  test("home hides the case-study section, its nav link and its CTA", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Case studies" })).toHaveCount(
      0,
    );
    await expect(
      page.getByRole("link", { name: "Read the case studies" }),
    ).toHaveCount(0);
    await expect(page.locator("#featured-case-studies")).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "Work", exact: true }),
    ).toBeVisible();
  });

  test("the proof strip drops tiles with unconfirmed numbers", async ({
    page,
  }) => {
    await page.goto("/");
    const tiles = page
      .getByRole("region", { name: "Proof" })
      .getByRole("listitem");
    await expect(tiles).toHaveCount(3);
    await expect(page.getByText("Days")).toHaveCount(0);
  });

  test("experience hides highlights with unconfirmed claims", async ({
    page,
  }) => {
    await page.goto("/about");
    await expect(page.getByText("Cart & Checkout").first()).toBeVisible();
    await expect(page.getByText("about 20%")).toHaveCount(0);
    await expect(page.getByText("days to hours")).toHaveCount(0);
  });

  test("work cards never link to an unpublished case study", async ({
    page,
  }) => {
    await page.goto("/work");
    await expect(page.locator('a[href^="/case-studies"]')).toHaveCount(0);
  });
});
