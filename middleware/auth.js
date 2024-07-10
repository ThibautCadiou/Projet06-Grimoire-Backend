const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = rez.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    req.authh = {
      userId: userID,
    };
  } catch (error) {
    res.status(401).json({ error });
  }
};
