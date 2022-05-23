const express = require('express');
const mealsController = require('../controllers/meals');
const { body } = require('express-validator/check');
const router = express.Router();

// GET /feed/posts
router.get('/fetch-meals', mealsController.fetchMeals);

// POST /feed/post
router.post(
  '/add-meal',
  [
    body('title')
      .isString()
      .withMessage('Please enter a valid title.')
      .isLength({ min: 5, max: 150 })
      .trim(),

    body('price')
      .isNumeric()
      .withMessage('Please enter a valid price')
      .custom((value) => {
        if (value < 0) {
          return Promise.reject('price can not be less than 1');
        }
        return true;
      }),

    body('description')
      .isString()
      .withMessage('Please enter a valid price')
      .trim(),
  ],
  mealsController.postAddMeal
);

module.exports = router;
