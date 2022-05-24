const express = require('express');
const mealsController = require('../controllers/meals');
const { body } = require('express-validator/check');
const router = express.Router();
const isUser = require('../middleware/is-user');
const isAdmin = require('../middleware/is-admin');

// GET /feed/posts
router.get('/fetch-meals', mealsController.fetchMeals);

// POST /meals/add-meal
router.post(
  '/add-meal',
  isAdmin,
  // [
  //   body('title')
  //     .isString()
  //     .isLength({ min: 5, max: 150 })
  //     .withMessage('Please enter a valid title.')
  //     .trim(),

  //   body('price')
  //     .isNumeric()
  //     .withMessage('Please enter a valid price')
  //     .custom((value) => {
  //       if (value < 0) {
  //         return Promise.reject('price can not be less than 1');
  //       }
  //       return true;
  //     }),

  //   body('description')
  //     .isString()
  //     .withMessage('Please enter a valid price')
  //     .trim(),
  // ],
  mealsController.postAddMeal
);

module.exports = router;
