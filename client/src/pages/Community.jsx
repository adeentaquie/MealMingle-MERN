// Community.jsx
import React, { useContext } from "react";
import LanguageContext from "../context/LanguageContext";
...
function CommunityPage() {
  const language = useContext(LanguageContext);
  const titleText = {
    en: "One shared passion:",
    es: "Una pasión compartida:",
  };

  return (
    <>
      <header className={styles.header}>
        <h1>
          {titleText[language]} <span className={styles.highlight}>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>
      ...
