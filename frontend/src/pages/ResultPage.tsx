import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ExternalLink,
  PlusCircle,
  Trash2,
  ChevronDown,
  Info,
} from "lucide-react";
import { mockGetAnalysisResult, mockDeleteDocument, MockAnalysisResult } from "../api/mock";
import { en } from "../i18n/en";
import { PageContainer } from "../components/PageContainer";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { RiskBadge } from "../components/RiskBadge";
import { Disclaimer } from "../components/Disclaimer";
import { Alert } from "../components/Alert";
import { ConfirmDialog } from "../components/ConfirmDialog";
import "./ResultPage.css";

export const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [result, setResult] = useState<MockAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const docId = id || "doc-high-001";
    mockGetAnalysisResult(docId)
      .then((data) => {
        if (isMounted) {
          setResult(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setResult(null);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!result) return;
    setIsDeleting(true);
    try {
      await mockDeleteDocument(result.id);
      setShowDeleteDialog(false);
      navigate("/history", { replace: true });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <PageContainer className="result-container" aria-busy="true">
        <div className="result-loading-skeleton" role="status">
          <div className="skeleton skeleton-badge" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-box" />
          <div className="skeleton skeleton-card" />
          <div className="skeleton skeleton-card" />
          <span className="sr-only">{en.result.loading}</span>
        </div>
      </PageContainer>
    );
  }

  if (!result) {
    return (
      <PageContainer className="result-container">
        <Card className="result-not-found-card">
          <Info size={40} className="not-found-icon" aria-hidden="true" />
          <h1 className="not-found-title">{en.result.notFoundTitle}</h1>
          <p className="not-found-desc">{en.result.notFoundMessage}</p>
          <div className="not-found-actions">
            <Button variant="primary" onClick={() => navigate("/upload")}>
              {en.result.checkAnotherButton}
            </Button>
            <Button variant="secondary" onClick={() => navigate("/history")}>
              {en.result.backToHistoryButton}
            </Button>
          </div>
        </Card>
      </PageContainer>
    );
  }

  // Sort indicator cards by weight (descending)
  const sortedIndicators = [...result.indicators].sort((a, b) => b.weight - a.weight);

  return (
    <PageContainer className="result-container">
      {/* 0. Low-confidence warning banner if warnings exist */}
      {result.warnings && result.warnings.length > 0 && (
        <div className="result-warning-banner" role="region" aria-label="Screening Notice">
          {result.warnings.map((warn, idx) => (
            <Alert key={idx} type="warning">
              {warn}
            </Alert>
          ))}
        </div>
      )}

      <main className="result-main">
        {/* Design.md §6 Order:
            1. Risk badge: HIGH RISK · 78/100 (large)
            2. One-sentence summary
            3. What to do next (level-specific text)
        */}
        <header className="result-header">
          <div className="result-badge-wrap">
            <RiskBadge level={result.level} score={result.score} size="lg" />
          </div>

          <p className="result-summary">{result.summary}</p>

          <div
            className={`result-next-steps next-steps-${result.level}`}
            role="region"
            aria-label={en.result.whyThisMattersTitle}
          >
            <h2 className="next-steps-title">What to do next</h2>
            <p className="next-steps-text">{result.nextSteps}</p>
          </div>
        </header>

        {/* 4. Indicator cards sorted by weight */}
        <section
          className="result-indicators-section"
          aria-labelledby="indicators-heading"
        >
          <h2 id="indicators-heading" className="indicators-section-title">
            Identified warning signs ({sortedIndicators.length})
          </h2>

          <div className="indicators-list">
            {sortedIndicators.map((indicator) => (
              <Card key={indicator.id || indicator.code} className="indicator-card">
                <div className="indicator-header">
                  <h3 className="indicator-title">{indicator.title}</h3>
                  <span
                    className={`severity-chip severity-${indicator.severity}`}
                    aria-label={`Severity level: ${indicator.severity}`}
                  >
                    {indicator.severity === "high"
                      ? "High warning sign"
                      : indicator.severity === "medium"
                      ? "Medium warning sign"
                      : "Minor warning sign"}
                  </span>
                </div>

                <p className="indicator-explanation">{indicator.explanation}</p>

                <div className="indicator-why-matters">
                  <span className="why-title">{en.result.whyThisMattersTitle}:</span>{" "}
                  <span className="why-text">{indicator.whyThisMatters}</span>
                </div>

                {indicator.technicalDetails && (
                  <details className="indicator-technical-details">
                    <summary className="technical-summary">
                      <span>{en.result.technicalDetailsSummary}</span>
                      <ChevronDown size={16} className="summary-chevron" aria-hidden="true" />
                    </summary>
                    <div className="technical-content">
                      <p>{indicator.technicalDetails}</p>
                    </div>
                  </details>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* 5. Primary CTA: Verify with DoFE */}
        <section className="result-dofe-cta" aria-label="Official verification">
          <a
            href="https://dofe.gov.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary dofe-action-btn"
            aria-label={`${en.result.verifyDofeButton} - ${en.result.verifyDofeHint}`}
          >
            <span>{en.result.verifyDofeButton}</span>
            <ExternalLink size={18} aria-hidden="true" />
          </a>
          <p className="dofe-cta-caption">
            Always verify recruitment permits and contracts directly with the Department of Foreign Employment before making commitments.
          </p>
        </section>

        {/* 6. Always-visible disclaimer */}
        <footer className="result-disclaimer-wrap">
          <Disclaimer />
        </footer>

        {/* 7. Secondary actions: Upload another / Delete */}
        <div className="result-secondary-actions">
          <Button
            variant="secondary"
            onClick={() => navigate("/upload")}
            className="secondary-action-btn"
          >
            <PlusCircle size={18} aria-hidden="true" />
            <span>{en.result.checkAnotherButton}</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => setShowDeleteDialog(true)}
            className="secondary-action-btn btn-delete-document"
          >
            <Trash2 size={18} aria-hidden="true" />
            <span>{en.result.deleteButton}</span>
          </Button>
        </div>
      </main>

      {/* Delete Confirmation Modal Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title={en.result.deleteConfirmTitle}
        message={en.result.deleteConfirmMessage}
        confirmLabel={en.result.deleteConfirmAction}
        cancelLabel={en.result.deleteCancelAction}
        variant="danger"
        isProcessing={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </PageContainer>
  );
};
