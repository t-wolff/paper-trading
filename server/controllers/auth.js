const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { pool } = require('../config/db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const logger = require('../middleware/winston');

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
			return logger.error('Error executing check email query:', queryError.message);
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
				return logger.error('Error executing fill new balances query:', queryError.message);
			}
		});

		const registerQuery =
			'INSERT INTO users (userID, firstName, lastName, email, password, pnl) VALUES (?,?,?,?,?,?)';
		const salt = await bcrypt.genSalt(10);
		const encryptPassword = await bcrypt.hash(password.toString(), salt);
		const values = [userId, firstName, lastName, email, encryptPassword, 0];

		pool.execute(registerQuery, values, (queryError, results) => {
			if (queryError) {
				return logger.error('Error executing register user query:', queryError.message);
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
			return logger.error('Error executing check email query:', queryError.message);
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
	const { userID } = req.body;
	const profilePic = req.file;

	if (!userID || !profilePic) {
		return next(new ErrorResponse('Missing request fields', 400));
	}

	const profilePicPath = profilePic.path || null;
	const filenameWithoutDirectory = path.basename(profilePicPath);
	const pathWithoutPublic = `profile_pictures/${filenameWithoutDirectory}`;

	const userQuery = 'UPDATE users SET profilePic = ? WHERE userID = ?';
	await pool.promise().query(userQuery, [pathWithoutPublic, userID]);

	res.status(200).json({
		success: true,
	});
});

//@desc       get User details
//@route      GET /api/vi/auth/updateUser
//@access     Private

exports.getUser = asyncHandler(async (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	const decodedID = jwt.verify(token, process.env.JWT_SECRET).id;

	console.log(token);
	if (!token) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}
	
	const userQuery =
		'SELECT userID, firstName, lastName, email, profilePic FROM users WHERE userID = ?';
	const [users] = await pool.promise().query(userQuery, [decodedID]);

	res.status(200).json({
		success: true,
		user: {
			userID: users[0].userID,
			firstName: users[0].firstName,
			lastName: users[0].lastName,
			email: users[0].email,
			profilePic: users[0].profilePic,
		},
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

	if (process.env.NODE_ENV === 'prod') {
		options.secure = true;
	}

	res
		.status(statusCode)
		.cookie('token', token, options)
		.json({
			success: true,
			token,
			user: {
				userID: user.userID,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				profilePic: user.profilePic,
			},
		});
};
