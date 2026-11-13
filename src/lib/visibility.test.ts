import {
  applyVisibility,
  assertNoTodo,
  withRequiredFields,
} from "./visibility";

const entry = { title: "A", note: "TODO(julio)" };

describe("applyVisibility", () => {
  it("keeps everything in draft mode and strips TODOs in production", () => {
    expect(applyVisibility(entry, true)).toBe(entry);
    expect(applyVisibility(entry, false)).toEqual({ title: "A", note: "" });
  });
});

describe("withRequiredFields", () => {
  const entries = [
    { company: "Ok", title: "T" },
    { company: "TODO(julio)", title: "T" },
  ];
  it("hides entries with a TODO in a required field, only in production", () => {
    expect(withRequiredFields(entries, ["company"], false)).toEqual([
      entries[0],
    ]);
    expect(withRequiredFields(entries, ["company"], true)).toHaveLength(2);
  });
});

describe("assertNoTodo", () => {
  it("throws in production, with the field path, and stays quiet in draft mode", () => {
    const profile = { headline: "TODO(julio): headline", name: "Julio" };
    expect(() =>
      assertNoTodo(profile, ["name", "headline"], "profile", false),
    ).toThrow(/headline/);
    expect(() =>
      assertNoTodo(profile, ["name"], "profile", false),
    ).not.toThrow();
    expect(() =>
      assertNoTodo(profile, ["headline"], "profile", true),
    ).not.toThrow();
  });
});
