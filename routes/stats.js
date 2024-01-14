const express = require('express');
const { calcStats } = require('../controllers/stats');
const router = express.Router();

router.get('/:userID', calcStats);

module.exports = router;
