import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { AuthProvider } from "../context/AuthContext";
import { RegisterPage } from "./RegisterPage";

describe("RegisterPage validation", () => {
  it("shows an error when password is less than 10 characters", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/^Password$/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/i);
    const submitButton = screen.getByRole("button", { name: /Create Account/i });

    fireEvent.change(emailInput, { target: { value: "applicant@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "short" } });
    fireEvent.click(submitButton);

    expect(
      screen.getByText(/Password must be at least 10 characters long/i)
    ).toBeInTheDocument();
  });

  it("shows an error when passwords do not match", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/^Password$/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/i);
    const submitButton = screen.getByRole("button", { name: /Create Account/i });

    fireEvent.change(emailInput, { target: { value: "applicant@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "securepassword123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "differentpassword456" } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });
});

