const path = require('path');

const express = require('express');

const appRouter = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(appRouter);

app.listen(3000);