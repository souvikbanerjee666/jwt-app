// routes/auth.js

const express = require('express');
const RC = require('../controllers/registercontroller');
const LC = require('../controllers/loginController');
const tokenController = require('../controllers/tokenController');


const router = express.Router();

// Test route
router.get('/', (req, res) => {
  res.send('<h3>Welcome to JWT App</h3>');
});

// Register route
router.post('/register', RC);

// Login route
router.post('/login', LC);

router.post("/refresh", tokenController.tokenRefresh);

// Find user route
router.get('/finduser/:uid', tokenController.schUser);

// Insert user route
router.post('/insert', tokenController.insertUser);

// Delete user route
router.delete('/delete/:id', tokenController.deleteUser);

module.exports = router;