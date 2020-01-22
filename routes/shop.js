const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
  const { products } = adminData;
  res.render('shop', {
    products,
    docTitle: 'Shop',
    path: '/',
  });
});

module.exports = router;