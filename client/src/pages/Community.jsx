import React from "react";
import styles from "../styling/Community.module.css";

// Import images as normal
import mealIcon from "../assets/icons/meal.png";
import communityIcon from "../assets/icons/community.png";
import eventsIcon from "../assets/icons/events.png";

function CommunityPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          One shared passion: <span className={styles.highlight}>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>
      <main className={styles.main}>
        <h2>Community Perks</h2>
        <ul className={styles.perks}>
          <li>
            <img src={mealIcon} alt="A delicious meal" />
            <p>Share & discover recipes</p>
          </li>
          <li>
            <img src={communityIcon} alt="A crowd of people, cooking" />
            <p>Find new friends & like-minded people</p>
          </li>
          <li>
            <img src={eventsIcon} alt="A crowd of people at a cooking event" />
            <p>Participate in exclusive events</p>
          </li>
        </ul>
      </main>
    </>
  );
}

export default CommunityPage;
