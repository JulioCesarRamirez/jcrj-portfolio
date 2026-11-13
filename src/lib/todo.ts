export const TODO_MARKER = "TODO(julio)";

/** True if any string anywhere inside `value` contains the TODO marker. */
export function hasTodo(value: unknown): boolean {
  if (typeof value === "string") return value.includes(TODO_MARKER);
  if (Array.isArray(value)) return value.some(hasTodo);
  if (value !== null && typeof value === "object")
    return Object.values(value).some(hasTodo);
  return false;
}

/** Dotted paths of every string that contains the marker, for error messages. */
export function findTodoPaths(value: unknown, path = ""): string[] {
  if (typeof value === "string")
    return value.includes(TODO_MARKER) ? [path] : [];
  if (Array.isArray(value))
    return value.flatMap((item, i) => findTodoPaths(item, `${path}[${i}]`));
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, v]) =>
      findTodoPaths(v, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

/**
 * Removes unconfirmed content: a string with the marker becomes "", and an array item
 * (a tile, a highlight, a fact, a link) with the marker anywhere inside is dropped whole.
 */
export function sanitize<T>(value: T): T {
  if (typeof value === "string") return (hasTodo(value) ? "" : value) as T;
  if (Array.isArray(value))
    return value.filter((item) => !hasTodo(item)).map(sanitize) as T;
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, sanitize(v)]),
    ) as T;
  }
  return value;
}
