const express = require('express');
const bookController = require('./../controllers/bookController');

const router = express.Router();

router.route('/').get(bookController.getBooks);

// router.route('/:id').get(bookController.getOneTour);

module.exports = router;
