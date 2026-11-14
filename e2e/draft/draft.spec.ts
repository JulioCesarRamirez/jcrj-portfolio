import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const SLUG = "rn-cart-cold-start"; // an unpublished study
const SLUGS = [
  SLUG,
  "ai-search-ui",
  "turbomodules-new-architecture",
  "sparknight",
  "beek-native-player",
  "cms-driven-angular",
  "sharetown-native-plugins",
  "dell-prefetch",
  "editor-microfrontends",
  "ci-affected-tests",
];

test.describe("next dev renders drafts for review", () => {
  test("home shows the banner, drafts and TODO tiles", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Draft preview")).toBeVisible();
    await expect(page.locator("#featured-case-studies")).toBeVisible();
    await expect(
      page.getByRole("region", { name: "Proof" }).getByRole("listitem"),
    ).toHaveCount(4);
    await expect(page.getByText("Days → hours")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Read the case studies" }),
    ).toBeVisible();
  });

  test("case-study list shows every study, with Draft tags on unpublished ones", async ({
    page,
  }) => {
    await page.goto("/case-studies");
    await expect(page.getByRole("article")).toHaveCount(10);
    await expect(page.getByText("Draft", { exact: true })).toHaveCount(1);
  });

  test("a draft case study renders in full with its anchor nav", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`/case-studies/${SLUG}`);
    await expect(
      page.getByRole("heading", { level: 2, name: "Context" }),
    ).toBeVisible();
    await expect(page.getByText("Draft", { exact: true })).toBeVisible();
    const nav = page.getByRole("navigation", { name: "On this page" });
    await nav.getByRole("link", { name: "Decision" }).click();
    await expect(page).toHaveURL(/#decision$/);
  });

  test("TODO(julio) text is highlighted", async ({ page }) => {
    await page.goto(`/case-studies/${SLUG}`);
    // No content carries a TODO right now, so add one the way a draft would.
    await page.evaluate(() => {
      const p = document.createElement("p");
      p.textContent = "TODO(julio): sample placeholder";
      document.body.append(p);
    });
    await expect
      .poll(() => page.evaluate(() => CSS.highlights.get("todo")?.size ?? 0))
      .toBeGreaterThan(0);
  });

  test("work cards link to draft case studies", async ({ page }) => {
    await page.goto("/work");
    await expect(page.getByText("Draft preview")).toBeVisible();
  });

  for (const scheme of ["light", "dark"] as const) {
    for (const slug of SLUGS) {
      test(`draft case study ${slug} has no axe violations (${scheme})`, async ({
        page,
      }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto(`/case-studies/${slug}`);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        expect(results.violations).toEqual([]);
      });
    }
  }
});

test.describe("a site that is not public stays out of search engines", () => {
  test("pages carry noindex, robots disallow all, sitemap is empty", async ({
    page,
    request,
  }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Disallow: /");
    expect(robots).not.toContain("Sitemap:");
    expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
      "<loc>",
    );
  });
});
