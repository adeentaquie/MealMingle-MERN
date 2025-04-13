import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import logo from "../assets/logo.png"; // ✅ Make sure you have this image
import styles from "../styling/Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Track error messages
  const navigate = useNavigate(); // Use useNavigate hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Clear previous error message

    // Simulate API call to validate user credentials
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        // Redirect user after successful login
        navigate("/dashboard"); // Example: Navigate to the dashboard
      } else {
        console.error("Invalid credentials:", data.message);
        setErrorMessage(data.message || "Invalid email or password"); // Show error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false); // Set loading to false after request is completed
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.overlay}>
          <div className={styles.content}>
            <h1>Meal Mingle</h1>
            <p>Share your culinary creations with the world</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Login Form */}
      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Meal Mingle Logo" className={styles.logo} />
            <h2>Meal Mingle</h2>
          </div>

          <h3>Welcome back</h3>
          <p className={styles.subtitle}>Log in to share your delicious creations</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.passwordHeader}>
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className={styles.forgotPassword}>
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className={styles.rememberMe}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me for 30 days</label>
            </div>

            <button type="submit" className={styles.loginButton} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Show error message if credentials are invalid */}
          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <p className={styles.signupText}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.signupLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
