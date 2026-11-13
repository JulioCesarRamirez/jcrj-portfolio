// Fails when the home page's first-load JS (gzip, modern browsers only) exceeds the budget.
// Run after `next build`. Override with BUDGET_KB.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const budgetKb = Number(process.env.BUDGET_KB ?? 141);
const html = readFileSync(join(".next", "server", "app", "index.html"), "utf8");

const scripts = [
  ...html.matchAll(/<script\b[^>]*\bsrc="\/_next\/([^"]+\.js)"[^>]*>/g),
]
  .filter(([tag]) => !/\bnomodule\b/i.test(tag))
  .map(([, path]) => path);

const totalBytes = [...new Set(scripts)].reduce(
  (sum, path) => sum + gzipSync(readFileSync(join(".next", path))).length,
  0,
);
const totalKb = totalBytes / 1024;

console.log(
  `Home first-load JS: ${totalKb.toFixed(1)} KB gzip (budget ${budgetKb} KB)`,
);
if (totalKb > budgetKb) process.exit(1);
