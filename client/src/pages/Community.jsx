// Community.jsx
import React from "react";
import styles from "../styling/Community.module.css";
import mealIcon from "../assets/icons/meal.png";
import communityIcon from "../assets/icons/community.png";
import eventsIcon from "../assets/icons/events.png";

// New reusable component
function PerkCard({ icon, alt, text }) {
  return (
    <li className={styles.perkCard}>
      <img src={icon} alt={alt} />
      <p>{text}</p>
    </li>
  );
}

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
          <PerkCard icon={mealIcon} alt="A delicious meal" text="Share & discover recipes" />
          <PerkCard icon={communityIcon} alt="A crowd of people, cooking" text="Find new friends & like-minded people" />
          <PerkCard icon={eventsIcon} alt="A crowd at a cooking event" text="Participate in exclusive events" />
        </ul>
      </main>
    </>
  );
}

export default CommunityPage;
