// routes/financialRecordsRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getTransactions,
  addRecharge,
  addWithdraw,
  getBalance
} = require('../controllers/financialRecordsController');

// Pata historia ya miamala ya mtumiaji
router.get('/transactions', auth, getTransactions);

// Recharge (kuongeza salio)
router.post('/recharge', auth, addRecharge);

// Withdraw (kutoa pesa)
router.post('/withdraw', auth, addWithdraw);

// Salio la mtumiaji
router.get('/balance', auth, getBalance);

module.exports = router;