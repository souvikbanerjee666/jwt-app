// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./database/dbConnect');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from JWT App Server');
});

app.use('/test', userRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});