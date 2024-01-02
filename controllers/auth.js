const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { pool } = require('../config/db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

//@desc       Register user
//@route      POST /api/v1/auth/register
//@access     Public
exports.register = asyncHandler(async (req, res, next) => {
	const { name, lastName, email, password } = req.body;
  let isEmailInUse = false;

	if (!name || !lastName || !email || !password) {
		return next(
			new ErrorResponse('Missing request field/s (name, lastName, email, password)', 400)
		);
	}

  const query1 = 'SELECT * FROM users WHERE email= ?';
	const [rows] = await pool.promise().query(query1, [email], (queryError) => {
    if (queryError) {
      return console.error('Error executing check email query:', queryError.message)
    };
  })

	if (rows.length > 0) {
    isEmailInUse = true;
		return next(new ErrorResponse('Input email is in use', 400));
	} 


  if (!isEmailInUse) {
    const query = 'INSERT INTO users (userID, userName, userLastName, email, password) VALUES (?,?,?,?,?)';
		const id = uuid.v4();
    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password, salt);
		const values = [id, name, lastName, email, encryptPassword];

		pool.execute(query, values, (queryError, results) => {
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

// // //@desc       Login user
// // //@route      POST /api/v1/auth/login
// // //@access     Public
// exports.login = asyncHandler(async (req, res, next) => {
// 	const { email, password } = req.body;

// 	if (!email || !password) {
// 		return next(new ErrorResponse('Please provide an email and a password', 400));
// 	}

// 	// Check for user
// 	const user = await User.findOne({ email }).select('+password');
// 	if (!user) {
// 		return next(new ErrorResponse('Invalid credentials', 401));
// 	}

// 	//Check if password matches
// 	const isMatch = await user.matchPassword(password);

// 	if (!isMatch) {
// 		return next(new ErrorResponse('Invalid credentials', 401));
// 	}
// 	sendTokenResponse(user, 200, res);
// });

// //@desc       Get current logged in user
// //@route      POST /api/vi/auth/me
// //@access     Private

// // exports.getMe = asyncHandler(async (req, res, next) => {
// //   const user = await User.findById(req.user.id);
// //   res.status(200).json({
// //     success: true,
// //     data: user,
// //   });
// // });

// //@desc       Update user details
// //@route      PUT /api/vi/auth/updatedetails
// //@access     Private

// // exports.updateDetails = asyncHandler(async (req, res, next) => {
// //   const fieldsToUpdate = {
// //     name: req.body.name,
// //     email: req.body.email,
// //   };

// //   const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
// //     new: true,
// //     runValidators: true,
// //   });

// //   res.status(200).json({
// //     success: true,
// //     data: user,
// //   });
// // });

// //Get token from model,create cookie and send response
// const sendTokenResponse = (user, statusCode, res) => {
//   //Create token
//   const token = user.getSignedJwtToken();
//   const options = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   if (process.env.NODE_ENV === "production") {
//     options.secure = true;
//   }

//   res
//     .status(statusCode)
//     .cookie("token", token, options)
//     .json({ success: true, token });
// };
