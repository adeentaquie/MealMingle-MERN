import { useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import ImagePicker from "../components/Meals/ImagePicker/ImagePicker"; // Image Picker Component
import classes from "../styling/ShareMealPage.module.css"; // Assuming your CSS is inside this file

export default function ShareMealPage() {
  const { userId } = useParams(); // Get dynamic userId from URL
  const navigate = useNavigate(); // To navigate after meal submission

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    summary: "",
    instructions: "",
    image: null, // Initially no image selected
  });

  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submission

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (image) => {
    setFormData((prevState) => ({
      ...prevState,
      image,
    }));
  };

  // Form validation function
  const validateForm = () => {
    return (
      formData.name &&
      formData.email &&
      formData.title &&
      formData.summary &&
      formData.instructions &&
      formData.image
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) {
      setMessage("Please fill in all fields and select an image.");
    }

    setIsSubmitting(true); // Set loading state

    // Prepare the form data
    const mealData = new FormData();
    mealData.append("name", formData.name);
    mealData.append("email", formData.email);
    mealData.append("title", formData.title);
    mealData.append("summary", formData.summary);
    mealData.append("instructions", formData.instructions);
    if (formData.image) {
      mealData.append("image", formData.image); // Append the selected image
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/meals/${userId}/share`, // Correct endpoint
        {
          method: "POST",
          body: mealData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Meal shared successfully!");
        navigate(`/meals/${userId}`); // Redirect to user's meal page
      } else {
        setMessage(data.message || "Failed to share meal.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.row}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="summary">Short Summary</label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
          />
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            rows="10"
            value={formData.instructions}
            onChange={handleChange}
            required
          />
          <ImagePicker
            label="Your Image"
            name="image"
            onImageChange={handleImageChange}
          />
          {message && <p>{message}</p>} {/* Display message */}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={classes.submitButton}
          >
            {isSubmitting ? "Submitting..." : "Share Meal"}
          </button>
        </form>
      </main>
    </>
  );
}
