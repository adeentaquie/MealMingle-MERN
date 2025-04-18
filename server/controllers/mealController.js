// src/controllers/mealController.js
const Meal = require('../models/mealModel');

const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find(); // Fetch all meals
    res.status(200).json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Failed to fetch meals", error: error.message });
  }
};

// ✅ New function to get one meal by slug and populate comment user names
// src/controllers/mealController.js
const User = require('../models/userModel'); // Required for .populate ref

// ✅ New function to get one meal by slug and populate comment user names
// src/controllers/mealController.js
const getMealBySlug = async (req, res) => {
  try {
    const meal = await Meal.findOne({ slug: req.params.slug })
      .populate({
        path: 'comments.userId',
        model: 'User',
        select: 'name',
      });

    if (!meal) return res.status(404).json({ message: 'Meal not found' });

    res.status(200).json(meal); // ✅ This should include userId as a populated object
  } catch (error) {
    console.error("Error fetching meal by slug:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  getMeals,
  getMealBySlug, // Export the new controller
};
