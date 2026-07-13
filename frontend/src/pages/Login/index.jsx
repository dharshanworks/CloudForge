import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../api/auth.api";
import { saveAccessToken } from "../../utils/auth";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  // ============================
  // State Management
  // ============================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // ============================
  // Form Validation
  // ============================

  function validateForm() {
    const validationErrors = {};

    // Email Validation
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    // Password Validation
    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 8) {
      validationErrors.password =
        "Password must contain at least 8 characters";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }

  // ============================
  // Login Handler
  // ============================

  async function handleLogin(event) {
    event.preventDefault();

    setLoginError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({
        email,
        password,
      });

      // Save JWT
      saveAccessToken(response.data.accessToken);

      // Load current user into Auth Context
      await refreshUser();

      // Navigate to Dashboard
      navigate("/dashboard");
    } catch (error) {
      setLoginError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================
  // UI
  // ============================

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "400px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          🚀 CloudForge
        </h1>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Welcome Back
        </h2>

        {/* Backend Login Error */}

        {loginError && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {loginError}
          </div>
        )}

        {/* Email */}

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "5px",
            boxSizing: "border-box",
          }}
        />

        {errors.email && (
          <p
            style={{
              color: "red",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {errors.email}
          </p>
        )}

        {/* Password */}

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "5px",
            boxSizing: "border-box",
          }}
        />

        {errors.password && (
          <p
            style={{
              color: "red",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {errors.password}
          </p>
        )}

        {/* Login Button */}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            cursor: loading ? "not-allowed" : "pointer",
            backgroundColor: loading ? "#93c5fd" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>
    </main>
  );
}

export default Login;