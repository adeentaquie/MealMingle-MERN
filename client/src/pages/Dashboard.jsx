// src/pages/Dashboard.js
import { useEffect } from "react";
import { useParams } from "react-router-dom"; // Access userId from URL
import { useDispatch, useSelector } from "react-redux"; // Access Redux state
import { fetchDashboardSuccess, fetchDashboardFailure, setLoading } from "../redux/slices/dashboardSlice"; // Redux actions
import styles from "../styling/Dashboard.module.css"; // Add styles

export default function Dashboard() {
  const { userId } = useParams(); // Get userId from the URL
  const { name } = useSelector((state) => state.auth); // Get the user's name from Redux state (auth slice)
  const { mealsShared, comments, loading, errorMessage } = useSelector(
    (state) => state.dashboard
  ); // Access dashboard state from Redux
  const dispatch = useDispatch(); // Dispatch actions

  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch(setLoading()); // Set loading to true before the request

      try {
        const response = await fetch(`http://localhost:5000/api/dashboard/${userId}`);
        const data = await response.json();

        if (response.ok) {
          dispatch(fetchDashboardSuccess({ mealsShared: data.mealsShared, comments: data.comments }));
        } else {
          dispatch(fetchDashboardFailure({ message: data.message || "Failed to load dashboard data." }));
        }
      } catch (error) {
        dispatch(fetchDashboardFailure({ message: "Error fetching dashboard data." }));
      }
    };

    fetchDashboardData();
  }, [dispatch, userId]); // Re-run this effect when userId changes

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
      <h1>Welcome, {name}!</h1> {/* Personalized greeting */}
      <div className={styles.dashboardInfo}>
        <h2>Your Meals Shared: {mealsShared}</h2>
        <h2>Your Comments: {comments}</h2>
      </div>
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
    </div>
  );
}
