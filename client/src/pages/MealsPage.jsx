import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Use react-router-dom Link for routing
import MealsGrid from '../components/Meals/MealGrid/MealsGrid'; // Component to display meals
import { getMeals } from '../components/Meals/getmeals'; // Your data fetching function
import classes from '../styling/MealsPage.module.css'; // Adjusted className

export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the userId from localStorage (or state if applicable)
  const userId = localStorage.getItem("userId");  // Assumes you are storing userId in localStorage



  // Use effect to fetch meals when the page loads
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealsData = await getMeals();
        setMeals(mealsData); // Set the meals data into the state
      } catch (err) {
        setError('Failed to load meals'); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchMeals(); // Call fetchMeals function on component mount
  }, []); // Empty dependency array means this runs only once when the component mounts

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
          {/* Dynamically link to the Share Meal page for the current user */}
          <Link to={`/meals/${userId}/share`}>Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        {loading ? (
          <p className={classes.loading}>Fetching meals...</p>
        ) : error ? (
          <p className={classes.error}>{error}</p>
        ) : (
          <MealsGrid meals={meals} /> // Pass the fetched meals to the MealsGrid component
        )}
      </main>
    </>
  );
}
