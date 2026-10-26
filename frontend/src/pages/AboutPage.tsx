import React from "react";

export const AboutPage: React.FC = () => {
  return (
    <section aria-labelledby="about-title" style={{ padding: "1.5rem 0" }}>
      <h1 id="about-title" style={{ fontSize: "1.75rem", marginBottom: "1rem", color: "var(--color-primary)" }}>
        About SachetSewa
      </h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "1rem", maxWidth: "700px" }}>
        SachetSewa is an academic research project developed to provide preliminary screening and awareness against common foreign-employment recruitment fraud indicators.
      </p>
      <div style={{ backgroundColor: "var(--color-surface)", padding: "1.5rem", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border)", maxWidth: "700px" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--color-ink)" }}>
          Official Verification
        </h2>
        <p style={{ color: "var(--color-muted)", fontSize: "0.95rem" }}>
          SachetSewa does not provide legal determination of authenticity. Always verify recruitment documents directly with the Department of Foreign Employment (DoFE), Government of Nepal.
        </p>
      </div>
    </section>
  );
};
