import React from "react";
import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";
import { en } from "../i18n/en";
import { PageContainer } from "../components/PageContainer";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import "./NotFoundPage.css";

export const NotFoundPage: React.FC = () => {
  return (
    <PageContainer className="notfound-container">
      <Card className="notfound-card">
        <div className="notfound-icon-wrap" aria-hidden="true">
          <Compass size={48} className="notfound-icon" />
        </div>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">{en.notFound.title}</h2>
        <p className="notfound-message">{en.notFound.message}</p>

        <Link to="/" className="notfound-btn-link">
          <Button variant="primary">
            <Home size={18} aria-hidden="true" />
            <span>{en.notFound.homeButton}</span>
          </Button>
        </Link>
      </Card>
    </PageContainer>
  );
};
