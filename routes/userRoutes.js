// routes/auth.js

const express = require('express');
const RC = require('../controllers/registercontroller');
const LC = require('../controllers/loginController');

const router = express.Router();

// Test route
router.get('/', (req, res) => {
  res.send('<h3>Welcome to JWT App</h3>');
});

// Register route
router.post('/register', RC);

// Login route
router.post('/login', LC);

module.exports = router;