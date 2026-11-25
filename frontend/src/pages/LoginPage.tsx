import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { en } from "../i18n/en";
import { useAuth } from "../context/AuthContext";
import { PageContainer } from "../components/PageContainer";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Alert } from "../components/Alert";
import "./LoginPage.css";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || "/upload";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage(en.auth.loginError);
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setErrorMessage(en.auth.loginError);
      }
    } catch {
      setErrorMessage(en.auth.loginError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer className="auth-page-container">
      <Card className="auth-card">
        <header className="auth-header">
          <h1 className="auth-title">{en.auth.loginTitle}</h1>
          <p className="auth-subtitle">{en.auth.loginSubtitle}</p>
        </header>

        {errorMessage && (
          <Alert type="error" className="auth-alert">
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Email Field */}
          <div className="auth-field-group">
            <label htmlFor="login-email" className="auth-label">
              {en.auth.emailLabel}
            </label>
            <input
              id="login-email"
              type="email"
              className="auth-input"
              placeholder={en.auth.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="auth-field-group">
            <label htmlFor="login-password" className="auth-label">
              {en.auth.passwordLabel}
            </label>
            <div className="auth-password-wrapper">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                className="auth-input auth-password-input"
                placeholder={en.auth.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? en.auth.hidePassword : en.auth.showPassword}
              >
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? en.auth.loggingIn : en.auth.loginButton}
          </Button>
        </form>

        <footer className="auth-card-footer">
          <span>{en.auth.noAccountPrompt}</span>{" "}
          <Link to="/register" className="auth-link">
            {en.auth.linkToRegister}
          </Link>
        </footer>
      </Card>
    </PageContainer>
  );
};
