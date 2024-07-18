const { body, validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  console.log('\n\n MOONGOOSE ERROR HANDLER');

  try {
    console.log('req');
    console.log(req);
    req.title.isEmpty();

    next();
  } catch (error) {
    res.status(400).json({ error });
  }
};
