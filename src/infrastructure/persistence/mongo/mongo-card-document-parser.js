const Card = require('../../../domain/card/card');
const DocumentParser = require('./document-parser');

class MongoCardDocumentParser extends DocumentParser {
  constructor({muuid}) {
    super();
    this.muuid = muuid;
  }

  toDocument(card) {
    return {
      _id: this.muuid.from(card.id),
      name: card.name,
      language: card.language,
      releaseDate: card.releaseDate,
      images: card.images,
      set: card.set,
      legalities: card.legalities,
    };
  }

  toDomain(cardDocument) {
    const {_id, name, language, releaseDate, images, set, legalities} = cardDocument;
    return new Card({
      id: (this.muuid.from(_id)).toString(), name, language, releaseDate, images, set, legalities,
    });
  }
}

module.exports = MongoCardDocumentParser;
