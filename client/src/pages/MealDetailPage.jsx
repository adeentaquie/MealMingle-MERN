import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "../styling/MealDetailPage.module.css";
import { getMealBySlug } from "../components/Meals/getmeals";

export default function MealDetailPage() {
  const { slug } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchMeal = async () => {
      const data = await getMealBySlug(slug);
      setMeal(data);
      const formatted = (data.comments || []).map((c) => ({
        user: c.userId?.name || "Anonymous",
        text: c.commentText,
        date: new Date(c.createdAt).toLocaleDateString(),
      }));
      setComments(formatted);
      setLoading(false);
    };
    fetchMeal();
  }, [slug]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={classes.detailPage}>
      <h1>{meal.title}</h1>
      <img src={`http://localhost:5000/${meal.image}`} alt={meal.title} width="200" />
      <p>{meal.summary}</p>
      <section>
        <h2>Comments</h2>
        <ul>
          {comments.map((c, idx) => (
            <li key={idx}>
              <strong>{c.user}</strong> on {c.date}: {c.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
