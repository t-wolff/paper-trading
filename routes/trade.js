const express = require('express');
const { createTrade} = require('../controllers/trade');
const router = express.Router();

const { protect } = require('../middleware/auth');

// router.get('/', protect, getTrades);
router.post('/', protect, createTrade);
// router.get("/:id", protect, getTrade);

module.exports = router;
