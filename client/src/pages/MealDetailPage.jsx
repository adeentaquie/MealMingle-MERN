import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Access userId and slug from URL
import { getMealBySlug } from "../components/Meals/getmeals"; // Import the function to fetch meal by slug
import classes from "../styling/MealDetailPage.module.css"; // Adjust the path for your styling

export default function MealDetailPage() {
  const { userId, slug } = useParams(); // Get userId and slug from the URL
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const mealData = await getMealBySlug(slug); // Get the meal by slug
        setMeal(mealData); // Set meal data to state
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch meal data.");
        setLoading(false);
      }
    };

    fetchMeal();
  }, [slug]); // Re-fetch the meal if the slug changes

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  if (!meal) {
    return <div>Meal not found</div>; // If no meal is found
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br/>"); // Process instructions for HTML

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <img src={`http://localhost:5000/${meal.image}`} alt={meal.title} className={classes.image} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions, // Render HTML for instructions
          }}
        ></p>
      </main>
    </>
  );
}
