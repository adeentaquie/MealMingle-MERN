const Meal = require("../models/mealModel");
const User = require("../models/userModel");

const getDashboardData = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId }); // userId is numeric
    if (!user) return res.status(404).json({ message: "User not found" });

    // 1. Get meals created by this user
    const meals = await Meal.find({ creator_email: user.email }).select("title slug image");

    // 2. Get all meals where this user has commented (via ObjectId)
    const allMeals = await Meal.find({ "comments.userId": user._id });

    const userComments = [];

    allMeals.forEach(meal => {
      meal.comments.forEach(comment => {
        if (comment.userId.toString() === user._id.toString()) {
          userComments.push({
            mealTitle: meal.title,
            mealSlug: meal.slug,
            commentText: comment.commentText,
            createdAt: comment.createdAt,
          });
        }
      });
    });

    // ✅ Return accurate count from filtered list
    res.json({
      name: user.name,
      mealsShared: meals.length,
      comments: userComments.length,
      sharedMeals: meals,
      commentsList: userComments,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = { getDashboardData };
