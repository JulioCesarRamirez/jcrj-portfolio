import { render, screen } from "@testing-library/react";
import { OnThisPage } from "./OnThisPage";

it("links to each heading", () => {
  render(
    <OnThisPage
      label="On this page"
      headings={[{ id: "context", title: "Context" }]}
    />,
  );
  expect(screen.getByRole("link", { name: "Context" })).toHaveAttribute(
    "href",
    "#context",
  );
});

it("renders nothing without headings", () => {
  const { container } = render(
    <OnThisPage label="On this page" headings={[]} />,
  );
  expect(container).toBeEmptyDOMElement();
});
