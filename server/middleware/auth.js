const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;
	const userIDFromParams = await req.params.userID;
	const userIDFromBody = await req.body.userID;
	const userIDFromQuery = await req.query.userID;
	const userID = userIDFromParams || userIDFromBody || userIDFromQuery;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
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

