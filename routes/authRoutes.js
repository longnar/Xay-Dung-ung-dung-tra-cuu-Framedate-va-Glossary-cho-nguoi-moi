const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Admin Login -> POST /api/auth/login
router.post('/login', authController.login);

// Register Account -> POST /api/auth/register
router.post('/register', authController.register);

module.exports = router;
