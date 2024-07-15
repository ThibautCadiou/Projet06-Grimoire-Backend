const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('Auth');
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log('userId', userId);

    req.auth = {
      userId: userId,
    };

    console.log('req.auth', req.auth);

    next();
  } catch (error) {
    console.log("probleme à l'authentification");
    res.status(401).json({ error });
  }
};
