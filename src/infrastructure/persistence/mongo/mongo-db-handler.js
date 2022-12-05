const {mongo: {mongoConnectionUri, dbName, timeout}} = require('../../config');

class MongoDbHandler {
  constructor({mongo, logger}) {
    this.mongo = mongo;
    this.logger = logger;
  }
  async _connect() {
    try {
      this.client = await this.mongo.connect(mongoConnectionUri,
          {useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: timeout});
      const db = await this.client.db(dbName);

      db.collection('cards').createIndexes([
        {name: 'name', key: {name: 1}},
        {name: 'legality', key: {legalities: 1}},
        {name: 'set', key: {set: 1}},
      ], (err, result) => {
        if (err) {
          console.log(`There was an error while creating voices_id index due to: ${err}`);
        } else {
          console.log(`Index created: ${result}`);
        }
      });

      return db;
    } catch (err) {
      const error = err.message ? err.message : err;
      this.logger.error(`Error in database connection: ${error}`);
      throw new Error(`Error in database connection: ${error}`);
    }
  }

  async _createInstance() {
    return await this._connect();
  }

  async getInstance() {
    if (!this.instance) {
      this.instance = await this._createInstance();
    }
    return this.instance;
  }

  disconnect() {
    this.client.close();
    this.instance = null;
    this.client = null;
  }
}

module.exports = MongoDbHandler;

