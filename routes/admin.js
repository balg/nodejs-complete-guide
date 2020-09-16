const path = require("path");

const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productsController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", productsController.postAddProduct);

// /admin/products => GET
// router.get('/products', productsController.getAdminProducts);

// router.get('/edit-product/:id', productsController.getEditProduct);

// router.post('/edit-product', productsController.postEditProduct);

// router.post('/delete-product', productsController.postDeleteProduct);

module.exports = router;
