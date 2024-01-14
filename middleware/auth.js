const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');


// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;
	const { userID } = req.params || req.body ;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split(' ')[1];
		// Set token from cookie
	}
	// else if (req.cookies.token) {
	//   token = req.cookies.token;
	// }

	if (!token || !userID) {
		return next(new ErrorResponse('Not authorized to access this route', 401));
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		 if (userID && userID !== decoded.id) {
				return next(new ErrorResponse('User ID does not match the token', 401));
			}

		next();
	} catch (err) {
		return next(new ErrorResponse('Not authorized to access this route', 401));
	}
});

// Grant access to specific roles
exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403)
			);
		}
		next();
	};
};
