import Markdoc from "@markdoc/markdoc";
import { render, screen } from "@testing-library/react";
import { renderMarkdoc, slugify } from "./markdoc";

describe("slugify", () => {
  it("lowercases, strips apostrophes and hyphenates", () => {
    expect(slugify("What I’d do differently")).toBe("what-id-do-differently");
    expect(slugify("  Options considered! ")).toBe("options-considered");
  });
});

describe("renderMarkdoc", () => {
  const source =
    "## Context\n\nBody text.\n\n### Detail\n\n## Decision\n\nMore.";

  it("collects only H2 headings, with stable ids", () => {
    const { headings } = renderMarkdoc(Markdoc.parse(source));
    expect(headings).toEqual([
      { id: "context", title: "Context" },
      { id: "decision", title: "Decision" },
    ]);
  });

  it("renders headings with ids so the nav can anchor to them", () => {
    const { content } = renderMarkdoc(Markdoc.parse(source));
    render(<div>{content}</div>);
    expect(
      screen.getByRole("heading", { level: 2, name: "Context" }),
    ).toHaveAttribute("id", "context");
    expect(
      screen.getByRole("heading", { level: 3, name: "Detail" }),
    ).toHaveAttribute("id", "detail");
  });
});
