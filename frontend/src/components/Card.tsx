import React from "react";
import "./Card.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "highlight" | "bordered";
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  return (
    <div className={`sachet-card sachet-card-${variant} ${className}`} {...props}>
      {children}
    </div>
  );
};

