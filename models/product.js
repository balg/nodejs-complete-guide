const db = require("../util/database");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static tableName = "products";

  save() {
    return db.execute(
      `INSERT INTO ${Product.tableName} (title, price, imageUrl, description) VALUES (?,?,?,?)`,
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  delete() {}

  static async fetchAll() {
    const [rows] = await db.execute(`SELECT * FROM ${Product.tableName}`);
    return rows;
  }

  static async findById(id) {
    const [
      rows,
    ] = await db.execute(`SELECT * FROM ${Product.tableName} WHERE id = ?`, [
      id,
    ]);
    return rows.length ? rows[0] : null;
  }
};
