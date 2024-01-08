const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { pool } = require('../config/db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// //@desc       Make trade
// //@route      POST /api/v1/trade
// //@access     Private
exports.createTrade = asyncHandler(async (req, res, next) => {
	const { userID, product, side, quantity } = req.body;
	const price = 10;
	const nominal = side === 'BUY' ? quantity * price : -(quantity * price);

	if (!userID || !product || !side || !quantity) {
		return next(
			new ErrorResponse('Missing request field/s (userID, product, side, quantity)', 400)
		);
	}

	const balanceType = side === 'BUY' ? 'usdtBalance' : `${product}Balance`;
	const userQuery = `SELECT ${balanceType} FROM users WHERE userID= ?`;
	const [balances] = await pool.promise().query(userQuery, [userID], (queryError) => {
		if (queryError) {
			return console.error('Error executing check user balance query:', queryError.message);
		}
	});
    const balance = balances[0][balanceType];
  
	if ((side === 'BUY' && balance > nominal) || (side === 'SELL' && balance > quantity)) {
		const productQuery = `SELECT productID FROM products WHERE name= ?`;
		const [productInfo] = await pool
			.promise()
			.query(productQuery, [`${product}usdt`], (queryError) => {
				if (queryError) {
					return console.error('Error executing get product id query:', queryError.message);
				}
			});
        const productID = productInfo[0].productID;

		const newTradeQuery =
			'INSERT INTO trades (tradeID, userID, productID, side, quantity, price, nominal, createdAt) VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)';
		const id = uuid.v4();
		const values = [id, userID, productID, side, quantity, price, nominal];

		pool.query(newTradeQuery, values, (queryError, results) => {
			if (queryError) {
				return console.error('Error executing create new trade query:', queryError.message);
			}
			res.status(200).json({
				success: true,
				data: results,
			});
		});
	} else {
		return new ErrorResponse('Balance too low', 401);
	}
});
