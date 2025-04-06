import { Link } from 'react-router-dom';
import classes from '../styling/Home.module.css';
import ImageSlideshow from '../components/images/ImageSlideshow';

export default function Home() {
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
            <Link to="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>

      <main>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It's a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why My Restaurant?</h2>
          <p>
            My Restaurant is a platform for foodies to share their favorite
            recipes with the world. It's a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            My Restaurant is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </div>
  );
}
