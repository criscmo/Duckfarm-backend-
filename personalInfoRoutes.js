const express = require('express');
const router = express.Router();
const { updatePersonalInfo, getPersonalInfo } = require('../controllers/personalInfoController');

// PUT - Update or Create
router.put('/:userId/profile', updatePersonalInfo);

// GET - Get info
router.get('/:userId/profile', getPersonalInfo);

module.exports = router;