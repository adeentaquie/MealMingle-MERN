// routes/signUpRoutes.js
const express = require('express');
const router = express.Router();
const { signUpUser } = require('../controllers/signUpcontroller');

// POST route to sign up a user
router.post('/signup', signUpUser);

module.exports = router;
