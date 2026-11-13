import { render, screen } from "@testing-library/react";
import { MetricStrip } from "./MetricStrip";

it("renders each metric with its label and optional note", () => {
  render(
    <MetricStrip
      label="Proof"
      items={[
        { value: "9+", label: "years" },
        {
          value: "Bridge → JSI",
          label: "native calls",
          note: "to confirm",
          highlight: true,
        },
      ]}
    />,
  );
  expect(screen.getByRole("region", { name: "Proof" })).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
  expect(screen.getByText("Bridge → JSI")).toHaveClass("text-accent");
  expect(screen.getByText("9+")).not.toHaveClass("text-accent");
  expect(screen.getByText("to confirm")).toBeInTheDocument();
});

it("renders nothing when empty", () => {
  const { container } = render(<MetricStrip label="Proof" items={[]} />);
  expect(container).toBeEmptyDOMElement();
});
