// let ws = null;

// const BASE_URL =
// 	import.meta.env.VITE_MODE === 'prod'
// 		? import.meta.env.VITE_WS_URL_PROD
// 		: import.meta.env.VITE_WS_URL;

// async function openWebSocket(TOKEN, product) {
// 	const tokenizedUrl = `${BASE_URL}/?token=${TOKEN}`;
// 	return new Promise((resolve, reject) => {
// 		if (!ws) {
// 			ws = new WebSocket(tokenizedUrl);
// 			ws.addEventListener('open', () => {
// 				sendWebSocketMessage(product);
// 				setTimeout(() => {
// 					// if (ws.readyState === 1) {
// 					// console.log('WebSocket connection established.');
// 					resolve(ws);
// 					// }
// 				}, 1000);
// 			});

// 			ws.addEventListener('close', (event) => {
// 				console.log('WebSocket connection closed:', event);
// 				ws = null;
// 			});

// 			ws.addEventListener('error', (error) => {
// 				console.error('WebSocket error:', error);
// 				reject(error);
// 			});
// 		}
// 	});
// }

// async function setMessageHandler(onMessage) {
// 	return new Promise((resolve) => {
// 		const messageListener = (event) => {
// 			const data = JSON.parse(event.data.toString('utf8'));
// 			const messageHandled = onMessage(data);
// 			// if (messageHandled && !isSubscription) {
// 			// ws.removeEventListener('message', messageListener);
// 			// }
// 			resolve(messageHandled);
// 		};

// 		if (ws) {
// 			ws.addEventListener('message', messageListener);
// 		}
// 	});
// }

// function closeWebSocket() {
// 	if (ws) {
// 		ws.close();
// 	}
// }

// function sendWebSocketMessage(message) {
// 	if (ws && ws.readyState === WebSocket.OPEN) {
// 		ws.send(JSON.stringify(message));
// 	}
// }

// export { openWebSocket, setMessageHandler, closeWebSocket, sendWebSocketMessage };


let ws = null;
const messageListeners = new Map();

const BASE_URL =
	import.meta.env.VITE_MODE === 'prod'
		? import.meta.env.VITE_WS_URL_PROD
		: import.meta.env.VITE_WS_URL;

async function openWebSocket(TOKEN, product) {
	const tokenizedUrl = `${BASE_URL}/?token=${TOKEN}`;
	return new Promise((resolve, reject) => {
		if (!ws) {
			ws = new WebSocket(tokenizedUrl);
			ws.addEventListener('open', () => {
				sendWebSocketMessage(product);
				setTimeout(() => {
					resolve(ws);
				}, 1000);
			});

			ws.addEventListener('close', (event) => {
				console.log('WebSocket connection closed:', event);
				ws = null;
				messageListeners.clear(); // Clear all listeners on close
			});

			ws.addEventListener('error', (error) => {
				console.error('WebSocket error:', error);
				reject(error);
			});
		}
	});
}

function setMessageHandler(onMessage) {
	const listener = (event) => {
		const data = JSON.parse(event.data.toString('utf8'));
		onMessage(data);
	};

	if (ws) {
		ws.addEventListener('message', listener);
		messageListeners.set(onMessage, listener);
	}
}

function removeMessageHandler(onMessage) {
	const listener = messageListeners.get(onMessage);
	if (ws && listener) {
		ws.removeEventListener('message', listener);
		messageListeners.delete(onMessage);
	}
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

export {
	openWebSocket,
	setMessageHandler,
	removeMessageHandler,
	closeWebSocket,
	sendWebSocketMessage,
};
