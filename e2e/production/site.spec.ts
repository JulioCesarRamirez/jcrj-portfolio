import { expect, test } from "@playwright/test";

test("pages load without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));

  for (const path of ["/", "/work", "/about", "/how-this-site-is-built"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("theme toggle overrides the system theme and persists", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).not.toHaveAttribute("data-theme", /.+/);

  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(html).toHaveAttribute("data-theme", "light");

  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");
});

test("a saved theme is applied by a blocking script in <head>, before first paint", async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(
    await page.evaluate(() => document.documentElement.dataset["theme"]),
  ).toBe("light");

  // Inline, synchronous (no async/defer/src) and in <head>, so it runs before the body paints.
  const script = await page.evaluate(() => {
    const el = [...document.head.querySelectorAll("script")].find((s) =>
      s.textContent?.includes("localStorage"),
    );
    return el ? { src: el.src, async: el.async, defer: el.defer } : null;
  });
  expect(script).toEqual({ src: "", async: false, defer: false });
});

test("keyboard users can reach the skip link", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
});

test("work page filters by platform", async ({ page }) => {
  await page.goto("/work");
  const cards = page.getByRole("article");
  const total = await cards.count();
  expect(total).toBeGreaterThan(1);

  await page.getByRole("button", { name: "Mobile" }).click();
  expect(await cards.count()).toBeLessThan(total);
  await expect(page.getByRole("button", { name: "Mobile" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("theme tokens match the design system in both schemes", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const bg = () =>
    page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(await bg()).toBe("rgb(10, 10, 11)");
  await page.emulateMedia({ colorScheme: "light" });
  expect(await bg()).toBe("rgb(250, 250, 249)");
});

test("how-this-site-is-built has an anchor nav", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/how-this-site-is-built");
  const nav = page.getByRole("navigation", { name: "On this page" });
  await expect(nav.getByRole("link").first()).toBeVisible();
});
