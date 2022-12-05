const GetCardsByParamsResponseBuilder = require('./get-cards-by-params-response-builder');
const CardNotFoundError = require('../../domain/card/card-not-found-error');

class GetCardsByParams {
  constructor({cardRepository}) {
    this.cardRepository = cardRepository;
  };

  async get(getCardsByParamsCommand) {
    const {name, set, legality} = getCardsByParamsCommand;
    const cards = await this.cardRepository.findByParams({name, set, legality});
    if (cards.length === 0) {
      throw new CardNotFoundError('Card not found');
    }
    return new GetCardsByParamsResponseBuilder({cards});
  }
};

module.exports = GetCardsByParams;
