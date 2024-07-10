const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const bookRouter = require('./routes/bookRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware ✌');
  next();
});

app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);

module.exports = app;
