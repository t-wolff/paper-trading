const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { pool } = require('../config/db');

//@desc       Register user
//@route      POST /api/vi/auth/register
//@access     Public
exports.register = asyncHandler((req, res, next) => {
  const { name, lastName, email, password } = req.body;
  const query = 'INSERT INTO table_name VALUES'
	pool.query('SELECT * FROM users', (queryError, results) => {
		if (queryError) {
			console.error('Error executing query:', queryError.message);
			return;
		}
    res.status(200).json({
			success: true,
			data: results,
		});
	});
});

// // //@desc       Login user
// // //@route      POST /api/vi/auth/login
// // //@access     Public
// exports.login = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;
//   console.log(req.body);

//   //Validate email and password
//   if (!email || !password) {
//     return next(new ErrorResponse("Please provide an email and password", 400));
//   }

//   // Check for user
//   const user = await User.findOne({ email }).select("+password");
//   if (!user) {
//     return next(new ErrorResponse("Invalid credentials", 401));
//   }

//   //Check if password matches
//   const isMatch = await user.matchPassword(password);

//   if (!isMatch) {
//     return next(new ErrorResponse("Invalid credentials", 401));
//   }
//   sendTokenResponse(user, 200, res);
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
