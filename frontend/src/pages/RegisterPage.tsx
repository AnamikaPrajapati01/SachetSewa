import React from "react";

export const RegisterPage: React.FC = () => {
  return (
    <section aria-labelledby="register-title" style={{ padding: "1.5rem 0" }}>
      <h1 id="register-title" style={{ fontSize: "1.75rem", marginBottom: "1rem", color: "var(--color-primary)" }}>
        Create an Account
      </h1>
      <p style={{ color: "var(--color-muted)" }}>
        Register to securely check documents and keep track of your screening results.
      </p>
    </section>
  );
};
