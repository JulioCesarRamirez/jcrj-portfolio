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
