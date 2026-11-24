import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RiskBadge } from "./RiskBadge";

describe("RiskBadge", () => {
  it("renders Low Risk label with appropriate styling", () => {
    render(<RiskBadge level="low" />);
    const badge = screen.getByRole("status");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Low Risk");
    expect(badge).toHaveClass("risk-badge-low");
  });

  it("renders Medium Risk label with appropriate styling", () => {
    render(<RiskBadge level="medium" />);
    const badge = screen.getByRole("status");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Medium Risk");
    expect(badge).toHaveClass("risk-badge-medium");
  });

  it("renders High Risk label with appropriate styling", () => {
    render(<RiskBadge level="high" />);
    const badge = screen.getByRole("status");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("High Risk");
    expect(badge).toHaveClass("risk-badge-high");
  });

  it("displays score when provided", () => {
    render(<RiskBadge level="high" score={78} />);
    const badge = screen.getByRole("status");
    expect(badge).toHaveTextContent("78/100");
  });
});

