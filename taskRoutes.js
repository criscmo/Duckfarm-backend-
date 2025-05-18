// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { doTask, getTaskStatus } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

router.post('/do', auth, doTask); // POST /api/task/do
router.get('/:planId', auth, getTaskStatus); // GET /api/task/l1

module.exports = router;