import { findTodoPaths, hasTodo, sanitize } from "./todo";

/**
 * Draft mode is `next dev` only. It renders unpublished entries and TODO text so the
 * full design can be reviewed. Production builds hide both.
 */
export function isDraftMode(): boolean {
  return process.env.NODE_ENV === "development";
}

/** Production: strip unconfirmed content. Draft mode: leave everything visible. */
export function applyVisibility<T>(
  value: T,
  draft: boolean = isDraftMode(),
): T {
  return draft ? value : sanitize(value);
}

/** Production: drop entries whose required fields contain a TODO. Draft mode keeps them. */
export function withRequiredFields<T extends object>(
  entries: readonly T[],
  required: readonly (keyof T)[],
  draft: boolean = isDraftMode(),
): T[] {
  if (draft) return [...entries];
  return entries.filter(
    (entry) => !required.some((key) => hasTodo(entry[key])),
  );
}

/** Production: throw when an essential field still has a TODO, rather than render a blank. */
export function assertNoTodo<T extends object>(
  value: T,
  required: readonly (keyof T)[],
  label: string,
  draft: boolean = isDraftMode(),
): void {
  if (draft) return;
  const bad = required.flatMap((key) => findTodoPaths(value[key], String(key)));
  if (bad.length > 0) {
    throw new Error(
      `${label} has TODO(julio) in required fields: ${bad.join(", ")}. Resolve before building for production.`,
    );
  }
}
