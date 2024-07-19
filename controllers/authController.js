const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const bcrypt = require('bcrypt');

exports.signup = async (req, res, next) => {
  try {
    console.log('\n\n SIGNUP');
    const hach = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hach,
    });

    try {
      user.save();
      res.status(201).json({
        status: 'success',
        message: 'utilisateur crée',
        token: hach,
      });
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: 'paire identifiant mot de passe incorrect' });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: 'paire identifiant mot de passe incorrect' });
            } else {
              process.env.USER_ID = user._id;
              process.env.USER_TOKEN = user.password;
              // console.log('process.env.USER_ID', process.env.USER_ID);
              // console.log('process.env.USER_TOKEN', process.env.USER_TOKEN);

              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
                  expiresIn: '24h',
                }),
              });
            }
          })
          .catch((err) => {
            res.status(500).json({
              status: 'failed',
              message: err,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 'failed',
        message: err,
      });
    });
};
