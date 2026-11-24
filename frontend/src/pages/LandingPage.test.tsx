import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { LandingPage } from "./LandingPage";

describe("LandingPage", () => {
  it("renders value statement, CTA button, 3 steps, and DoFE link", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    // Hero title & value statement
    expect(
      screen.getByRole("heading", {
        name: /Screen your foreign-employment offer before paying or committing/i,
      })
    ).toBeInTheDocument();

    // Primary CTA link
    const ctaButton = screen.getByRole("link", { name: /Check a document/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "/upload");

    // 3-step section
    expect(
      screen.getByRole("heading", { name: /How SachetSewa works/i })
    ).toBeInTheDocument();

    // Scope section
    expect(
      screen.getByRole("heading", { name: /What we can and cannot tell you/i })
    ).toBeInTheDocument();

    // Official DoFE link
    const dofeLink = screen.getByRole("link", {
      name: /Verify with DoFE \(Official Portal\)/i,
    });
    expect(dofeLink).toBeInTheDocument();
    expect(dofeLink).toHaveAttribute("href", "https://dofe.gov.np/");
    expect(dofeLink).toHaveAttribute("target", "_blank");
    expect(dofeLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
