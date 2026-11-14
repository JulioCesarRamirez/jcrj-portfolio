import { isIndexable } from "./indexing";

describe("isIndexable", () => {
  it("is off unless SITE_PUBLIC is exactly true", () => {
    expect(isIndexable({})).toBe(false);
    expect(isIndexable({ SITE_PUBLIC: "false" })).toBe(false);
    expect(isIndexable({ SITE_PUBLIC: "1" })).toBe(false);
    expect(isIndexable({ SITE_PUBLIC: "true" })).toBe(true);
  });

  it("never indexes a preview deployment", () => {
    expect(isIndexable({ SITE_PUBLIC: "true", VERCEL_ENV: "preview" })).toBe(
      false,
    );
    expect(isIndexable({ SITE_PUBLIC: "true", VERCEL_ENV: "production" })).toBe(
      true,
    );
  });
});
