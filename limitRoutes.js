const express = require('express');
const router = express.Router();
const limitController = require('../controllers/limitController');

// Check if device has reached account limit
router.get('/device-limits/:deviceId', limitController.checkDeviceLimit);

// Register new account under a device
router.post('/register-account', limitController.registerAccount);

module.exports = router;