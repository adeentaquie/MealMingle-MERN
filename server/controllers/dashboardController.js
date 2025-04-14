// controllers/dashboardController.js
const User = require("../models/userModel"); // Import the User model

// Controller to fetch dashboard data (meals shared and comments) for a user
const getDashboardData = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId }); // Find user by userId
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send back the user's meals shared and comments
    res.json({
      mealsShared: user.mealsShared,
      comments: user.comments,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = { getDashboardData };
