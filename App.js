const fs = require('fs');
const express = require('express');
const app = express();

const books = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`));

// Signup
app.post('/api/auth/signup', (req, res) => {
  res.status(300).send('This is signup');
});

// Login
app.post('/api/auth/login', (req, res) => {
  res.send('This is signup');
});

// Books
app.get('/api/books', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books: books,
    },
  });
});

// Book
app.get('/api/books/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      book: 'This is the book',
    },
  });
});

// Rating
app.get('/api/books/bestrating', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      rating: '3/5',
    },
  });
});

// POST book
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books: books,
    },
  });
});

// Put

// Delete

// POST

const port = 4000;
app.listen(port, () => {
  console.log(`Running on port : ${port} ...`);
});
