// const multer = require('multer');

// const imageFilter = (req, file, cb) => {
// 	if (file.mimetype.startsWith('image')) {
// 		cb(null, true);
// 	} else {
// 		cb('Please upload only images.', false);
// 	}
// };

// var storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
//         		cb(null, 'public/profile_pictures');

// 		cb(null, __basedir + 'public/profile_pictures');
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
// 	},
// });

// // const upload = multer({ storage: storage }).single('profilePic');
// const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

// module.exports = uploadFile;

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, 'public/profile_pictures');
// 	},
// 	filename: function (req, file, cb) {
// 		console.log(file);
// 		cb(null, Date.now() + '_' + file.fieldname + path.extname(file.originalname));
// 	},
// });

// const upload = multer({ storage: storage }).single('profilePic');