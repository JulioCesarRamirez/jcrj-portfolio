import { render, screen } from "@testing-library/react";
import { CaseStudyCard } from "./CaseStudyCard";

const props = {
  slug: "x",
  index: 0,
  title: "Title",
  summary: "Sum",
  category: "Architecture",
  company: "Acme",
  diagram: "host-turbomodules",
  outcomeValue: "Bridge → JSI",
  outcomeLabel: "synchronous native calls",
};

it("links the title to the case study and shows meta and outcome", () => {
  render(<CaseStudyCard {...props} />);
  expect(screen.getByRole("link", { name: "Title" })).toHaveAttribute(
    "href",
    "/case-studies/x",
  );
  expect(screen.getByText("01 · Architecture")).toBeInTheDocument();
  expect(screen.getByText("Acme")).toBeInTheDocument();
  expect(screen.getByText("Bridge → JSI")).toBeInTheDocument();
  expect(screen.getByRole("img")).toBeInTheDocument();
});

it("omits the outcome footer when there is no value", () => {
  render(<CaseStudyCard {...props} outcomeValue="" />);
  expect(screen.queryByText("native calls")).not.toBeInTheDocument();
});
