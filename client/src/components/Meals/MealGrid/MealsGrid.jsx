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
            image={`/images/${meal.image}`}  
            summary={meal.summary} 
            creator={meal.creator} 
          />
        </li>
      ))}
    </ul>
  );
}