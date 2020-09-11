const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");
const fileUtil = require("../util/file");

const storageFile = path.join(rootDir, "data", "cart.json");

const emptyCart = {
  products: [],
  totalPrice: 0,
};
Object.freeze(emptyCart);

module.exports = class Cart {
  static addProduct(id, price) {
    fileUtil.read(storageFile, (parsedContent) => {
      const cart = parsedContent || { ...emptyCart };
      const productAlreadyInCart = cart.products.find((p) => p.id === id);
      if (productAlreadyInCart) {
        productAlreadyInCart.qty += 1;
      } else {
        cart.products.push({
          id,
          qty: 1,
        });
      }
      cart.totalPrice += price;
      fileUtil.write(storageFile, cart);
    });
  }

  static getContent(cb) {
    fileUtil.read(storageFile, (parsedContent) => {
      cb(parsedContent || { ...emptyCart });
    });
  }
};
