const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose); // Correctly import and apply the plugin

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    userId: { type: Number, unique: true }, // Auto-incremented userId
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // New fields for meals and comments
    mealsShared: { type: Number, default: 0 },  // Default value is 0 for all users
    comments: { type: Number, default: 0 },     // Default value is 0 for all users
  },
  { timestamps: true }
);

// Use mongoose-sequence to automatically generate userId (auto-incremented)
UserSchema.plugin(mongooseSequence, { inc_field: 'userId' });

const User = mongoose.model('User', UserSchema);

module.exports = User;
