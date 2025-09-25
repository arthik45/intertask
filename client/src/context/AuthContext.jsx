import React, { createContext, useState, useEffect } from "react";
import { login, register, logout, getProfile } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load profile if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile()
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const handleRegister = async (formData) => {
    const res = await register(formData);
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
  };

  const handleLogin = async (formData) => {
    const res = await login(formData);
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleRegister, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

