import { render, screen } from "@testing-library/react";
import { WorkCard, type WorkCardData } from "./WorkCard";

const app: WorkCardData = {
  name: "Dumpling",
  type: "mobile",
  org: "Geekbears",
  role: "Frontend engineer",
  years: "2017 – 2018",
  summary: "Grocery delivery.",
  stack: ["React Native"],
  links: [{ label: "Live", url: "https://example.com" }],
  caseStudy: "my-study",
  screenshots: [],
};

it("shows platform, byline, stack and links, including the case study", () => {
  render(<WorkCard app={app} readCaseStudyLabel="Read the case study →" />);
  expect(screen.getByText("Mobile")).toBeInTheDocument();
  expect(screen.getByText("Geekbears · Frontend engineer")).toBeInTheDocument();
  expect(screen.getByText("React Native")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Read the case study →" }),
  ).toHaveAttribute("href", "/case-studies/my-study");
  expect(screen.getByRole("link", { name: "Live" })).toHaveAttribute(
    "href",
    "https://example.com",
  );
});

it("omits the case study link when none is related", () => {
  render(
    <WorkCard app={{ ...app, caseStudy: null }} readCaseStudyLabel="Read" />,
  );
  expect(screen.queryByRole("link", { name: "Read" })).not.toBeInTheDocument();
});
