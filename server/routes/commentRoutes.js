// routes/commentRoutes.js
const express = require("express");
const router = express.Router();
const { postComment } = require("../controllers/commentController");

// POST route for commenting on a meal
router.post("/meals/:slug/comment", postComment);

module.exports = router;
