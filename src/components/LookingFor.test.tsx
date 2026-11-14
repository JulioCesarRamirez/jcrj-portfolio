import { render, screen } from "@testing-library/react";
import { LookingFor } from "./LookingFor";

it("renders the text and nothing when empty", () => {
  const { container, rerender } = render(<LookingFor text="Open to work" />);
  expect(screen.getByText("Open to work")).toBeInTheDocument();
  rerender(<LookingFor text="" />);
  expect(container).toBeEmptyDOMElement();
});
