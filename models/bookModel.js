const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
  ratings: {
    type: [
      {
        userId: {
          type: String,
          required: [true, 'A rating must have a user ID'],
        },
        grade: {
          type: Number,
          required: [true, 'A rating must have a grade'],
          min: [0, 'Ratings must be over or equel to 0'],
          max: [5, 'Ratings must be under or equel to 5'],
          default: 0,
        },
      },
    ],
    required: [true, 'A Book must have ratings'],
  },
  averageRating: { type: Number, default: 0 },
});

bookSchema.plugin(uniqueValidator);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
