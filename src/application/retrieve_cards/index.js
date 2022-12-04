class RetrieveCards {
  constructor({retrieveCardsService}) {
    this.retrieveCardsService = retrieveCardsService;
  }

  async retrieve(retrieveCardsCommand) {
    const {cardSets} = retrieveCardsCommand;
    await this.retrieveCardsService.getCardsBySet({sets: cardSets});
    return;
  }
}

module.exports = RetrieveCards;
