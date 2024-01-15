const express = require('express');
const router = express.Router();
const { register, login, updateUser } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.put('/updateUser', protect, updateUser);

module.exports = router;
