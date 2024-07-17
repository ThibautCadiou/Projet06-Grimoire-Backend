const fs = require('fs');
const Book = require('./../models/bookModel');
const { title } = require('process');
const sharp = require('sharp');
const { map } = require('../App');

exports.getBooks = async (req, res) => {
  console.log('GET BOOKS\n');
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
  console.log('GET ONE BOOK \n');
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
  console.log('ADD A BOOK \n');
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
  console.log('UPDATE \n');
  try {
    if (req.file) {
      console.log('req.file.filename');
      console.log(req.file.filename);
      console.log('WITH A FILE\n');

      const newBook = JSON.parse(req.body.book);

      const filenameWithExtension = req.file.originalname.split(' ').join('_');
      const filenameWithoutExtension = filenameWithExtension.split('.');
      const a = filenameWithoutExtension[0] + Date.now();
      const b = `${req.protocol}://${req.get('host')}/${req.file.filename}`;

      console.log('filenameWithoutExtension');
      console.log(filenameWithoutExtension);
      console.log('a');
      console.log(a);
      console.log('b');
      console.log(b);

      // const myBook = new Book({
      //   ...newBook,
      //   userId: req.auth.userId,
      //   imageUrl: b,
      // });
      // myBook.save();

      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        {
          ...newBook,
          userId: req.auth.userId,
          imageUrl: b,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(204).json(updatedBook);
    } else {
      console.log('WITHOUT A FILE\n');
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(204).json(book);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    console.log('DELETE A BOOK\n');

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
  console.log('RESIZE');

  if (!req.file) {
    return next();
  }
  const name = req.file.originalname.split(' ').join('_');
  const newFilename = 'images/' + name + Date.now() + '.webp';

  await sharp(req.file.buffer).toFormat('webp').toFile(newFilename);

  req.file.filename = newFilename;
  console.log('req.file.filename');
  console.log(req.file.filename);
  next();
};

exports.getBestRatings = async (req, res, next) => {
  console.log('GET 3 BEST BOOKS \n');
  const books = await Book.find();
  res.status(200).json(books.slice(0, 3));
};

exports.defineRating = async (req, res, next) => {
  console.log('DEFINE RATING BY USER');

  // 1) retrouve le livre qui va bien
  const myBook = await Book.findById(req.params.id);
  console.log('\n\nmyBook');
  console.log(myBook);

  // 2) on extrait les ratings
  let previousRatings = myBook.ratings;
  console.log('\n\npreviousRatings');
  console.log(previousRatings);

  // 3) on extrait les ids:
  const userIds = previousRatings.map((user) => user.id);
  console.log('\n\nuserIds');
  console.log(userIds);

  try {
    res.status(200).json({ message: 'Hey !!!' });
  } catch (error) {
    res.status(400).json({ status: 'failed', message: error });
  }
};
