const axios = require('axios');
const binanceApiBaseUrl = 'https://api.binance.com/api/v3';

async function getCurrentPrice(symbol) {
    const binanceProduct = encodeURIComponent(`${symbol.toUpperCase()}USDT`);
	try {
		const response = await axios.get(`${binanceApiBaseUrl}/ticker/price?symbol=${binanceProduct}`);
		if (response.data && response.data.price) {
			// console.log(`Current price of ${binanceProduct}: ${response.data.price}`);
			return parseFloat(response.data.price);
		} else {
			console.log('Invalid response from Binance API');
		}
	} catch (error) {
		console.error('Error fetching price from Binance API:', error.response);
	}
}

module.exports = { getCurrentPrice };