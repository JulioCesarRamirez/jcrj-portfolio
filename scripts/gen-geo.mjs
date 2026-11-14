// The proxy cannot read content/ at runtime, so the country list from Keystatic is copied
// into a JSON module it can import. Runs before `dev` and `build` (see package.json).
import { readFileSync, writeFileSync } from "node:fs";

const SOURCE = "content/location-variants.yaml";
const TARGET = "src/lib/generated/mexico-countries.json";

const yaml = readFileSync(SOURCE, "utf8");
const block = yaml.match(/^mexicoCountries:\n((?:[ \t]+-[^\n]*\n?)*)/m);
const countries = [...(block?.[1] ?? "").matchAll(/-\s*"?([A-Za-z]{2})"?/g)].map(
  ([, code]) => code.toUpperCase(),
);
if (countries.length === 0) {
  console.error(`gen-geo: no countries found in ${SOURCE}`);
  process.exit(1);
}
const next = JSON.stringify(countries, null, 2) + "\n";
let current = "";
try {
  current = readFileSync(TARGET, "utf8");
} catch {}
if (current !== next) writeFileSync(TARGET, next);
console.log(`gen-geo: ${countries.length} countries.`);
