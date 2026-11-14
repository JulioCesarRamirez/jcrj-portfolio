import { render, screen } from "@testing-library/react";
import { TimelineItem } from "./TimelineItem";

const props = {
  company: "Acme",
  title: "Engineer",
  location: "",
  start: "Jan 2020",
  summary: "",
  highlights: [],
  stack: [],
};

it("shows Present for a role without an end date", () => {
  render(
    <ol>
      <TimelineItem {...props} end="" />
    </ol>,
  );
  expect(screen.getByText(/Jan 2020 – Present/)).toBeInTheDocument();
});

it("shows the end date, highlights, location and stack", () => {
  render(
    <ol>
      <TimelineItem
        {...props}
        end="Feb 2022"
        location="Chicago, IL"
        highlights={[{ text: "Did a thing", caseStudy: null }]}
        stack={["React", "Jest"]}
      />
    </ol>,
  );
  expect(screen.getByText(/Jan 2020 – Feb 2022/)).toBeInTheDocument();
  expect(screen.getByText("Did a thing")).toBeInTheDocument();
  expect(screen.getByText("Chicago, IL")).toBeInTheDocument();
  expect(screen.getByText("React · Jest")).toBeInTheDocument();
});

it("links a highlight to its case study", () => {
  render(
    <ol>
      <TimelineItem
        {...props}
        end="Feb 2022"
        highlights={[
          { text: "Cut CI time", caseStudy: "ci-affected-tests" },
          { text: "Wrote docs", caseStudy: null },
        ]}
        readLabel="Read more"
      />
    </ol>,
  );
  expect(screen.getByRole("link", { name: "Read more" })).toHaveAttribute(
    "href",
    "/case-studies/ci-affected-tests",
  );
  expect(screen.getAllByRole("link")).toHaveLength(1);
});
