const express = require('express');
const router = express.Router();
const savingController = require('../controllers/savingController');
const auth = require('../middleware/auth'); // JWT/Session auth middleware

router.get('/', auth, savingController.getUserSavings);
router.post('/deposit', auth, savingController.depositToSavings);
router.post('/withdraw', auth, savingController.withdrawFromSavings);

module.exports = router;