const mongodb = require("mongodb");
const Product = require("./product");
const getDb = require("../util/database").getDb;

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  static collectionName = "users";
  static orderCollectionName = "orders";

  static findById(id) {
    const db = getDb();
    return db
      .collection(User.collectionName)
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((user) => {
        console.log("User -> findById -> user", { user });
        return new User(user.name, user.email, user.cart, user._id);
      })
      .catch(console.error);
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection(User.collectionName)
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection(User.collectionName).insertOne(this);
    }
    return dbOp;
  }

  addToCart(product) {
    const { items = [] } = this.cart || {};
    const newItems = [...items];

    const cartProductIndex = newItems.findIndex(
      (cp) => cp.productId.toString() === product._id.toString()
    );
    if (cartProductIndex >= 0) {
      const updatedItem = {
        ...newItems[cartProductIndex],
        quantity: newItems[cartProductIndex].quantity + 1,
      };
      newItems.splice(cartProductIndex, 1, updatedItem);
    } else {
      newItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: 1,
      });
    }
    const updatedCart = {
      items: newItems,
    };
    const db = getDb();
    return db
      .collection(User.collectionName)
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    if (!this.cart || !this.cart.items || !this.cart.items.length) {
      return Promise.resolve([]);
    }
    const productIds = this.cart.items.map((item) => item.productId);
    return db
      .collection(Product.collectionName)
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find(
              (i) => i.productId.toString() === p._id.toString()
            ).quantity,
          };
        });
      })
      .catch(console.error);
  }

  deleteFromCart(productId) {
    const { items = [] } = this.cart || {};
    const newItems = items.filter(
      (i) => i.productId.toString() !== productId.toString()
    );
    const updatedCart = {
      items: newItems,
    };
    const db = getDb();
    return db
      .collection(User.collectionName)
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: this._id,
            name: this.name,
            email: this.email,
          },
        };
        return db.collection(User.orderCollectionName).insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        return db
          .collection(User.collectionName)
          .updateOne(
            { _id: new mongodb.ObjectId(this._id) },
            { $set: { cart: this.cart } }
          );
      })
      .catch(console.error);
  }

  getOrders() {
    const db = getDb();
    return db
      .collection(User.orderCollectionName)
      .find({ "user._id": this._id })
      .toArray();
  }
}

module.exports = User;
