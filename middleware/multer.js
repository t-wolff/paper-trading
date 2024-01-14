const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/profile_pictures');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '_' + file.fieldname + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage }).single('profilePic');

module.exports = { upload };
