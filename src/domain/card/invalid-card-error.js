const ApplicationError = require('../application-error');

class InvalidCardError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidCardError';
  }
}

module.exports = InvalidCardError;
