const axios = require('axios');
const binanceApiBaseUrl = 'https://api.binance.com/api/v3';
const logger = require('../middleware/winston');

async function getCurrentPrice(symbol) {
    const binanceProduct = encodeURIComponent(`${symbol.toUpperCase()}USDT`);
	try {
		const response = await axios.get(`${binanceApiBaseUrl}/ticker/price?symbol=${binanceProduct}`);
		if (response.data && response.data.price) {
			// logger.info(`Current price of ${binanceProduct}: ${response.data.price}`);
			return parseFloat(response.data.price);
		} else {
			logger.error('Invalid response from Binance API');
		}
	} catch (error) {
		logger.error('Error fetching price from Binance API:', error.response);
	}
}

module.exports = { getCurrentPrice };