let ws = null;
const WS_URL = "http://16.171.195.174/"

async function openWebSocket(TOKEN, product) {
	const tokenizedUrl = `${WS_URL}/?token=${TOKEN}`;
	return new Promise((resolve, reject) => {
		if (!ws) {
			ws = new WebSocket(tokenizedUrl);
			ws.addEventListener('open', () => {
				sendWebSocketMessage(product);
				setTimeout(() => {
					// if (ws.readyState === 1) {
					// console.log('WebSocket connection established.');
					resolve(ws);
					// }
				}, 1000);
			});

			ws.addEventListener('close', (event) => {
				console.log('WebSocket connection closed:', event);
				ws = null;
			});

			ws.addEventListener('error', (error) => {
				console.error('WebSocket error:', error);
				reject(error);
			});
		}
	});
}

async function setMessageHandler(onMessage) {
	return new Promise((resolve) => {
		const messageListener = (event) => {
			const data = JSON.parse(event.data.toString('utf8'));
			const messageHandled = onMessage(data);
			// if (messageHandled && !isSubscription) {
			// ws.removeEventListener('message', messageListener);
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

function sendWebSocketMessage(message) {
	if (ws && ws.readyState === WebSocket.OPEN) {
		ws.send(JSON.stringify(message));
	}
}

export { openWebSocket, setMessageHandler, closeWebSocket, sendWebSocketMessage };
