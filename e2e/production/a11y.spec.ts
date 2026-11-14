import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const paths = [
  "/",
  "/work",
  "/work-with-me",
  "/about",
  "/how-this-site-is-built",
  "/case-studies",
  "/case-studies/turbomodules-new-architecture",
  "/case-studies/ai-search-ui",
  "/case-studies/sparknight",
  "/case-studies/beek-native-player",
  "/case-studies/cms-driven-angular",
  "/case-studies/sharetown-native-plugins",
  "/case-studies/dell-prefetch",
  "/case-studies/editor-microfrontends",
  "/case-studies/ci-affected-tests",
];
const schemes = ["light", "dark"] as const;

for (const colorScheme of schemes) {
  test.describe(`${colorScheme} theme`, () => {
    test.use({ colorScheme });

    for (const path of paths) {
      test(`${path} has no axe violations`, async ({ page }) => {
        await page.goto(path);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        expect(results.violations).toEqual([]);
      });
    }
  });
}
