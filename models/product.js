const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new mongodb.ObjectId(id);
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
        console.log(products);
        return products;
      })
      .catch(console.error);
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch(console.error);
  }
}

module.exports = Product;
