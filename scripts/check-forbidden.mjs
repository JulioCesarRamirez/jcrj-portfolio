// Fails when a term from design-reference/forbidden-terms.txt appears in tracked files.
// The file is gitignored, so it only exists locally: when it is absent this check passes
// and does nothing (CI never has the list). Each line is a case-insensitive regex that
// must stand alone as a token. Output is file:line only; a matched term is never printed.
//   node scripts/check-forbidden.mjs            tracked files in the working tree
//   node scripts/check-forbidden.mjs --history  also every commit diff and message
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const TERMS_FILE = "design-reference/forbidden-terms.txt";

if (!existsSync(TERMS_FILE)) {
  console.log("check-forbidden: no terms file here, skipping.");
  process.exit(0);
}

// A short term must not match inside a longer word (a file extension, a common verb), so every term is a whole token.
const patterns = readFileSync(TERMS_FILE, "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((term) => new RegExp(`(?<![A-Za-z0-9])(?:${term})(?![A-Za-z0-9])`, "i"));

const hit = (text) => patterns.some((re) => re.test(text));
const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });

let failures = 0;

for (const file of git("ls-files", "-z").split("\0").filter(Boolean)) {
  if (file === "package-lock.json") continue;
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (text.includes("\0")) continue; // binary
  text.split("\n").forEach((line, i) => {
    if (hit(line)) {
      console.error(`${file}:${i + 1}`);
      failures++;
    }
  });
}

if (process.argv.includes("--history")) {
  const log = git("log", "--all", "-p", "--format=@@COMMIT %H");
  let commit = "";
  const bad = new Set();
  for (const line of log.split("\n")) {
    if (line.startsWith("@@COMMIT ")) commit = line.slice(9, 16);
    else if (hit(line)) bad.add(commit);
  }
  for (const msg of git("log", "--all", "--format=%h%x00%B%x01").split(
    "\x01",
  )) {
    const [hash, body] = msg.trim().split("\0");
    if (body && hit(body)) bad.add(hash);
  }
  for (const c of bad) {
    console.error(`history: commit ${c}`);
    failures++;
  }
}

if (failures > 0) {
  console.error(
    `check-forbidden: ${failures} match(es). Remove them before pushing.`,
  );
  process.exit(1);
}
console.log("check-forbidden: clean.");
