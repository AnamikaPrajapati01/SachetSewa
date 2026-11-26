import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import * as mockApi from "../api/mock";
import { HistoryPage } from "./HistoryPage";

describe("HistoryPage", () => {
  it("renders list of document screenings with risk badges and action buttons", async () => {
    render(
      <BrowserRouter>
        <HistoryPage />
      </BrowserRouter>
    );

    // Header rendered
    expect(screen.getByRole("heading", { name: /Document History/i })).toBeInTheDocument();

    // Wait for history table to render
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();

    // Check that filenames are rendered
    expect(screen.getByText(/Sample_Hospitality_Offer_2026\.pdf/i)).toBeInTheDocument();

    // Delete and open buttons exist
    const openButtons = screen.getAllByRole("button", { name: /Open result/i });
    expect(openButtons.length).toBeGreaterThan(0);
  });

  it("opens delete confirmation modal when clicking delete button", async () => {
    render(
      <BrowserRouter>
        <HistoryPage />
      </BrowserRouter>
    );

    await screen.findByRole("table");

    const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButtons[0]);

    // Modal dialog opens
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/Delete document history/i)).toBeInTheDocument();

    // Cancel closes dialog
    const cancelBtn = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelBtn);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("renders empty state with CTA button when history has no documents", async () => {
    // Mock getHistory returning empty list
    vi.spyOn(mockApi, "mockGetHistory").mockResolvedValueOnce([]);

    render(
      <BrowserRouter>
        <HistoryPage />
      </BrowserRouter>
    );

    const emptyTitle = await screen.findByText("You have not checked any documents yet.");
    expect(emptyTitle).toBeInTheDocument();

    const ctaButton = screen.getByRole("button", { name: /Check a document/i });
    expect(ctaButton).toBeInTheDocument();
  });
});
