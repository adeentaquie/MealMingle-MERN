const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Login Controller: Validate user credentials
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Respond with a success message and the userId (user's ID in MongoDB)
    res.status(200).json({
      message: 'Login successful',
      userId: user.userId, // You can use `userId` here, which was auto-generated or mapped in the User model
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};
