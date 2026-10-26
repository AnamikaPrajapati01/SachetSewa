import React from "react";

export const HistoryPage: React.FC = () => {
  return (
    <section aria-labelledby="history-title" style={{ padding: "1.5rem 0" }}>
      <h1 id="history-title" style={{ fontSize: "1.75rem", marginBottom: "1rem", color: "var(--color-primary)" }}>
        Analysis History
      </h1>
      <p style={{ color: "var(--color-muted)" }}>
        Review previous document screenings and risk indicator summaries.
      </p>
    </section>
  );
};
