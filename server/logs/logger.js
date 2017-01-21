const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File) ({ filename: __dirname + '/debug.log', json: false, level: 'error', colorize: true }),
    new (winston.transports.Console)({ json: false, timestamp: true, level: 'info', colorize: true }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false }),
    new (winston.transports.Console)({ json: false, timestamp: true }),
  ],
  exitOnError: false,
});

module.exports = logger;