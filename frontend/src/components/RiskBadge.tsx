import React from "react";
import { CheckCircle2, AlertTriangle, AlertOctagon, HelpCircle } from "lucide-react";
import { en } from "../i18n/en";
import "./RiskBadge.css";

export type RiskLevel = "low" | "medium" | "high";

export interface RiskBadgeProps {
  level: RiskLevel | string;
  score?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  score,
  size = "md",
  className = "",
}) => {
  const normalizedLevel = (level || "").toLowerCase() as RiskLevel;

  let label = en.riskBadge.unknown;
  let Icon = HelpCircle;
  let levelClass = "risk-badge-unknown";

  if (normalizedLevel === "low") {
    label = en.riskBadge.low;
    Icon = CheckCircle2;
    levelClass = "risk-badge-low";
  } else if (normalizedLevel === "medium") {
    label = en.riskBadge.medium;
    Icon = AlertTriangle;
    levelClass = "risk-badge-medium";
  } else if (normalizedLevel === "high") {
    label = en.riskBadge.high;
    Icon = AlertOctagon;
    levelClass = "risk-badge-high";
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <span
      className={`risk-badge ${levelClass} risk-badge-${size} ${className}`}
      role="status"
      aria-label={`${label}${score !== undefined ? ` - score ${score} out of 100` : ""}`}
    >
      <Icon size={iconSizes[size]} className="risk-badge-icon" aria-hidden="true" />
      <span className="risk-badge-text">{label}</span>
      {score !== undefined && (
        <span className="risk-badge-score">· {score}/100</span>
      )}
    </span>
  );
};

