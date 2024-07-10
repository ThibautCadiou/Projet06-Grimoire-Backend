const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A Book must have a password'],
    unique: true,
  },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
