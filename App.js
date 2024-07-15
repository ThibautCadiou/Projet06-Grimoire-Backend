const express = require('express');
const path = require('path');
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const bookRouter = require('./routes/bookRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
