import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

const props = {
  eyebrow: "Senior engineer",
  headline: "Headline",
  valueStatement: "Value",
  primaryCta: { label: "Read", href: "/case-studies" },
  locationLine: "Chicago",
  currently: { label: "Currently", status: "", items: [], tags: [] },
};

it("shows the resume button only when a résumé exists", () => {
  const { rerender } = render(<Hero {...props} resume={null} />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Headline" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "Download resume (PDF)" }),
  ).not.toBeInTheDocument();

  rerender(
    <Hero
      {...props}
      resume={{
        label: "Download resume",
        href: "/resume/Julio_Ramirez_Resume.pdf",
        variant: "mexico",
      }}
    />,
  );
  const link = screen.getByRole("link", { name: "Download resume (PDF)" });
  expect(link).toHaveAttribute("href", "/resume/Julio_Ramirez_Resume.pdf");
  expect(link).toHaveAttribute("download", "Julio_Ramirez_Resume.pdf");
  expect(link).toHaveAttribute("data-track", "resume_download");
  expect(link).toHaveAttribute("data-track-props", '{"variant":"mexico"}');
});
