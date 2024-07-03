const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

// ROUTES
router.route('/signup').post(authController.hachage);
router.route('/login').post(authController.verification);

module.exports = router;
