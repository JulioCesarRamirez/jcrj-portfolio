import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

it("renders name, year, links and an email link", () => {
  render(
    <Footer
      name="Julio"
      year={2030}
      email="a@b.co"
      links={[{ label: "GitHub", url: "https://github.com/x" }]}
    />,
  );
  expect(screen.getByText("© 2030 Julio")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/x",
  );
  expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
    "href",
    "mailto:a@b.co",
  );
});

it("skips the email link when no email is set", () => {
  render(<Footer name="Julio" email="" links={[]} />);
  expect(screen.queryByRole("link")).not.toBeInTheDocument();
});
