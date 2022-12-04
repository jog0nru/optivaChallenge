const env = process.env.NODE_ENV;

const run = {
  server: {
    port: 3000,
  },
  app: {
    logLevel: process.env.LOG_LEVEL || 'info',
    data: {
      cardSets: ['iko', 'grn', 'isd'],
    },
  },
  mongo: {
    mongoConnectionUri: process.env.MONGO_URI || 'mongodb://admin:admin@mongo:27017',
    dbName: process.env.MONGO_DB_NAME || 'optivaChallenge',
    timeout: process.env.MONGO_TIMEOUT || 5000,
  },
  scryfall: {
    cardsFromSetUrl: process.env.SCRYFALL_CARDS_FROM_SET_URL || 'https://api.scryfall.com/cards/search',
    waitTimeMs: process.env.SCRYFALL_WAIT_TIME_MS || 20,
  },
};

const test = {
  server: {
    port: 3000,
  },
  app: {
    logLevel: 'debug',
    data: {
      cardSets: ['iko', 'grn', 'isd'],
    },
  },
  mongo: {
    mongoConnectionUri: 'mongodb://user:pass@server:port',
    dbName: 'optivaChallenge',
    timeout: 5000,
  },
  scryfall: {
    cardsFromSetUrl: 'https://url',
    waitTimeMs: 20,
  },
};

const config = {
  run,
  test,
};

module.exports = config[env];
