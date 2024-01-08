const WebSocket = require('ws');

const newWebsocketServer = (server) => {
	return new Promise((resolve, reject) => {
		const wss = new WebSocket.Server({ server });

		wss.on('connection', (ws, req) => {
			console.log('WebSocket connection attempted');

			const urlParams = new URLSearchParams(req.url.split('?')[1]);
			const token = urlParams.get('token');

			if (token && isValidToken(token)) {
				console.log('Valid token received. WebSocket connection established');

				wss.on('message', (message) => {
					console.log(`Received WebSocket message: ${message}`);
				});

				wss.on('close', () => {
					console.log('WebSocket connection closed');
				});

				resolve(wss);
			} else {
				console.log(`token : ${token}`);
				console.log('Invalid or missing token. Closing WebSocket connection.');
				wss.close();
				reject(new Error('Invalid or missing token'));
			}
		});
	});
};

function isValidToken(token) {
	return token;
}

module.exports = { newWebsocketServer };
