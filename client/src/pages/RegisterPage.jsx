import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"; 
import bg from "../assets/bg.jpg";

const RegisterPage = () => {
  const { handleRegister } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(form);
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${bg})` }}>
      <h2 className="auth-title">Create Account</h2>
      <form className="auth-form" onSubmit={onSubmit}>
        <input
          className="auth-input"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="auth-button" type="submit">
          Register
        </button>
      </form>

      <Link to="/login" className="link">
        Already have an account? Login
      </Link>
    </div>
  );
};

export default RegisterPage;
