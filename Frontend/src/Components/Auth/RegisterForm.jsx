import React, { useState } from "react";
import authApi from "../../Api/authApi";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await authApi.post("/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      console.error(
        "Registration Failed:",
        err.response?.data?.message || err.message
      );
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form className="register-container" onSubmit={handleSubmit}>
        <div>
          <label>Full Name: </label>
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            placeholder="enter your Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            placeholder="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account?
          <a href="/login" className="link-text">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
export default RegisterForm;
