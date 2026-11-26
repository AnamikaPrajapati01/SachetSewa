import React from "react";
import {
  ShieldAlert,
  Building2,
  DollarSign,
  FileText,
  FileCheck2,
  PhoneCall,
  Coins,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { en } from "../i18n/en";
import { PageContainer } from "../components/PageContainer";
import { Card } from "../components/Card";
import { RiskBadge } from "../components/RiskBadge";
import { Disclaimer } from "../components/Disclaimer";
import "./AboutPage.css";

export const AboutPage: React.FC = () => {
  const categoryIcons = [
    Building2,
    DollarSign,
    FileText,
    FileCheck2,
    PhoneCall,
    Coins,
  ];

  return (
    <PageContainer className="about-page">
      {/* Page Header */}
      <header className="about-header">
        <h1 className="about-title">{en.about.title}</h1>
        <p className="about-intro">{en.about.intro}</p>
      </header>

      {/* How Scoring Works (The 6 Indicator Categories) */}
      <section className="about-section" aria-labelledby="scoring-title">
        <div className="about-section-header">
          <h2 id="scoring-title" className="about-section-title">
            {en.about.scoring.title}
          </h2>
          <p className="about-section-subtitle">
            {en.about.scoring.description}
          </p>
        </div>

        <div className="about-categories-grid">
          {en.about.scoring.categories.map((cat, idx) => {
            const IconComponent = categoryIcons[idx] || ShieldAlert;
            return (
              <Card key={idx} className="about-category-card">
                <div className="about-category-top">
                  <div className="about-category-icon-wrapper">
                    <IconComponent size={22} className="about-category-icon" aria-hidden="true" />
                  </div>
                  <span className="about-category-weight">{cat.weight}</span>
                </div>
                <h3 className="about-category-name">{cat.name}</h3>
                <p className="about-category-text">{cat.explanation}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* The 3 Risk Levels Explained */}
      <section className="about-section" aria-labelledby="risk-levels-title">
        <div className="about-section-header">
          <h2 id="risk-levels-title" className="about-section-title">
            {en.about.levels.title}
          </h2>
          <p className="about-section-subtitle">
            {en.about.levels.description}
          </p>
        </div>

        <div className="about-levels-grid">
          <Card className="about-level-card about-level-low">
            <div className="about-level-header">
              <RiskBadge level="low" size="md" />
              <span className="about-level-points">{en.about.levels.low.title}</span>
            </div>
            <p className="about-level-advice">{en.about.levels.low.advice}</p>
          </Card>

          <Card className="about-level-card about-level-medium">
            <div className="about-level-header">
              <RiskBadge level="medium" size="md" />
              <span className="about-level-points">{en.about.levels.medium.title}</span>
            </div>
            <p className="about-level-advice">{en.about.levels.medium.advice}</p>
          </Card>

          <Card className="about-level-card about-level-high">
            <div className="about-level-header">
              <RiskBadge level="high" size="md" />
              <span className="about-level-points">{en.about.levels.high.title}</span>
            </div>
            <p className="about-level-advice">{en.about.levels.high.advice}</p>
          </Card>
        </div>
      </section>

      {/* Common Foreign-Employment Warning Signs */}
      <section className="about-section" aria-labelledby="warning-signs-title">
        <div className="about-section-header">
          <h2 id="warning-signs-title" className="about-section-title">
            {en.about.warningSigns.title}
          </h2>
          <p className="about-section-subtitle">
            {en.about.warningSigns.subtitle}
          </p>
        </div>

        <div className="about-warnings-grid">
          {en.about.warningSigns.items.map((item, idx) => (
            <Card key={idx} className="about-warning-card">
              <div className="about-warning-icon-wrapper">
                <AlertTriangle size={20} className="about-warning-icon" aria-hidden="true" />
              </div>
              <div className="about-warning-content">
                <h3 className="about-warning-item-title">{item.title}</h3>
                <p className="about-warning-item-desc">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* What to Do If You Are Worried */}
      <section className="about-section" aria-labelledby="worried-title">
        <Card variant="highlight" className="about-worried-card">
          <div className="about-worried-header">
            <ShieldCheck size={28} className="about-worried-icon" aria-hidden="true" />
            <h2 id="worried-title" className="about-worried-title">
              {en.about.nextSteps.title}
            </h2>
          </div>
          <ul className="about-worried-list">
            {en.about.nextSteps.steps.map((step, idx) => (
              <li key={idx} className="about-worried-item">
                <span className="about-worried-step-num">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <div className="about-dofe-action">
            <a
              href={en.about.nextSteps.dofeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="about-dofe-button"
            >
              <span>{en.about.nextSteps.dofeCta}</span>
              <ExternalLink size={18} aria-label={en.common.externalLinkNotice} />
            </a>
          </div>
        </Card>
      </section>

    </PageContainer>
  );
};
