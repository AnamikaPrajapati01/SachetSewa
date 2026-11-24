import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { Layout } from "./Layout";

describe("Layout", () => {
  it("renders brand wordmark, skip link, and navigation links", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    // Skip to content link
    expect(
      screen.getByRole("link", { name: /Skip to main content/i })
    ).toBeInTheDocument();

    // Brand logo wordmark
    expect(
      screen.getByRole("link", { name: /SachetSewa Home/i })
    ).toBeInTheDocument();

    // Primary navigation links
    expect(screen.getByRole("link", { name: /^Home$/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Check a document/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^History$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^About$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Login$/i })).toBeInTheDocument();

    // Footer disclaimer
    expect(
      screen.getByText(/SachetSewa is a screening tool, not an official verification/i)
    ).toBeInTheDocument();
  });
});

