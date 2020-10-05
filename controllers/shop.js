const Product = require("../models/product");

exports.getShop = (req, res) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((error) => console.error(error));
};

exports.getCart = (req, res) => {
  const { user } = req;
  user
    .getCart()
    .then((products) =>
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products,
      })
    )
    .catch(console.error);
};

exports.postCart = (req, res, next) => {
  const { body, user } = req;
  const { id } = body;
  Product.findById(id)
    .then((product) => user.addToCart(product))
    .then((result) => {
      console.log("exports.postCart -> result", { result });
      res.redirect("/cart");
    })
    .catch(console.error);
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { body, user } = req;
  const { id } = body;
  user
    .deleteFromCart(id)
    .then(() => res.redirect("/cart"))
    .catch(console.error);
};

exports.postOrder = (req, res, next) => {
  const { user } = req;
  user
    .addOrder()
    .then(() => res.redirect("/orders"))
    .catch(console.error);
};

exports.getOrders = (req, res) => {
  const { user } = req;
  user
    .getOrders()
    .then((orders) =>
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders,
      })
    )
    .catch(console.error);
};
