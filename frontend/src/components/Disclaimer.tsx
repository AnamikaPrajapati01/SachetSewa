import React from "react";
import { Info } from "lucide-react";
import { en } from "../i18n/en";
import "./Disclaimer.css";

export const Disclaimer: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <aside className={`sachet-disclaimer ${className}`} role="note" aria-label="Official Disclaimer">
      <Info size={20} className="sachet-disclaimer-icon" aria-hidden="true" />
      <div className="sachet-disclaimer-content">
        <p className="sachet-disclaimer-text">{en.footer.disclaimer}</p>
        <p className="sachet-disclaimer-subtext">{en.footer.authorityNotice}</p>
      </div>
    </aside>
  );
};

