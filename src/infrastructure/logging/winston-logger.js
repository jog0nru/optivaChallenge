const {createLogger, format, transports} = require('winston');
const {app: {logLevel}} = require('../config');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
          format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
          format.printf(
              (info) => `{"dateTime":"${info.timestamp}", "level": "${info.level}", "message": "${info.message}"}`,
          ),
      ),
    }),
  ],
});

module.exports = logger;
