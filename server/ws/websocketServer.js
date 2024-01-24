const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const logger = require('../middleware/winston');

const newWebsocketServer = (server) => {
	return new Promise((resolve, reject) => {
		const wss = new WebSocket.Server({ server });

		wss.on('connection', (ws, req) => {
			logger.info('WebSocket connection attempted');

			const urlParams = new URLSearchParams(req.url.split('?')[1]);
			const token = urlParams.get('token');

			if (token && isValidToken(token)) {
				logger.info('Valid token received. WebSocket connection established');

				wss.on('message', (message) => {
					logger.info(`Received WebSocket message: ${message}`);
				});

				wss.on('close', () => {
					logger.info('WebSocket connection closed');
				});

				resolve(wss);
			} else {
				logger.error('Invalid or missing token. Closing WebSocket connection.');
				wss.close();
				reject(new Error('Invalid or missing token'));
			}
		});
	});
};

function isValidToken(token) {
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	return decoded;
}

module.exports = { newWebsocketServer };
