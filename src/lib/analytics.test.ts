import {
  applyNotrackParam,
  isEventName,
  isOptedOut,
  parseProps,
  stripUrl,
  trackAttrs,
  viewAttrs,
} from "./analytics";

describe("trackAttrs", () => {
  it("encodes the event name and its typed props", () => {
    expect(trackAttrs("start_project_click")).toEqual({
      "data-track": "start_project_click",
    });
    expect(trackAttrs("contact_click", { target: "email" })).toEqual({
      "data-track": "contact_click",
      "data-track-props": '{"target":"email"}',
    });
    expect(viewAttrs("case_study_view", { slug: "a" })).toEqual({
      "data-track-view": "case_study_view",
      "data-track-props": '{"slug":"a"}',
    });
  });
});

describe("isEventName / parseProps", () => {
  it("accepts only known events", () => {
    expect(isEventName("resume_download")).toBe(true);
    expect(isEventName("anything_else")).toBe(false);
  });

  it("keeps short string props only", () => {
    expect(
      parseProps(JSON.stringify({ a: "x", b: 1, c: "y".repeat(200) })),
    ).toEqual({ a: "x" });
    expect(parseProps("not json")).toBeUndefined();
    expect(parseProps(undefined)).toBeUndefined();
  });
});

describe("notrack", () => {
  it("is set by ?notrack=1 and cleared by ?notrack=0", () => {
    window.localStorage.clear();
    expect(isOptedOut(window.localStorage)).toBe(false);
    applyNotrackParam("?notrack=1", window.localStorage);
    expect(isOptedOut(window.localStorage)).toBe(true);
    applyNotrackParam("?other=1", window.localStorage);
    expect(isOptedOut(window.localStorage)).toBe(true);
    applyNotrackParam("?notrack=0", window.localStorage);
    expect(isOptedOut(window.localStorage)).toBe(false);
  });
});

describe("stripUrl", () => {
  it("drops the query string and hash", () => {
    expect(stripUrl("https://x.dev/work?email=a@b.c&utm=1#top")).toBe(
      "https://x.dev/work",
    );
  });
});
