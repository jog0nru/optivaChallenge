const ApplicationError = require('../application-error');

class CardNotFoundError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'CardNotFoundError';
  }
}

module.exports = CardNotFoundError;
