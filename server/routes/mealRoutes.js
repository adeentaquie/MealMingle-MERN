// src/routes/mealRoutes.js
const express = require('express');
const { getMeals, getMealBySlug } = require('../controllers/mealController');

const router = express.Router();

// Get all meals
router.get('/', getMeals);

// ✅ Get a specific meal by slug with comment user names
router.get('/slug/:slug', getMealBySlug);

module.exports = router;
