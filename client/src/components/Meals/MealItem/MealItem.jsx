// src/components/MealItem.jsx
import { Link } from 'react-router-dom'; // Use react-router-dom Link
import classes from './MealItem.module.css'; // Adjusted className

export default function MealItem({ title, slug, image, summary, creator }) {
    return (
      <article className={classes.meal}>
        <header>
          <div className={classes.image}>
            {/* The image will now take up the full width of its container */}
            <img src={image} alt={title} className={classes.image} />
          </div>
          <div className={classes.headerText}>
            <h2>{title}</h2>
            <p>by {creator}</p>
          </div>
        </header>
        <div className={classes.content}>
          <p className={classes.summary}>{summary}</p>
          <div className={classes.actions}>
            <Link to={`/meals/${slug}`}>View Details</Link>
          </div>
        </div>
      </article>
    );
}
