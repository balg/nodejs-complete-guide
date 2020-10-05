const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  static collectionName = "products";

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection(Product.collectionName)
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection(Product.collectionName).insertOne(this);
    }
    return dbOp;
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection(Product.collectionName)
      .find()
      .toArray()
      .then((products) => {
        console.log("Product -> fetchAll -> products", { products });
        return products;
      })
      .catch(console.error);
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection(Product.collectionName)
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        console.log("Product -> findById -> product", { product });
        return product;
      })
      .catch(console.error);
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection(Product.collectionName)
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((result) => {
        console.log("Product -> deleteById -> DELETED");
      })
      .catch(console.error);
  }
}

module.exports = Product;
