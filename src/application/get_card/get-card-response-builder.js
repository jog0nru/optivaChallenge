class GetCardResponseBuilder {
  constructor({card}) {
    this.card = card;
    return this.card.toObject();
  }
}

module.exports = GetCardResponseBuilder;
