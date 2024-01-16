const express = require('express');
const { createTrade, getAllTrades, getCandles } = require('../controllers/trade');
const router = express.Router();

const { protect } = require('../middleware/auth');

router.get('/candles', protect, getCandles)
router.get('/:userID', protect, getAllTrades);
router.post('/', protect, createTrade);

module.exports = router;
