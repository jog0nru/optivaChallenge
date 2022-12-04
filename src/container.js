const awilix = require('awilix');
const winstonLogger = require('./infrastructure/logging/winston-logger');
const logger = require('./infrastructure/logging/logger');
const {MongoClient: mongo} = require('mongodb');
const MUUID = require('uuid-mongodb');
const morganLogger = require('./infrastructure/logging/morgan-logger');
const MongoDbHandler = require('./infrastructure/persistence/mongo/mongo-db-handler');
const MongoCardDocumentParser = require('./infrastructure/persistence/mongo/mongo-card-document-parser');
const MongoCardRepository = require('./infrastructure/persistence/mongo/mongo-card-repository');
const ScryfallCardProvider = require('./infrastructure/service/card/scryfall-provider');
const RetrieveCards = require('./application/retrieve_cards');
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  // Start registering your dependencies here
  loggerService: awilix.asValue(winstonLogger),
  logger: awilix.asFunction(logger),
  metricsLogger: awilix.asFunction(morganLogger),
  muuid: awilix.asValue(MUUID),
  mongo: awilix.asValue(mongo),
  mongoDbHandler: awilix.asClass(MongoDbHandler).singleton(),
  cardDocumentParser: awilix.asClass(MongoCardDocumentParser),
  cardRepository: awilix.asClass(MongoCardRepository).singleton(),
  retrieveCardsService: awilix.asClass(ScryfallCardProvider),
  retrieveCards: awilix.asClass(RetrieveCards),
});

module.exports = container;
