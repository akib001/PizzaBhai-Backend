const Meal = require('../models/meal');
const { validationResult } = require('express-validator/check');
const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const { post } = require('../routes/meals');
const path = require('path');
const fs = require('fs');

exports.fetchMeals = (req, res, next) => {
  Meal.fetchAll()
    .then((fetchedOrder) => {
      res.status(200).json({
        fetchedOrder,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postAddMeal = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  if (!req.file) {
    const error = new Error('No image provided');
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const imageUrl = req.file.path;
  const price = req.body.price;
  const description = req.body.description;
  const adminId = new mongodb.ObjectId(req.userId);

  const meal = new Meal(title, imageUrl, price, description, adminId);

  meal.save();

  return res.status(201).json({
    message: 'Meal created successfully!',
    post: {
      id: new Date().toISOString(),
      title: title,
      price: price,
      description: description,
    },
  });
};

exports.updateMeal = (req, res, next) => {
  const mealId = req.params.mealId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  let imageUrl = req.file.image;
  const price = req.body.price;
  const description = req.body.description;
  const adminId = new mongodb.ObjectId(req.body.adminId);

  if (req.file) {
    imageUrl = req.file.path;
  }

  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }

  Meal.findById(mealId)
    .then((meal) => {
      if (!meal) {
        const error = new Error('Could not find meal.');
        error.statusCode = 404;
        throw error;
      }

      if (imageUrl !== meal.imageUrl) {
        clearImage(meal.imageUrl);
      }


      const updatedMeal = new Meal(title, imageUrl, price, description, adminId, mealId);

      return updatedMeal.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'Meal updated!', meal: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postDeleteMeal = (req, res, next) => {
  const prodId = req.body.productId;

  Meal.deleteById(prodId)
    .then((result) => {
      res.status(201).json({
        message: 'Meal deleted successfully!',
        post: {
          id: prodId,
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
