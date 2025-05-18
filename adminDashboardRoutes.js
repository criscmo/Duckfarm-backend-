const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/adminDashboardController');

router.get('/users', ctrl.getUsers);
router.get('/recharge', ctrl.getRecharges);
router.get('/withdraw', ctrl.getWithdraws);
router.get('/records', ctrl.getRecords);
router.post('/action', ctrl.handleAction);

module.exports = router;