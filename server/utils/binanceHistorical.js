const axios = require('axios');
const logger = require('../middleware/winston');

async function getHistoricalData(symbol, interval, time) {
	const startTime = calculateStartTime(time);

	const params = {
		symbol: symbol,
		interval: interval,
		startTime: startTime,
		endTime: Date.now(),
	};

	const res = await axios({
		method: 'GET',
		url: `${process.env.BINANCE_URL_DATA}`,
		params: params ,
	});

	if (res.status === 200) {
		const klines = res.data;
		return klines;
		// getTrades()
	} else {
		logger.error('error getting klines');
		throw error;
	}
}

function calculateStartTime(time) {
	const currentDate = new Date();

	if (time.endsWith('y')) {
		const years = parseInt(time);
		return currentDate.setFullYear(currentDate.getFullYear() - years);
	} else if (time.endsWith('m')) {
		const months = parseInt(time);
		return currentDate.setMonth(currentDate.getMonth() - months);
	} else if (time.endsWith('w')) {
		const weeks = parseInt(time);
		return currentDate - weeks * 7 * 24 * 60 * 60 * 1000;
	} else {
		return Date.now();
	}
}
module.exports = { getHistoricalData };
