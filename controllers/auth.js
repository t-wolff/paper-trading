const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { pool } = require('../config/db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

//@desc       Register user
//@route      POST /api/v1/auth/register
//@access     Public
exports.register = asyncHandler(async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;
	let isEmailInUse = false;

	if (!firstName || !lastName || !email || !password) {
		return next(
			new ErrorResponse('Missing request field/s (name, lastName, email, password)', 400)
		);
	}

	const emailQuery = 'SELECT * FROM users WHERE email= ?';
	const [rows] = await pool.promise().query(emailQuery, [email], (queryError) => {
		if (queryError) {
			return console.error('Error executing check email query:', queryError.message);
		}
	});

	if (rows.length > 0) {
		isEmailInUse = true;
		return next(new ErrorResponse('Input email is in use', 400));
	}

	if (!isEmailInUse) {
		const userId = uuid.v4();

		const balanceQuery =
			'INSERT INTO balances (balanceID, userID, balanceAmount, balanceType) VALUES (?,?,?,?), (?,?,?,?)';
		const balanceId1 = uuid.v4();
		const balanceId2 = uuid.v4();
		const balanceValues = [balanceId1, userId, 1000, 'usdt', balanceId2, userId, 0, 'btc'];

		pool.query(balanceQuery, balanceValues, (queryError) => {
			if (queryError) {
				return console.error('Error executing fill new balances query:', queryError.message);
			}
		});

		const registerQuery =
			'INSERT INTO users (userID, firstName, lastName, email, password) VALUES (?,?,?,?,?)';
		const salt = await bcrypt.genSalt(10);
		const encryptPassword = await bcrypt.hash(password.toString(), salt);
		const values = [userId, firstName, lastName, email, encryptPassword];

		pool.execute(registerQuery, values, (queryError, results) => {
			if (queryError) {
				return console.error('Error executing register user query:', queryError.message);
			}
			res.status(200).json({
				success: true,
				data: results,
			});
		});
	}
});

// //@desc       Login user
// //@route      POST /api/v1/auth/login
// //@access     Public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and a password', 400));
	}

	const emailQuery = 'SELECT * FROM users WHERE email= ?';
	const [users] = await pool.promise().query(emailQuery, [email], (queryError) => {
		if (queryError) {
			return console.error('Error executing check email query:', queryError.message);
		}
	});

	const user = users[0];
	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	const isMatch = await bcrypt.compare(password.toString(), user.password);
	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	sendTokenResponse(user, 200, res);
});

//@desc       Update user details
//@route      PUT /api/vi/auth/updateUser
//@access     Private

exports.updateUser = asyncHandler(async (req, res, next) => {
  const profilePic = req.file
  const userID = req.body.userID

  console.log(req);
//   if (!userID || !profilePic) {
// 	return next(new ErrorResponse("Missing request fields", 400))
//   } 

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/profile_pictures');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.fieldname + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage: storage }).single('profilePic');

  upload(req, res, async function (uploadError) {
    if (uploadError) {
      return next(new ErrorResponse("Error uploading profile picture", 500));
    }

    // Assuming the 'profilePic' field is the name attribute in your form for the file input
    const profilePicPath = req.file ? req.file.path : null;

    // Now update the database with the profilePicPath
    const userQuery = 'UPDATE users SET profilePic = ? WHERE userID = ?';
    const [user] = await pool.promise().query(userQuery, [profilePicPath, userID]);

    res.status(200).json({
      success: true,
      data: user,
    });
  });
});


const sendTokenResponse = async (user, statusCode, res) => {
	const token = jwt.sign({ id: user.userID }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});

	const options = {
		Expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res.status(statusCode).cookie('token', token, options).json({ success: true, token, user: {"userID": user.userID, "firstName": user.firstName, "lastName": user.lastName, "email": user.email}});
};
