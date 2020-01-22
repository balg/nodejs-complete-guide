const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
  const { products } = adminData;
  res.render('shop', {
    products,
    hasProducts: products.length > 0,
    pageTitle: 'Shop',
    path: '/',
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;