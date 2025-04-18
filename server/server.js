// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const signUpRoutes = require('./routes/signUpRoutes');
const loginRoutes = require('./routes/loginRoute.js');
const dashboardRoutes = require('./routes/dashboardRoutes');
const mealRoutes = require('./routes/mealRoutes');
const sharemealRoutes = require('./routes/sharemealRoutes');
const commentRoutes = require('./routes/commentRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // To allow cross-origin requests

app.use('/images', express.static('public/images')); // Serve uploaded images

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api', signUpRoutes);  // Register the signUp route
app.use('/api', loginRoutes);  // Login route
app.use('/api/dashboard', dashboardRoutes); // Register the new dashboard route
app.use('/api/meals', mealRoutes); // Fetching meals handled by mealRoutes
// Ensure the route is set correctly
app.use('/api/meals', sharemealRoutes); // '/api/meals/:userId/share' should be correctly mapped to sharemealRoutes
app.use('/api', commentRoutes); // For handling /api/meals/:slug/comment

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
