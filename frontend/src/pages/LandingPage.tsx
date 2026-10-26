import React from "react";
import { Link } from "react-router-dom";

export const LandingPage: React.FC = () => {
  return (
    <section aria-labelledby="landing-title" style={{ padding: "1.5rem 0" }}>
      <h1 id="landing-title" style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--color-primary)" }}>
        SachetSewa — Foreign Employment Document Screening
      </h1>
      <p style={{ color: "var(--color-muted)", fontSize: "1.1rem", marginBottom: "1.5rem", maxWidth: "700px" }}>
        Screen your foreign-employment offer letter or recruitment document for common warning signs before you pay fees or share personal information.
      </p>
      <div>
        <Link to="/upload" className="layout-nav-btn">
          Check a Document
        </Link>
      </div>
    </section>
  );
};
