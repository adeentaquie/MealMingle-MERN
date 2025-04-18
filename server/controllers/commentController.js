// controllers/commentController.js
const Meal = require("../models/mealModel");
const User = require("../models/userModel");

// POST /api/meals/:slug/comment
const postComment = async (req, res) => {
  const { slug } = req.params;
  const { userId, commentText } = req.body;

  if (!userId || !commentText) {
    return res.status(400).json({ error: "Missing userId or commentText" });
  }

  try {
    // Find the meal by slug
    const meal = await Meal.findOne({ slug });
    if (!meal) return res.status(404).json({ error: "Meal not found" });

    // Fetch the user by auto-incremented userId (Number)
    const user = await User.findOne({ userId }); // userId: Number
    if (!user) return res.status(404).json({ error: "User not found" });

    // Create the comment — store MongoDB ObjectId, not numeric userId
    const newComment = {
      userId: user._id,
      commentText,
      createdAt: new Date(),
    };

    // Add comment to meal
    meal.comments.push(newComment);
    await meal.save();

    // Increment user's comment count
    await User.findByIdAndUpdate(user._id, { $inc: { comments: 1 } });

    // Respond with comment + user name for frontend
    res.status(200).json({
      message: "Comment added successfully",
      comment: {
        id: meal.comments.length,
        user: user.name,
        text: commentText,
        date: new Date().toISOString().split("T")[0],
      },
    });
  } catch (err) {
    console.error("Error posting comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  postComment,
};
