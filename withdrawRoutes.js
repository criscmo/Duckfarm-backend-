const express = require('express');
const router = express.Router();
const withdrawController = require('../controllers/withdrawController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, withdrawController.requestWithdraw);
router.get('/mine', protect, withdrawController.getMyWithdrawals);

module.exports = router;