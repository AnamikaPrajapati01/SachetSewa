import React from "react";
import "./PageContainer.css";

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className = "" }) => {
  return <div className={`sachet-page-container ${className}`}>{children}</div>;
};

