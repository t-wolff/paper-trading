const path = require('path');
const express = require('express');
const Websocket = require('ws');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

const cors = require('cors');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

dotenv.config({ path: './config/config.env' });

// Route files
// const stories = require("./routes/stories");
// const auth = require("./routes/auth");
// const reviews = require("./routes/reviews");

const app = express();

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
// app.use("/api/v1/stories", stories);
// app.use("/api/v1/auth", auth);
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

// WebSocket connections
wss.on('connection', (ws) => {
	console.log('WebSocket connection established');

	// Handle incoming WebSocket messages
	ws.on('message', (message) => {
		console.log(`Received WebSocket message: ${message}`);

		// Handle the WebSocket message as needed
		ws.send(`Server received: ${message}`);
	});

	// Handle WebSocket closure
	ws.on('close', () => {
		console.log('WebSocket connection closed');
	});
});

connectDB();
