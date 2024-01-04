const path = require('path');
const express = require('express');
const Websocket = require('ws');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');

dotenv.config({ path: './config/config.env' });

// Route files
// const stories = require("./routes/stories");
const auth = require("./routes/auth");
const {
	openWebSocket,
	sendWebSocketMessage,
	setMessageHandler,
} = require('./controllers/tradeData');
// const reviews = require("./routes/reviews");

const app = express();

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ['http://localhost:5173', 'https://meek-marshmallow-b84019.netlify.app'],
		methods: ['POST', 'GET'],
		credentials: true,
	})
);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use("/api/v1/auth", auth);
// app.use("/api/v1/stories", stories);
// app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error : ${err.message}`);
	server.close(() => process.exit(1));
});

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 100,
});

const wss = new Websocket.Server({ server });


wss.on('connection', (ws, req) => {
	console.log('WebSocket connection attempted');

	// Extract token from the URL parameters
	const urlParams = new URLSearchParams(req.url.split('?')[1]);
	const token = urlParams.get('token');

	if (token && isValidToken(token)) {
		console.log('Valid token received. WebSocket connection established');

		ws.on('message', (message) => {
			console.log(`Received WebSocket message: ${message}`);
			ws.send(`Server received: ${message}`);
		});

		ws.on('close', () => {
			console.log('WebSocket connection closed');
		});
	} else {
		console.log(`token : ${token}`);
		console.log('Invalid or missing token. Closing WebSocket connection.');
		ws.close();
	}
});

function isValidToken(token) {
	return token;
}// connection to binance api

openWebSocket('btcusdt');
sendWebSocketMessage({
	method: 'SUBSCRIBE',
	params: ['btcusdt@kline_1m'],
	id: 1,
});
setMessageHandler(console.log);
