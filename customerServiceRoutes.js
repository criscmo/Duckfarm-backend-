const express = require('express');
const router = express.Router();
const { handleCustomerContact } = require('./customerServiceController');

router.post('/contact', handleCustomerContact);

module.exports = router;