const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");
const fileUtils = require("../util/file");

const storageFile = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    fileUtils.read(storageFile, (parsedContent) => {
      const products = parsedContent || [];
      if (this.id) {
        const ownIndex = products.findIndex(p => p.id === this.id)
        const updatedProduct = { ...products[ownIndex], ...this }
        products[ownIndex] = updatedProduct
      } else {
        this.id = Math.random().toString();
        products.push(this);
      }
      fileUtils.write(storageFile, products);
    });
  }

  static fetchAll(cb) {
    fileUtils.read(storageFile, (parsedContent) => {
      cb(parsedContent || []);
    });
  }

  static findById(id, cb) {
    fileUtils.read(storageFile, (parsedContent) => {
      const product = (parsedContent || []).find((p) => p.id === id);
      cb(product);
    });
  }
};
