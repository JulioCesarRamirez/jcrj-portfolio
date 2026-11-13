import { render, screen } from "@testing-library/react";
import { CurrentlyCard } from "./CurrentlyCard";

it("renders status, items and tags", () => {
  render(
    <CurrentlyCard
      label="Currently"
      status="Open to offers"
      items={[{ title: "Role A", text: "Doing things" }]}
      tags={["React"]}
    />,
  );
  expect(
    screen.getByRole("complementary", { name: "Currently" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Open to offers")).toBeInTheDocument();
  expect(screen.getByText("Role A")).toBeInTheDocument();
  expect(screen.getByText("React")).toBeInTheDocument();
});
