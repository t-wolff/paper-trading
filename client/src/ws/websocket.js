let ws = null;
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost::5000';

async function openWebSocket(TOKEN) {
	const tokenizedUrl = `${WS_URL}/?token=${TOKEN}`;
	return new Promise((resolve, reject) => {
		if (!ws) {
			ws = new WebSocket(tokenizedUrl);
			ws.addEventListener('open', (event) => {
				console.log('WebSocket connection opened:', event);
				sendWebSocketMessage('lolA');
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
		console.log('sending msg');
		ws.send(JSON.stringify(message));
	}
}

export { openWebSocket, setMessageHandler, closeWebSocket, sendWebSocketMessage };
