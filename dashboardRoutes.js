// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { getUserBalance } = require('../controllers/dashboardController');

router.get('/balance/:userId', getUserBalance);

module.exports = router;