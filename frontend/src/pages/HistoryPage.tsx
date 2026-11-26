import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Trash2, ArrowUpRight, PlusCircle, Inbox } from "lucide-react";
import { mockGetHistory, mockDeleteDocument, MockAnalysisResult } from "../api/mock";
import { en } from "../i18n/en";
import { PageContainer } from "../components/PageContainer";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { RiskBadge } from "../components/RiskBadge";
import { ConfirmDialog } from "../components/ConfirmDialog";
import "./HistoryPage.css";

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();

  const [historyItems, setHistoryItems] = useState<MockAnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MockAnalysisResult | null>(null);

  const fetchHistory = () => {
    setIsLoading(true);
    mockGetHistory()
      .then((items) => {
        setHistoryItems(items);
        setIsLoading(false);
      })
      .catch(() => {
        setHistoryItems([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeletingId(itemToDelete.id);
    try {
      await mockDeleteDocument(itemToDelete.id);
      setHistoryItems((prev) => prev.filter((item) => item.id !== itemToDelete.id));
      setItemToDelete(null);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  if (isLoading) {
    return (
      <PageContainer className="history-container" aria-busy="true">
        <header className="history-header">
          <h1 className="history-title">{en.history.title}</h1>
          <p className="history-subtitle">{en.history.subtitle}</p>
        </header>

        <div className="history-loading-list" role="status">
          <div className="history-skeleton-item" />
          <div className="history-skeleton-item" />
          <div className="history-skeleton-item" />
          <span className="sr-only">{en.history.loading}</span>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="history-container">
      <header className="history-header">
        <div className="history-header-content">
          <h1 className="history-title">{en.history.title}</h1>
          <p className="history-subtitle">{en.history.subtitle}</p>
        </div>

        {historyItems.length > 0 && (
          <Button
            variant="primary"
            onClick={() => navigate("/upload")}
            className="history-new-check-btn"
          >
            <PlusCircle size={18} aria-hidden="true" />
            <span>{en.history.emptyCta}</span>
          </Button>
        )}
      </header>

      {historyItems.length === 0 ? (
        <Card className="history-empty-card">
          <div className="empty-icon-wrap" aria-hidden="true">
            <Inbox size={48} className="empty-icon" />
          </div>
          <h2 className="empty-title">{en.history.emptyTitle}</h2>
          <p className="empty-subtitle">{en.history.emptySubtitle}</p>
          <Button
            variant="primary"
            onClick={() => navigate("/upload")}
            className="empty-cta-btn"
          >
            <PlusCircle size={18} aria-hidden="true" />
            <span>{en.history.emptyCta}</span>
          </Button>
        </Card>
      ) : (
        <div className="history-list-wrap">
          {/* Mobile view card stack / desktop table layout */}
          <div className="history-table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th scope="col">{en.history.dateColumn}</th>
                  <th scope="col">{en.history.documentColumn}</th>
                  <th scope="col">{en.history.riskColumn}</th>
                  <th scope="col" className="text-right">
                    {en.history.actionsColumn}
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyItems.map((item) => (
                  <tr key={item.id} className="history-row">
                    <td className="history-date-cell">{formatDate(item.createdAt)}</td>
                    <td className="history-file-cell">
                      <div className="history-file-info">
                        <FileText size={18} className="file-icon" aria-hidden="true" />
                        <span className="file-name" title={item.filename}>
                          {item.filename}
                        </span>
                      </div>
                    </td>
                    <td className="history-risk-cell">
                      <RiskBadge level={item.level} score={item.score} size="sm" />
                    </td>
                    <td className="history-actions-cell text-right">
                      <div className="history-actions-group">
                        <Button
                          variant="secondary"
                          onClick={() => navigate(`/result/${item.id}`)}
                          className="action-btn-sm"
                          aria-label={`${en.history.openButton} for ${item.filename}`}
                        >
                          <span>{en.history.openButton}</span>
                          <ArrowUpRight size={16} aria-hidden="true" />
                        </Button>
                        <button
                          type="button"
                          onClick={() => setItemToDelete(item)}
                          className="history-delete-icon-btn"
                          aria-label={`${en.history.deleteButton} ${item.filename}`}
                          title={en.history.deleteButton}
                        >
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal Dialog */}
      <ConfirmDialog
        isOpen={Boolean(itemToDelete)}
        title={en.history.deleteConfirmTitle}
        message={en.history.deleteConfirmMessage}
        confirmLabel={en.history.deleteConfirmAction}
        cancelLabel={en.history.deleteCancelAction}
        variant="danger"
        isProcessing={deletingId === itemToDelete?.id}
        onConfirm={handleConfirmDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </PageContainer>
  );
};
