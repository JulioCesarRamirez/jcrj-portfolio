import { render, screen } from "@testing-library/react";
import { TitledGrid } from "./TitledGrid";

const items = [
  { title: "One", text: "First" },
  { title: "Two", text: "" },
];

it("renders each item with its title and text", () => {
  render(<TitledGrid items={items} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
  expect(screen.getByRole("heading", { name: "One" })).toBeInTheDocument();
  expect(screen.getByText("First")).toBeInTheDocument();
});

it("numbers steps when asked", () => {
  render(<TitledGrid items={items} numbered />);
  expect(screen.getByText("01")).toBeInTheDocument();
  expect(screen.getByText("02")).toBeInTheDocument();
});
