const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://balg:EugPG7ba7oeoNl03@cluster0.p7vbd.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.info("Connected!");
      _db = client.db();
      cb();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "DB is not initialized!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
