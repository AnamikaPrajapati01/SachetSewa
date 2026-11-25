import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { AuthProvider } from "../context/AuthContext";
import { UploadPage } from "./UploadPage";

describe("UploadPage file validation", () => {
  it("rejects a .txt file with wrong file type error", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <UploadPage />
        </BrowserRouter>
      </AuthProvider>
    );

    const input = screen.getByLabelText(/Upload offer letter or recruitment document/i);
    const checkButton = screen.getByRole("button", { name: /Check this document/i });

    const txtFile = new File(["sample text content"], "document.txt", {
      type: "text/plain",
    });

    fireEvent.change(input, { target: { files: [txtFile] } });

    expect(
      screen.getByText(/Please choose a PDF, JPG, or PNG file/i)
    ).toBeInTheDocument();
    expect(checkButton).toBeDisabled();
  });

  it("rejects a file over 10 MB", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <UploadPage />
        </BrowserRouter>
      </AuthProvider>
    );

    const input = screen.getByLabelText(/Upload offer letter or recruitment document/i);
    const checkButton = screen.getByRole("button", { name: /Check this document/i });

    const largeFile = new File(["dummy content"], "large_document.pdf", {
      type: "application/pdf",
    });
    // Set file size to 11 MB
    Object.defineProperty(largeFile, "size", { value: 11 * 1024 * 1024 });

    fireEvent.change(input, { target: { files: [largeFile] } });

    expect(
      screen.getByText(/This file is larger than 10 MB/i)
    ).toBeInTheDocument();
    expect(checkButton).toBeDisabled();
  });

  it("accepts a small PDF file and enables the check button", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <UploadPage />
        </BrowserRouter>
      </AuthProvider>
    );

    const input = screen.getByLabelText(/Upload offer letter or recruitment document/i);
    const checkButton = screen.getByRole("button", { name: /Check this document/i });

    const validPdf = new File(["%PDF-1.4 sample"], "sample_offer_letter.pdf", {
      type: "application/pdf",
    });
    Object.defineProperty(validPdf, "size", { value: 250 * 1024 }); // 250 KB

    fireEvent.change(input, { target: { files: [validPdf] } });

    expect(screen.getByText("sample_offer_letter.pdf")).toBeInTheDocument();
    expect(checkButton).toBeEnabled();
  });
});

