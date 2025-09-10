import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyResetToken, resetPassword } from "../../Api/authApi";
import "./login.css";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setError("Missing reset token.");
        setLoading(false);
        return;
      }
      try {
        await verifyResetToken(token);
        setError("");
      } catch (e) {
        setError(e.response?.data?.error || "Invalid or expired reset token.");
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setMessage("");
      const res = await resetPassword(token, newPassword);
      setMessage(res.message || "Password reset successfully");
      setTimeout(() => navigate("/login"), 1000);
    } catch (e) {
      setError(e.response?.data?.error || "Failed to reset password");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="login-wrapper">
        <div className="login-container">
          <h2 className="login-title">Verifying link...</h2>
        </div>
      </div>
    );
  }

  if (error && !message) {
    return (
      <div className="login-wrapper">
        <div className="login-container">
          <h2 className="login-title">Reset Password</h2>
          <p className="error-text">{error}</p>
          <div className="forgot-password-links">
            <a href="/forgot-password" className="link-text">
              Request a new link
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Set a new password</h2>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          {message && <p className="success-text">{message}</p>}
          <button type="submit" disabled={submitting} className="login-btn">
            {submitting ? "Saving..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
