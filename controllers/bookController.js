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

exports.getBook = async (req, res, next) => {
  console.log('Get Da Book !!!');
  console.log(req.params.id);
  try {
    const book = await Book.findById(req.params.id);
    console.log(' Da book :\n');

    console.log(book);
    res.status(200).json(book);
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

    const myBook = new Book({
      ...newBook,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });

    myBook.save();

    return res.status(201).json({ status: 'success', data: { myBook } });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

exports.updateBook = async (req, res, next) => {
  let updateBook = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...JSON.parse(req.body.book) };

  try {
    await Book.findByIdAndUpdate(req.params.id, updateBook, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updateBook);
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
  // try {
  //   const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //     runValidators: true,
  //   });
  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       book,
  //     },
  //   });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'failed',
  //     message: err,
  //   });
  // }
};

exports.deleteBook = async (req, res, next) => {
  try {
    console.log('Delete a book');
    await Book.findByIdAndDelete(req.params.id);

    res.status(204).json({
      message: 'success',
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getBestRatings = async (req, res, next) => {
  console.log('Get 3 best Books !!!');
  const books = await Book.find();
  res.status(200).json(books.slice(0, 3));
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
