const express = require('express');
const router = express.Router();
const profitController = require('../controllers/profitController');
const authenticate = require('../middleware/auth');

router.get('/myprofits', authenticate, profitController.getUserProfit);

module.exports = router;