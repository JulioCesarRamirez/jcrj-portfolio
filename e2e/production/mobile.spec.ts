import { expect, test } from "@playwright/test";

const PATHS = [
  "/",
  "/work",
  "/work-with-me",
  "/about",
  "/how-this-site-is-built",
  "/case-studies",
  "/case-studies/turbomodules-new-architecture",
  "/case-studies/ai-search-ui",
];
const MIN_TARGET = 44;

test.use({
  viewport: { width: 375, height: 812 },
  hasTouch: true,
  isMobile: true,
});

for (const path of PATHS) {
  test.describe(`${path} at 375px`, () => {
    test("has no horizontal overflow", async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("standalone tap targets are at least 44px", async ({ page }) => {
      await page.goto(path);
      const small = await page.evaluate((min) => {
        const found: string[] = [];
        const selector = "a, button, summary, input, select";
        for (const el of document.querySelectorAll<HTMLElement>(selector)) {
          const style = getComputedStyle(el);
          // Inline links inside running text are exempt, as are hidden elements.
          if (style.display === "none" || style.visibility === "hidden")
            continue;
          if (style.display === "inline") continue;
          if (el.classList.contains("sr-only")) continue;
          const box = el.getBoundingClientRect();
          if (box.width === 0 || box.height === 0) continue;
          if (box.width < min || box.height < min)
            found.push(
              `${el.textContent?.trim().slice(0, 30) ?? ""} ${Math.round(box.width)}x${Math.round(box.height)}`,
            );
        }
        return found;
      }, MIN_TARGET);
      expect(small).toEqual([]);
    });
  });
}

test("mobile menu opens, lists the nav and closes on Escape", async ({
  page,
}) => {
  await page.goto("/");
  const menu = page.getByText("Menu", { exact: true });
  await menu.click();
  const nav = page.getByRole("navigation", { name: "Mobile" });
  await expect(
    nav.getByRole("link", { name: "Work", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(menu).toBeFocused();
});

test("case-study menu replaces the sticky nav and the diagram scrolls", async ({
  page,
}) => {
  await page.goto("/case-studies/turbomodules-new-architecture");
  const toc = page.locator("summary", { hasText: "On this page" });
  await expect(toc).toBeVisible();
  await toc.click();
  await expect(
    page
      .getByRole("navigation", { name: "On this page (menu)" })
      .getByRole("link", { name: "Decision" }),
  ).toBeVisible();
  const diagram = page.getByRole("region", { name: "Diagram" });
  const fontPx = await diagram
    .locator("svg text")
    .first()
    .evaluate((el) => {
      const svg = (el as SVGElement).ownerSVGElement as SVGSVGElement;
      return (
        parseFloat(getComputedStyle(el).fontSize) *
        (svg.getBoundingClientRect().width / svg.viewBox.baseVal.width)
      );
    });
  expect(fontPx).toBeGreaterThanOrEqual(12);
  await expect(page.getByText("Scroll sideways")).toBeVisible();
});
