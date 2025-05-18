const express = require('express');
const router = express.Router();
const csrfController = require('../controllers/csrfController');

router.get('/csrf-token', csrfController.getCSRFToken);
router.post('/submit', csrfController.submitForm);

module.exports = router;