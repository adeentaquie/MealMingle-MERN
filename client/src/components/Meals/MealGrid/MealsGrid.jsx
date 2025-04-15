// src/components/MealsGrid.jsx
import MealItem from '../MealItem/MealItem';
import classes from './MealsGrid.module.css'; // Adjusted className

export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.slug}>
          <MealItem 
            title={meal.title} 
            slug={meal.slug} 
            image={`http://localhost:5000/${meal.image}`}  // Correct URL structure
            summary={meal.summary} 
            creator={meal.creator} 

          />
                      <p>{`http://localhost:5000/images/${meal.image}`}</p> {/* Log the image path */}

        </li>
      ))}
    </ul>
  );
}