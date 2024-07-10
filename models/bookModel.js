const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'A Book must have an user ID when added'],
  },
  title: {
    type: String,
    required: [true, 'A Book must have a title'],
    unique: true,
  },
  author: {
    type: String,
    required: [true, 'A Book must have an author'],
  },
  imageUrl: {
    type: String,
    required: [true, 'A Book must have an image'],
  },
  year: {
    type: Number,
    required: [true, 'A Book must have a year of publication'],
  },
  genre: {
    type: String,
    required: [true, 'A Book must have an genre'],
  },
  ratings: { userId: String, grade: Number },
  averageRatings: { type: Number, default: 0 },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
