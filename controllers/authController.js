const Book = require('./../models/userModel');

exports.hachage = (req, res) => {
  console.log('Hachage !!!');

  res.status(500).json({
    status: 'error',
    message: 'Le hachage nest pas encore fait',
  });
};

exports.verification = (req, res) => {
  console.log('Vérification !!!');

  res.status(500).json({
    status: 'error',
    message: 'La vérification nest pas encore faite',
  });
};
