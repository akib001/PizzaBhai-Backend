const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongodb = require('mongodb')

const User = require('../models/user');

exports.userSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  bcrypt
    .hash(password, 12)
    .then((hashedpw) => {
      const user = new User(name, email, hashedpw, role);
      console.log(user)
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.userLogin = (req, res, next) => {
    const email= req.body.email;
    const password = req.body.password;

    let loaded
}
