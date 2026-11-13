// Fails when public content (a published case study, the site-info page) contains TODO(julio).
// Everything else with a TODO is only reported: production builds hide it.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const MARKER = "TODO(julio)";
const root = "content";

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

function todoLines(text) {
  return text
    .split("\n")
    .map((line, i) => ({ line: i + 1, text: line.trim() }))
    .filter(({ text }) => text.includes(MARKER));
}

/** Public in every build: published case studies, and the site-info page, which has no draft state. */
function isPublic(path, text) {
  if (path.endsWith("site-info.mdoc")) return true;
  if (!relative(root, path).startsWith(join("case-studies", ""))) return false;
  const frontmatter = text.split(/^---\s*$/m)[1] ?? "";
  return /^published:\s*true\s*$/m.test(frontmatter);
}

const failures = [];
const hidden = [];

if (existsSync(root)) {
  for (const path of files(root)) {
    if (!/\.(ya?ml|mdoc|md|json)$/.test(path)) continue;
    const text = readFileSync(path, "utf8");
    const lines = todoLines(text);
    if (lines.length === 0) continue;
    (isPublic(path, text) ? failures : hidden).push({
      path,
      lines,
    });
  }
}

if (hidden.length > 0) {
  const count = hidden.reduce((n, f) => n + f.lines.length, 0);
  console.log(
    `${count} ${MARKER} item(s) in ${hidden.length} file(s) are hidden in production builds.`,
  );
}

if (failures.length > 0) {
  console.error(
    `\nPublic content must not contain ${MARKER}. Resolve them or unpublish:\n`,
  );
  for (const { path, lines } of failures) {
    for (const { line, text } of lines)
      console.error(`  ${path}:${line}  ${text}`);
  }
  process.exit(1);
}

console.log("TODO gate passed: no public content contains " + MARKER + ".");
