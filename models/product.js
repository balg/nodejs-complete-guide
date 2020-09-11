const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const storageFile = path.join(rootDir, "data", "products.json");

const getProductsFromFile = cb => {
  fs.readFile(storageFile, (err, fileContent) => {
    if (err) {
      cb([]);
      return;
    }
    cb(JSON.parse(fileContent));
  });
}

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(storageFile, JSON.stringify(products, null, 2), (err) => {
        console.error(err);
      });
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }
};
