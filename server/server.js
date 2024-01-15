const path = require('path');
const express = require('express');
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
const auth = require('./routes/auth');
const trade = require('./routes/trade');
const stats = require('./routes/stats');

const { newWebsocketServer } = require('./ws/websocketServer');
const { newBinanceConnection } = require('./ws/binanceWs');

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

// routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/trade', trade);
app.use('/api/v1/stats', stats);

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

(async () => {
	try {
		const wss = await newWebsocketServer(server);
		newBinanceConnection(wss);
	} catch (error) {
		console.error('Error creating WebSocket server:', error.message);
	}
})();
