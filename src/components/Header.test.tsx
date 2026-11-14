import { render, screen, within } from "@testing-library/react";
import { Header, initials } from "./Header";

jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

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
  const primary = screen.getByRole("navigation", { name: "Primary" });
  expect(within(primary).getByRole("link", { name: "Work" })).toHaveAttribute(
    "href",
    "/work",
  );
  expect(screen.getAllByRole("link", { name: "Contact" })[0]).toHaveAttribute(
    "href",
    "/#contact",
  );
  expect(
    screen.getByRole("button", { name: "Toggle color theme" }),
  ).toBeInTheDocument();
});

it("shows the resume link only with a file", () => {
  const props = { name: "Julio Ramirez", nav: [], contactLabel: "Contact" };
  const { rerender } = render(<Header {...props} />);
  expect(
    screen.queryAllByRole("link", { name: "Download resume (PDF)" }),
  ).toHaveLength(0);
  rerender(
    <Header
      {...props}
      resume={{
        label: "Download resume",
        href: "/resume/Julio_Ramirez_Resume.pdf",
      }}
    />,
  );
  for (const link of screen.getAllByRole("link", {
    name: "Download resume (PDF)",
  }))
    expect(link).toHaveAttribute("href", "/resume/Julio_Ramirez_Resume.pdf");
});
