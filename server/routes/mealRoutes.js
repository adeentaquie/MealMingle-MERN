// src/routes/mealRoutes.js
const express = require('express');
const router = express.Router();
const { getMeals } = require('../controllers/mealController'); // Import the controller

// Ensure this route exists in the backend
router.get('/', getMeals); // Handle GET requests to /api/meals

module.exports = router;
