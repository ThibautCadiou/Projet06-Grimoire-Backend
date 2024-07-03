const fs = require('fs');

const books = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`));

exports.getBooks = (req, res) => {
  console.log('Get Books !!!');

  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books: books,
    },
  });
};

exports.getBook = (req, res) => {
  console.log('Get Da Books !!!');

  const id = req.params.id;
  const book = books.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
  });
};

exports.getBestRatings = (req, res) => {
  console.log('Get 3 best Books !!!');

  res.status(200).json({
    status: 'Success',
    data: {
      books: '<Updated Tour here ...>',
    },
  });
};

exports.createBook = (req, res) => {
  console.log('Add a book');
  console.log(req.body);
  const newId = books[books.length - 1].id * 1 + 1;
  const newBook = Object.assign({ id: newId }, req.body);
  books.push(newBook);

  fs.writeFile(`${__dirname}/data/data.json`, JSON.stringify(books), (err) => {
    res.status(201).json({ status: 'success', data: { book: newBook } });
  });
};

exports.updateBook = (req, res) => {
  console.log('Update a book');
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated Book here ...>',
    },
  });
};

exports.deleteBook = (req, res) => {
  console.log('Delete a book');
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.defineRating = (req, res) => {
  console.log('Define the rating of a book by a user of a book');
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated Rating>',
    },
  });
};
