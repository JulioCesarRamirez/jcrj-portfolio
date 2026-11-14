import { render, screen } from "@testing-library/react";
import { OnThisPage } from "./OnThisPage";

it("links to each heading", () => {
  render(
    <OnThisPage
      label="On this page"
      headings={[{ id: "context", title: "Context" }]}
    />,
  );
  for (const link of screen.getAllByRole("link", { name: "Context" }))
    expect(link).toHaveAttribute("href", "#context");
});

it("renders nothing without headings", () => {
  const { container } = render(
    <OnThisPage label="On this page" headings={[]} />,
  );
  expect(container).toBeEmptyDOMElement();
});

it("offers a collapsible menu for small screens", () => {
  render(
    <OnThisPage
      label="On this page"
      headings={[{ id: "context", title: "Context" }]}
    />,
  );
  expect(
    screen.getByText("On this page", { selector: "summary" }),
  ).toBeTruthy();
});
