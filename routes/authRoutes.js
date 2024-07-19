const express = require('express');
const authController = require('./../controllers/authController');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');

const router = express.Router();

// // Middleware pour gérer les erreurs de validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

//Midlleware pour vérifier l'unicité de la présence dans la BDD de de l'adresse mail
const checkDuplicateEmail = async (req, res, next) => {
  console.log('CHECK DUPLICATE EMAIL');

  // On récupère les email de la bd
  const mailTocheck = req.body.email;
  const dbEmails = await User.find();

  // On regarde si celle proposé fait parti de la BD
  const emailList = dbEmails.map((obj) => obj.email);
  const isInDB = emailList.includes(mailTocheck);

  if (isInDB) {
    return res.status(400).json({ message: 'the email is already in the Database' });
  } else {
    next();
  }
};

// ROUTES
router
  .route('/signup')
  .post(
    checkDuplicateEmail,
    [
      body('email').isEmail().withMessage('Veuillez fournir une adresse email valide.'),
      body('password')
        .isLength({ min: 8 })
        .withMessage('Le mot de passe doit comporter au moins 8 caractères.'),
    ],
    validate,
    authController.signup
  );

router.route('/login').post(authController.login);

module.exports = router;
