import { findTodoPaths, hasTodo, sanitize } from "./todo";

describe("hasTodo", () => {
  it("finds the marker in nested strings", () => {
    expect(hasTodo("ok")).toBe(false);
    expect(hasTodo("x TODO(julio): y")).toBe(true);
    expect(hasTodo({ a: [{ b: "TODO(julio)" }] })).toBe(true);
    expect(hasTodo({ a: [1, null, "fine"] })).toBe(false);
  });
});

describe("findTodoPaths", () => {
  it("returns dotted paths", () => {
    expect(findTodoPaths({ a: "x", b: { c: ["ok", "TODO(julio)"] } })).toEqual([
      "b.c[1]",
    ]);
  });
});

describe("sanitize", () => {
  it("blanks strings and drops array items that contain a TODO", () => {
    const input = {
      headline: "Real",
      note: "TODO(julio): later",
      proof: [
        { value: "9+", label: "years", note: "" },
        { value: "X", label: "claim", note: "TODO(julio): confirm" },
      ],
      highlights: ["Shipped it", "TODO(julio): my part"],
    };
    expect(sanitize(input)).toEqual({
      headline: "Real",
      note: "",
      proof: [{ value: "9+", label: "years", note: "" }],
      highlights: ["Shipped it"],
    });
  });

  it("does not mutate its input", () => {
    const input = { list: ["TODO(julio)"] };
    sanitize(input);
    expect(input.list).toHaveLength(1);
  });
});
