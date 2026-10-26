import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { LandingPage } from "./LandingPage";

describe("LandingPage", () => {
  it("renders the main title and CTA button", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const titleElement = screen.getByRole("heading", {
      name: /SachetSewa — Foreign Employment Document Screening/i,
    });
    expect(titleElement).toBeInTheDocument();

    const ctaLink = screen.getByRole("link", { name: /Check a Document/i });
    expect(ctaLink).toBeInTheDocument();
  });
});
