const { resolve } = require('path');
const { pool } = require('../config/db');
const { getCurrentPrice } = require('./getPrice');

async function calcAllPnl () {
	const btcPrice = await getCurrentPrice('btc');
	try {
		const pnlQuery = `UPDATE users
		SET pnl = (
    	SELECT (balances.balanceAmount - 1000 + balancesProduct.balanceAmount * ${btcPrice})
    	FROM balances
    	LEFT JOIN balances AS balancesProduct ON balancesProduct.userID = users.userID AND balancesProduct.balanceType = 'btc'
    	WHERE balances.userID = users.userID AND balances.balanceType = 'usdt'
		);`;

		const [sqlRes] = await pool.promise().query(pnlQuery);
        if (sqlRes) {console.log('Calculated PNL for all users')}
	} catch (error) {
		console.error('Error executing update all pnl query:', error.message);
        throw error;
	}
}

module.exports = { calcAllPnl };