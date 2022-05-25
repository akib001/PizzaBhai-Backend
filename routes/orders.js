const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const isUser = require('../middleware/is-user');
const ordersController = require('../controllers/orders');

router.post('/create-order', isUser, ordersController.postCreateOrder);

module.exports = router;