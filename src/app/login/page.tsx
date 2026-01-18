"use client";

import { useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(() => setAnimate(true), []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      alert(data.message || (res.ok ? "Login successful!" : "Login failed."));
    } catch {
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "80px", display: "flex", justifyContent: "center" }}>
      <div className={`actions-box ${animate ? "fade-slide-in" : ""}`} style={{
        padding: "40px",
        borderRadius: "var(--radius-xl)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        width: "100%",
        background: "var(--card)",
        transition: "all 0.5s ease"
      }}>
        <h2 className="title" style={{ textAlign: "center", marginBottom: "30px" }}>Login</h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field animated-input" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field animated-input" />
          <button type="submit" className="btn animated-btn" style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-lg)", fontWeight: "600", fontSize: "16px", transition: "0.2s" }}>Login</button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
          Don't have an account? <a href="/signup" style={{ color: "var(--primary)" }}>Sign Up</a>
        </p>
      </div>
    </div>
  );
}
