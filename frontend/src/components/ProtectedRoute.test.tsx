import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";

describe("ProtectedRoute", () => {
  it("displays an informative in-page prompt instead of redirecting when user is not logged in", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/upload"]}>
          <Routes>
            <Route path="/login" element={<div>Mock Login Screen</div>} />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <div>Secret Upload Protected Area</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    // Should stay on /upload with the informative in-page prompt
    expect(
      screen.getByRole("heading", { name: /Sign in to screen your document/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Private & Confidential/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Log In/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Free Account/i })
    ).toBeInTheDocument();

    // Does not show the protected secret content
    expect(
      screen.queryByText("Secret Upload Protected Area")
    ).not.toBeInTheDocument();
  });

  it("navigates to /login when clicking Log In button from the prompt", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/upload"]}>
          <Routes>
            <Route path="/login" element={<div>Mock Login Screen</div>} />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <div>Secret Upload Protected Area</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    const loginButton = screen.getByRole("button", { name: /Log In/i });
    fireEvent.click(loginButton);

    expect(screen.getByText("Mock Login Screen")).toBeInTheDocument();
  });
});
