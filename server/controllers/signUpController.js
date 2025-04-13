// controllers/signUpController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // To hash the password

// Sign Up Controller: Handle user registration
exports.signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};
