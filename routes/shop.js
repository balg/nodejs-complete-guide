const path = require("path");

const express = require("express");

const productsController = require("../controllers/products");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getShop);

router.get("/products", productsController.getProducts);

// router.get("/products/:id", productsController.getProduct);

// router.get("/cart", shopController.getCart);

// router.post("/cart", shopController.postCart);

// router.post("/cart-delete-item", shopController.postCartDeleteProduct);

// router.post("/create-order", shopController.postOrder);

// router.get("/orders", shopController.getOrders);

module.exports = router;
