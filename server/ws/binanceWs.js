const Websocket = require('ws');
let ws = null;

async function openBinanceWebSocket(product) {
	return new Promise((resolve, reject) => {
		if (!ws) {
			console.log('opening websocket connection with binance');
			ws = new Websocket(`${process.env.BINANCE_URL}${product}@kline_5`);
			ws.addEventListener('open', (event) => {
				console.log('WebSocket connection opened:', event.type);

				if (ws.readyState === Websocket.OPEN) {
					console.log('WebSocket connection established.');
					resolve(ws);
				}
			});

			ws.addEventListener('close', (event) => {
				console.log('WebSocket connection closed:', event.reason, 'wasClean:', event.wasClean);
				ws = null;
			});

			ws.addEventListener('error', (error) => {
				console.error('WebSocket error:', error.message);
				reject(error);
			});
		}
	});
}

async function setBinanceMessageHandler(onMessage) {
	return new Promise(async (resolve, reject) => {
		const messageListener = (event) => {
			const data = JSON.parse(event.data.toString('utf8'));
			const messageHandled = onMessage(data);
			// if (messageHandled && !isSubscription) {
			// 	ws.removeEventListener('message', messageListener);
			// }
			// resolve(messageHandled);
		};

		if (ws) {
			ws.addEventListener('message', messageListener);
		}
	});
}

function closeBinanceWebSocket() {
	if (ws) {
		ws.close();
	}
}

async function sendBinanceWebSocketMessage(message, maxRetries = 5, retryInterval = 2000) {
	const send = async (attempt) => {
		if (ws && ws.readyState === Websocket.OPEN) {
			ws.send(JSON.stringify(message));
			console.log('Message sent:', message);
		} else if (attempt < maxRetries) {
			console.log(
				`WebSocket not open, retrying in ${retryInterval / 1000} seconds (attempt ${
					attempt + 1
				}/${maxRetries}).`
			);
			setTimeout(() => send(attempt + 1), retryInterval);
		} else {
			console.error('Max retries reached, unable to send message.');
		}
	};

	send(0);
}

function newBinanceConnection(wss) {

	try {
		openBinanceWebSocket('btcusdt');
	} catch {
		return console.error('error connecting to binance ws');
	}

	sendBinanceWebSocketMessage({
		method: 'SUBSCRIBE',
		params: ['btcusdt@kline_1m'],
		id: 1,
	});

	setBinanceMessageHandler((data) => {
		wss.clients.forEach((client) => {
			if (client.readyState === Websocket.OPEN) {
				client.send(JSON.stringify(data));
			}
		});
		return true;
	});
}

module.exports = {
	openBinanceWebSocket,
	setBinanceMessageHandler,
	closeBinanceWebSocket,
	sendBinanceWebSocketMessage,
	newBinanceConnection,
};
