// Dashboard.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styling/Dashboard.module.css"; // Add styles

export default function Dashboard() {
  const { userId } = useParams(); // Get userId from URL
  const [mealsShared, setMealsShared] = useState(0);
  const [comments, setComments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user dashboard data from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/dashboard/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setMealsShared(data.mealsShared);
          setComments(data.comments);
        } else {
          setErrorMessage(data.message || "Failed to load dashboard data.");
        }
      } catch (error) {
        setErrorMessage("Error fetching dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1>Welcome to Your Dashboard</h1>
      <div className={styles.dashboardInfo}>
        <h2 data-value={mealsShared}>Your Meals Shared</h2>
        <h2 data-value={comments}>Your Comments</h2>
      </div>
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
    </div>
  );
}