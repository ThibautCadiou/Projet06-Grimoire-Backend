const express = require('express');

const bookRouter = require('./routes/bookRoutes');
// const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware ✌');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/books', bookRouter);
// app.use('/api/users', userRouter);

module.exports = app;
