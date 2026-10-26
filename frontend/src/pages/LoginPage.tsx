import React from "react";

export const LoginPage: React.FC = () => {
  return (
    <section aria-labelledby="login-title" style={{ padding: "1.5rem 0" }}>
      <h1 id="login-title" style={{ fontSize: "1.75rem", marginBottom: "1rem", color: "var(--color-primary)" }}>
        Log In
      </h1>
      <p style={{ color: "var(--color-muted)" }}>
        Access your account to review your document screening history.
      </p>
    </section>
  );
};
