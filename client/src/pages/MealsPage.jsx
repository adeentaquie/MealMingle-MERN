import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom'; // Use react-router-dom Link for routing
import MealsGrid from '../components/Meals/MealGrid/MealsGrid'; // Component to display meals
import { getMeals } from '../components/Meals/getmeals'; // Your data fetching function
import classes from '../styling/MealsPage.module.css'; // Adjusted className

export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Pagination state

  // Get the userId from localStorage (or state if applicable)
  const userId = localStorage.getItem("userId");

  // Handle case when userId is not found in localStorage
  if (!userId) {
    setError("User not logged in. Please log in to view meals.");
    setLoading(false);
  }

  // Fetch meals with pagination
  const fetchMeals = useCallback(async () => {
    setLoading(true);
    try {
      const mealsData = await getMeals(page); // Pass current page for pagination
      setMeals((prevMeals) => [...prevMeals, ...mealsData]); // Append new meals to the list
    } catch (err) {
      setError('Failed to load meals');
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Use effect to fetch meals when the page loads or page changes
  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlight}>by your community</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          {userId ? (
            <Link to={`/meals/${userId}/share`}>Share Your Favorite Recipe</Link>
          ) : (
            <span>Please log in to share a recipe</span>
          )}
        </p>
      </header>
      <main className={classes.main}>
        {loading ? (
          <p className={classes.loading}>Fetching meals...</p>
        ) : error ? (
          <p className={classes.error}>{error}</p>
        ) : (
          <MealsGrid meals={meals} userid={userId}/> // Pass the fetched meals to the MealsGrid component
        )}
        {!loading && (
          <button onClick={() => setPage(page + 1)} disabled={loading}>
            Load More
          </button>
        )}
      </main>
    </>
  );
}
