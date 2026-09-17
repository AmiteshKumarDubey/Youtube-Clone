import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaYoutube, FaEnvelope, FaLock, FaUser, FaBolt } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const { login, signup, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, displayName);
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
  };

  const handleDemoSignIn = () => {
    demoLogin();
    navigate("/");
  };

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      backgroundColor: "#0f0f0f",
      color: "#ffffff"
    }}>
      <div style={{
        backgroundColor: "#1f1f1f",
        borderRadius: "16px",
        padding: "36px 32px",
        width: "100%",
        maxWidth: "420px",
        border: "1px solid #333",
        boxShadow: "0 12px 32px rgba(0,0,0,0.5)"
      }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <FaYoutube style={{ color: "#ff0000", fontSize: "36px" }} />
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>YouTube</span>
        </div>

        <h1 style={{ fontSize: "22px", fontWeight: "bold", textAlign: "center", marginBottom: "8px" }}>
          {isLogin ? "Sign in to YouTube" : "Create your Account"}
        </h1>
        <p style={{ color: "#aaa", fontSize: "14px", textAlign: "center", marginBottom: "24px" }}>
          {isLogin ? "Need an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "#3ea6ff", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontWeight: "bold" }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>

        {error && (
          <div style={{ backgroundColor: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", color: "#f87171", padding: "10px 14px", borderRadius: "8px", fontSize: "14px", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <button
          onClick={handleDemoSignIn}
          style={{
            width: "100%",
            backgroundColor: "#3ea6ff",
            color: "#0f0f0f",
            fontWeight: "bold",
            fontSize: "15px",
            padding: "12px",
            borderRadius: "24px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "20px",
            transition: "opacity 0.2s"
          }}
        >
          <FaBolt />
          1-Click Demo Sign In
        </button>

        <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
          <div style={{ flex: 1, borderBottom: "1px solid #333" }}></div>
          <span style={{ padding: "0 12px", color: "#777", fontSize: "13px" }}>OR EMAIL</span>
          <div style={{ flex: 1, borderBottom: "1px solid #333" }}></div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {!isLogin && (
            <div>
              <label style={{ display: "block", color: "#ccc", fontSize: "13px", marginBottom: "6px" }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <FaUser style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#777" }} />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "#121212",
                    border: "1px solid #3b3b3b",
                    borderRadius: "8px",
                    padding: "12px 14px 12px 42px",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter your name"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: "block", color: "#ccc", fontSize: "13px", marginBottom: "6px" }}>Email</label>
            <div style={{ position: "relative" }}>
              <FaEnvelope style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#777" }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "#121212",
                  border: "1px solid #3b3b3b",
                  borderRadius: "8px",
                  padding: "12px 14px 12px 42px",
                  color: "#fff",
                  fontSize: "14px",
                  boxSizing: "border-box"
                }}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", color: "#ccc", fontSize: "13px", marginBottom: "6px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <FaLock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#777" }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "#121212",
                  border: "1px solid #3b3b3b",
                  borderRadius: "8px",
                  padding: "12px 14px 12px 42px",
                  color: "#fff",
                  fontSize: "14px",
                  boxSizing: "border-box"
                }}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#cc0000",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "15px",
              padding: "12px",
              borderRadius: "24px",
              border: "none",
              cursor: "pointer",
              marginTop: "8px"
            }}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}