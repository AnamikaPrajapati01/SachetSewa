import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, Check, AlertCircle } from "lucide-react";
import { en } from "../i18n/en";
import { useAuth } from "../context/AuthContext";
import { PageContainer } from "../components/PageContainer";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import "./RegisterPage.css";

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const isPasswordLengthValid = password.length >= 10;

  const validate = (): boolean => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = en.auth.validation.emailRequired;
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = en.auth.validation.emailInvalid;
    }

    // Password validation (at least 10 characters)
    if (!password) {
      newErrors.password = en.auth.validation.passwordRequired;
    } else if (password.length < 10) {
      newErrors.password = en.auth.validation.passwordLength;
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = en.auth.validation.passwordRequired;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = en.auth.validation.passwordMatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await register(email, password);
      if (success) {
        navigate("/upload");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer className="auth-page-container">
      <Card className="auth-card">
        <header className="auth-header">
          <h1 className="auth-title">{en.auth.registerTitle}</h1>
          <p className="auth-subtitle">{en.auth.registerSubtitle}</p>
        </header>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Email Field */}
          <div className="auth-field-group">
            <label htmlFor="register-email" className="auth-label">
              {en.auth.emailLabel}
            </label>
            <input
              id="register-email"
              type="email"
              className={`auth-input ${errors.email ? "auth-input-error" : ""}`}
              placeholder={en.auth.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && (
              <p id="email-error" className="auth-error-msg" role="alert">
                <AlertCircle size={16} aria-hidden="true" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="auth-field-group">
            <label htmlFor="register-password" className="auth-label">
              {en.auth.passwordLabel}
            </label>
            <div className="auth-password-wrapper">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                className={`auth-input auth-password-input ${
                  errors.password ? "auth-input-error" : ""
                }`}
                placeholder={en.auth.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error password-rules" : "password-rules"
                }
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
            {errors.password && (
              <p id="password-error" className="auth-error-msg" role="alert">
                <AlertCircle size={16} aria-hidden="true" />
                <span>{errors.password}</span>
              </p>
            )}

            {/* Password Rules List */}
            <div id="password-rules" className="auth-rules-list">
              <span className="auth-rules-header">{en.auth.validation.rulesHeader}</span>
              <div
                className={`auth-rule-item ${
                  isPasswordLengthValid ? "valid" : "unmet"
                }`}
              >
                <Check size={14} aria-hidden="true" className="auth-rule-icon" />
                <span>{en.auth.validation.ruleMinLength}</span>
              </div>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="auth-field-group">
            <label htmlFor="register-confirm-password" className="auth-label">
              {en.auth.confirmPasswordLabel}
            </label>
            <div className="auth-password-wrapper">
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                className={`auth-input auth-password-input ${
                  errors.confirmPassword ? "auth-input-error" : ""
                }`}
                placeholder={en.auth.confirmPasswordPlaceholder}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                required
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? en.auth.hidePassword : en.auth.showPassword
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p id="confirm-error" className="auth-error-msg" role="alert">
                <AlertCircle size={16} aria-hidden="true" />
                <span>{errors.confirmPassword}</span>
              </p>
            )}
          </div>

          {/* Privacy Note */}
          <div className="auth-privacy-note">
            <ShieldCheck size={18} className="auth-privacy-icon" aria-hidden="true" />
            <span>{en.auth.privacyNote}</span>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? en.auth.registering : en.auth.registerButton}
          </Button>
        </form>

        <footer className="auth-card-footer">
          <span>{en.auth.hasAccountPrompt}</span>{" "}
          <Link to="/login" className="auth-link">
            {en.auth.linkToLogin}
          </Link>
        </footer>
      </Card>
    </PageContainer>
  );
};
