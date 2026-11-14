import { render, screen } from "@testing-library/react";
import { Diagram } from "./Diagram";
import { DIAGRAM_KEYS, diagrams } from "./index";

describe("diagram registry", () => {
  it("registers every key", () => {
    expect(Object.keys(diagrams).sort()).toEqual([...DIAGRAM_KEYS].sort());
  });

  it.each(DIAGRAM_KEYS)("%s is an accessible image", (key) => {
    render(<Diagram diagramKey={key} />);
    expect(screen.getByRole("img")).toHaveAccessibleName();
  });

  it("renders nothing for an unknown key", () => {
    const { container } = render(<Diagram diagramKey="nope" />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("diagram paths", () => {
  it.each(DIAGRAM_KEYS)("%s has only well-formed path data", (key) => {
    const { container } = render(<Diagram diagramKey={key} />);
    for (const path of container.querySelectorAll("path")) {
      // Two signs in a row (for example "3--4") make the whole path invalid.
      expect(path.getAttribute("d")).not.toMatch(/[-+]{2}/);
    }
  });
});
