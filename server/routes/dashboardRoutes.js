// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const { getDashboardData } = require("../controllers/dashboardController");

// Route to fetch the dashboard data for a specific user
router.get("/:userId", getDashboardData);

module.exports = router;
