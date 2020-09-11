const Product = require("../models/product");
const Cart = require("../models/cart");
const errorController = require("./error");

exports.getShop = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
  });
};

exports.postCart = (req, res, next) => {
  const { id } = req.body;
  Product.findById(id, product => {
    if (product) {
      Cart.addProduct(id, product.price)
    }
    res.redirect('/cart');
  })
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
