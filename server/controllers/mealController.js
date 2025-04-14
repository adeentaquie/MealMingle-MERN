// src/controllers/mealController.js
const Meal = require('../models/mealModel'); // Import the Meal model

// Function to fetch all meals from the database
const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find(); // Fetch all meals from the database
    res.status(200).json(meals); // Return meals as JSON
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Failed to fetch meals", error: error.message });
  }
};

module.exports = { getMeals };
