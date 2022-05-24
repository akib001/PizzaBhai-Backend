const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongodb = require('mongodb');

const User = require('../models/user');
const getDb = require('../util/database').getDb;

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
  const userRole = req.body.userRole;
  const adminRole = req.body.adminRole;

  bcrypt
    .hash(password, 12)
    .then((hashedpw) => {
      const user = new User(name, email, hashedpw, userRole, adminRole);
      user.save();
    })
    .then(() => {
      res.status(201).json({ message: 'User created!' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.userLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let loadedUser;

  const db = getDb();

  db.collection('users')
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
