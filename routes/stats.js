const express = require('express');
const {
	calcPnl
} = require('../controllers/stats');
const router = express.Router();

router.get('/:userID', calcPnl);

module.exports = router;
