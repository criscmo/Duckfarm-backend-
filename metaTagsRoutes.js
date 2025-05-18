// metaTagsroutes.js
const express = require('express');
const router = express.Router();
const { setMetaTags } = require('./metatagscontroller');

// Apply security headers middleware to all routes
router.use(setMetaTags);

// Sample route (you can also serve static files here)
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

module.exports = router;