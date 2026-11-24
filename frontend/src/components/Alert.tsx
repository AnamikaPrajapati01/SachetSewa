import React from "react";
import { Info, AlertTriangle, AlertCircle } from "lucide-react";
import "./Alert.css";

export interface AlertProps {
  type?: "info" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  title,
  children,
  className = "",
}) => {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
  };

  const IconComponent = icons[type];
  const role = type === "error" || type === "warning" ? "alert" : "status";

  return (
    <div className={`sachet-alert sachet-alert-${type} ${className}`} role={role}>
      <IconComponent size={20} className="sachet-alert-icon" aria-hidden="true" />
      <div className="sachet-alert-body">
        {title && <h4 className="sachet-alert-title">{title}</h4>}
        <div className="sachet-alert-message">{children}</div>
      </div>
    </div>
  );
};

