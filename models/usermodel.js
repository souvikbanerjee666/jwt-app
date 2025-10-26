// models/userModel.js

const mongoose = require('../database/dbConnect');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

const User = mongoose.model('userinfo', userSchema);

module.exports = User;