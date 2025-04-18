import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMealBySlug } from "../components/Meals/getmeals";
import classes from "../styling/MealDetailPage.module.css";

export default function MealDetailPage() {
  const { userId, slug } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch meal + populated comments
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const mealData = await getMealBySlug(slug);
        setMeal(mealData);

        // Format comments with populated names
        const formattedComments = mealData.comments.map((c, index) => ({
          id: index + 1,
          user: c.userId?.name || "Anonymous",
          text: c.commentText,
          date: new Date(c.createdAt).toISOString().split("T")[0],
        }));
        setComments(formattedComments);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch meal data.");
        setLoading(false);
      }
    };

    fetchMeal();
  }, [slug]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/meals/${slug}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: Number(userId),
          commentText: newComment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to post comment");
      }

      // Add comment to state from backend response (includes name)
      const newCommentObj = {
        id: comments.length + 1,
        user: data.comment.user,
        text: data.comment.text,
        date: data.comment.date,
      };

      setComments([...comments, newCommentObj]);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!meal) return <div>Meal not found</div>;

  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <img src={`http://localhost:5000/${meal.image}`} alt={meal.title} className={classes.image} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>

      <section className={classes.commentsSection}>
        <div className={classes.commentsHeader}>
          <h2>Comments</h2>
        </div>

        <div className={classes.commentsList}>
          {comments.map((comment) => (
            <div key={comment.id} className={classes.commentCard}>
              <div className={classes.commentHeader}>
                <span className={classes.commentUser}>{comment.user}</span>
                <span className={classes.commentDate}>{comment.date}</span>
              </div>
              <p className={classes.commentText}>{comment.text}</p>
            </div>
          ))}
        </div>

        <form className={classes.commentForm} onSubmit={handleCommentSubmit}>
          <div className={classes.formGroup}>
            <textarea
              placeholder="Add your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={classes.commentTextarea}
              required
            />
          </div>
          <button type="submit" className={classes.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </section>
    </>
  );
}
