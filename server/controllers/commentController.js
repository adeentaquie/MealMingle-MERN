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
  
      // Add comment to meal
      const newComment = {
        userId, // still numeric
        commentText,
        createdAt: new Date(),
      };
  
      meal.comments.push(newComment);
      await meal.save();
  
      // ✅ Use userId (number) instead of _id
      await User.findOneAndUpdate({ userId: userId }, { $inc: { comments: 1 } });
  
      res.status(200).json({ message: "Comment added successfully", comment: newComment });
    } catch (err) {
      console.error("Error posting comment:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
module.exports = {
  postComment,
};
