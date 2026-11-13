import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SegmentedFilter } from "./SegmentedFilter";

const options = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
] as const;

it("marks the active option and reports changes", async () => {
  const onChange = jest.fn();
  render(
    <SegmentedFilter
      label="Filter"
      options={options}
      value="a"
      onChange={onChange}
    />,
  );

  expect(screen.getByRole("button", { name: "A" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(screen.getByRole("button", { name: "B" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );

  await userEvent.click(screen.getByRole("button", { name: "B" }));
  expect(onChange).toHaveBeenCalledWith("b");
});
