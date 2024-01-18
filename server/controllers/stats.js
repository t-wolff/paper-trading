const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { pool } = require('../config/db');
const { getCurrentPrice } = require('../utils/getPrice');
const { calcAllPnl } = require('../utils/calcAllPnl');

// //@desc       calculate pnl
// //@route      GET /api/v1/stats/:userID
// //@access     Private
exports.calcStats = asyncHandler(async (req, res, next) => {
	try {
		const { userID } = req.params;
		const product = 'btc';

		if (!userID) {
			return next(new ErrorResponse('Missing request field/s (userID)', 400));
		}

		const userQuery = `SELECT balanceAmount, balanceType FROM balances WHERE userID= ?`;
		const [balances] = await pool.promise().execute(userQuery, [userID], (queryError) => {
			if (queryError) {
				console.error('Error executing check user balance query:', queryError.message);
				return next(new ErrorResponse('Server Error', 500));
			}
		});
		if (!balances[0]) {
			return next(new ErrorResponse(`User with ID ${userID} not found`));
		}

		const usdtBalance = balances.find((item) => item.balanceType === 'usdt').balanceAmount;
		const productBalance = balances.find((item) => item.balanceType === product).balanceAmount;

		await calcAllPnl();

		const userPnlQuery = `SELECT userID, pnl, RANK() OVER (ORDER BY pnl DESC) AS position FROM users`;
		const [allUsers] = await pool.promise().query(userPnlQuery, [userID], (queryError) => {
			if (queryError) {
				console.error('Error executing check user position and pnl query:', queryError.message);
				return next(new ErrorResponse('Server Error', 500));
			}
		});

		const user = allUsers.find((user) => user.userID === userID);
		const pnl = parseFloat(user.pnl).toFixed(2);

		res.status(200).json({
			success: true,
			pnl,
			position: user.position,
			usdtBalance: usdtBalance.toFixed(2),
			productBalance,
		});
	} catch {
		console.log('Error calculating user pnl');
		return next(new ErrorResponse('Server Error', 500));
	}
});

// //@desc       get and calc all pnl
// //@route      GET /api/v1/stats
// //@access     Private
exports.userStats = asyncHandler(async (req, res, next) => {
	try {
		try{await calcAllPnl();} catch{return next(new ErrorResponse('Calc pnl failed', 500));}
	
		const pnlQuery = `SELECT firstName, lastName, profilePic, pnl, RANK() OVER (ORDER BY pnl DESC) AS position FROM users ORDER BY pnl DESC LIMIT 10`;
		const [rawUsers] = await pool.promise().query(pnlQuery);

		const users = rawUsers.map((user) => ({ ...user, pnl: JSON.parse(user.pnl).toFixed(2) }));

		res.status(200).json({
			success: true,
			users,
		});
	} catch (error) {
		console.error('Error executing check user balance query:', error.message);
		return next(new ErrorResponse('Server Error', 500));
	}
});
