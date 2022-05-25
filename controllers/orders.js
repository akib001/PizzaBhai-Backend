const Order = require('../models/order');
const { validationResult } = require('express-validator/check');
const getDb = require('../util/database').getDb;

exports.postCreateOrder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).json({
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const userData = req.body.userData;
  const newUserData = { ...userData, userId: req.userId };

  const orderData = req.body.orderData;

  const order = new Order(newUserData, orderData);

  order.save()
    res
      .status(201)
      .json({
        message: 'Order created successfully!',
        post: {
          userData: newUserData,
          orderData: orderData,
        },
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });

};
