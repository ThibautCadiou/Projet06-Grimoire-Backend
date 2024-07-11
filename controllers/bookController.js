const fs = require('fs');
const Book = require('./../models/bookModel');
const { title } = require('process');

exports.getBooks = async (req, res) => {
  console.log('Get Books !!!');
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getBook = async (req, res) => {
  console.log('Get Da Book !!!');

  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        book: book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.createBook = async (req, res, next) => {
  console.log('Add a book');

  try {
    const newBook = JSON.parse(req.body.book);
    console.log('book\n\n\n');
    console.log(newBook);
    const myBook = new Book({
      ...newBook,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    console.log(myBook);

    myBook.save();

    return res.status(201).json({ status: 'success', data: { myBook } });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    console.log('Delete a book');
    await Book.findByIdAndDelete(req.params._id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
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

exports.defineRating = (req, res) => {
  console.log('Define the rating of a book by a user of a book');
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated Rating>',
    },
  });
};
