// src/models/mealModel.js
const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true }, // This should be storing the relative image path
    summary: { type: String, required: true },
    instructions: { type: String, required: true },
    creator: { type: String, required: true },
    creator_email: { type: String, required: true },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        commentText: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Create and export the Meal model
const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
