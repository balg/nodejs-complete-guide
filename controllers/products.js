const mongodb = require("mongodb");

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
  const { body, user } = req;
  const { title, imageUrl, price, description } = body;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then(() => {
      console.info("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/admin/add-product");
    });
};

exports.getEditProduct = (req, res, next) => {
  const { user, params } = req;
  const { id } = params;
  Product.findById(id)
    .then((product) => {
      if (product) {
        return res.render("admin/edit-product", {
          pageTitle: "Edit Product",
          path: "/admin/edit-product",
          product,
        });
      }
      errorController.get404(req, res, next);
    })
    .catch((error) => console.error(error));
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, price, description } = req.body;

  const product = new Product(title, price, description, imageUrl, id);
  product
    .save()
    .then(() => {
      console.info("Updated Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error(err);
      res.redirect(`/admin/edit-product/${id}`);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
        path: "/products",
      });
    })
    .catch((error) => console.error(error));
};

exports.getProduct = (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      if (product) {
        return res.render("shop/product-detail", {
          product,
          pageTitle: product.title,
          path: `/products`,
        });
      }
      errorController.get404(req, res, next);
    })
    .catch((error) => console.error(error));
};

exports.getAdminProducts = (req, res) => {
  const { user } = req;
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch(console.error);
  // user
  //   .getProducts()
  //   .then((products) => {
  //     res.render("admin/products", {
  //       prods: products,
  //       pageTitle: "Admin Products",
  //       path: "/admin/products",
  //     });
  //   })
  //   .catch((error) => console.error(error));
};

// exports.postDeleteProduct = (req, res) => {
//   const { id } = req.body;
//   Product.findByPk(id)
//     .then((product) => product.destroy())
//     .then(() => {
//       console.info("Deleted Product");
//     })
//     .catch((err) => console.error(err))
//     .finally(() => res.redirect("/admin/products"));
// };
