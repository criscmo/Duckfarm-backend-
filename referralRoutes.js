const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const authenticate = require('../middleware/authenticate'); // e.g., JWT or session

router.get('/user', authenticate, referralController.getReferralInfo);

module.exports = router;