import React from "react";

export const UploadPage: React.FC = () => {
  return (
    <section aria-labelledby="upload-title" style={{ padding: "1.5rem 0" }}>
      <h1 id="upload-title" style={{ fontSize: "1.75rem", marginBottom: "1rem", color: "var(--color-primary)" }}>
        Check a Document
      </h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "1rem" }}>
        Upload an offer letter or recruitment document (PDF, JPG or PNG, up to 10 MB).
      </p>
      <div style={{ padding: "2rem", border: "2px dashed var(--color-border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--color-surface)", textAlign: "center" }}>
        <p style={{ color: "var(--color-ink)", fontWeight: 500 }}>
          Document upload form placeholder
        </p>
        <p style={{ color: "var(--color-muted)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
          Your file is private and used only to analyze your document.
        </p>
      </div>
    </section>
  );
};
