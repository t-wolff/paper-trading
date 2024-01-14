const express = require('express');
const { calcStats, userStats } = require('../controllers/stats');
const router = express.Router();

router.get('/', userStats);
router.get('/:userID', calcStats);

module.exports = router;
