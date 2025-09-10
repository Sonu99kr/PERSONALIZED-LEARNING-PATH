import React, { useState } from "react";
import { requestPasswordReset } from "../../Api/authApi";
import "./login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setError("");
      setMessage("");
      setLoading(true);

      const response = await requestPasswordReset(email);
      setMessage(
        response.message || "If this email exists, a reset link was sent."
      );
    } catch (error) {
      console.error("Password reset request failed:", error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Forgot Password?</h2>
        <p className="forgot-password-description">
          Enter your email address below and we will send you a link to reset
          your password.
        </p>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}

        <div className="forgot-password-links">
          <p>
            Remember your password?{" "}
            <a href="/login" className="link-text">
              Back to Login
            </a>
          </p>
          <p>
            Don't have an account?{" "}
            <a href="/register" className="link-text">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
