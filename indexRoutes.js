const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/indexController');

router.post('/', registerUser);

module.exports = router;