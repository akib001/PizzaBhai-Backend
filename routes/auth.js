const express = require('express');
const { body } = require('express-validator/check');

const userController = require('../controllers/user');
const router = express.Router();

const signupValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail(),
  body('password').trim().isLength({ min: 5 }).withMessage('Please enter a strong password.'),
  body('name').isLength({ min: 3, max: 50 }).withMessage('Please enter your valid name').trim().not().isEmpty(),
]

router.put('/user/signup',signupValidation, userController.userSignup);

router.post('/user/login', userController.userLogin);

router.put('/admin/signup', signupValidation,userController.adminSignup);

router.post('/admin/login');

module.exports = router;
