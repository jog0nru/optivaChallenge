describe('Config file', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return dev environment config with default values', () => {
    process.env.NODE_ENV = 'run';
    const actualConfig = require('../../../../infrastructure/config');
    const expectedConfig = {
      server: {
        port: 3000,
      },
      app: {
        logLevel: 'info',
        data: {
          cardSets: ['iko', 'grn', 'isd'],
        },
      },
      mongo: {
        mongoConnectionUri: 'mongodb://admin:admin@mongo:27017',
        dbName: 'optivaChallenge',
        timeout: 5000,
      },
      scryfall: {
        cardsFromSetUrl: 'https://api.scryfall.com/cards/search',
        waitTimeMs: 20,
      },
    };
    expect(actualConfig).toEqual(expectedConfig);
  });

  it('should return test environment config with default values', () => {
    process.env.NODE_ENV = 'test';
    const actualConfig = require('../../../../infrastructure/config');
    const expectedConfig = {
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
    expect(actualConfig).toEqual(expectedConfig);
  });
});
