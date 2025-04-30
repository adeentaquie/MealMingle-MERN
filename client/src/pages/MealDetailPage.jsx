import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "../styling/MealDetailPage.module.css";
import { getMealBySlug } from "../components/Meals/getmeals";

export default function MealDetailPage() {
  const { slug, userId } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/meals/${slug}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, commentText: newComment }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed");

      setComments([
        ...comments,
        {
          user: data.comment.user || "You",
          text: data.comment.text,
          date: new Date(data.comment.date).toLocaleDateString(),
        },
      ]);
      setNewComment("");
    } catch (err) {
      alert("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

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
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            required
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </section>
    </div>
  );
}
