const Product = require("../models/product");
const errorController = require("./error");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    product: null,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(
    null,
    title,
    imageUrl,
    description,
    parseFloat(price)
  );
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const { id } = req.params;
  Product.findById(id, (product) => {
    if (product) {
      return res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        product,
      });
    }
    errorController.get404(req, res, next);
  });
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, price, description } = req.body;
  const product = new Product(
    id,
    title,
    imageUrl,
    description,
    parseFloat(price)
  );
  product.save();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const { id } = req.params;
  Product.findById(id, (product) => {
    if (product) {
      res.render("shop/product-detail", {
        product,
        pageTitle: product.title,
        path: `/products`,
      });
      return;
    }
    errorController.get404(req, res, next);
  });
};

exports.getAdminProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = (req, res) => {
  const { id } = req.body;
  Product.findById(id, (product) => product.delete());
  res.redirect("/admin/products");
};
