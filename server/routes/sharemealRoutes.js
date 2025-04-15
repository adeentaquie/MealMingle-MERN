// src/routes/sharemealRoutes.js
const express = require("express");
const { shareMeal } = require("../controllers/sharemealController");
const upload = require("../multerConfig"); // Multer for handling image upload

const router = express.Router();

// Route to share a meal (POST request)
// This route will capture the userId dynamically from the URL
router.post("/:userId/share", upload.single("image"), shareMeal);

module.exports = router;
