const express = require('express');
const { body } = require('express-validator/check');

const userController = require('../controllers/user');
const router = express.Router();

router.put(
  '/user/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
    //   .custom((value, { req }) => {
    //     return User.findOne({ email: value }).then((userDoc) => {
    //       if (userDoc) {
    //         return Promise.reject('E-Mail address already exists!');
    //       }
    //     });
    //   })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }).withMessage('Please enter a strong password.'),
    body('name').trim().not().isEmpty(),
  ],
  userController.userSignup
);

router.post('/user/login', userController.userLogin);

router.put('/admin/signup');

router.post('/admin/login');

module.exports = router;
