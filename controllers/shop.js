const Product = require("../models/product");

exports.getShop = (req, res) => {
  Product.findAll()
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
    .then((cart) => cart.getProducts())
    .then((products) =>
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products,
      })
    )
    .catch((error) => console.error(error));
};

exports.postCart = (req, res, next) => {
  const { body, user } = req;
  const { id } = body;
  let fetchedCart;
  let newQuantity = 1;
  user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id } });
    })
    .then((products) => {
      const [product] = products;
      if (product) {
        newQuantity = product.cartItem.quantity + 1;
        return product;
      }
      return Product.findByPk(id);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(console.error);
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { body, user } = req;
  const { id } = body;
  user
    .getCart()
    .then((cart) => cart.getProducts({ where: { id } }))
    .then((products) => {
      const [product] = products;
      return product.cartItem.destroy();
    })
    .then(() => res.redirect("/cart"))
    .catch(console.error);
};

exports.postOrder = (req, res, next) => {
  const { user } = req;
  let fetchedCart;
  user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(console.error);
    })
    .then(() => fetchedCart.setProducts(null))
    .then(() => res.redirect("/orders"))
    .catch(console.error);
};

exports.getOrders = (req, res) => {
  const { user } = req;
  user
    .getOrders({ include: ["products"] })
    .then((orders) =>
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders,
      })
    )
    .catch(console.error);
};
