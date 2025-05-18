// routes/spinRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAccount,
  playSpin
} = require('../controllers/spinController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/account', authMiddleware, getAccount);
router.post('/play', authMiddleware, playSpin);

module.exports = router;