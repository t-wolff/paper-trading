const express = require('express');
const router = express.Router();
const { register, login, updateUser } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/profile_pictures');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '_' + file.fieldname + file.originalname);
	},
});

const upload = multer({ storage: storage }).single('profilePic');

router.post('/register', register);
router.post('/login', login);
router.put('/updateUser', upload, protect, updateUser);

module.exports = router;
