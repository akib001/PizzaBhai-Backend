const Meal = require('../models/meal');
const { validationResult } = require('express-validator/check');

exports.fetchMeals = (req, res, next) => {
  Meal.fetchAll().then((fetchedMeals) => {
    res.status(200).json({
      fetchedMeals
    });
  }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
};

exports.postAddMeal = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).json({
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    })
  }

  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;

  const meal = new Meal(title, price, description);

  meal.save();

  res.status(201).json({
    message: 'Meal created successfully!',
    post: {
      id: new Date().toISOString(),
      title: title,
      price: price,
      description: description,
    },
  }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
};
