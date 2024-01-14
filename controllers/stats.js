const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { pool } = require('../config/db');
const { getCurrentPrice } = require('../utils/getPrice');

// //@desc       get pnl
// //@route      GET /api/v1/stats
// //@access     Private
exports.calcPnl = asyncHandler(async (req, res, next) => {
	const { userID } = req.params;
	const product = 'btc';
	const price = await getCurrentPrice(product);

	if (!userID) {
		return next(
			new ErrorResponse('Missing request field/s (userID)', 400)
		);
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

    try {
        const pnl = (usdtBalance - 1000) + (productBalance * price)  
        res.status(200).json({
			success: true,
			pnl: pnl.toFixed(2),
		});
    } catch {
        console.log('Error calculating pnl')
        return next(new ErrorResponse('Server Error', 500));
    }
});
