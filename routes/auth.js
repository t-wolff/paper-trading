const express = require('express');
const { register, login, updateUser } = require('../controllers/auth');
const router = express.Router();

const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/multer');

router.post('/register', register);
router.post('/login', login);
router.put('/updateUser', upload, protect, updateUser);

module.exports = router;
