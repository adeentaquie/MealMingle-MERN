// src/pages/Dashboard.js
import { useEffect } from "react";
import { useParams } from "react-router-dom"; // Access userId from URL
import { useDispatch, useSelector } from "react-redux"; // Access Redux state
import {
  fetchDashboardSuccess,
  fetchDashboardFailure,
  setLoading,
} from "../redux/slices/dashboardSlice"; // Redux actions
import styles from "../styling/Dashboard.module.css"; // Add styles

export default function Dashboard() {
  const { userId } = useParams(); // Get userId from the URL
  const {
    name,
    mealsShared,
    comments,
    sharedMeals,
    commentsList,
    loading,
    errorMessage,
  } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch(); // Dispatch actions

  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch(setLoading()); // Set loading to true before the request

      try {
        const response = await fetch(
          `http://localhost:5000/api/dashboard/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          dispatch(
            fetchDashboardSuccess({
              name: data.name,
              mealsShared: data.mealsShared,
              comments: data.comments,
              sharedMeals: data.sharedMeals, // ✅ Add this
              commentsList: data.commentsList, // ✅ And this
            })
          );
        } else {
          dispatch(
            fetchDashboardFailure({
              message: data.message || "Failed to load dashboard data.",
            })
          );
        }
      } catch (error) {
        dispatch(
          fetchDashboardFailure({ message: "Error fetching dashboard data." })
        );
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
      <h1>Welcome, {name}!</h1>

      <div className={styles.dashboardInfo}>
        <div>
          <h2>Your Meals Shared: {mealsShared}</h2>
          <ul>
            {sharedMeals.length > 0 ? (
              sharedMeals.map((meal) => (
                <li key={meal._id}>
                  <img
                    src={`http://localhost:5000/${meal.image}`}
                    alt={meal.title}
                    width="60"
                  />
                  <a href={`/meals/${userId}/${meal.slug}`}>{meal.title}</a>
                </li>
              ))
            ) : (
              <p>No shared meals found.</p>
            )}
          </ul>
        </div>

        <div>
          <h2>Your Comments: {comments}</h2>
          <ul>
            {commentsList.length > 0 ? (
              commentsList.map((comment, idx) => (
                <li key={idx}>
                  On <strong>{comment.mealTitle}</strong>: "
                  {comment.commentText}" <br />
                  <em>
                    Posted on {new Date(comment.createdAt).toLocaleDateString()}
                  </em>
                </li>
              ))
            ) : (
              <p>No comments found.</p>
            )}
          </ul>
        </div>
      </div>

      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
    </div>
  );
}
