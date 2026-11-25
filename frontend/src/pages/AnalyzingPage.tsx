import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Loader2,
  Circle,
  RefreshCw,
  FileUp,
} from "lucide-react";
import { en } from "../i18n/en";
import { mockPerformAnalysisStep } from "../api/mock";
import { PageContainer } from "../components/PageContainer";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Alert } from "../components/Alert";
import "./AnalyzingPage.css";

type StepStatus = "waiting" | "in_progress" | "done";

interface StepItem {
  id: number;
  label: string;
}

const STEPS: StepItem[] = [
  { id: 1, label: en.analyzing.step1 },
  { id: 2, label: en.analyzing.step2 },
  { id: 3, label: en.analyzing.step3 },
  { id: 4, label: en.analyzing.step4 },
];

export const AnalyzingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>([
    "in_progress",
    "waiting",
    "waiting",
    "waiting",
  ]);
  const [hasFailed, setHasFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const documentId = id || "demo-doc";

  const runAnalysis = useCallback(async () => {
    setHasFailed(false);
    setErrorMessage(null);

    // Initialize step statuses
    const initialStatuses: StepStatus[] = ["in_progress", "waiting", "waiting", "waiting"];
    setStepStatuses(initialStatuses);
    setCurrentStepIndex(0);

    for (let i = 0; i < STEPS.length; i++) {
      setCurrentStepIndex(i);

      // Set current step to in_progress and previous to done
      setStepStatuses((prev) =>
        prev.map((_, idx) => {
          if (idx < i) return "done";
          if (idx === i) return "in_progress";
          return "waiting";
        })
      );

      // Perform simulated backend step
      const stepResult = await mockPerformAnalysisStep(documentId, i + 1);

      if (!stepResult.success) {
        setHasFailed(true);
        setErrorMessage(stepResult.error || en.analyzing.failedMessage);
        return;
      }
    }

    // Mark all done
    setStepStatuses(["done", "done", "done", "done"]);

    // Brief pause on completion before redirecting to result
    setTimeout(() => {
      navigate(`/result/${documentId}`);
    }, 400);
  }, [documentId, navigate]);

  useEffect(() => {
    runAnalysis();
  }, [runAnalysis]);

  const handleRetry = () => {
    runAnalysis();
  };

  const currentStepLabel =
    !hasFailed && currentStepIndex < STEPS.length
      ? `${STEPS[currentStepIndex].label} (${currentStepIndex + 1} of ${STEPS.length})`
      : hasFailed
      ? "Screening stopped due to an error"
      : "Screening complete";

  return (
    <PageContainer className="analyzing-page-container">
      <Card className="analyzing-card">
        <header className="analyzing-header">
          <h1 className="analyzing-title">{en.analyzing.title}</h1>
          <p className="analyzing-subtitle">{en.analyzing.subtitle}</p>
        </header>

        {/* Accessible live status announcement */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {currentStepLabel}
        </div>

        {/* Failure Error Alert and Retry */}
        {hasFailed && (
          <div className="analyzing-failure-container">
            <Alert type="error" title={en.analyzing.failedTitle}>
              <p>{errorMessage || en.analyzing.failedMessage}</p>
            </Alert>
            <div className="analyzing-failure-actions">
              <Button variant="primary" onClick={handleRetry}>
                <RefreshCw size={18} aria-hidden="true" />
                <span>{en.analyzing.retryButton}</span>
              </Button>
              <Button variant="outline" onClick={() => navigate("/upload")}>
                <FileUp size={18} aria-hidden="true" />
                <span>{en.analyzing.chooseAnotherButton}</span>
              </Button>
            </div>
          </div>
        )}

        {/* Step List Sequence */}
        <div className="analyzing-steps-list" role="list" aria-label="Analysis Steps">
          {STEPS.map((step, idx) => {
            const status = stepStatuses[idx];
            return (
              <div
                key={step.id}
                className={`analyzing-step-item analyzing-step-${status}`}
                role="listitem"
              >
                <div className="analyzing-step-icon-col">
                  {status === "done" && (
                    <CheckCircle2 size={24} className="analyzing-icon-done" aria-hidden="true" />
                  )}
                  {status === "in_progress" && (
                    <Loader2 size={24} className="analyzing-icon-spinner" aria-hidden="true" />
                  )}
                  {status === "waiting" && (
                    <Circle size={24} className="analyzing-icon-waiting" aria-hidden="true" />
                  )}
                  {idx < STEPS.length - 1 && <div className="analyzing-step-connector" />}
                </div>

                <div className="analyzing-step-details">
                  <span className="analyzing-step-text">{step.label}</span>
                  <span className="analyzing-step-badge">
                    {status === "done" && en.analyzing.statusDone}
                    {status === "in_progress" && en.analyzing.statusInProgress}
                    {status === "waiting" && en.analyzing.statusWaiting}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </PageContainer>
  );
};
