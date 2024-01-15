const express = require('express');
const { calcStats, userStats } = require('../controllers/stats');
const router = express.Router();

const { protect } = require('../middleware/auth');

router.get('/', userStats);
router.get('/:userID', protect, calcStats);

module.exports = router;
