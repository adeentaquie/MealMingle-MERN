const express = require("express");
const router = express.Router();

const { getDashboardData } = require("../controllers/dashboardController");

// ✅ Ensure the second argument is a function
router.get("/:userId", getDashboardData);

module.exports = router;
