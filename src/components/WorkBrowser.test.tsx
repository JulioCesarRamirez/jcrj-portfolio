import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { WorkCardData } from "./WorkCard";
import { WorkBrowser } from "./WorkBrowser";

const base = {
  org: "",
  role: "",
  years: "",
  summary: "",
  stack: [],
  links: [],
  caseStudy: null,
  screenshots: [],
};
const apps: WorkCardData[] = [
  { ...base, name: "Web One", type: "web" },
  { ...base, name: "Mobile One", type: "mobile" },
];

it("filters by platform and updates the count", async () => {
  render(<WorkBrowser apps={apps} readCaseStudyLabel="Read" />);
  expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
  expect(screen.getByRole("status")).toHaveTextContent("2 of 2");

  await userEvent.click(screen.getByRole("button", { name: "Mobile" }));
  expect(
    screen.getByRole("heading", { name: "Mobile One" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Web One" }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("1 of 2");

  await userEvent.click(screen.getByRole("button", { name: "All" }));
  expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
});
