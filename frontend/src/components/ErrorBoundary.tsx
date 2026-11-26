import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { en } from "../i18n/en";
import { PageContainer } from "./PageContainer";
import { Card } from "./Card";
import { Button } from "./Button";
import "./ErrorBoundary.css";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Development error logging
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <PageContainer className="error-boundary-container">
          <Card className="error-boundary-card">
            <div className="error-icon-wrap" aria-hidden="true">
              <AlertTriangle size={40} className="error-icon" />
            </div>
            <h1 className="error-title">{en.errorBoundary.title}</h1>
            <p className="error-message">{en.errorBoundary.message}</p>

            <div className="error-actions">
              <Button variant="primary" onClick={this.handleReload}>
                <RefreshCw size={16} aria-hidden="true" />
                <span>{en.errorBoundary.retryButton}</span>
              </Button>
              <a href="/" className="btn btn-secondary error-home-btn">
                {en.errorBoundary.homeButton}
              </a>
            </div>
          </Card>
        </PageContainer>
      );
    }

    return this.props.children;
  }
}
