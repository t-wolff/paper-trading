const { pool } = require('../config/db');
const { getCurrentPrice } = require('./getPrice');
const logger = require('../middleware/winston');

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
        // if (sqlRes) {logger.info('Calculated PNL for all users')}
	} catch (error) {
		logger.error('Error executing update all pnl query:', error.message);
        throw error;
	}
}

module.exports = { calcAllPnl };