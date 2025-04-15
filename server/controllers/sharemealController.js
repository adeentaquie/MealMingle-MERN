const Meal = require("../models/mealModel");
const User = require("../models/userModel");  // Import the User model
const path = require("path");

const shareMeal = async (req, res) => {
  try {
    const { userId } = req.params;  // Capture the userId from the route parameter
    const { title, summary, instructions, name, email } = req.body;

    // Save the image path relative to the /public/images folder
    const imagePath = path.join("images", req.file.filename); // e.g., 'images/image-174472.jpg'

    // Create and save the new meal to the database
    const newMeal = new Meal({
      title,
      slug: title.replace(/\s+/g, "-").toLowerCase(),
      image: imagePath,
      summary,
      instructions,
      creator: name,
      creator_email: email,
    });

    // Save the meal in the database
    await newMeal.save();

    // Increment the mealsShared count for the user
    const user = await User.findOne({ userId });  // Find the user by userId
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.mealsShared += 1;  // Increment the mealsShared field
    await user.save();  // Save the updated user document

    res.status(201).json({ message: "Meal shared successfully!" }); // Send response
  } catch (error) {
    console.error("Error sharing meal:", error);
    res.status(500).json({ message: "Failed to share meal", error: error.message });
  }
};

module.exports = { shareMeal };
