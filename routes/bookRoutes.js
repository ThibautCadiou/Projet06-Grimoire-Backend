const express = require('express');
const bookController = require('./../controllers/bookController');

const router = express.Router();

router.route('/').get(bookController.getBooks).post(bookController.createBook);
router.route('/bestrating').get(bookController.getBestRatings);
router
  .route('/:id')
  .get(bookController.getBook)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

router.route('/:id/rating').post(bookController.defineRating);

module.exports = router;
