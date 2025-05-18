const express = require('express');
const router = express.Router();
const { getUserDucks, feedDuck } = require('./myduckscontroller');

// GET ducks for a specific user
router.get('/users/:userId/ducks', getUserDucks);

// POST feed duck
router.post('/ducks/:duckId/feed', feedDuck);

module.exports = router;