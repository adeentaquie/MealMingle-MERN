// src/pages/Dashboard.js
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardSuccess,
  fetchDashboardFailure,
  setLoading,
} from "../redux/slices/dashboardSlice";
import styles from "../styling/Dashboard.module.css";

function MealsSection({ sharedMeals, userId, mealsShared }) {
  return (
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
  );
}

function CommentsSection({ commentsList, comments }) {
  return (
    <div>
      <h2>Your Comments: {comments}</h2>
      <ul>
        {commentsList.length > 0 ? (
          commentsList.map((comment, idx) => (
            <li key={idx}>
              On <strong>{comment.mealTitle}</strong>: "
              {comment.commentText}" <br />
              <em>
                Posted on{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </em>
            </li>
          ))
        ) : (
          <p>No comments found.</p>
        )}
      </ul>
    </div>
  );
}

export default function Dashboard() {
  const { userId } = useParams();
  const {
    name,
    mealsShared,
    comments,
    sharedMeals,
    commentsList,
    loading,
    errorMessage,
  } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch(setLoading());

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
              sharedMeals: data.sharedMeals,
              commentsList: data.commentsList,
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
  }, [dispatch, userId]);

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
        <MealsSection
          sharedMeals={sharedMeals}
          userId={userId}
          mealsShared={mealsShared}
        />
        <CommentsSection commentsList={commentsList} comments={comments} />
      </div>

      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
    </div>
  );
}
