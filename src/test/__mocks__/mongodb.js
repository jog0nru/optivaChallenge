const mongodb = jest.createMockFromModule('mongodb');

let val;
function connectValue(value) {
  val = value;
}

const client = {
  db: () => {
    return {
      collection: () => {
        return {
          createIndexes: () => {},
        };
      },
    };
  },
  close: () => {},
};

const connect = async () => {
  return val === 'reject' ? Promise.reject(new Error('There was an error while connecting to DB')) :
    Promise.resolve(client);
};

const MongoClient = {
  connect,
};

mongodb.MongoClient = MongoClient;
mongodb._connectValue = connectValue;
module.exports = mongodb;
