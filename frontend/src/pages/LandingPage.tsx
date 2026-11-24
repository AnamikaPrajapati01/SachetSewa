import React from "react";
import { Link } from "react-router-dom";
import {
  FileUp,
  Search,
  Building2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { en } from "../i18n/en";
import { PageContainer } from "../components/PageContainer";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Disclaimer } from "../components/Disclaimer";
import "./LandingPage.css";

export const LandingPage: React.FC = () => {
  return (
    <PageContainer className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero" aria-labelledby="hero-title">
        <div className="landing-hero-content">
          <div className="landing-hero-badge">
            <ShieldCheck size={18} aria-hidden="true" />
            <span>{en.brand.tagline}</span>
          </div>
          <h1 id="hero-title" className="landing-hero-title">
            {en.landing.hero.title}
          </h1>
          <p className="landing-hero-subtitle">
            {en.landing.hero.valueStatement}
          </p>
          <div className="landing-hero-actions">
            <Link to="/upload" className="landing-cta-link">
              <Button size="lg" variant="primary">
                <FileUp size={20} aria-hidden="true" />
                <span>{en.landing.hero.primaryCta}</span>
              </Button>
            </Link>
            <Link to="/about" className="landing-secondary-link">
              <Button size="lg" variant="outline">
                <span>{en.landing.hero.secondaryCta}</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3-Step "How it works" */}
      <section className="landing-section" aria-labelledby="how-it-works-title">
        <div className="landing-section-header">
          <h2 id="how-it-works-title" className="landing-section-title">
            {en.landing.howItWorks.title}
          </h2>
          <p className="landing-section-subtitle">
            {en.landing.howItWorks.subtitle}
          </p>
        </div>

        <div className="landing-steps-grid">
          <Card className="landing-step-card">
            <div className="landing-step-header">
              <span className="landing-step-number" aria-hidden="true">
                {en.landing.howItWorks.step1.number}
              </span>
              <FileUp size={24} className="landing-step-icon" aria-hidden="true" />
            </div>
            <h3 className="landing-step-title">{en.landing.howItWorks.step1.title}</h3>
            <p className="landing-step-desc">{en.landing.howItWorks.step1.description}</p>
          </Card>

          <Card className="landing-step-card">
            <div className="landing-step-header">
              <span className="landing-step-number" aria-hidden="true">
                {en.landing.howItWorks.step2.number}
              </span>
              <Search size={24} className="landing-step-icon" aria-hidden="true" />
            </div>
            <h3 className="landing-step-title">{en.landing.howItWorks.step2.title}</h3>
            <p className="landing-step-desc">{en.landing.howItWorks.step2.description}</p>
          </Card>

          <Card className="landing-step-card">
            <div className="landing-step-header">
              <span className="landing-step-number" aria-hidden="true">
                {en.landing.howItWorks.step3.number}
              </span>
              <Building2 size={24} className="landing-step-icon" aria-hidden="true" />
            </div>
            <h3 className="landing-step-title">{en.landing.howItWorks.step3.title}</h3>
            <p className="landing-step-desc">{en.landing.howItWorks.step3.description}</p>
          </Card>
        </div>
      </section>

      {/* Scope: What We Can and Cannot Tell You */}
      <section className="landing-section" aria-labelledby="scope-title">
        <div className="landing-section-header">
          <h2 id="scope-title" className="landing-section-title">
            {en.landing.scope.title}
          </h2>
          <p className="landing-section-subtitle">
            {en.landing.scope.subtitle}
          </p>
        </div>

        <div className="landing-scope-grid">
          <Card className="landing-scope-card landing-scope-can">
            <h3 className="landing-scope-heading">{en.landing.scope.canTitle}</h3>
            <ul className="landing-scope-list">
              {en.landing.scope.canItems.map((item, index) => (
                <li key={index} className="landing-scope-item">
                  <CheckCircle2 size={18} className="landing-scope-icon can" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="landing-scope-card landing-scope-cannot">
            <h3 className="landing-scope-heading">{en.landing.scope.cannotTitle}</h3>
            <ul className="landing-scope-list">
              {en.landing.scope.cannotItems.map((item, index) => (
                <li key={index} className="landing-scope-item">
                  <XCircle size={18} className="landing-scope-icon cannot" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* DoFE Official Verification CTA Banner */}
      <section className="landing-dofe-banner" aria-labelledby="dofe-banner-title">
        <Card variant="highlight" className="landing-dofe-card">
          <div className="landing-dofe-info">
            <h2 id="dofe-banner-title" className="landing-dofe-title">
              {en.landing.dofeBanner.title}
            </h2>
            <p className="landing-dofe-text">
              {en.landing.dofeBanner.text}
            </p>
          </div>
          <a
            href={en.landing.dofeBanner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="landing-dofe-button"
          >
            <span>{en.landing.dofeBanner.buttonText}</span>
            <ExternalLink size={18} aria-label={en.common.externalLinkNotice} />
          </a>
        </Card>
      </section>

      {/* Mandatory Disclaimer */}
      <Disclaimer />
    </PageContainer>
  );
};
