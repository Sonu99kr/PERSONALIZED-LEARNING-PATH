import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:3002/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (res.data.valid) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Token is Invalid/Expired");
        setToken("");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
