// src/controllers/ShareMealController.js
const Meal = require("../models/mealModel");
const path = require("path");

// Controller function to handle sharing a meal
const shareMeal = async (req, res) => {
  try {
    const { title, summary, instructions, name, email } = req.body;

    // The image path is saved as 'images/{image-name}' (relative to public/images)
    const imagePath = path.join("images", req.file.filename); // e.g., 'images/image-174472.jpg'

    // Create a new meal in the database
    const newMeal = new Meal({
      title,
      slug: title.replace(/\s+/g, "-").toLowerCase(), // Slug based on the title
      image: imagePath, // Store the relative path to the image
      summary,
      instructions,
      creator: name,
      creator_email: email,
    });

    // Save the new meal in the database
    await newMeal.save();
    res.status(201).json({ message: "Meal shared successfully!" }); // Success message
  } catch (error) {
    console.error("Error sharing meal:", error);
    res.status(500).json({ message: "Failed to share meal", error: error.message });
  }
};

module.exports = { shareMeal };
