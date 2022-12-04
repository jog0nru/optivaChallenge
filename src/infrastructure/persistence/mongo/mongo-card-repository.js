const CardRepository = require('../../../domain/card/card-repository');

const COLLECTION_NAME = 'cards';

class MongoCardRepository extends CardRepository {
  constructor({mongoDbHandler, cardDocumentParser, muuid, logger}) {
    super();
    this.mongoDbHandler = mongoDbHandler;
    this.cardDocumentParser = cardDocumentParser;
    this.muuid = muuid;
    this.logger = logger;
  }

  async findById(id) {
    const db = await this.mongoDbHandler.getInstance();
    const cardDocument = await db.collection(COLLECTION_NAME).findOne({_id: this.muuid.from(id)});
    return cardDocument ? this.cardDocumentParser.toDomain(cardDocument) : null;
  }

  async saveOrUpdate(card) {
    const cardExistent = await this.findById(card.id);
    if (cardExistent) {
      await this.update(card);
    } else {
      await this.save(card);
    }
  }

  async save(card) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const cardDocument = this.cardDocumentParser.toDocument(card);
      await db.collection(COLLECTION_NAME).insertOne(cardDocument);
      this.logger.debug('saved new card');
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async update(card) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      await db.collection(COLLECTION_NAME)
          .replaceOne({_id: this.muuid.from(card.id)}, this.cardDocumentParser.toDocument(card));
      this.logger.debug('updated card');
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = MongoCardRepository;
