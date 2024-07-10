const express = require('express');
const auth = require('./../middleware/auth');
const bookController = require('./../controllers/bookController');

const router = express.Router();

router.route('/').get(bookController.getBooks).post(auth, bookController.createBook);

router.route('/bestrating').get(bookController.getBestRatings);

router
  .route('/:id')
  .get(bookController.getBook)
  .put(auth, bookController.updateBook)
  .delete(auth, bookController.deleteBook);

router.route('/:id/rating').post(auth, bookController.defineRating);

module.exports = router;
