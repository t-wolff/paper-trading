const express = require('express');
const { createTrade, getAllTrades } = require('../controllers/trade');
const router = express.Router();

const { protect } = require('../middleware/auth');

router.get('/:userID', protect, getAllTrades);
router.post('/', protect, createTrade);
// router.get("/:id", protect, getTrade);

module.exports = router;
