const CardNotFoundError = require('../../domain/card/card-not-found-error');
const GetCardResponseBuilder = require('./get-card-response-builder');

class GetCard {
  constructor({cardRepository}) {
    this.cardRepository = cardRepository;
  };

  async get(getCardCommand) {
    const {cardId} = getCardCommand;
    const card = await this.cardRepository.findById(cardId);
    if (!card) {
      throw new CardNotFoundError('Card not found');
    }
    return new GetCardResponseBuilder({card});
  }
};

module.exports = GetCard;
