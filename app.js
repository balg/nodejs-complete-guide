const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log('Middleware 1 that runs every time');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Middleware 2');
//   res.send('<h1>I am the response!</h1>');
// });

app.use('/users', (req, res, next) => {
  console.log('Users Middleware');
  res.send('<h1>Users</h1>');
});

app.use('/', (req, res, next) => {
  console.log('Root Middleware');
  res.send('<h1>This is the root page</h1>');
});


app.listen(3000);