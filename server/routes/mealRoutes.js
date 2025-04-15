// src/routes/mealRoutes.js
const express = require('express');
const { getMeals } = require('../controllers/mealController'); // Make sure it's the correct import

const router = express.Router();

// Ensure this route exists in the backend
router.get('/', getMeals); // Make sure 'getMeals' is a valid function

module.exports = router;
