const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const rechargeController = require('../controllers/rechargeController');

router.post('/', upload.single('screenshot'), rechargeController.createRecharge);
router.get('/', rechargeController.getRecharges);
router.put('/:id/status', rechargeController.updateRechargeStatus);

module.exports = router;