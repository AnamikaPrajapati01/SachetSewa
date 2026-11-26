import React, { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";
import "./ConfirmDialog.css";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  isProcessing?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isProcessing = false,
  onConfirm,
  onCancel,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store trigger element to restore focus on close
      triggerRef.current = document.activeElement as HTMLElement;

      // Find all focusable elements within dialog
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      // Focus first focusable element (cancel button by default for safety)
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        } else if (e.key === "Tab") {
          if (!dialogRef.current) return;
          const focusables = Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          );
          if (focusables.length === 0) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      };
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="confirm-overlay" role="presentation" onClick={onCancel}>
      <div
        ref={dialogRef}
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-header">
          {variant === "danger" && (
            <div className="confirm-icon danger" aria-hidden="true">
              <AlertTriangle size={24} />
            </div>
          )}
          <h2 id="confirm-dialog-title" className="confirm-title">
            {title}
          </h2>
        </div>

        <p id="confirm-dialog-desc" className="confirm-message">
          {message}
        </p>

        <div className="confirm-actions">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isProcessing}
            type="button"
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "danger" ? "primary" : "primary"}
            className={variant === "danger" ? "btn-danger" : ""}
            onClick={onConfirm}
            disabled={isProcessing}
            type="button"
          >
            {isProcessing ? "Processing..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
