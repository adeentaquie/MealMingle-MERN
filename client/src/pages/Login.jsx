// src/pages/Login.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure, setLoading } from "../redux/slices/authSlice"; // Import actions
import logo from "../assets/logo.png";
import styles from "../styling/Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, errorMessage } = useSelector((state) => state.auth); // Get loading state and error from Redux
  const dispatch = useDispatch(); // Dispatch actions
  const navigate = useNavigate(); // Use useNavigate hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading()); // Set loading to true on form submit

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

        // Store the userId and name in localStorage for persistence
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("name", data.name);

        // Dispatch loginSuccess to store the userId and name in Redux
        dispatch(loginSuccess({ userId: data.userId, name: data.name }));

        // Redirect to the personalized dashboard
        navigate(`/dashboard/${data.userId}`); // Redirect to the personalized dashboard
      } else {
        console.error("Invalid credentials:", data.message);
        dispatch(loginFailure({ message: data.message || "Invalid email or password" }));
      }
    } catch (error) {
      console.error("Error during login:", error);
      dispatch(loginFailure({ message: "Something went wrong. Please try again later." }));
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

            <button type="submit" className={styles.loginButton} disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

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
