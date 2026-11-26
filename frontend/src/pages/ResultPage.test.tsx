import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { ResultPage } from "./ResultPage";

describe("ResultPage", () => {
  it("renders High Risk result with badge, summary, DoFE link, next-step wording, and disclaimer", async () => {
    render(
      <MemoryRouter initialEntries={["/result/doc-high-001"]}>
        <Routes>
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Initial loading state
    expect(screen.getByRole("status")).toBeInTheDocument();

    // High risk badge text & score
    const badge = await screen.findByRole("status", { name: /High Risk - score 78 out of 100/i });
    expect(badge).toBeInTheDocument();

    // One-sentence summary
    expect(
      screen.getByText("We found 5 warning signs in this document.")
    ).toBeInTheDocument();

    // Level-specific next-step wording for High risk
    expect(
      screen.getByText(
        "Do not pay money or share more personal information until you verify this offer through official channels."
      )
    ).toBeInTheDocument();

    // Verify DoFE primary button exists with official URL
    const dofeBtn = screen.getByRole("link", { name: /Verify with DoFE/i });
    expect(dofeBtn).toHaveAttribute("href", "https://dofe.gov.np/");
    expect(dofeBtn).toHaveAttribute("target", "_blank");

    // Always-visible disclaimer
    expect(
      screen.getByText(
        /SachetSewa is a screening tool, not an official verification\. This result is not proof that an offer is genuine or fraudulent\./i
      )
    ).toBeInTheDocument();
  });

  it("renders Medium Risk result with badge, summary, and next-step wording", async () => {
    render(
      <MemoryRouter initialEntries={["/result/doc-medium-002"]}>
        <Routes>
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </MemoryRouter>
    );

    const badge = await screen.findByRole("status", { name: /Medium Risk - score 45 out of 100/i });
    expect(badge).toBeInTheDocument();

    expect(
      screen.getByText("We found 2 warning signs in this document.")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Check the concerns below and verify with DoFE before paying or committing."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /SachetSewa is a screening tool, not an official verification/i
      )
    ).toBeInTheDocument();
  });

  it("renders Low Risk result with badge, summary, and next-step wording", async () => {
    render(
      <MemoryRouter initialEntries={["/result/doc-low-003"]}>
        <Routes>
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </MemoryRouter>
    );

    const badge = await screen.findByRole("status", { name: /Low Risk - score 12 out of 100/i });
    expect(badge).toBeInTheDocument();

    expect(
      screen.getByText("We found 1 warning sign in this document.")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Few warning signs found. Still verify with DoFE before committing."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /SachetSewa is a screening tool, not an official verification/i
      )
    ).toBeInTheDocument();
  });

  it("opens accessible delete confirmation dialog when Delete button is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/result/doc-high-001"]}>
        <Routes>
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByRole("status", { name: /High Risk/i });

    const deleteBtn = screen.getByRole("button", { name: /Delete this document/i });
    fireEvent.click(deleteBtn);

    // Confirmation dialog appears
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/Delete this document\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete this document and its screening results\?/i)
    ).toBeInTheDocument();

    // Cancel dismisses dialog
    const cancelBtn = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelBtn);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("renders low-confidence warning notice when warnings exist on result", async () => {
    render(
      <MemoryRouter initialEntries={["/result/doc-warning-004"]}>
        <Routes>
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </MemoryRouter>
    );

    const warningNotice = await screen.findByText(
      /We could not read part of this document, so results may be incomplete\./i
    );
    expect(warningNotice).toBeInTheDocument();
  });
});
