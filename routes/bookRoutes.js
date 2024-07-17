const express = require('express');
const auth = require('./../middleware/auth');
const bookController = require('./../controllers/bookController');
const multer = require('./../middleware/multer-config');
const router = express.Router();

router.route('/:id/rating').post(auth, bookController.defineRating);

router.route('/bestrating').get(bookController.getBestRatings);

router
  .route('/')
  .get(bookController.getBooks)
  .post(auth, multer, bookController.resizeImages, bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .put(auth, multer, bookController.resizeImages, bookController.updateBook)
  .delete(auth, bookController.deleteBook);

module.exports = router;
