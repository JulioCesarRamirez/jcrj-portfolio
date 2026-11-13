import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { themeScript } from "@/lib/theme-script";
import { ThemeToggle } from "./ThemeToggle";

function mockPrefersDark(matches: boolean) {
  window.matchMedia = jest
    .fn()
    .mockReturnValue({ matches }) as unknown as typeof window.matchMedia;
}

beforeAll(() => {
  new Function(themeScript)();
});

beforeEach(() => {
  delete document.documentElement.dataset["theme"];
  localStorage.clear();
});

it("overrides the system theme and persists the choice", async () => {
  mockPrefersDark(true);
  render(<ThemeToggle />);
  await userEvent.click(
    screen.getByRole("button", { name: "Toggle color theme" }),
  );
  expect(document.documentElement.dataset["theme"]).toBe("light");
  expect(localStorage.getItem("theme")).toBe("light");

  await userEvent.click(
    screen.getByRole("button", { name: "Toggle color theme" }),
  );
  expect(document.documentElement.dataset["theme"]).toBe("dark");
});

it("flips an explicit theme even when the system prefers the other", async () => {
  mockPrefersDark(false);
  document.documentElement.dataset["theme"] = "dark";
  render(<ThemeToggle />);
  await userEvent.click(
    screen.getByRole("button", { name: "Toggle color theme" }),
  );
  expect(document.documentElement.dataset["theme"]).toBe("light");
});

it("applies a saved theme when the script runs before paint", () => {
  localStorage.setItem("theme", "dark");
  new Function(themeScript)();
  expect(document.documentElement.dataset["theme"]).toBe("dark");
});

it("ignores a garbage saved value", () => {
  localStorage.setItem("theme", "neon");
  new Function(themeScript)();
  expect(document.documentElement.dataset["theme"]).toBeUndefined();
});
