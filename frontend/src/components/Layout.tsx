import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import "./Layout.css";

export const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="layout-header-inner">
          <Link to="/" className="layout-brand">
            <ShieldCheck size={28} className="layout-brand-icon" />
            <span className="layout-brand-name">SachetSewa</span>
          </Link>
          <nav className="layout-nav">
            <Link to="/" className="layout-nav-link">Home</Link>
            <Link to="/upload" className="layout-nav-link">Check Document</Link>
            <Link to="/history" className="layout-nav-link">History</Link>
            <Link to="/about" className="layout-nav-link">About</Link>
            <Link to="/login" className="layout-nav-link">Log In</Link>
            <Link to="/register" className="layout-nav-btn">Register</Link>
          </nav>
        </div>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <footer className="layout-footer">
        <div className="layout-footer-inner">
          <p className="layout-disclaimer">
            SachetSewa is a screening tool, not an official verification. This
            result is not proof that an offer is genuine or fraudulent.
          </p>
          <p className="layout-footnote">
            Department of Foreign Employment (DoFE), Government of Nepal, is the official verification authority.
          </p>
        </div>
      </footer>
    </div>
  );
};
