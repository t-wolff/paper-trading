const axios = require('axios');

const endpoint = 'https://api.binance.com/api/v3/klines';

const symbol = 'BTCUSDT';

const interval = '1d';

function getHistoricalData(symbol, interval) {
	// Calculate the start timestamp for five years ago
	const startTime = new Date().setFullYear(new Date().getFullYear() - 5);

	const params = {
		symbol: symbol,
		interval: interval,
		startTime: startTime,
		endTime: Date.now(),
	};

	axios
		.get(endpoint, { params })
		.then((response) => {
			const klines = response.data;
			console.log(klines);
		})
		.catch((error) => {
			console.error('Error fetching Klines:', error.response ? error.response.data : error.message);
		});
}

module.exports = { getHistoricalData };