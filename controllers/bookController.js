const fs = require('fs');
const Book = require('./../models/bookModel');
const { title } = require('process');
const sharp = require('sharp');

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
  process.env.CURRENT_BOOK_ID = req.params.id;

  try {
    const book = await Book.findById(req.params.id);
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
      imageUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`,
    });

    myBook.save();

    return res.status(201).json({ status: 'success', data: { myBook } });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    // console.log('req.body._id');
    // console.log(req.body._id);
    // console.log('process.env.CURRENT_BOOK_ID');
    // console.log(process.env.CURRENT_BOOK_ID);

    if (req.file) {
      console.log('WITH a file');
      let newBook = req.body;
      newBook.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      const book = await Book.findByIdAndUpdate(process.env.CURRENT_BOOK_ID, newBook, {
        new: true,
        runValidators: true,
      });
    } else {
      console.log('without a file');
      const book = await Book.findByIdAndUpdate(process.env.CURRENT_BOOK_ID, req.body, {
        new: true,
        runValidators: true,
      });
    }

    return res.status(204).json({ status: 'book updated' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    console.log('Delete a book');

    // 1) trouver le path de l'image
    const theBook = await Book.findById(req.params.id);

    // Supprimer l'image de la bd
    // Extraire le chemin relatif de l'image
    const relativeImagePath = theBook.imageUrl.split('/images/')[1];
    const imagePath = 'images/' + relativeImagePath;
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Failed to delete image file:', err);
      } else {
        console.log('Image file deleted:', imagePath);
      }
    });

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

exports.resizeImages = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const name = req.file.originalname.split(' ').join('_');
  const newFilename = 'images/' + name + Date.now() + '.jpeg';

  await sharp(req.file.buffer)
    .resize({ width: 206, height: 260, fit: sharp.fit.inside, withoutEnlargement: true })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(newFilename);

  req.file.filename = newFilename;
  console.log('req.file.filename');
  console.log(req.file.filename);
  next();
};

exports.getBestRatings = async (req, res, next) => {
  console.log('Get 3 best Books !!!');
  const books = await Book.find();
  res.status(200).json(books.slice(0, 3));
};

exports.defineRating = async (req, res, next) => {
  try {
    console.log('Define the rating of a book by a user of a book');

    // 1) on extrait l'ID
    const theUrl = req.url.split('/');
    const theBookId = theUrl[1];
    const theUserId = req.body.userId;

    // 2) on extrait le livre associé à l'ID
    const book = await Book.findById(theBookId);

    // 3) on extrait les ratings
    const ratings = book.ratings;

    // 4) on cherche si l'utisateur a déjà renseigné une note
    const userIds = ratings.map((rating) => rating.userId);
    const isUserIdIn = userIds.filter((id) => id === theUserId).length > 0;
    if (isUserIdIn) {
      console.log('already in it');
    } else {
      console.log('NOT already in it');

      // 5) on ajoute le nouveau rating au ratings
      const newRating = {
        userId: theUserId,
        grade: req.body.rating,
      };
      console.log('newRating');
      console.log(newRating);
      ratings.push(newRating);

      // Update the book with the new ratings
      book.ratings = ratings;
      console.log('book.ratings ');
      console.log(book.ratings);

      await book.save();
      // await Book.updateOne(theBookId);
      // const updatedBook = await Book.updateOne(
      //   { _id: theBookId },
      //   { $push: { ratings: newRating } },
      //   { new: true, runValidators: true }
      // );
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Already rated this book',
    });
  }
};
