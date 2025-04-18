// src/pages/Home.js
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useSelector } from "react-redux"; // Access Redux state for user info
import classes from "../styling/Home.module.css";
import ImageSlideshow from "../components/images/ImageSlideshow"; // Image slideshow component

export default function Home() {
  // Access the current user's name and userId from Redux state
  const { name, userId } = useSelector((state) => state.auth); 

  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={classes.hero}>
            <h1>NextLevel Food for NextLevel Foodies</h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className={classes.cta}>
            <Link to="/community">Join the Community</Link>

            {/* Dynamic Link for Meals */}
            <Link to={`/meals/${userId}`}>Explore Meals</Link> {/* Dynamically link to meals for the current user */}
          </div>
        </div>
      </header>

      <main>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            Meal Mingle is a platform for foodies to share their favorite
            recipes with the world. It's a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            Meal Mingle is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why Meal Mingle?</h2>
          <p>
            Meal Mingle is a platform for foodies to share their favorite
            recipes with the world. It's a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            Meal Mingle  is a place to discover new dishes, and to connect
            with other food lovers.
          </p>

        </section>
      </main>
    </div>
  );
}
