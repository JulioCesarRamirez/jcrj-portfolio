import { defineConfig, devices } from "@playwright/test";

const prodPort = 3100;
const draftPort = 3101;

export default defineConfig({
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 1 : 0,
  reporter: process.env["CI"]
    ? [["github"], ["html", { open: "never" }]]
    : "list",
  use: { trace: "on-first-retry" },
  projects: [
    {
      // `next build` + `next start`: what visitors get. Drafts and TODOs are hidden.
      name: "production",
      testDir: "./e2e/production",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: `http://localhost:${prodPort}`,
      },
    },
    {
      // `next dev`: drafts and TODOs are rendered for review.
      name: "draft",
      testDir: "./e2e/draft",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: `http://localhost:${draftPort}`,
      },
    },
  ],
  webServer: [
    {
      // An empty repo keeps Keystatic in local mode, so the build never needs GitHub App credentials.
      command: `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO= npm run build && NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO= npx next start -p ${prodPort}`,
      url: `http://localhost:${prodPort}`,
      reuseExistingServer: !process.env["CI"],
      timeout: 180_000,
    },
    {
      // A separate distDir keeps the dev server from fighting the production build.
      command: `NEXT_DIST_DIR=.next-draft npx next dev -p ${draftPort}`,
      url: `http://localhost:${draftPort}`,
      reuseExistingServer: !process.env["CI"],
      timeout: 180_000,
    },
  ],
});
