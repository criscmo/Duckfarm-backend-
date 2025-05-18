// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/transactions', adminController.getTransactions);
router.put('/transactions/update', adminController.updateTransaction);

module.exports = router;