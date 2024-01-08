const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { pool } = require('../config/db');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

// //@desc       Make trade
// //@route      POST /api/v1/trade
// //@access     Private
exports.createTrade = asyncHandler(async (req, res, next) => {
	const { userID, product, side, quantity } = req.body;
	const price = 20;
	const nominal = side === 'BUY' ? quantity * price : -(quantity * price);

	if (!userID || !product || !side || !quantity) {
		return next(
			new ErrorResponse('Missing request field/s (userID, product, side, quantity)', 400)
		);
	}
	const userQuery = `SELECT balanceAmount, balanceType FROM balances WHERE userID= ?`;
	const [balances] = await pool.promise().execute(userQuery, [userID], (queryError) => {
		if (queryError) {
			return console.error('Error executing check user balance query:', queryError.message);
		}
	});

	if (!balances[0]) {
		return next(new ErrorResponse(`User with ID ${userID} not found`));
	}

	const usdtBalance = balances.find((item) => item.balanceType === 'usdt').balanceAmount;
	const productBalance = balances.find((item) => item.balanceType === product).balanceAmount;

	if ((side === 'BUY' && usdtBalance > nominal) || (side === 'SELL' && productBalance > quantity)) {
		const productQuery = `SELECT productID FROM products WHERE name= ?`;
		const [productInfo] = await pool
			.promise()
			.execute(productQuery, [`${product}usdt`], (queryError) => {
				if (queryError) {
					return console.error('Error executing get product id query:', queryError.message);
				}
			});
		const productID = productInfo[0].productID;

		const newTradeQuery =
			'INSERT INTO trades (tradeID, userID, productID, side, quantity, price, nominal, createdAt) VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)';
		const tradeId = uuid.v4();
		const values = [tradeId, userID, productID, side, quantity, price, nominal];

		pool.execute(newTradeQuery, values, (queryError, results) => {
			if (queryError) {
				return console.error('Error executing create new trade query:', queryError.message);
			}
		});

		const newUsdtBalance = usdtBalance - nominal;
		const newProductBalance =
			side === 'BUY' ? productBalance + quantity : productBalance - quantity;

		const updateBalanceQuery =
			'UPDATE balances SET balanceAmount = ? WHERE balanceType = ? AND userID= ?';
		const usdtBalanceValues = [newUsdtBalance, 'usdt', userID];
		const productBalanceValues = [newProductBalance, product, userID];

		pool.execute(updateBalanceQuery, usdtBalanceValues, (queryError1) => {
			if (queryError1) {
				return console.error('Error updating usdt balance:', queryError1.message);
			}

			pool.execute(updateBalanceQuery, productBalanceValues, (queryError2) => {
				if (queryError2) {
					return console.error('Error updating product balance:', queryError2.message);
				}
				res.status(200).json({
					success: true,
					data: `New trade added with id of ${tradeId}, balances updated.`,
				});
			});
		});
	} else {
		return new ErrorResponse('Balance too low', 401);
	}
});
