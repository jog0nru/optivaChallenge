const logger = ({loggerService}) => {
  return {
    info: (message) => loggerService.info(message),
    error: (message) => loggerService.error(message),
    debug: (message) => loggerService.debug(message),
  };
};

module.exports = logger;
