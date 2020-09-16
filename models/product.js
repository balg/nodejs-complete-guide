const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  static collectionName = "products";

  save() {
    const db = getDb();
    return db
      .collection(Product.collectionName)
      .insertOne(this)
      .then((result) => console.log(result))
      .catch(console.error);
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
}

module.exports = Product;
