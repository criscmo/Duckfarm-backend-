const express = require('express');
const router = express.Router();
const {
  handleEnvelopeSubmission,
  handleGetWinners
} = require('./envelopecontroller');

router.post('/envelope', handleEnvelopeSubmission);
router.get('/envelope/winners', handleGetWinners);

module.exports = router;