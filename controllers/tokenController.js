const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/usermodel'); // adjust path as needed

dotenv.config(); // Loads .env variables into process.env

const tokenController = {
  tokenRefresh: async (req, res) => {
    try {
      const { email } = req.body;

      // Check if email exists in DB
      const result = await User.findOne({ email });
      if (!result) {
        return res.status(400).json({ msg: "Invalid email id" });
      }

      const token_secret = process.env.TOKEN_SECRET;

      // Generate JWT token (valid for 30 minutes)
      const token = jwt.sign({ email: result.email }, token_secret, { expiresIn: '1800s' });

      res.status(200).json({
        msg: "Token refreshed successfully",
        token: token
      });
    } catch (error) {
      console.error("Token refresh error:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },

  schUser: async (req, res) => {
    try {
      const { uid } = req.params;

      // Fetch JWT token from Authorization header
      const authHeader = req.headers["authorization"];
      console.log("Auth Header:", authHeader);

      if (!authHeader) {
        return res.status(400).json({ msg: "Token is empty" });
      }

      const token = authHeader.split(" ")[1];
      const tokenSecret = process.env.TOKEN_SECRET;

      // Verify the JWT token
      jwt.verify(token, tokenSecret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ msg: "Token is invalid" });
        }

        // Fetch user by ID
        const data = await User.findById(uid);
        if (!data) {
          return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ info: data });
      });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ msg: "Server error" });
    }
  },

  insertUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Fetch JWT token from Authorization header
      const authHeader = req.headers["authorization"];
      console.log("Auth Header:", authHeader);

      if (!authHeader) {
        return res.status(400).json({ msg: "Token is empty" });
      }

      const token = authHeader.split(" ")[1];
      const tokenSecret = process.env.TOKEN_SECRET;

      // Verify the JWT token
      jwt.verify(token, tokenSecret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ msg: "Token is invalid" });
        }

        // Create new user
        const newUser = new User({ name, email, password });
        const data = await newUser.save();

        res.status(200).json({ info: data });
      });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ msg: "Server error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      // Fetch JWT token from Authorization header
      const authHeader = req.headers["authorization"];
      console.log("Auth Header:", authHeader);

      if (!authHeader) {
        return res.status(400).json({ msg: "Token is empty" });
      }

      const token = authHeader.split(" ")[1];
      const tokenSecret = process.env.TOKEN_SECRET;

      // Verify the JWT token
      jwt.verify(token, tokenSecret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ msg: "Token is invalid" });
        }

        // Delete user by ID
        const data = await User.findByIdAndDelete(id);
        if (!data) {
          return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "User deleted successfully" });
      });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ msg: "Server error" });
    }
  }
};

module.exports = tokenController;