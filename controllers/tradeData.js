const Websocket = require('ws');
let ws = null;

async function openWebSocket(product) {
	return new Promise((resolve, reject) => {
		if (!ws) {
			ws = new Websocket(`${process.env.BINANCE_URL_TEST}${product}`);
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

async function setMessageHandler(onMessage, isSubscription) {
	return new Promise(async (resolve, reject) => {
		const messageListener = (event) => {
			const data = JSON.parse(event.data.toString('utf8'));
			const messageHandled = onMessage(data);
			// if (messageHandled && !isSubscription) {
			// 	ws.removeEventListener('message', messageListener);
			// }
			resolve(messageHandled);
		};

		if (ws) {
			ws.addEventListener('message', messageListener);
		}
	});
}

function closeWebSocket() {
	if (ws) {
		ws.close();
	}
}

// function sendWebSocketMessage(message) {
//     console.log(88888);
// 	if (ws && ws.readyState === Websocket.OPEN) {
// 		ws.send(JSON.stringify(message));
//         console.log(4444);
// 	}
// }

async function sendWebSocketMessage(message, maxRetries = 5, retryInterval = 2000) {
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

module.exports = { openWebSocket, setMessageHandler, closeWebSocket, sendWebSocketMessage };
