const jwt = require('jsonwebtoken');
const ErrorResponse = require('./errorResponse');

async function verifyToken(req, next) {
	let token;
	const { userID } = req.body;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
		// Set token from cookie
	}
	// else if (req.cookies.token) {
	//   token = req.cookies.token;
	// }

	if (!token) {
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
}

module.exports = { verifyToken };
