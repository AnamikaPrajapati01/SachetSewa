import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadCloud,
  FileText,
  X,
  Shield,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { en } from "../i18n/en";
import { mockUploadDocument } from "../api/mock";
import { PageContainer } from "../components/PageContainer";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Alert } from "../components/Alert";
import "./UploadPage.css";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];

export const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const validateAndSetFile = (file: File) => {
    setErrorMessage(null);

    // Empty file check
    if (file.size === 0) {
      setErrorMessage(en.upload.errors.emptyFile);
      setSelectedFile(null);
      return;
    }

    // File type validation
    const fileExt = "." + file.name.split(".").pop()?.toLowerCase();
    const isMimeValid = ALLOWED_MIME_TYPES.includes(file.type);
    const isExtValid = ALLOWED_EXTENSIONS.includes(fileExt);

    if (!isMimeValid && !isExtValid) {
      setErrorMessage(en.upload.errors.wrongType);
      setSelectedFile(null);
      return;
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(en.upload.errors.tooLarge);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsSubmitting(true);
    try {
      const { documentId } = await mockUploadDocument(selectedFile);
      navigate(`/analyzing/${documentId}`);
    } catch {
      setErrorMessage("Could not upload file. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer className="upload-page-container">
      <div className="upload-header">
        <h1 className="upload-title">{en.upload.title}</h1>
        <p className="upload-subtitle">{en.upload.subtitle}</p>
      </div>

      <div className="upload-layout-grid">
        {/* Main Upload Column */}
        <div className="upload-main-col">
          <Card className="upload-card">
            <form onSubmit={handleSubmit} className="upload-form">
              {/* Hidden Accessible File Input */}
              <input
                ref={fileInputRef}
                type="file"
                id="document-upload-input"
                className="upload-hidden-input"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                onChange={handleFileChange}
                aria-label="Upload offer letter or recruitment document"
              />

              {/* Tap or Drag Dropzone */}
              {!selectedFile ? (
                <div
                  className={`upload-dropzone ${isDragging ? "dragging" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={handleKeyDown}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  role="button"
                  tabIndex={0}
                  aria-label={en.upload.dropzoneLabel}
                >
                  <div className="upload-dropzone-icon-wrapper">
                    <UploadCloud size={40} className="upload-dropzone-icon" aria-hidden="true" />
                  </div>
                  <p className="upload-dropzone-prompt">{en.upload.dropzonePrompt}</p>
                  <p className="upload-dropzone-hint">{en.upload.dropzoneHint}</p>
                </div>
              ) : (
                /* Selected File Summary */
                <div className="upload-file-card">
                  <div className="upload-file-info">
                    <FileText size={32} className="upload-file-icon" aria-hidden="true" />
                    <div className="upload-file-details">
                      <span className="upload-file-name" title={selectedFile.name}>
                        {selectedFile.name}
                      </span>
                      <span className="upload-file-size">
                        {formatFileSize(selectedFile.size)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="upload-file-remove-btn"
                    onClick={handleRemoveFile}
                    aria-label={en.upload.removeFile}
                  >
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>
              )}

              {/* Inline Validation Error */}
              {errorMessage && (
                <Alert type="error" className="upload-alert">
                  <span className="upload-alert-text">{errorMessage}</span>
                </Alert>
              )}

              {/* Privacy Reassurance */}
              <div className="upload-privacy-pill">
                <Shield size={16} className="upload-privacy-icon" aria-hidden="true" />
                <span>{en.upload.privacyBadge}</span>
              </div>

              {/* Action Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={!selectedFile || isSubmitting}
              >
                <span>{en.upload.checkButton}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </form>
          </Card>
        </div>

        {/* Sidebar Tips Column */}
        <aside className="upload-side-col" aria-label="Upload Guidelines">
          <Card className="upload-tips-card">
            <div className="upload-tips-header">
              <Lightbulb size={22} className="upload-tips-icon" aria-hidden="true" />
              <h2 className="upload-tips-title">{en.upload.tipsTitle}</h2>
            </div>
            <ul className="upload-tips-list">
              {en.upload.tips.map((tip, idx) => (
                <li key={idx} className="upload-tips-item">
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </PageContainer>
  );
};
