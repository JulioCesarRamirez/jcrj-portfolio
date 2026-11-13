import { render, screen } from "@testing-library/react";
import { Header, initials } from "./Header";

describe("initials", () => {
  it("takes the first letters of the first two words", () => {
    expect(initials("Julio Ramirez")).toBe("JR");
    expect(initials("  ada  ")).toBe("A");
  });
});

it("renders nav, contact link and theme toggle", () => {
  render(
    <Header
      name="Julio Ramirez"
      nav={[{ label: "Work", href: "/work" }]}
      contactLabel="Contact"
    />,
  );
  expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
    "href",
    "/work",
  );
  expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
    "href",
    "/#contact",
  );
  expect(
    screen.getByRole("button", { name: "Toggle color theme" }),
  ).toBeInTheDocument();
});
