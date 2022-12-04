const ApplicationError = require('../../../domain/application-error');
const {SERVER_ERROR, BAD_REQUEST} = require('../http-status-code');
const container = require('../../../container');

const handleError = (err, req, res, next) => {
  const message = err.message || err;
  const logger = container.resolve('logger');
  const errorMsg = err.message ? err.message : err;
  logger.error(errorMsg);
  if (err instanceof ApplicationError) {
    return res.status(SERVER_ERROR).json({message, description: 'unknown'});
  } else if (err instanceof SyntaxError) {
    return res.status(BAD_REQUEST).json({message: 'Bad Request', description: 'unknown'});
  } else {
    return res.status(SERVER_ERROR).json({message: 'Internal Server Error', description: 'unknown'});
  }
};

module.exports = handleError;
