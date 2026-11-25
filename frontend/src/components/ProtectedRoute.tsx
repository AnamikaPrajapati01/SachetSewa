import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Lock, FileSearch, History as HistoryIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { en } from "../i18n/en";
import { PageContainer } from "./PageContainer";
import { Card } from "./Card";
import { Button } from "./Button";
import "./ProtectedRoute.css";

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    const isUpload = location.pathname.includes("upload");
    const isHistory = location.pathname.includes("history");

    const title = isUpload
      ? en.auth.gate.uploadTitle
      : isHistory
      ? en.auth.gate.historyTitle
      : en.auth.gate.defaultTitle;

    const subtitle = isUpload
      ? en.auth.gate.uploadSubtitle
      : isHistory
      ? en.auth.gate.historySubtitle
      : en.auth.gate.defaultSubtitle;

    return (
      <PageContainer className="auth-gate-container">
        <Card className="auth-gate-card">
          <div className="auth-gate-badge" aria-hidden="true">
            {isHistory ? <HistoryIcon size={32} /> : <ShieldCheck size={32} />}
          </div>

          <h1 className="auth-gate-title">{title}</h1>
          <p className="auth-gate-subtitle">{subtitle}</p>

          <div className="auth-gate-benefits">
            <div className="auth-gate-benefit-item">
              <Lock size={18} className="auth-gate-benefit-icon" aria-hidden="true" />
              <div className="auth-gate-benefit-content">
                <span className="auth-gate-benefit-title">{en.auth.gate.benefit1Title}</span>
                <span className="auth-gate-benefit-desc">{en.auth.gate.benefit1Desc}</span>
              </div>
            </div>

            <div className="auth-gate-benefit-item">
              <FileSearch size={18} className="auth-gate-benefit-icon" aria-hidden="true" />
              <div className="auth-gate-benefit-content">
                <span className="auth-gate-benefit-title">{en.auth.gate.benefit2Title}</span>
                <span className="auth-gate-benefit-desc">{en.auth.gate.benefit2Desc}</span>
              </div>
            </div>

            <div className="auth-gate-benefit-item">
              <HistoryIcon size={18} className="auth-gate-benefit-icon" aria-hidden="true" />
              <div className="auth-gate-benefit-content">
                <span className="auth-gate-benefit-title">{en.auth.gate.benefit3Title}</span>
                <span className="auth-gate-benefit-desc">{en.auth.gate.benefit3Desc}</span>
              </div>
            </div>
          </div>

          <div className="auth-gate-actions">
            <Button
              variant="primary"
              onClick={() => navigate("/login", { state: { from: location } })}
            >
              {en.auth.gate.loginCta}
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/register", { state: { from: location } })}
            >
              {en.auth.gate.registerCta}
            </Button>
          </div>

          <div className="auth-gate-footer">
            <Link to="/about" className="auth-gate-link">
              {en.auth.gate.learnMore} &rarr;
            </Link>
          </div>
        </Card>
      </PageContainer>
    );
  }

  return <>{children}</>;
};
