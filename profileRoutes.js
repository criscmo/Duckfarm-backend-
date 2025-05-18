const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticate = require('../middleware/auth'); // Middleware ya JWT authentication

// GET user balance
router.get('/balance', authenticate, profileController.getBalance);

// POST logout (optional if JWT logout is handled client-side)
router.post('/logout', authenticate, profileController.logout);

module.exports = router;