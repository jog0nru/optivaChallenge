const morgan = require('morgan');

const morganLogger = ({logger}) => {
  // eslint-disable-next-line max-len
  return morgan('HTTP :method :url :remote-addr - [:date[clf]] [:status] - :response-time ms', {'stream': {write: (message) => logger.info(message)}});
};

module.exports = morganLogger;
