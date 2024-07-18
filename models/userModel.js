const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid E-mail'],
  },
  password: {
    type: String,
    required: [true, 'A Book must have a password'],
    unique: true,
    minLength: 8,
  },
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);
module.exports = User;
