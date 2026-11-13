import { render, screen } from "@testing-library/react";
import { ButtonLink } from "./ButtonLink";

describe("ButtonLink", () => {
  it("links internal and external hrefs", () => {
    render(
      <>
        <ButtonLink href="/about">Inside</ButtonLink>
        <ButtonLink href="mailto:a@b.co" variant="secondary">
          Mail
        </ButtonLink>
      </>,
    );
    expect(screen.getByRole("link", { name: "Inside" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: "Mail" })).toHaveAttribute(
      "href",
      "mailto:a@b.co",
    );
  });
});
