const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const moment = require('moment');
const uuid = require('uuid');
const { pool } = require('../config/db');
const { getCurrentPrice } = require('../utils/getPrice');
const { getHistoricalData } = require('../utils/binanceHistorical');

// //@desc       Make trade
// //@route      POST /api/v1/trade
// //@access     Private
exports.createTrade = asyncHandler(async (req, res, next) => {
	const { userID, product, side, quantity } = req.body;
	const price = await getCurrentPrice(product);
	const nominal = side === 'BUY' ? quantity * price : -(quantity * price);

	if (!userID || !product || !side || !quantity) {
		return next(
			new ErrorResponse('Missing request field/s (userID, product, side, quantity)', 400)
		);
	} else if (quantity < 0) {
		return next(new ErrorResponse('Invalid quantity', 403));
	} else if (!price) {
		console.log(`Error while getting price, price : ${price}`);
		return next(new ErrorResponse('Server Error', 500));
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

	if (
		(side === 'BUY' && usdtBalance >= nominal) ||
		(side === 'SELL' && productBalance >= quantity)
	) {
		const productQuery = `SELECT productID FROM products WHERE name= ?`;
		const [productInfo] = await pool
			.promise()
			.execute(productQuery, [`${product}usdt`], (queryError) => {
				if (queryError) {
					console.error('Error executing get product id query:', queryError.message);
					return next(new ErrorResponse('Server Error', 500));
				}
			});
		const productID = productInfo[0].productID;

		const newTradeQuery =
			'INSERT INTO trades (tradeID, userID, productID, side, quantity, price, nominal, createdAt) VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)';
		const tradeId = uuid.v4();
		const tradeValues = [tradeId, userID, productID, side, quantity, price, nominal];

		pool.execute(newTradeQuery, tradeValues, (queryError) => {
			if (queryError) {
				console.error('Error executing create new trade query:', queryError.message);
				return next(new ErrorResponse('Server Error', 500));
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
				console.error('Error updating usdt balance:', queryError1.message);
				return next(new ErrorResponse('Server Error', 500));
			}

			pool.execute(updateBalanceQuery, productBalanceValues, (queryError2) => {
				if (queryError2) {
					console.error('Error updating product balance:', queryError2.message);
					return next(new ErrorResponse('Server Error', 500));
				}
				res.status(200).json({
					success: true,
					data: `New trade added with id of ${tradeId}, balances updated.`,
				});
			});
		});
	} else {
		return next(new ErrorResponse('Balance too low', 403));
	}
});


// //@desc       Get trades
// //@route      GET /api/v1/trade
// //@access     Private
exports.getAllTrades = asyncHandler(async (req, res, next) => {
	const { userID } = req.params;
	let { page, limit } = req.query;

	page = parseInt(page, 10) || 1;
	limit = parseInt(limit, 10) || 10;

	const offset = (page - 1) * limit;

	if (!userID) {
		return next(new ErrorResponse('Missing userID request field', 400));
	}

	const tradesQuery = `SELECT 
  				trades.side,
  				products.name AS productName,
  				trades.quantity,
  				trades.price,
  				trades.nominal,
  				trades.createdAt,
  				trades.tradeID FROM trades LEFT JOIN products ON trades.productID = products.productID 
				WHERE userID= ? 
				ORDER BY trades.createdAt DESC
				LIMIT ? OFFSET ?`;
	const [trades] = await pool.promise().query(tradesQuery, [userID, limit, offset], (queryError) => {
		if (queryError) {
			console.error('Error executing get trades:', queryError.message);
			return next(new ErrorResponse('Server Error', 500));
		}
	});

	if (!trades) {
		return next(new ErrorResponse(`User with ID ${userID} not found`, 404));
	} else if (!trades[0]) {
		return next(new ErrorResponse(`User with ID ${userID} has no trades`, 404));
	}

	const formattedTrades = trades.map((trade) => ({
		...trade,
		createdAt: moment(trade.createdAt).format('HH:mm:ss YYYY-MM-DD'),
		nominal: trade.nominal.toFixed(2),
	}));

	res.status(200).json({
		success: true,
		trades: formattedTrades,
	});
});

// //@desc       Get candles
// //@route      GET /api/v1/trade/candles
// //@access     Private
exports.getCandles = asyncHandler(async (req, res, next) => {
	const { userID, interval, symbol, timeFrame } = req.query;

	// const symbol = 'BTCUSDT';
	// const interval = '1d';
	// const timeFrame = '1y';

	if (!userID || !interval || !symbol || !timeFrame) {
		return next(new ErrorResponse('Missing fields (userID/interval/symbol/timeFrame)', 400));
	}

	const dataArr = await getHistoricalData(symbol, interval, timeFrame);

	if (!dataArr) {
		return next(new ErrorResponse(`Error getting candles data`));
	}

	// const formattedTrades = trades.map((trade) => ({
	// 	...trade,
	// 	createdAt: moment(trade.createdAt).format('HH:mm:ss YYYY-MM-DD'),
	// 	nominal: trade.nominal.toFixed(2),
	// }));

	const processedArray = dataArr.map((data) => {
		const time = new Date(JSON.parse(data[0]));
		const formattedDate = time.toISOString().split('T')[0];

		return {
			open: JSON.parse(data[1]),
			high: JSON.parse(data[2]),
			low: JSON.parse(data[3]),
			close: JSON.parse(data[4]),
			time: formattedDate,
		};
	});

	res.status(200).json({
		success: true,
		candles: processedArray,
	});
});

