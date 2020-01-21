const express = require('express');

const router = express.Router(); // Router is like an app inside of the express app. It has the `use`, `get`, `post`, ... methods.

router.get('/add-product', (req, res, next) => {
  res.send(`
    <form action="/product" method="POST">
      <input type="text" name="title" />
      <button type="submit">Add Product</button>
    </form>`);
});

router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;