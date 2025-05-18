const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateUser
} = require('../controllers/userController');

const auth = require('../middleware/authMiddleware');
const deviceFingerprintMiddleware = require('../middleware/deviceFingerprintMiddleware');

router.post('/register', deviceFingerprintMiddleware, register);
router.post('/login', login);
router.get('/', auth, getProfile);
router.post('/', auth, updateUser);

module.exports = router;