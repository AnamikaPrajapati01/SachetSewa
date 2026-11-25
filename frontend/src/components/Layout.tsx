import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, Menu, X, ExternalLink, LogOut, User as UserIcon } from "lucide-react";
import { en } from "../i18n/en";
import { useAuth } from "../context/AuthContext";
import { Disclaimer } from "./Disclaimer";
import "./Layout.css";

export const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const closeMenu = () => setMobileMenuOpen(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <div className="layout-container">
      {/* Skip to Content for Screen Readers & Keyboard Nav */}
      <a href="#main-content" className="skip-link">
        {en.nav.skipToContent}
      </a>

      <header className="layout-header">
        <div className="layout-header-inner">
          <Link to="/" className="layout-brand" onClick={closeMenu} aria-label={`${en.brand.name} Home`}>
            <ShieldCheck size={28} className="layout-brand-icon" aria-hidden="true" />
            <span className="layout-brand-name">{en.brand.name}</span>
          </Link>

          {/* Mobile menu hamburger toggle */}
          <button
            type="button"
            className="layout-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={en.nav.menuToggle}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
          >
            {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>

          {/* Primary Navigation */}
          <nav
            id="primary-navigation"
            className={`layout-nav ${mobileMenuOpen ? "layout-nav-open" : ""}`}
            aria-label="Main Navigation"
          >
            <Link
              to="/"
              className={`layout-nav-link ${isActive("/") ? "active" : ""}`}
              onClick={closeMenu}
            >
              {en.nav.home}
            </Link>
            <Link
              to="/upload"
              className={`layout-nav-link ${isActive("/upload") ? "active" : ""}`}
              onClick={closeMenu}
            >
              {en.nav.checkDocument}
            </Link>
            <Link
              to="/history"
              className={`layout-nav-link ${isActive("/history") ? "active" : ""}`}
              onClick={closeMenu}
            >
              {en.nav.history}
            </Link>
            <Link
              to="/about"
              className={`layout-nav-link ${isActive("/about") ? "active" : ""}`}
              onClick={closeMenu}
            >
              {en.nav.about}
            </Link>

            {isAuthenticated ? (
              <div className="layout-nav-user-group">
                <span className="layout-user-pill" title={user?.email}>
                  <UserIcon size={16} aria-hidden="true" />
                  <span className="layout-user-email">{user?.email}</span>
                </span>
                <button
                  type="button"
                  className="layout-nav-link layout-nav-logout-btn"
                  onClick={handleLogout}
                >
                  <LogOut size={16} aria-hidden="true" />
                  <span>{en.nav.logout}</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`layout-nav-link layout-nav-login ${isActive("/login") ? "active" : ""}`}
                onClick={closeMenu}
              >
                {en.nav.login}
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main id="main-content" className="layout-main" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="layout-footer">
        <div className="layout-footer-inner">
          <Disclaimer />
          <div className="layout-footer-authority">
            <p className="layout-footer-text">
              {en.footer.authorityNotice}
            </p>
            <a
              href="https://dofe.gov.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="layout-footer-dofe-link"
            >
              <span>{en.footer.dofeLinkText}</span>
              <ExternalLink size={16} aria-label={en.common.externalLinkNotice} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
