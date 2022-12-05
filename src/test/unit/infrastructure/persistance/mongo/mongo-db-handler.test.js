const container = require('../../../../../container');
const awilix = require('awilix');

jest.mock('mongodb');

describe('MongoDB handler', () => {
  describe('When getting instance', () => {
    beforeEach(() => {
      loggerMock = {
        error: jest.fn(),
        debug: jest.fn(),
        info: jest.fn(),
      };
      container.register({
        logger: awilix.asValue(loggerMock),
      });
      MongoDbHandler = container.resolve('mongoDbHandler');
    });

    it('should log error if it is produced when trying to connect', async () => {
      require('mongodb')._connectValue('reject');

      await expect(MongoDbHandler.getInstance()).rejects.toThrowError();

      expect(loggerMock.error).toHaveBeenCalledTimes(1);
      expect(loggerMock.error)
          .toHaveBeenCalledWith('Error in database connection: There was an error while connecting to DB');
    });

    it('should create and return new instance', async () => {
      require('mongodb')._connectValue('resolve');
      const mongodb = require('mongodb');

      const spyConnect = jest.spyOn(mongodb.MongoClient, 'connect');
      const actualMongoDbInstance = await MongoDbHandler.getInstance();

      expect(actualMongoDbInstance).not.toBeNull();
      expect(spyConnect).toBeCalledTimes(1);
    });

    it('should return existent instance', async () => {
      const mongodb = require('mongodb');

      const spyConnect = jest.spyOn(mongodb.MongoClient, 'connect');
      await MongoDbHandler.getInstance();
      await MongoDbHandler.getInstance();

      expect(spyConnect).toBeCalledTimes(1);
    });
  });

  describe('when disconnecting from db', () => {
    it('should disconnect correctly', async () => {
      const mongodb = require('mongodb');

      const spyConnect = jest.spyOn(mongodb.MongoClient, 'connect');

      await MongoDbHandler.getInstance();
      MongoDbHandler.disconnect();
      // Reopening the connection just to verify that client instance was destroyed when closing connection
      await MongoDbHandler.getInstance();
      expect(spyConnect).toBeCalledTimes(2);
    });
  });
});
