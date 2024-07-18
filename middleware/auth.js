const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('AUTH\n');
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    req.auth = {
      userId: userId,
    };

    next();
  } catch (error) {
    console.log("probleme à l'authentification");
    res.status(403).json({ error });
  }
};
