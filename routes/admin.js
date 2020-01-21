const path = require('path');

const express = require('express');

const router = express.Router(); // Router is like an app inside of the express app. It has the `use`, `get`, `post`, ... methods.

// /admin/add-product => GET
router.get('/add-product', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;