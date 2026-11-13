import { render, screen } from "@testing-library/react";
import { Tag } from "./Tag";

it("renders its children", () => {
  render(<Tag variant="accent">TypeScript</Tag>);
  expect(screen.getByText("TypeScript")).toBeInTheDocument();
});
