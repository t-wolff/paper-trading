const { createLogger, transports, format } = require('winston');

const logger = createLogger({
	level: 'info',
	format: format.combine(format.timestamp(), format.simple()),
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		debug: 3,
	},
	transports: [new transports.Console()],
});

// logger.info('This is an informational message.');
// logger.debug('This is a debug message.');
// logger.error('An error occurred:', new Error('Sample error'));

module.exports = logger;
