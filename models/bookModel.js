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
  imageUrl: String,
  year: Number,
  genre: String,
  ratings: { userId: String, grade: Number },
  averageRatings: Number,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
