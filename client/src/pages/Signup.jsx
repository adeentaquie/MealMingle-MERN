import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupSuccess, signupFailure, setLoading } from "../redux/slices/signupSlice"; // Import actions
import styles from "../styling/SignUpForm.module.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({}); // Initialize validation errors state

  const { loading, errorMessage } = useSelector((state) => state.signup); // Get loading state and error from Redux
  const dispatch = useDispatch(); // Dispatch actions
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation function
  const validateForm = () => {
    let errors = {};

    // Name validation
    if (!formData.name) {
      errors.name = "Full name is required";
    }

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 3) {
      errors.password = "Password should be at least 3 characters long";
    }

    setValidationErrors(errors); // Set validation errors in state
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return; // Stop submission if there are validation errors
    }

    dispatch(setLoading()); // Set loading to true

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User created successfully:", data);

        // Store the userId in localStorage for persistence
        localStorage.setItem("userId", data.userId);

        // Dispatch signupSuccess to store the userId in Redux
        dispatch(signupSuccess({ userId: data.userId }));

        // Redirect to the personalized dashboard
        navigate(`/dashboard/${data.userId}`);
      } else {
        console.error("Error:", data.message);
        dispatch(signupFailure({ message: data.message }));
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      dispatch(signupFailure({ message: "Something went wrong. Please try again." }));
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <div className={styles.signupHeader}>
          <h1>Join Us</h1>
          <p>Create your account and start your journey</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
            {validationErrors.name && (
              <p className={styles.errorText}>{validationErrors.name}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
            {validationErrors.email && (
              <p className={styles.errorText}>{validationErrors.email}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 3 characters"
              required
            />
            {validationErrors.password && (
              <p className={styles.errorText}>{validationErrors.password}</p>
            )}
          </div>

          <button type="submit" className={styles.signupButton}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Show loading message while the request is being processed */}
        {loading && <p className={styles.loadingText}>Please wait, creating your account...</p>}

        {/* Show error message if any */}
        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

        <div className={styles.loginLink}>
          Already have an account? <Link to="/">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
