const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router(); // Router is like an app inside of the express app. It has the `use`, `get`, `post`, ... methods.

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res) => {
  res.render('add-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
  })
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

// module.exports = router;
exports.routes = router;
exports.products = products;