import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3002/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      console.error(
        "Registration Failed:",
        err.response?.data?.message || err.message
      );
      alert(
        "Error: " + (err.response?.data?.message || "Registration failed.")
      );
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
