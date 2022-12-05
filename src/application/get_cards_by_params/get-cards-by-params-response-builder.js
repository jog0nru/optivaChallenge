class GetCardsByParamsResponseBuilder {
  constructor({cards}) {
    this.cards = cards;
    return this.cards.map((card) => card.toObject());
  }
}

module.exports = GetCardsByParamsResponseBuilder;
